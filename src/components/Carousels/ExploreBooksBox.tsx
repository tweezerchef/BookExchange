import { Books } from "@prisma/client";
import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
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
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define
ExploreBooksBox.defaultProps = {
  user: null,
};

export default function ExploreBooksBox({
  books,
  setBooks,
  user,
}: ExploreBooksBoxProps) {
  const containerRef = useRef(null);
  const breakpoints: Breakpoint = [
    { width: 900, itemsPerPage: 4 },
    { width: 800, itemsPerPage: 3 },
    { width: 400, itemsPerPage: 2 },
    { width: 300, itemsPerPage: 1 },
    { width: 0, itemsPerPage: 1 },
    // Add as many breakpoints as you need
  ];
  const theme = useTheme();

  const { itemsPerPage: booksPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  return (
    <Box ref={containerRef}>
      <ExploreBooks
        {...(user && { user })}
        books={books}
        setBooks={setBooks}
        booksPerPage={booksPerPage}
      />
    </Box>
  );
}
