

export const ALL_BOOK_USERBOOK_RELATIONS = {
        id: true,
        wishlist: true,
        lendingLibrary: true,
        booksId: true,
        userId: true,
        starRating: true,
        review: true,
        LendingTable: true,
        Books: {
            include: {
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
    }


