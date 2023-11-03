import { Books, Book, UserBooks, User } from '@prisma/client';

// interface Book {
//   books: {
//     id: string;
//     title: string;
//     author: string;
//     image: string;
//   };
//   description: string;
//   author: string;
//   UserBooks: UserBook[];
//   id: string;
//   wishlist: boolean;
//   owned: boolean;
//   image: string;
//   title: string;
//   ISBN10: string;
// }
namespace React {
  interface ChildrenProps {
    children: React.ReactNode;
  }
}
interface ErrorMessage {
  message: string;
}

interface UrlResponse {
  url: string;
}

interface UrlsResponse {
  urls: string[];
}

type ApiResponse = ErrorMessage | UrlResponse | UrlsResponse | Books[] | Books | Book[] | UserBooks | UserBooks[] | User | User[] | null;
