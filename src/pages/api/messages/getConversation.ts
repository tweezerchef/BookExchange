import { NextApiRequest, NextApiResponse } from "next";
import { verifyCookie } from "../../../utils/verifyCookie";
import prisma from "../../../utils/prismaClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { conversationId } = req.query as { conversationId: string }
    const { method } = req;
    // if(!verifyCookie(req)){
    //     console.error("Unauthorized");
    //     res.status(401).json({ message: "Unauthorized" });
    // }
    if (method !== "GET") {
      console.error("Method not allowed");
      res.status(405).json({ message: "Method not allowed" });
    }
try
{    const conversation = await prisma.conversations.findUnique({
        where: {
            id: conversationId
        },
        include: {
            members: true,
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                include:{
                    sender: true
                }
            }
        }
    })
    res.status(200).json({ conversation });
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get conversation" });
   }
}