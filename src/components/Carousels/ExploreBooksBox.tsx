/* eslint-disable react/require-default-props */
import { Books } from "@prisma/client";
import { FC, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ExploreBooks } from "./ExploreBooks";
import { useContainerQuery } from "./hooks/useContainerQuery";
import { ExploreBooksBoxWrapper } from "./styles/exploreBooksStyle";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

interface ExploreBooksBoxProps {
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  user?: {
    id: string;
    email: string;
    username: string;
  };
  isRegistration?: boolean;
  onRatingChange?: () => void;
}

export const ExploreBooksBox: FC<ExploreBooksBoxProps> = ({
  books,
  setBooks,
  user = null,
  isRegistration,
  onRatingChange,
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
      <ExploreBooks
        {...(user && { user })}
        books={books}
        setBooks={setBooks}
        booksPerPage={booksPerPage}
        isMobile={isMobile}
        isRegistration={isRegistration}
        onRatingChange={onRatingChange}
      />
    </ExploreBooksBoxWrapper>
  );
};
