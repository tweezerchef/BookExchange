import prisma from "../prismaClient";
import { getSignedURL } from "../getSignedURL";


export async function getConversationWithSignedUrls(conversationId: string) {

const conversation = await prisma.conversations.findUnique({
    where: {
        id: conversationId
    },
    select: {
        messages: {
            orderBy: {
                createdAt: "asc"
            },
            include:{
                sender: {
                    select: {
                        userName: true,
                        picture: true,
                    },
                },
            }
        }
    }
})
return conversation;
}