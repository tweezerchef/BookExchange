import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { Book } from "../book/book";

const ExploreBooks: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showBigBook, setShowBigBook] = useState(false);
  const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });
  const [selectedBook, setSelectedBook] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/bookdata/id?id=${id}`);
      setBooks((prevBooks) => [...[res.data], ...prevBooks]);
      setCurrentPage(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOnBlur = async () => {
    setLoading(true);
    try {
      if (searchText === "") {
        const res = await fetch(`/google-books/?title=${inputValue}`);
        setBooks((prevBooks) => [...res.data, ...prevBooks]);
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

  useEffect(() => {
    getRandomBooks();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        // height: isMobile ? "80vw" : "20vw",
        // maxHeight: isMobile ? "80vw" : "370px",
        // marginTop: isMobile ? ".2vh" : "1.5vh",
        paddingBottom: "0",
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        sx={{
          marginRight: 10,
          padding: 0,
          alignSelf: "center",
          justifySelf: "start",
        }}
        disabled={currentPage === 0}
      >
        <NavigateBeforeIcon />
      </IconButton>

      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        {books.map((book, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
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
                        // onClick={handleBookClick}
                        // onClose={handleBigBookClose}
                        // showBigBook={showBigBook && book === selectedBook}
                        // bigBookPosition={bigBookPosition}
                        // nearMeBooks={nearMeBooks}
                      />
                    </Box>
                  ))}
              </Stack>
            </Slide>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handleNextPage}
        sx={{
          marginLeft: 10,
          marginRight: 1,
          padding: 0,
          alignSelf: "center",
          justifySelf: "end",
        }}
        disabled={
          currentPage >= Math.ceil((books.length || 0) / booksPerPage) - 1
        }
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

export default ExploreBooks;
