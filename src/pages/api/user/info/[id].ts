import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // how do I get the body from the request?
    // const { method, query: { id } } = req;

    const { method, query: { id } } = req;
    if(req.method === "PUT"  && req.body){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { body } = req;
        console.log(body)

    }

};