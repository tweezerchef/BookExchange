import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";




export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const { method, query } = req;
    const {userId} = query as {userId: string}
    if (method !== "PUT") {
        console.error("Method not allowed");
        res.status(405).json({ message: "Method not allowed" });
    }
    try{
        prisma.user.delete({
            where: {
                id: userId,
            }

        }).then((user) => {
            console.log(user)
     })
        res.status(200).json({ message: "User deleted" });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to delete book" });
    }
}