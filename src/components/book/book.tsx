import Image from "next/image";
import {
  StyledBookCard,
  StyledBookCardImageBox,
  StyledSideOfBookBox,
  StyledBoxContainer,
  ContentContainer,
} from "./bookStyles";
import { StarRating } from "./starRating";
import { LendingLibraryButton } from "./bookButtons/lendingLibraryButton";
import Typography from "@mui/material/Typography";
interface BookProps {
  book: Book;
}

export const Book: React.FC<BookProps> = ({ book }) => (
  <StyledBookCard>
    <StyledBoxContainer>
      <StyledBookCardImageBox>
        <Image
          src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
          alt="Book Cover"
          fill={true} // This will make the image take the full dimensions of its parent
          objectFit="cover" // Adjust this as needed
        />
      </StyledBookCardImageBox>
      <StyledSideOfBookBox>
        <StarRating />
        <LendingLibraryButton />
      </StyledSideOfBookBox>
    </StyledBoxContainer>
    <ContentContainer>
      <Typography variant="body1">{book.title}</Typography>
    </ContentContainer>
  </StyledBookCard>
);
