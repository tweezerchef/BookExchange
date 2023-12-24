import { useState, memo } from "react";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { Books } from "@prisma/client";
import { PickBookCard } from "./createClub/components/PickBookCard";
import { StyledDivider } from "../chips/chipStyle";
import { ExploreChip } from "../chips/ExploreChip";
import {
  BookBox,
  LeftIconButton,
  RightIconButton,
  OuterWrapperBox,
  MobileBox,
} from "../Carousels/styles/exploreBooksStyle";

type PickBookCarouselProps = {
  books: Books[];
  setBooks: (books: Books[]) => void;
  booksPerPage: number;
  user?: {
    id: string;
    email: string;
    userName: string;
  };
  isMobile: boolean;
  setClubBook: React.Dispatch<React.SetStateAction<Books>>;
};

export const PickBookCarousel: React.FC<PickBookCarouselProps> = ({
  setBooks,
  books,
  booksPerPage,
  user,
  isMobile,
  setClubBook,
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
  const theme = useTheme();
  return (
    <>
      <StyledDivider textAlign='right'>
        <ExploreChip
          setBooks={setBooks}
          booksPerPage={booksPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </StyledDivider>
      <OuterWrapperBox isMobile={isMobile}>
        {books &&
          books.length >= 1 &&
          (isMobile ? (
            <MobileBox booksPerPage={booksPerPage}>
              {books.map((book) => (
                <Box key={book.id || book.title} sx={{ width: "100%" }}>
                  <PickBookCard book={book} setClubBook={setClubBook} />
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
                            <PickBookCard
                              book={book}
                              setClubBook={setClubBook}
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
                  currentPage >=
                  Math.ceil((books.length || 0) / booksPerPage) - 1
                }
                booksPerPage={booksPerPage}
              >
                <NavigateNextIcon />
              </RightIconButton>
            </>
          ))}
      </OuterWrapperBox>
    </>
  );
};
