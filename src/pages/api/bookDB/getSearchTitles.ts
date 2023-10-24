import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const books = await prisma.books.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("There was a problem:", error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
}
