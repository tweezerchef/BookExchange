import { NextApiResponse, NextApiRequest } from "next";
import { verifyCookie } from "../../../utils/verifyCookie";
import prisma from "../../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query as { userId: string };

  try {
    const namesPromise = prisma.user.findMany({
      select: {
        id: true,
        userName: true,
      },
    });
    const userWithConversationsPromise = prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        Conversations: {
          include: {
            messages: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
            members: true,
          },
        },
      },
    });
    const [names, userWithConversations] = await Promise.all([
      namesPromise,
      userWithConversationsPromise,
    ]);
    res.status(200).json({ names, userWithConversations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user names" });
  }
}
