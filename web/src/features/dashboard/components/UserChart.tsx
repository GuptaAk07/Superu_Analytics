import { api } from "@/src/utils/api";
import { type DateTimeAggregationOption } from "@/src/features/dashboard/lib/timeseries-aggregation";
import { type FilterState } from "@/src/features/filters/types";
import { DashboardCard } from "@/src/features/dashboard/components/cards/DashboardCard";
import { compactNumberFormatter } from "@/src/utils/numbers";
import { TabComponent } from "@/src/features/dashboard/components/TabsComponent";
import { BarList } from "@tremor/react";
import { TotalMetric } from "@/src/features/dashboard/components/TotalMetric";
import { ExpandListButton } from "@/src/features/dashboard/components/cards/ChevronButton";
import { useState } from "react";
import DocPopup from "@/src/components/layouts/doc-popup";
import { NoData } from "@/src/features/dashboard/components/NoData";
import {
  createTracesTimeFilter,
  totalCostDashboardFormatted,
} from "@/src/features/dashboard/lib/dashboard-utils";
import axios from 'axios';
import { useSession } from "next-auth/react";


type BarChartDataPoint = {
  name: string;
  value: number;
};

export const UserChart = ({
  className,
  projectId,
  globalFilterState,
}: {
  className?: string;
  projectId: string;
  globalFilterState: FilterState;
  agg: DateTimeAggregationOption;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const user = api.dashboard.chart.useQuery(
    {
      projectId,
      from: "traces_observationsview",
      select: [
        { column: "calculatedTotalCost", agg: "SUM" },
        { column: "user" },
        { column: "traceId", agg: "COUNT" },
      ],
      filter: [
        ...globalFilterState,
        {
          type: "string",
          column: "type",
          operator: "=",
          value: "GENERATION",
        },
      ],
      groupBy: [
        {
          type: "string",
          column: "user",
        },
      ],
      orderBy: [
        { column: "calculatedTotalCost", direction: "DESC", agg: "SUM" },
      ],
    },
    {
      trpc: {
        context: {
          skipBatch: true,
        },
      },
    },
  );

  const traces = api.dashboard.chart.useQuery(
    {
      projectId,
      from: "traces",
      select: [{ column: "user" }, { column: "traceId", agg: "COUNT" }],
      filter: createTracesTimeFilter(globalFilterState),
      groupBy: [
        {
          type: "string",
          column: "user",
        },
      ],
      orderBy: [{ column: "traceId", agg: "COUNT", direction: "DESC" }],
    },
    {
      trpc: {
        context: {
          skipBatch: true,
        },
      },
    },
  );

  const transformedNumberOfTraces: BarChartDataPoint[] = traces.data
    ? traces.data
      .filter((item) => item.user !== undefined)
      .map((item) => {
        return {
          name: item.user as string,
          value: item.countTraceId ? (item.countTraceId as number) : 0,
        };
      })
    : [];

  const transformedCost: BarChartDataPoint[] = user.data
    ? user.data
      .filter((item) => item.user !== undefined)
      .map((item) => {
        return {
          name: (item.user as string | null | undefined) ?? "Unknown",
          value: item.sumCalculatedTotalCost
            ? (item.sumCalculatedTotalCost as number)
            : 0,
        };
      })
    : [];

  const totalCost = user.data?.reduce(
    (acc, curr) => acc + (curr.sumCalculatedTotalCost as number),
    0,
  );

  const totalTraces = traces.data?.reduce(
    (acc, curr) => acc + (curr.countTraceId as number),
    0,
  );

  const maxNumberOfEntries = { collapsed: 5, expanded: 20 } as const;

  const localUsdFormatter = (value: number) =>
    totalCostDashboardFormatted(value);

  const session = useSession();
  const email = session.data?.user?.email;

  const [earningsData, setEarningsData] = useState<BarChartDataPoint[]>([]);
  const [totalEarning, setTotalEarning] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await axios.post('https://links.superu.ai/earning_summary_by_email', { email: email });
      const data = response.data;
      setTotalEarning(data.total_earning);
      setEarningsData([
        { name: 'Average Earning', value: data.average_earning },
        { name: 'Total Clicks', value: data.total_clicks },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
  const formattedTotalEarning = `$${totalEarning.toFixed(2)}`;
  
  const data = [
    {
      tabTitle: "Bot Earnings",
      data: earningsData,
      totalMetric: formattedTotalEarning,
      metricDescription: "Total Earnings",
      formatter: localUsdFormatter,
    },
    // {
    //   tabTitle: "Count of Chats",
    //   data: isExpanded
    //     ? transformedNumberOfTraces.slice(0, maxNumberOfEntries.expanded)
    //     : transformedNumberOfTraces.slice(0, maxNumberOfEntries.collapsed),
    //   totalMetric: totalTraces
    //     ? compactNumberFormatter(totalTraces)
    //     : compactNumberFormatter(0),
    //   metricDescription: "Total chats",
    // },
  ];

  return (
    <DashboardCard
      className={className}
      title="MonetizeBot Earnings"
      isLoading={user.isLoading}
    >
      <TabComponent
        tabs={data.map((item) => {
          return {
            tabTitle: item.tabTitle,
            content: (
              <>
                {item.data.length > 0 ? (
                  <>
                    <TotalMetric
                      metric={item.totalMetric}
                      description={item.metricDescription}
                    />
                    <BarList
                      data={item.data}
                      // valueFormatter={item.formatter}
                      className="mt-2"
                      showAnimation={true}
                      color={"white"}
                    />
                  </>
                ) : (
                  <NoData noDataText="No data">
                    {/* <DocPopup
                      description="Consumption per user is tracked by passing their ids on traces."
                      // href="https://langfuse.com/docs/user-explorer"
                    /> */}
                  </NoData>
                )}
              </>
            ),
          };
        })}
      />
      <ExpandListButton
        isExpanded={isExpanded}
        setExpanded={setIsExpanded}
        totalLength={transformedCost.length}
        maxLength={maxNumberOfEntries.collapsed}
        expandText={
          transformedCost.length > maxNumberOfEntries.expanded
            ? `Show top ${maxNumberOfEntries.expanded}`
            : "Show all"
        }
      />
    </DashboardCard>
  );
};
