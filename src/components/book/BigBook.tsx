import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import {
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
    if (!book.id) return;
    try {
      const res = await fetch(`/api/bookDB/reviews/${book.id}`);
      const data: Review[] = await res.json();
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
            <Image
              // try to find better generic image for books
              src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
              fill
              alt='Book Cover'
              quality={100}
              style={{
                filter: "contrast(1.2)",
                objectFit: "contain",
                width: "100%",
                height: "100%",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            />
          </ImageBox>
          <SideOfImageBox>
            <BigBookButtonStack book={book} />
            <Tooltip title={book.description} arrow>
              <Typography variant='body2' textAlign='center'>
                {truncateDescription(book.description, 70)}
              </Typography>
            </Tooltip>
          </SideOfImageBox>
        </TopContainer>
        <ContentContainer>
          <Typography variant='h4'>{book.title}</Typography>
          <Typography variant='h6'>{book.author}</Typography>
          <UserReview
            open={reviewOpen}
            handleClose={handleClose}
            setReviews={setReviews}
          />
        </ContentContainer>
      </DialogContent>
    </CenteredModal>
  );
};
