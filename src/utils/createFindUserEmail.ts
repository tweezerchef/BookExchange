/* eslint-disable no-useless-catch */
import { User } from '@prisma/client';
import prisma from './prismaClient';



export const createUserByEmailAndPassword = async (
  email: string,
  hashedPassword: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    throw error;
  }
};