/* eslint-disable consistent-return */
import { type } from "os";
import prisma from "./prismaClient";

interface Email {
  email: string;
}

export const findUserByEmailDetailed = async (email: Email) => {
  const { email: emailAddress } = email;
  try {
    return await prisma.user.findUnique({
      where: {
        email: emailAddress,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const findUserByIdDetailed = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        // include all columns from the books table
        id: true,
        firstName: true,
        userName: true,
        picture: true,
        password: true,
        latitude: true,
        longitude: true,
        city: true,
        radius: true,
        Activity: true,
        UserGenre: {
          select: {
            genre: true,
          },
        },
        Friendships: {
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
                userName: true,
                email: true,
                googleId: true,
                picture: true,
                password: false,
                latitude: true,
                longitude: true,
                radius: true,
                NotificationsCount: true,
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
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
