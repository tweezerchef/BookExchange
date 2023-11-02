import { Books , PrismaClient } from "@prisma/client";
import prisma from "../prismaClient";


export const findOrCreateBookISBN = async (book: Books ) => {
  const {
    title,
    ISBN10,
    author,
    image,
    description,
    subTitle,
    pubDate,
    pageCount,
    buyLink,
    viewAbility,
    rating,
    content,
    mainGenre,
  } = book;

  try {
    let newBook = await prisma.books.findUnique({
      where: { ISBN10 },
    });

    if (!newBook) {
      newBook = await prisma.books.create({
        data: {
          title,
          ISBN10,
          author,
          image,
          description,
          subTitle,
          pubDate,
          pageCount,
          buyLink,
          viewAbility,
          rating,
          content,
          mainGenre,
        },
      });
    }
    return newBook;
  } catch (error) {
    console.error("Error in findOrCreateBookISBN:", error);
    return null;
  }
};
