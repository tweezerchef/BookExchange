import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { User, UserBooks, Books } from "@prisma/client";
import Button from "@mui/material/Button";
import {
  StyledBookCard,
  ImageBox,
  SideOfImageBox,
  TopContainer,
  ContentContainer,
  TitleTypography,
  AuthorTypography,
  PickBookButton,
} from "./bookStyles";

interface Book extends Books {
  books?: Book[];
  wishlist?: UserBooks[];
  owned?: UserBooks[];
}
interface PickBookProps {
  book: Book;
  user?: {
    id: string;
    email: string;
    userName: string;
  };
  setClubBook: React.Dispatch<React.SetStateAction<Books>>;
}
type Review = {
  User: User;
  review: string;
};

export const PickBookCard: React.FC<PickBookProps> = ({
  book,
  user = null,
  setClubBook,
}) => {
  const [loading, setLoading] = useState(true);

  function truncateTitle(title: string, wordLimit: number) {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return title;
  }

  const handleBookClick = useCallback(() => {
    setClubBook(book);
    console.log("book", book);
  }, [book, setClubBook]);
  return (
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
          <TopContainer>
            <ImageBox onClick={handleBookClick}>
              <Image
                src={
                  book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"
                }
                alt='Book Cover'
                fill
                sizes='max-width: 100px, max-height: 180px'
                priority
                quality={100}
              />
            </ImageBox>
            <SideOfImageBox>
              {book.author && (
                <>
                  <PickBookButton
                    variant='contained'
                    startIcon={<ImportContactsIcon />}
                    onClick={handleBookClick}
                  >
                    Pick This Book
                  </PickBookButton>
                  <AuthorTypography align='center'>
                    Written By: <br />
                    {book.author}
                  </AuthorTypography>
                </>
              )}
            </SideOfImageBox>
          </TopContainer>
          <ContentContainer>
            <Tooltip title={book.title} placement='top' arrow>
              <TitleTypography variant='body1'>
                {truncateTitle(book.title, 10)}
              </TitleTypography>
            </Tooltip>
          </ContentContainer>
        </>
      )}
    </StyledBookCard>
  );
};