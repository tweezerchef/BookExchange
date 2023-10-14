import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { BigBook } from "../book/bigBook";
import { Book } from "../book/book";
import {
  OuterBox,
  BookBox,
  StyledIconButton,
} from "./styles/exploreBooksStyle";

const ExploreBooks: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showBigBook, setShowBigBook] = useState(false);
  const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/bookdata/id?id=${id}`);
      if (res.ok) {
        setBooks((prevBooks) => [...[res], ...prevBooks]);
        setCurrentPage(0);
      } else {
        throw new Error("Failed to fetch book data");
      }
    } catch (err) {
      console.error(err);
      // Show error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOnBlur = async () => {
    setLoading(true);
    try {
      if (searchText === "") {
        const res = await fetch(`/google-books/?title=${inputValue}`);
        setBooks((prevBooks) => [...res.json(), ...prevBooks]);
        setCurrentPage(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const getRandomBooks = () => {
    fetch("/api/bookDB/randomBooks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
      <StyledIconButton onClick={handlePrevPage} disabled={currentPage === 0}>
        <NavigateBeforeIcon />
      </StyledIconButton>
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
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
                direction="row"
                maxWidth="100%"
                maxHeight="100%"
                alignContent="center"
                justifyContent="center"
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
                        // onClose={handleBigBookClose}
                        // showBigBook={showBigBook && book === selectedBook}
                        // bigBookPosition={bigBookPosition}
                        // nearMeBooks={nearMeBooks}
                      />
                    </Box>
                  ))}
              </Stack>
            </Slide>
          </BookBox>
        ))}
      </Box>

      <StyledIconButton
        onClick={handleNextPage}
        disabled={
          currentPage >= Math.ceil((books.length || 0) / booksPerPage) - 1
        }
      >
        <NavigateNextIcon />
      </StyledIconButton>
      <BigBook
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </OuterBox>
  );
};

export default ExploreBooks;
