import { useEffect, useState } from "react";
import { User } from "@prisma/client";
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

interface BigBookProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}
type Review = {
  user: User;
  review: string;
};

export const BigBook: React.FC<BigBookProps> = ({ book, open, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);

  const addReviewOpen = () => {
    setReviewOpen(true);
  };

  const handleClose = () => {
    setReviewOpen(false);
  };

  const getBookReviews = async () => {
    if (!book?.id) return;
    try {
      const res = await fetch(`/api/bookDB/reviews/${book.id}`);
      const data: Review[] = await res.json();
      console.log("bigbookReviewData", data);
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  function truncateDescription(description: string, wordLimit: number) {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return description;
  }

  useEffect(() => {
    void getBookReviews();
  }, [book]);

  if (!book) return null;

  return (
    <CenteredModal open={open} onClose={onClose}>
      <CloseButtonContainer onClick={onClose}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </CloseButtonContainer>
      <DialogContent>
        <TopContainer>
          <ImageBox>
            <BookImage
              // try to find better generic image for books
              src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
              fill
              alt='Book Cover'
              quality={100}
            />
          </ImageBox>
          <SideOfImageBox>
            <BigBookButtonStack book={book} />
            <Tooltip title={book.description} arrow>
              <Typography variant='body2' textAlign='center'>
                {truncateDescription(book.description, 70)}
              </Typography>
            </Tooltip>
            <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
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
