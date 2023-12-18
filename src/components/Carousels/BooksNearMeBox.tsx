/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import { Books } from "@prisma/client";
import { FC, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useHomeState } from "../../context/context";
import { BooksNearMe } from "./BooksNearMe";
import { useContainerQuery } from "./hooks/useContainerQuery";
import { ExploreBooksBoxWrapper } from "./styles/exploreBooksStyle";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

export const BooksNearMeBox: FC = async () => {
  const { user } = useHomeState();
  const userId = user.id;

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
        const booksData = (await response.json()) as Books[];
        setBooks(booksData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchBooks();
  }, [userId]);

  const containerRef = useRef(null);
  const theme = useTheme();

  const breakpoints = [
    { width: 900, itemsPerPage: 4 },
    { width: 650, itemsPerPage: 3 },
    { width: 460, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 2 },
  ];

  const isViewportUnder450 = useMediaQuery("(max-width:450px)");

  const { itemsPerPage: containerItemsPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  let booksPerPage: number;
  if (isViewportUnder450) {
    booksPerPage = 5; // 1 book per page under 500px
  } else {
    booksPerPage = containerItemsPerPage; // Use container query result otherwise
  }
  const isMobile = useMediaQuery(theme.breakpoints.down(450));
  return (
    <ExploreBooksBoxWrapper isMobile={isMobile} ref={containerRef}>
      {books && <BooksNearMe booksPerPage={booksPerPage} books={books} />}
    </ExploreBooksBoxWrapper>
  );
};
