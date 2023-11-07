import { getISBN, getLargestImage, fetchDescriptionFromOpenLibrary } from './googleFuncs';


interface VolumeInfo {
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  title: string;
  authors?: string[];
  imageLinks?: { [key: string]: string };
  description?: string;
  averageRating?: number;
  industryIdentifiers?: { type: string, identifier: string }[];
}

interface Book {
  selfLink: string;
  volumeInfo: VolumeInfo;
  image: string;
}

interface GoogleBook {
  items: Book[];
}

export const transGoogToBKModel = async (googleBook: GoogleBook) => {
  const book = googleBook.items[0];
  const ISBN10 = getISBN(book.volumeInfo.industryIdentifiers);
  const fallbackImageUrl = ISBN10 ? `https://covers.openlibrary.org/b/isbn/${ISBN10}-M.jpg` : '';

  let description = book.volumeInfo.description || '';
  if (!description && ISBN10) {
    description = await fetchDescriptionFromOpenLibrary(ISBN10);
  }

  const transformedData = {
    selfLink: book.selfLink,
    pubDate: book.volumeInfo.publishedDate || '',
    pageCount: book.volumeInfo.pageCount || null,
    mainGenre: book.volumeInfo.categories ? book.volumeInfo.categories[0] : '',
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : '',
    image: book.volumeInfo.imageLinks ? getLargestImage(book.volumeInfo.imageLinks) : fallbackImageUrl,
    description: book.volumeInfo.description || 'no description available',
    rating: book.volumeInfo.averageRating || null,
    ISBN10,
  };

  return transformedData;
};
