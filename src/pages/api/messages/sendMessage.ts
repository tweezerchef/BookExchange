import { NextApiResponse, NextApiRequest } from "next";
import { Conversations } from "@prisma/client";
import { verifyCookie } from "../../../utils/verifyCookie";
import prisma from "../../../utils/prismaClient";

type MemberIds = {
  name: string;
  id: string;
};
interface Body {
  userId: string;
  conversationId?: string;
  memberIds: MemberIds[];
  message: string;
  title?: string;
}


export default async function handler(
  req: NextApiRequest & { method: string; body: Body },
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.error("Method not allowed");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, conversationId, memberIds, message, title } = req.body as Body;

  try {
    let conversation: Conversations;

    if (conversationId && Array.isArray(memberIds) && memberIds.length > 0) {
      // Update existing conversation
      conversation = await prisma.conversations.update({
        where: { id: conversationId },
        data: {
          updatedAt: new Date(),
          members: {
            connect: memberIds.map(member => ({ id: member.id }))
          }
        }
      });
    } else {
      // Create new conversation
      conversation = await prisma.conversations.create({
        data: {
          title: title || "Conversation",
          members: {
            connect: [
              { id: userId },
              ...memberIds.map(member => ({ id: member.id }))
            ]
          }
        }
      });
    }

    // Create a new message
    const newMessage = await prisma.directMessages.create({
      data: {
        message,
        senderId: userId,
        conversationId: conversation.id
      }
    });

    return res.status(200).json({ message: "Message sent successfully", conversation, newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
