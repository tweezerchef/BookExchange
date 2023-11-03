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
}
export default function ExploreBooksBox({
  books,
  setBooks,
}: ExploreBooksBoxProps) {
  const containerRef = useRef(null);
  const breakpoints: Breakpoint = [
    { width: 1000, itemsPerPage: 4 },
    { width: 600, itemsPerPage: 3 },
    { width: 300, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 1 },
    // Add as many breakpoints as you need
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { itemsPerPage: booksPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  return (
    <Box ref={containerRef}>
      <ExploreBooks
        books={books}
        setBooks={setBooks}
        booksPerPage={booksPerPage}
      />
    </Box>
  );
}
