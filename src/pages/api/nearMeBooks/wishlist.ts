import { NextApiRequest, NextApiResponse } from "next";
import { verifyCookie } from "../../../utils/verifyCookie";
import prisma from "../../../utils/prismaClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const { method } = req;
    if (method !== "GET") {
        console.error("Method not allowed");
        res.status(405).json({ message: "Method not allowed" });
    }
    try{
    const {userId} = req.query as {userId: string}
    const userInfo = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          UserBooks: {
            where: {
              wishlist: true,
            },
            select: {
              Books: {
                select: {
                  id: true,
                },
              },
            },
          },
          latitude: true,
          longitude: true,
        },
      });
      const wishListIds= userInfo.UserBooks.map((book) => book.Books.id);

 res.status(200).json(wishListIds)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get user" });
    }
}

