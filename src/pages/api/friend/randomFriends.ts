import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { getRandomFriends } from "../../../utils/getRandomFriends";


type Friend = User
type ErrorResponse = { message: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Friend[] | ErrorResponse>
  ) {
    try {
      const randomFriends = await getRandomFriends();
      res.status(200).json(randomFriends);
    } catch (error) {
        if (error instanceof Error) {
          console.error('There was a problem:', error.message);
        } else {
          console.error('There was an unexpected problem');
        }
        res.status(500).json({ message: 'Error retrieving user data' });
      }
    }