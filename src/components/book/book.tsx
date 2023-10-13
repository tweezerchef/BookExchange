import Image from "next/image";
import {
  StyledBookCard,
  ImageBox,
  SideOfImageBox,
  TopContainer,
  ContentContainer,
  TitleTypography,
} from "./bookStyles";
import { StarRating } from "./starRating";
import Typography from "@mui/material/Typography";
import { ButtonStack } from "./bookButtons/buttonStack";
interface BookProps {
  book: Book;
}

export const Book: React.FC<BookProps> = ({ book }) => (
  <StyledBookCard>
    <TopContainer>
      <ImageBox>
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
        <TitleTypography align="center" variant="body1">
          {book.title}
        </TitleTypography>
      </SideOfImageBox>
    </TopContainer>
    <ContentContainer></ContentContainer>
  </StyledBookCard>
);
