import prisma from "../prismaClient.ts";

const updatedUserBooks = await prisma.userBooks.updateMany({
  where: {
    userId: "631fedc2-29f0-4784-aeed-708a0288d5f7",
  },
  data: {
    userId: "b8c72b01-071a-48cf-bbb1-3dabbe9c6f0f",
  },
});

updatedUserBooks();
