import { findRandomBooks } from "../../../utils/books/findRandomBooks";

export default async function handler(req, res) {

      try {
        const books = await findRandomBooks(15);
        res.status(200).json(books);
      } catch (error) {
        console.error('There was a problem:', error.message);
        res.status(500).json({ message: 'Error retrieving user data' });
      }
    }