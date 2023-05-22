import { type NextApiRequest, type NextApiResponse } from "next";
import Cors from "cors";

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const cors = Cors({
  origin: ["http://localhost:3000"],
  //update: or "origin: true," if you don't wanna add a specific one
  credentials: true,
});