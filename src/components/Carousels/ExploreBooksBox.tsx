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
