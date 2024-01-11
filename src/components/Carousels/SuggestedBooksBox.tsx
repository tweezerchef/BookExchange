import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useEffect, useState, FC } from "react";
import { Books } from "@prisma/client";
import { SuggestedBooks } from "./SuggestedBooks";
import useMediaQuery from "@mui/material/useMediaQuery";

interface SuggestedBooksBoxProps {
  user?: {
    id: string;
    email: string;
    userName: string;
  };
  isRegistration?: boolean;
  onRatingChange?: () => void;
}

export const SuggestedBooksBox: FC<SuggestedBooksBoxProps> = ({
  user,
  isRegistration,
  onRatingChange,
}) => {
  const [books, setBooks] = useState<Books[]>([]);
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

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:3000/api/user/openAI");
      const data: Books[] = (await response.json()) as Books[];
      console.log("data:", data);
      setBooks(data);
    };
    void fetchBooks();
  }, []);

  return (
    <Box width='100%'>
      <Divider textAlign='right'>
        <Chip label='Suggested Books' />
      </Divider>
      <SuggestedBooks
        booksPerPage={booksPerPage}
        books={books}
        isMobile={isMobile}
        user={user}
        isRegistration={isRegistration}
        onRatingChange={onRatingChange}
      />
    </Box>
  );
};
