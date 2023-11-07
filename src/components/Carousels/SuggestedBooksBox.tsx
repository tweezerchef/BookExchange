import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useRef, useEffect, useState } from "react";
import { Books } from "@prisma/client";
import { SuggestedBooks } from "./SuggestedBooks";
import { useContainerQuery } from "./hooks/useContainerQuery";

export function SuggestedBooksBox() {
  const [books, setBooks] = useState<Books[]>([]);
  const containerRef = useRef(null);
  const breakpoints = [
    { width: 1000, itemsPerPage: 4 },
    { width: 600, itemsPerPage: 3 },
    { width: 400, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 1 },
  ];
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:3000/api/user/openAI");
      const data: Books[] = (await response.json()) as Books[];
      console.log("data:", data);
      setBooks(data);
    };
    void fetchBooks();
  }, []);
  const { itemsPerPage: booksPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  return (
    <Box ref={containerRef} width='100%'>
      <Divider textAlign='right'>
        <Chip label='Suggested Books' />
      </Divider>
      <SuggestedBooks booksPerPage={booksPerPage} books={books} />
    </Box>
  );
}
