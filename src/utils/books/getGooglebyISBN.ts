/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
import { transGoogToBKModel } from "./transGoogToBkModel";
import { findOrCreateBookISBN } from "./findOrCreateBookISBN";
import prisma from "../prismaClient";

export const getGoogleByISBNAndSave = async (ISBN: string) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch data for ISBN ${ISBN}: HTTP ${response.status} - ${response.statusText}`);
      return null;
    }
    const data = await response.json();

    // Check if the API returned any books
    if (!data.items || data.items.length === 0) {
      console.error(`No results found for ISBN: ${ISBN}`);
      return;
    }

    const book = await transGoogToBKModel(data);
    console.log(`Book data fetched successfully: ${JSON.stringify(book)}`);

    // Check if the book object is defined and has the required properties
    if (book.description === "no description available") {
      console.error(`Invalid book data returned for ISBN: ${ISBN}`);

    }

    const savedBook = await findOrCreateBookISBN(book);
    await prisma.bookdata.update({
      where: { ISBN10: ISBN },
      data: { processed: true },
    });
    console.log(`Book saved successfully: ${JSON.stringify(savedBook)}`);
    return savedBook;
  } catch (error) {
    console.error(`Error fetching data for ISBN ${ISBN}:`, error);
    return null;
  }
};




    export const getGoogleByISBN = async (ISBN: string) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    if (require.main === module) {
        const ISBN = process.argv[2];

        if (!ISBN) {
          console.error("Please provide an ISBN as an argument.");
          process.exit(1);
        }

        getGoogleByISBN(ISBN).then(data => {
          console.log(data);
        }).catch(error => {
          console.error("Error fetching data:", error);
        });
        }