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
import { useUserDispatch, useUserState } from "../../context/context";

interface BookProps {
  book: Book;
  onClick: () => void;
}

export const Book: React.FC<BookProps> = ({ book, onClick }) => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const { wishList } = state;
  const { wishListIDs } = state;

  return (
    <StyledBookCard>
      <TopContainer>
        <ImageBox onClick={onClick}>
          <Image
            src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
            alt="Book Cover"
            fill={true}
            quality={100}
          />
        </ImageBox>
        <SideOfImageBox>
          <StarRating />
          <ButtonStack book={book} />

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
};
