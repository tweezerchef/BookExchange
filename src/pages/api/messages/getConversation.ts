import { NextApiRequest, NextApiResponse } from "next";
import { verifyCookie } from "../../../utils/verifyCookie";
import { getConversationWithSignedUrls } from "../../../utils/AWS/getConversationWithSignedUrls";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    console.log("convos getconvo", req.query);
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
{    const conversation = await getConversationWithSignedUrls(conversationId);
    console.log("convos getconvo", conversation);
    res.status(200).json(conversation);
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get conversation" });
   }
}