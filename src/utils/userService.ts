import prisma from "./prismaClient";

export const findUserByEmailDetailed = async (email) => {
    return await prisma.user.findUnique({
        here: {
            email,
          },
          select: {
            // include all columns from the books table
            id: true,
            firstName: true,
            username: true,
            email: true,
            googleId: true,
            lastName: true,
            picture: true,
            password: true,
            latitude: true,
            longitude: true,
            radius: true,
            NotificationsCount: true,
            clubMembers: true,
            Activity: true,
            Discussions: true,
            DiscussionsUsers: true,
            friendships: {
              select: {
                id: true,
                userId: true,
                friendId: true,
                confirmed: true,
                friend: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    email: true,
                    googleId: true,
                    picture: true,
                    token: true,
                    latitude: true,
                    longitude: true,
                    radius: true,
                    NotificationsCount: true,
                    clubMembers: true,
                    Activity: true,
                    Discussions: true,
                    UserBooks: true,
                    User_Places: true,
                    Posts: true,
                  },
                },
              },
            },
            Posts: true,
            PostsUsers: true,
            Conversations: {
              select: {
                id: true,
                members: true,
                messages: true,
              },
            },
            User_Places: true,
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
              },

            },
          },
        });
}
