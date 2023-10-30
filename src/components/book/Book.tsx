import { useState, useEffect } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { User, UserBooks } from "@prisma/client";
import {
  StyledBookCard,
  ImageBox,
  SideOfImageBox,
  TopContainer,
  ContentContainer,
  TitleTypography,
} from "./bookStyles";
import { StarRating } from "./StarRating";
import { ButtonStack } from "./bookButtons/ButtonStack";
import { BigBook } from "./BigBook";

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
  wishlist?: UserBooks[];
  owned?: UserBooks[];
}
interface BookProps {
  book: Book;
}
type Review = {
  User: User;
  review: string;
};

export const BookCard: React.FC<BookProps> = ({ book }) => {
  const [bigBookOpen, setBigBookOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleBookClick = () => {
    setBigBookOpen(true);
  };

  const handleCloseBigBook = () => {
    setBigBookOpen(false);
  };

  const getBookReviews = async () => {
    if (!book?.id) return;
    try {
      const res = await fetch(`/api/bookDB/reviews/${book.id}`);
      const data: Review[] = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    void getBookReviews();
  }, []);
  return (
    <>
      {bigBookOpen && (
        <BigBook
          book={book}
          bigBookOpen={bigBookOpen}
          handleCloseBigBook={handleCloseBigBook}
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
      <StyledBookCard elevation={3}>
        <TopContainer>
          <ImageBox onClick={handleBookClick}>
            <Image
              src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
              alt='Book Cover'
              fill
              quality={100}
            />
          </ImageBox>
          <SideOfImageBox>
            <StarRating book={book} />
            <ButtonStack book={book} />

            {book.author && (
              <TitleTypography align='center' variant='body1'>
                Written By: <br />
                {book.author}
              </TitleTypography>
            )}
          </SideOfImageBox>
        </TopContainer>
        <ContentContainer>
          <Typography
            align='center'
            justifySelf='center'
            variant='body1'
            margin='1'
          >
            {book.title}
          </Typography>
        </ContentContainer>
      </StyledBookCard>
    </>
  );
};
