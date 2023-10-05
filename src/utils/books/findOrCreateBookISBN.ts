import prisma from '../prismaClient';

export const findOrCreateBookISBN = async ({ book }) => {
    const {
        title, ISBN10, author, image, description, subTitle, pubDate, pageCount, genre, buyLink, viewAbility, rating, content, mainGenre,
      } = book;
    let newBook
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
                owned: true,
                booksId: true,
                userId: true,
                rating: true,
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
                        owned: true,
                        booksId: true,
                        userId: true,
                        rating: true,
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
        },
        );
    if (!newBook) {
      newBook =  prisma.books.create({
            data: {
                title,
                subTitle,
                pubDate,
                pageCount,
                author,
                selfLink: book.selfLink,
                description,
                content,
                image,
                mainGenre,
                buyLink,
                viewAbility,
                rating,
                ISBN10,
            },
        });
    }
    return newBook;
};