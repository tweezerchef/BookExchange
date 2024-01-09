/* eslint-disable react/require-default-props */
import { Books } from "@prisma/client";
import { FC } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ExploreBooks } from "./ExploreBooks";
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
  const isSmall = useMediaQuery("(max-width:650px)");
  const isMedium = useMediaQuery("(max-width:1000px)");

  let booksPerPage = 4; // Default value for large screens and above
  if (isMedium) {
    booksPerPage = 3;
  } else if (isSmall) {
    booksPerPage = 2;
  }

  const isMobile = useMediaQuery("(max-width:460px)");

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
