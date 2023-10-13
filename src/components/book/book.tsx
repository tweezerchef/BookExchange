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

        {book.author && (
          <TitleTypography align="center" variant="body1">
            Written By: <br />
            {book.author}
          </TitleTypography>
        )}
      </SideOfImageBox>
    </TopContainer>
    <ContentContainer>
      <TitleTypography align="center" variant="body1">
        {book.title}
      </TitleTypography>
    </ContentContainer>
  </StyledBookCard>
);
