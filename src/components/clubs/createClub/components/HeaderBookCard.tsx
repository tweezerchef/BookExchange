import { useState } from "react";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
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

interface Book extends Books {
  books?: Book[];
  wishlist?: UserBooks[];
  owned?: UserBooks[];
}
interface PickBookProps {
  book: Book;
}

export const HeaderBookCard: React.FC<PickBookProps> = ({ book }) => {
  const [loading, setLoading] = useState(true);

  function truncateTitle(title: string, wordLimit: number) {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return title;
  }

  return (
    <StyledBookCard elevation={3}>
      {book && (
        <div className='backgroundImage'>
          <Image
            src='/mountainBackgound.png'
            alt='Background'
            layout='fill'
            sizes='(max-width: 220px) 100vw, 220px'
            priority
            onLoad={() => setLoading(false)}
          />
        </div>
      )}
      {!loading && (
        <>
          <TopContainer>
            <ImageBox>
              <Image
                src={
                  book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"
                }
                alt='Book Cover'
                fill
                sizes='(max-width: 100px) 100vw, 100px'
                priority
                quality={100}
              />
            </ImageBox>
            <SideOfImageBox>
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
