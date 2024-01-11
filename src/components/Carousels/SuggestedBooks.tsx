/* eslint-disable no-nested-ternary */
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { useState, FC, useEffect } from "react";
import { Books } from "@prisma/client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BookCard } from "../book/BookCard";
import {
  OuterBox,
  BookBox,
  LeftIconButton,
  RightIconButton,
  OuterWrapperBox,
  GridContainer,
  MobileBox,
} from "./styles/exploreBooksStyle";
import { MobileBookCard } from "../book/MobileBookCard";
interface SuggestedBooksProps {
  booksPerPage: number;
  books: Books[];
  isMobile: boolean;
  user?: {
    id: string;
    email: string;
    userName: string;
  };
  isRegistration?: boolean;
  onRatingChange?: () => void;
}

export const SuggestedBooks: FC<SuggestedBooksProps> = ({
  booksPerPage,
  books,
  isMobile,
  user = null,
  isRegistration,
  onRatingChange,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <OuterWrapperBox>
      {books && books.length !== 0 ? (
        isMobile ? (
          <GridContainer>
            <MobileBox>
              {books.map((book) => (
                <Box key={book.id || book.title} sx={{ width: "100%" }}>
                  <MobileBookCard
                    book={book}
                    user={user}
                    isRegistration={isRegistration}
                    onRatingChange={onRatingChange}
                  />
                </Box>
              ))}
            </MobileBox>
          </GridContainer>
        ) : (
          <OuterBox>
            <LeftIconButton
              booksPerPage={booksPerPage}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
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
                      .map((bookItem: Books) => (
                        <Box key={bookItem.id || bookItem.title}>
                          <BookCard
                            book={bookItem}
                            onRatingChange={onRatingChange}
                          />
                        </Box>
                      ))}
                  </Stack>
                </Slide>
              </BookBox>
            ))}
            <RightIconButton
              booksPerPage={booksPerPage}
              onClick={handleNextPage}
              disabled={
                currentPage >= Math.ceil((books.length || 0) / booksPerPage) - 1
              }
            >
              <NavigateNextIcon />
            </RightIconButton>
          </OuterBox>
        )
      ) : (
        <Box />
      )}
    </OuterWrapperBox>
  );
};
