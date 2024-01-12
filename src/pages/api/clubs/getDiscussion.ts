import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";

interface getDiscussionRequest extends NextApiRequest  {
    query: {
        discussionId: string
    }
}
const handler = async (req: getDiscussionRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res
            .status(405)
            .json({ message: `Method ${req.method} not allowed` });
    }
    const { discussionId } = req.query

    try {
        const discussion = await prisma.discussions.findUnique({
        where: {
            id: discussionId
        },
        include: {
            Posts: true
        }
    })
    if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });

    }
    res.status(200).json(discussion);
}
catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching data" });
}
}

export default handler;