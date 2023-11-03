import { Books } from "@prisma/client";
import { useRef } from "react";
import Box from "@mui/material/Box";
import { ExploreBooks } from "./ExploreBooks";
import { useContainerQuery } from "./hooks/useContainerQuery";

interface ExploreBooksBoxProps {
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
}
export default function ExploreBooksBox({
  books,
  setBooks,
}: ExploreBooksBoxProps) {
  const containerRef = useRef(null);
  const breakpoints = [
    { width: 1000, booksPerPage: 4 },
    { width: 600, booksPerPage: 3 },
    { width: 400, booksPerPage: 2 },
    { width: 0, booksPerPage: 1 },
    // Add as many breakpoints as you need
  ];

  const booksPerPage: number = useContainerQuery(containerRef, breakpoints);

  return (
    <Box ref={containerRef} width='100%'>
      <ExploreBooks
        books={books}
        setBooks={setBooks}
        booksPerPage={booksPerPage}
      />
    </Box>
  );
}
