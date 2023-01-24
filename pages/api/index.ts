// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.connect();

  res.status(200).json({ name: "John Doe" });
}
