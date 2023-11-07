import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { useState, FC, useEffect } from "react";
import { Books } from "@prisma/client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BookCard } from "../book/Book";
import {
  OuterBox,
  BookBox,
  LeftIconButton,
  RightIconButton,
  OuterWrapperBox,
} from "./styles/exploreBooksStyle";

interface SuggestedBooksProps {
  booksPerPage: number;
}

export const SuggestedBooks: FC<SuggestedBooksProps> = ({ booksPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [selectedBook, setSelectedBook] = useState<Books | null>(null);
  const [books, setBooks] = useState<Books[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:3000/api/user/openAI");
      const data: Books[] = (await response.json()) as Books[];
      setBooks(data);
    };
    void fetchBooks();
  }, []);

  return (
    <OuterWrapperBox isMobile={isMobile}>
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
            width: "100%",
            height: "30vh",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
          }}
        >
          {books.map((book: Books) => (
            <Box key={book.id || book.title}>
              <BookCard book={book} />
            </Box>
          ))}
        </Box>
      ) : (
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
                    .map((bookItem: Books) => (
                      <Box key={bookItem.id || bookItem.title}>
                        <BookCard
                          book={bookItem}
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
    </OuterWrapperBox>
  );
};
