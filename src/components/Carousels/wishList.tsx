import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { BigBook } from "../book/BigBook";
import { Book } from "../book/Book";
import {
  OuterBox,
  BookBox,
  LeftIconButton,
  RightIconButton,
} from "./styles/exploreBooksStyle";

import { useUserDispatch, useUserState } from "../../context/context";
import { useState } from "react";

const WishList: React.FC = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const { wishList } = state;
  const books = wishList;
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
  return (
    <OuterBox>
      <LeftIconButton onClick={handlePrevPage} disabled={currentPage === 0}>
        <NavigateBeforeIcon />
      </LeftIconButton>
      {books.map((book, index) => (
        <BookBox
          key={index}
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
      <BigBook
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </OuterBox>
  );
};

export default WishList;
