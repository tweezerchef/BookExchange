import { useState, useCallback } from "react";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { UserBooks, Books } from "@prisma/client";
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
import { useTheme } from "@mui/material";

interface Book extends Books {
  books?: Book[];
  wishlist?: UserBooks[];
  owned?: UserBooks[];
}
interface PickBookProps {
  book: Book;
  setClubBook: React.Dispatch<React.SetStateAction<Books>>;
}

export const PickBookCard: React.FC<PickBookProps> = ({
  book,
  setClubBook,
}) => {
  const theme = useTheme();
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
              <PickBookButton
                variant='contained'
                startIcon={<ImportContactsIcon />}
                onClick={handleBookClick}
                style={{
                  transition: theme.transitions.create(["background-color"], {
                    duration: theme.transitions.duration.short,
                  }),
                }}
              >
                Pick This Book
              </PickBookButton>
              {book.author && (
                <AuthorTypography align='center'>
                  Written By: <br />
                  {book.author}
                </AuthorTypography>
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
