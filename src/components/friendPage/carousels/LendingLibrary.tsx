import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Books } from "@prisma/client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BookCard } from "../../book/BookCard";
import {
  BookBox,
  LeftIconButton,
  RightIconButton,
  OuterWrapperBox,
  MobileBox,
} from "../../Carousels/styles/exploreBooksStyle";

import { useHomeDispatch, useHomeState } from "../../../context/context";

interface LendingLibraryProps {
  booksPerPage: number;
  lendingLibraryBooks: Books[];
}

export const LendingLibrary: React.FC<LendingLibraryProps> = ({
  booksPerPage,
  lendingLibraryBooks,
}) => {
  const state = useHomeState();
  const dispatch = useHomeDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [selectedBook, setSelectedBook] = useState<Books | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { user } = state;

  const books = lendingLibraryBooks;

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <OuterWrapperBox isMobile={isMobile}>
      {books &&
        books.length >= 1 &&
        (isMobile ? (
          <MobileBox booksPerPage={booksPerPage}>
            {books.map((book) => (
              <Box key={book.id || book.title} sx={{ width: "100%" }}>
                <BookCard book={book} user={user} />
              </Box>
            ))}
          </MobileBox>
        ) : (
          <>
            <LeftIconButton
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              booksPerPage={booksPerPage}
            >
              <NavigateBeforeIcon />
            </LeftIconButton>
            {books.map((book, index) => (
              <BookBox
                key={book.id || book.title}
                sx={{
                  display: currentPage === index ? "block" : "none",
                }}
              >
                <Slide direction={slideDirection} in={currentPage === index}>
                  <Stack
                    spacing={2}
                    padding='0 0 0 0'
                    direction='row'
                    maxWidth='100%'
                    maxHeight='100%'
                    alignContent='center'
                    justifyContent='center'
                  >
                    {books
                      .slice(
                        index * booksPerPage,
                        index * booksPerPage + booksPerPage
                      )
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      .map((book: Books) => (
                        <Box key={book.id || book.title}>
                          <BookCard
                            book={book}
                            {...(user && { user })}
                            // nearMeBooks={nearMeBooks}
                          />
                        </Box>
                      ))}
                  </Stack>
                </Slide>
              </BookBox>
            ))}
            <RightIconButton
              onClick={handleNextPage}
              disabled={
                currentPage >= Math.ceil((books.length || 0) / booksPerPage) - 1
              }
              booksPerPage={booksPerPage}
            >
              <NavigateNextIcon />
            </RightIconButton>
          </>
        ))}
    </OuterWrapperBox>
  );
};
