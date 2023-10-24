import { transGoogToBKModel } from "./transGoogToBkModel";

export const getGoogleBookByTitle = async (title: string) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=title:${title}`;
    const response = await fetch(url);
    const data = await response.json();
    const book = transGoogToBKModel(data);
     return book;
  }
