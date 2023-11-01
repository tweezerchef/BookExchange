
import { NextApiResponse, NextApiRequest } from "next";
import { verifyCookie } from "../../../../utils/verifyCookie";
import prisma from "../../../../utils/prismaClient";

interface Body {
    userId: string;
    friendId: string;
    action: boolean;
}

export default function handler(
    req: NextApiRequest & { method: string; body: Body },
    res: NextApiResponse
) {
    if (!verifyCookie(req)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }
    const { body } = req as { body: Body };
    const { userId, friendId, action } = body;
    prisma.friends.upsert({
        where: {
            userId_friendId: {
                userId,
                friendId,
            },
        },
        create: {
            userId,
            friendId,
            isFriend: action,
        },
        update: {
            isFriend: action,
        },
    })
        .then(() => {
            res.status(200).json({ message: "Friend request sent" });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Failed to send friend request" });
        });

    // rest of the code
}
