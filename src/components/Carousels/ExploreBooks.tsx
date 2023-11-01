import { useState, useEffect, memo } from "react";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { Books } from "@prisma/client";
import { BookCard } from "../book/Book";
import { StyledDivider } from "../chips/chipStyle";
import { ExploreChip } from "../chips/ExploreChip";
import {
  OuterBox,
  BookBox,
  LeftIconButton,
  RightIconButton,
} from "./styles/exploreBooksStyle";

type ExploreBooksProps = {
  books: Books[];
  setBooks: (books: Books[]) => void;
};

const ExploreBooksComponent: React.FC<ExploreBooksProps> = ({
  setBooks,
  books,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [selectedBook, setSelectedBook] = useState<Books | null>(null);
  const booksPerPage = 4;

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleBookClick = (book: Books) => {
    setSelectedBook(book);
  };

  return (
    <Box minHeight='230px'>
      <StyledDivider textAlign='right'>
        <ExploreChip
          setBooks={setBooks}
          booksPerPage={booksPerPage}
          currentPage={currentPage}
        />
      </StyledDivider>
      {books && books.length >= 1 && (
        <OuterBox>
          <LeftIconButton onClick={handlePrevPage} disabled={currentPage === 0}>
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
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    .map((book: Books) => (
                      <Box key={book.id || book.title}>
                        <BookCard
                          book={book}

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
          >
            <NavigateNextIcon />
          </RightIconButton>
        </OuterBox>
      )}
    </Box>
  );
};

export const ExploreBooks = memo(ExploreBooksComponent);
