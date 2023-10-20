import { Books } from "@prisma/client";
import prisma from "../prismaClient";

// eslint-disable-next-line consistent-return
export const findOrCreateBookISBN = async ({ book }: {book: Books}) => {
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
  let newBook: Books = null;
  try {
    newBook = await prisma.books.findUnique({
      where: { ISBN10 },
      select: {
        // include all columns from the books table
        id: true,
        title: true,
        subTitle: true,
        pubDate: true,
        pageCount: true,
        author: true,
        selfLink: true,
        description: true,
        content: true,
        image: true,
        mainGenre: true,
        buyLink: true,
        viewAbility: true,
        rating: true,
        ISBN10: true,
        Activity: true,
        Clubs_Books: true,
        Discussions: true,
        Genre: true,
        Posts: true,
        BookAccess: true,
        UserBooks: {
          select: {
            id: true,
            wishlist: true,
            lendingLibrary: true,
            booksId: true,
            userId: true,
            starRating: true,
            review: true,
            LendingTable: true,
            Books: {
              select: {
                id: true,
                title: true,
                author: true,
                ISBN10: true,
                description: true,
                image: true,
                UserBooks: {
                  select: {
                    id: true,
                    wishlist: true,
                    lendingLibrary: true,
                    booksId: true,
                    userId: true,
                    starRating: true,
                    review: true,
                    LendingTable: true,
                    User: true,
                  },
                },
                Discussions: true,
                Activity: true,
              },
            },
            User: true,
          },
        },
      },
    });
    if (!newBook) {
      newBook = await prisma.books.create({
        data: {
          title,
          image,
          subTitle,
          pubDate,
          pageCount,
          description,
          content,
          mainGenre,
          author,
          buyLink,
          viewAbility,
          rating,
          ISBN10,
        },
      });
    }
    return newBook;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
