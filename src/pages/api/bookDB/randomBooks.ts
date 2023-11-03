import { NextApiRequest, NextApiResponse } from "next";
import { findRandomBooks } from "../../../utils/books/findRandomBooks";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      try {
        const books = await findRandomBooks(30);
        res.status(200).json(books);
      } catch (error) {
        console.error('There was a problem:', error);
        res.status(500).json({ message: 'Error retrieving user data' });
      }
    }