/* eslint-disable react/require-default-props */
import { Books } from "@prisma/client";
import { FC, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ExploreBooks } from "./ExploreBooks";
import { useContainerQuery } from "./hooks/useContainerQuery";
import { ExploreBooksBoxWrapper } from "./styles/exploreBooksStyle";

interface ExploreBooksBoxProps {
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  user?: {
    id: string;
    email: string;
    userName: string;
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

  const breakpoints = [
    { width: 900, itemsPerPage: 4 },
    { width: 650, itemsPerPage: 3 },
    { width: 460, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 2 },
  ];

  const isMobile = useMediaQuery("(max-width:500px)");

  const { itemsPerPage: containerItemsPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  let booksPerPage: number;
  if (isMobile) {
    booksPerPage = 1; // 1 book per page under 500px
  } else {
    booksPerPage = containerItemsPerPage; // Use container query result otherwise
  }

  return (
    <ExploreBooksBoxWrapper>
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
