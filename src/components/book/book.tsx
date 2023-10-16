import Image from "next/image";
import Typography from "@mui/material/Typography";
import {
  StyledBookCard,
  ImageBox,
  SideOfImageBox,
  TopContainer,
  ContentContainer,
  TitleTypography,
} from "./bookStyles";
import { StarRating } from "./starRating";
import { ButtonStack } from "./bookButtons/buttonStack";
import React from "react";
interface BookProps {
  book: Book;
  onClick: () => void;
}

export const Book: React.FC<BookProps> = ({ book, onClick }) => (
  <StyledBookCard>
    <TopContainer>
      <ImageBox onClick={onClick}>
        {/* Needs Futher Styling */}
        <Image
          src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
          alt="Book Cover"
          fill={true}
          objectFit="cover"
        />
      </ImageBox>
      <SideOfImageBox>
        <StarRating />
        <ButtonStack />

        {book.author && (
          <TitleTypography align="center" variant="body1">
            Written By: <br />
            {book.author}
          </TitleTypography>
        )}
      </SideOfImageBox>
    </TopContainer>
    <ContentContainer>
      <Typography
        align="center"
        justifySelf="center"
        variant="body1"
        margin="1"
      >
        {book.title}
      </Typography>
    </ContentContainer>
  </StyledBookCard>
);
