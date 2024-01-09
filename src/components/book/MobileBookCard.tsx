import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { User, UserBooks, Books } from "@prisma/client";
import {
  StyledBookCard,
  ImageBox,
  ContentContainer,
  TitleTypography,
  AuthorTypography,
  UnderStarBox,
  TitleBox,
} from "./mobileBookStyles";
import { MobileStarRating } from "./MobileStarRating";
import { ButtonStack } from "./bookButtons/ButtonStack";
import { BigBook } from "./BigBook";

interface Book extends Books {
  books?: Book[];
  wishlist?: UserBooks[];
  owned?: UserBooks[];
}
interface BookProps {
  book: Book;
  user?: {
    id: string;
    email: string;
    userName: string;
  };
  isRegistration?: boolean;
  onRatingChange?: () => void;
}
type Review = {
  User: User;
  review: string;
};

export const MobileBookCard: React.FC<BookProps> = ({
  book,
  user = null,
  isRegistration,
  onRatingChange,
}) => {
  const [bigBookOpen, setBigBookOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  function truncateTitle(title: string, wordLimit: number) {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return title;
  }

  const handleBookClick = () => {
    setBigBookOpen(true);
  };

  const handleCloseBigBook = () => {
    setBigBookOpen(false);
  };

  const getBookReviews = useCallback(async () => {
    if (!book?.id) return;
    try {
      const res = await fetch(`/api/bookDB/reviews/${book.id}`);
      const data: Review[] = (await res.json()) as Review[];
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  }, [book]);

  useEffect(() => {
    void getBookReviews();
  }, [getBookReviews]);
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
        <div className='backgroundImage'>
          <Image
            src='/mountainBackgound.png'
            alt='Background'
            fill
            sizes='max-width: 220px, max-height: 220px'
            priority
            onLoad={() => setLoading(false)}
          />
        </div>
        {!loading && (
          <>
            <UnderStarBox>
              <ImageBox onClick={handleBookClick}>
                <Image
                  src={
                    book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"
                  }
                  alt='Book Cover'
                  layout='responsive' // Change to 'responsive' if the image should scale with the container
                  width={100} // Match the width of the ImageBox
                  height={150} // Match the height of the ImageBox
                  priority
                  quality={100}
                />
              </ImageBox>
              <ContentContainer>
                <MobileStarRating
                  book={book}
                  {...(user && { user })}
                  isRegistration={isRegistration}
                  onRatingChange={onRatingChange}
                />
                <ButtonStack book={book} {...(user && { user })} />

                {book.author && (
                  <AuthorTypography align='center'>
                    Written By: <br />
                    {book.author}
                  </AuthorTypography>
                )}
              </ContentContainer>
            </UnderStarBox>
            <TitleBox>
              <TitleTypography variant='body1'>
                {truncateTitle(book.title, 10)}
              </TitleTypography>
            </TitleBox>
          </>
        )}
      </StyledBookCard>
    </>
  );
};
