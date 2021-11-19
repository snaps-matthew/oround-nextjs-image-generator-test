import type { NextApiRequest, NextApiResponse } from 'next';

// interface IRequest
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);
  res.send("test");
}
