
import { NextApiResponse, NextApiRequest } from "next";
import { verifyCookie } from "../../../utils/verifyCookie";
import prisma from "../../../utils/prismaClient";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Note: once done testing verifyCookie

    try{
   const names = await prisma.user.findMany({
        select: {
            userName: true,
        },
    })
    const namesArray = names.map((name) => name.userName);
    res.status(200).json( namesArray );
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user names" });
}
}
