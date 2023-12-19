import { NextApiRequest, NextApiResponse } from "next";
import { verifyCookie } from "../../../utils/verifyCookie";
import prisma from "../../../utils/prismaClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        console.log('req')
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
      const {latitude, longitude} = userInfo;
      const booksInLendingLibrary = await prisma.user.findMany({
        where: {
            AND: [
                {
                    id: { not: userId }, // Exclude the user with the given userId
                },
                {
                    latitude: {
                        gte: latitude - 30 / 69.0,
                        lte: latitude + 30 / 69.0,
                    },
                },
                {
                    longitude: {
                        gte: longitude - 30 / (69.0 * Math.cos(latitude * Math.PI / 180.0)),
                        lte: longitude + 30 / (69.0 * Math.cos(latitude * Math.PI / 180.0)),
                    },
                },
                {
                    UserBooks: {
                        some: {
                            lendingLibrary: true,
                        },
                    },
                },
            ],
        },
        select: {
            UserBooks: {
                select: {
                    Books: true,
                },
                where: {
                    lendingLibrary: true,
                },
            },
        },
    });

 res.status(200).json(booksInLendingLibrary)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get books near user" });
    }
}

