import { useState, memo } from "react";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateBeforeTwoToneIcon from "@mui/icons-material/NavigateBeforeTwoTone";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { Books } from "@prisma/client";
import { BookCard } from "../book/BookCard";
import { StyledDivider } from "../chips/chipStyle";
import { ExploreChip } from "../chips/ExploreChip";
import {
  BookBox,
  LeftIconButton,
  RightIconButton,
  OuterWrapperBox,
  MobileBox,
  GridContainer,
} from "./styles/exploreBooksStyle";
import { MobileBookCard } from "../book/MobileBookCard";

type ExploreBooksProps = {
  books: Books[];
  setBooks: (books: Books[]) => void;
  booksPerPage: number;
  user?: {
    id: string;
    email: string;
    userName: string;
  };
  isMobile: boolean;
  isRegistration?: boolean;
  onRatingChange?: () => void;
};

const ExploreBooksComponent: React.FC<ExploreBooksProps> = ({
  setBooks,
  books,
  booksPerPage,
  user = null,
  isMobile,
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
    <>
      <StyledDivider textAlign='right'>
        <ExploreChip
          setBooks={setBooks}
          booksPerPage={booksPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </StyledDivider>

      {books &&
        books.length >= 1 &&
        (isMobile ? (
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
          <>
            <OuterWrapperBox>
              <LeftIconButton
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                booksPerPage={booksPerPage}
              >
                <NavigateBeforeTwoToneIcon fontSize='large' />
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
                        .map((book: Books) => (
                          <Box key={book.id || book.title}>
                            <BookCard
                              book={book}
                              {...(user && { user })}
                              isRegistration={isRegistration}
                              onRatingChange={onRatingChange}
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
                  currentPage >=
                  Math.ceil((books.length || 0) / booksPerPage) - 1
                }
                booksPerPage={booksPerPage}
              >
                <NavigateNextIcon fontSize='large' />
              </RightIconButton>
            </OuterWrapperBox>
          </>
        ))}
    </>
  );
};

export const ExploreBooks = memo(ExploreBooksComponent);
