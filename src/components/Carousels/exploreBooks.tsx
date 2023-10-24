import { useState, useEffect, memo } from "react";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { StyledDivider } from "../chips/chipStyle";
import { ExploreChip } from "../chips/ExploreChip";
import { Book } from "../book/Book";
import {
  OuterBox,
  BookBox,
  LeftIconButton,
  RightIconButton,
} from "./styles/exploreBooksStyle";

const ExploreBooksComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const getRandomBooks = () => {
    fetch("/api/bookDB/randomBooks")
      .then((res) => res.json())
      .then((data: Book[]) => {
        setBooks(data);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching random books:", error);
      });
  };
  const booksPerPage = 4;

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  useEffect(() => {
    getRandomBooks();
  }, []);

  return (
    <Box minHeight='230px'>
      <StyledDivider textAlign='right'>
        <ExploreChip setBooks={setBooks} />
      </StyledDivider>
      {loading && (
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
                    .map((book: Book) => (
                      <Box key={book.id || book.title}>
                        <Book
                          book={book}
                          onClick={() => handleBookClick(book)}
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
          {/* <BigBook
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      /> */}
        </OuterBox>
      )}
    </Box>
  );
};

export const ExploreBooks = memo(ExploreBooksComponent);
