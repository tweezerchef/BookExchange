import { useState, useEffect, memo } from "react";
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

const ExploreBooksComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSearch = async (id: string) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`/bookdata/id?id=${id}`);
  //     if (res.ok) {
  //       setBooks((prevBooks) => [...[res], ...prevBooks]);
  //       setCurrentPage(0);
  //     } else {
  //       throw new Error("Failed to fetch book data");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     // Show error message to the user
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSearchOnBlur = async () => {
  //   setLoading(true);
  //   try {
  //     if (searchText === "") {
  //       const res = await fetch(`/google-books/?title=${inputValue}`);
  //       setBooks((prevBooks) => [...res.json(), ...prevBooks]);
  //       setCurrentPage(0);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getRandomBooks = () => {
    fetch("/api/bookDB/randomBooks")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
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

export const ExploreBooks = memo(ExploreBooksComponent);
