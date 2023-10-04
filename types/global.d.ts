declare interface Book {
    books: {
        id: string;
        title: string;
        author: string;
        image: string;
      }
      author: string;
      UserBooks: UserBook[];
      id: string;
      wishlist: boolean;
      owned: boolean;
      image: string;
      title: string;
}
declare namespace React {
  interface ChildrenProps {
      children: React.ReactNode;
  }
}
