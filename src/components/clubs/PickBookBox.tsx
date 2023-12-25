/* eslint-disable react/require-default-props */
import { Books } from "@prisma/client";
import { FC, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { PickBookCarousel } from "./PickBookCarousel";
import { useContainerQuery } from "../Carousels/hooks/useContainerQuery";
import { ExploreBooksBoxWrapper } from "../Carousels/styles/exploreBooksStyle";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

interface PickBookBoxProps {
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  setClubBook: React.Dispatch<React.SetStateAction<Books>>;
}

export const PickBookBox: FC<PickBookBoxProps> = ({
  books,
  setBooks,
  setClubBook,
}) => {
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
      <PickBookCarousel
        books={books}
        setBooks={setBooks}
        setClubBook={setClubBook}
        booksPerPage={booksPerPage}
        isMobile={isMobile}
      />
    </ExploreBooksBoxWrapper>
  );
};
