import prisma from '../prismaClient';
import { getGoogleByISBN } from '../books/getGooglebyISBN';
import { getISBN, getLargestImage } from '../books/googleFuncs';
import { findOrCreateBookISBN } from '../books/findOrCreateBookISBN';

// this is a function for developer purposes only, it takes an existing
// Amazon dataSet we found and calls the Google API to get the rest of the data and transfer into the Book model
// it is not meant to be run in production and if so only once
// if too many books are added at once the google API will block the request

export default async function bDataTGglTBkDB() {
    const ISBNs = await prisma.bookdata.findMany({
        select: {
            ISBN10: true,
        },
    });
    const ISBNsArray = ISBNs.map((ISBN) => ISBN.ISBN10);
    ISBNsArray.forEach(async (ISBN) => {
        const data = await getGoogleByISBN(ISBN);
        const  book = data.items[0];
        console.log(book);
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
          findOrCreateBookISBN({ book: transformedData });



})
}
bDataTGglTBkDB()