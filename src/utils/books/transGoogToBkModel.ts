import { getISBN, getLargestImage } from './googleFuncs';


export const transGoogToBKModel = async (googleBook) => {
 const book = googleBook.items[0];
 const transformedData = {
    selfLink: book.selfLink,
    pubDate: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : '',
    pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : null,
    mainGenre: book.volumeInfo.categories ? book.volumeInfo.categories[0] : '',
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : '',
    image: book.volumeInfo.imageLinks ? getLargestImage(book.volumeInfo.imageLinks) : '',
    description: book.volumeInfo.description ? book.volumeInfo.description : '',
    rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : null,
    ISBN10: getISBN(book.volumeInfo.industryIdentifiers),
  };
  return transformedData;

}