import prisma from "../prismaClient";
import { getSignedURL } from "../getSignedURL";

type UserId = string

export async function getUserConversationsWithSignedUrls(userId: UserId) {
    // Fetch the conversations and messages
    const userWithConversations = await prisma.user.findUnique({
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
                        include: {
                            sender: {
                                select: {
                                    userName: true,
                                    picture: true,
                                },
                            },
                        },
                    },
                    members: true,
                },
            },
        },
    });

    // Check if conversations exist
    if (!userWithConversations?.Conversations) {
        return userWithConversations;
    }

    // Map over conversations to replace picture URLs
    const conversationsWithSignedUrls = await Promise.all(userWithConversations.Conversations.map(async (convo) => {
        const resolvedMessages = await Promise.all(convo.messages.map(async (msg) => ({
                ...msg,
                sender: {
                    ...msg.sender,
                    picture: msg.sender.picture ? await getSignedURL(msg.sender.picture) : null,
                },
            })));

        return {
            ...convo,
            messages: resolvedMessages,
        };
    }));

    return conversationsWithSignedUrls;
}
