import { Books } from "@prisma/client";
import prisma from "../prismaClient";
// eslint-disable-next-line import/no-cycle
import { getGoogleByISBN } from "./getGooglebyISBN";

export const findOrCreateBookISBN = async (book: Partial<Books> ) => {
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

  if (!ISBN10) {
    console.error("ISBN10 is required");
    return null;
  }


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

export const findOrCreateBookISBNOnly = async (ISBN10: string) => {


  if (!ISBN10) {
    console.error("ISBN10 is required");
    return null;
  }


  try {
    let newBook = await prisma.books.findUnique({
      where: { ISBN10 },
    });
    const ISBN = ISBN10

    if (!newBook) {
      const  googleBook: Books = await getGoogleByISBN(ISBN) as Books

      const {
        title,
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
        mainGenre,} = googleBook

      newBook = await prisma.books.create({
        data: {
          title,
          ISBN10: ISBN,
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

