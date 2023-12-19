import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        console.log('req')
    const { method } = req;
    if (method !== "GET") {
        console.error("Method not allowed");
        res.status(405).json({ message: "Method not allowed" });
    }
    try{
    const {IdString} = req.query as {IdString: string}
    console.log('IdString',IdString)
    const pQuery = await prisma.user.findUnique({
        where: {
            id: IdString,
            },

    })
}
    catch(err){
        console.log(err)
    }
}