import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { BigBook } from "../book/BigBook";
import { BookCard } from "../book/Book";
import {
  OuterBox,
  BookBox,
  LeftIconButton,
  RightIconButton,
} from "./styles/exploreBooksStyle";

import { useUserDispatch, useUserState } from "../../context/context";

interface Book {
  id?: string;
  title?: string;
  subTitle?: string;
  pubDate?: string;
  pageCount?: number;
  author?: string;
  selfLink?: string;
  description?: string;
  content?: string;
  image?: string;
  mainGenre?: string;
  buyLink?: string;
  viewAbility?: string;
  rating?: number;
  ISBN10?: string;
  books?: Book[];
}

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
                .map((bookItem: Book) => (
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
  );
};

export default WishList;
