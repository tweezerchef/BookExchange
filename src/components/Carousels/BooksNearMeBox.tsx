/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import { Books, UserBooks } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useHomeState } from "../../context/context";
import { BooksNearMe } from "./BooksNearMe";
import { ExploreBooksBoxWrapper } from "./styles/exploreBooksStyle";

interface UserBooksWithBooks extends UserBooks {
  Books: Books;
}

interface ApiResponseItem {
  UserBooks: UserBooksWithBooks[];
}
export const BooksNearMeBox: FC = () => {
  const state = useHomeState();
  const { user } = state;
  const userId = user?.id || "0";

  const [books, setBooks] = useState<Books[] | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `/api/nearMeBooks/wishlist?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseArray: ApiResponseItem[] =
          (await response.json()) as ApiResponseItem[];
        const booksData: Books[] = responseArray.flatMap((item) =>
          item.UserBooks.map((ub) => ub.Books)
        );
        setBooks(booksData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchBooks();
  }, [userId]);

  const isMobile = useMediaQuery("(max-width:460px)");
  let booksPerPage = 1;

  const isMedium = useMediaQuery("(min-width:650px)");
  const isLarge = useMediaQuery("(min-width:800px)");
  const isExtraLarge = useMediaQuery("(min-width:1100px)");

  if (isExtraLarge) {
    booksPerPage = 4;
  } else if (isLarge) {
    booksPerPage = 3;
  } else if (isMedium) {
    booksPerPage = 2;
  }

  return (
    <ExploreBooksBoxWrapper>
      <Divider textAlign='left'>
        <Chip label='Books Available Near You!' />
      </Divider>
      {books && <BooksNearMe booksPerPage={booksPerPage} books={books} />}
    </ExploreBooksBoxWrapper>
  );
};
