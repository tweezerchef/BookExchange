import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }

    const { clubId } = req.query as { clubId: string };

    if (!clubId) {
      return res.status(400).json({ message: "clubId is required" });
    }

    const club = await prisma.clubs.findUnique({
      where: {
        id: clubId,
      },
      include: {
        Discussions: true,
        Clubs_Books: {
          where: {
            currentBook: true,
          },
        },
      },
    });

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json(club);
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export default handler;
