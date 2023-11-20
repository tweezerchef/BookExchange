import { NextApiResponse, NextApiRequest } from "next";
import { Conversations } from "@prisma/client";
import { verifyCookie } from "../../../utils/verifyCookie";
import prisma from "../../../utils/prismaClient";

interface Body {
  userId: string;
  conversationId?: string;
  memberIds: string[];
  message: string;
  title?: string;
}

export default async function handler(
  req: NextApiRequest & { method: string; body: Body },
  res: NextApiResponse
) {
  const { body } = req as { body: Body };
  const { userId, conversationId,memberIds, message, title } = body;
  const { method } = req;
  // if(!verifyCookie(req)){
  //     console.error("Unauthorized");
  //     res.status(401).json({ message: "Unauthorized" });
  // }
  if (method !== "POST") {
    console.error("Method not allowed");
    res.status(405).json({ message: "Method not allowed" });
  }
  try {
    let conversation: Conversations;

    if (conversationId) {
      // Update existing conversation
      conversation = await prisma.conversations.update({
        where: { id: conversationId },
        data: {
          updatedAt: new Date(),
          members: {
            connect: memberIds.map(id => ({ id })),
          },
        },
      });
    } else {
      // Create new conversation
      conversation = await prisma.conversations.create({
        data: {
          title: title || "Conversation",
          members: {
            connect: [{ id: userId }, ...memberIds.map(id => ({ id }))]
          },
        },
      });
    }

    // Create a new message
    const newMessage = await prisma.directMessages.create({
      data: {
        text: message,
        senderId: userId,
        conversationId: conversation.id,
      },
    });

    return res.status(200).json({ message: "Message sent successfully", conversation, newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
