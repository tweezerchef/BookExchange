import { useState } from "react";
import Image from "next/image";
import { User, Books } from "@prisma/client";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  BookImage,
  CenteredModal,
  CloseButton,
  CloseButtonContainer,
  ContentContainer,
  ImageBox,
  SideOfImageBox,
  TopContainer,
} from "./bigBookStyles";
import { BigBookButtonStack } from "./bookButtons/BigBookButtonStack";
import { UserReview } from "./UserReview";
import { BookReviews } from "./BookReviews";

type BigBookReview = {
  User: User;
  review: string;
};

interface BigBookProps {
  book: Books | null;
  bigBookOpen: boolean;
  handleCloseBigBook: () => void;
  reviews: BigBookReview[];
  setReviews: React.Dispatch<React.SetStateAction<BigBookReview[]>>;
}
export const BigBook: React.FC<BigBookProps> = ({
  book,
  bigBookOpen,
  handleCloseBigBook,
  reviews,
  setReviews,
}) => {
  const [reviewOpen, setReviewOpen] = useState(false);

  const addReviewOpen = () => {
    setReviewOpen(true);
  };

  const handleClose = () => {
    setReviewOpen(false);
  };

  function truncateDescription(description: string, wordLimit: number) {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return description;
  }

  if (!book) return null;

  return (
    <CenteredModal open={bigBookOpen} onClose={handleCloseBigBook}>
      <CloseButtonContainer onClick={handleCloseBigBook}>
        <CloseButton onClick={handleCloseBigBook}>
          <CloseIcon />
        </CloseButton>
      </CloseButtonContainer>
      <DialogContent>
        <div className='backgroundImage'>
          <Image
            src='/mountainBackgound.png'
            alt='Background'
            fill
            sizes='max-width: 220px, max-height: 220px'
            priority
          />
        </div>
        <TopContainer>
          <ImageBox>
            <BookImage
              src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
              alt='Book Cover'
              fill
              sizes='max-width: 300px, min-width:150ps, min-height:300, max-height: 600px'
              quality={100}
            />
          </ImageBox>
          <SideOfImageBox>
            <BigBookButtonStack book={book} />
            <Tooltip title={book.description} arrow>
              <Typography variant='body2' textAlign='center'>
                {truncateDescription(book.description, 50)}
              </Typography>
            </Tooltip>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant='outlined' onClick={addReviewOpen}>
                Add Written Review
              </Button>
            </Box>
            <UserReview
              book={book}
              open={reviewOpen}
              handleClose={handleClose}
              setReviews={setReviews}
            />
          </SideOfImageBox>
        </TopContainer>
        <ContentContainer>
          <Typography variant='h4'>{book.title}</Typography>
          <Typography variant='h6'>{book.author}</Typography>
          <BookReviews reviews={reviews} />
        </ContentContainer>
      </DialogContent>
    </CenteredModal>
  );
};
