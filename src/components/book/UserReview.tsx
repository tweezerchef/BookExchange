import { useState } from "react";
import { User } from "@prisma/client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useUserState } from "../../context/context";
import { AddReviewModal } from "./bigBookStyles";

type Review = {
  user: User;
  review: string;
};
interface UserReviewProps {
  book: Book;
  open: boolean;
  handleClose: () => void;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

// eslint-disable-next-line react/function-component-definition
export const UserReview: React.FC<UserReviewProps> = ({
  open,
  handleClose,
  setReviews,
  book,
}) => {
  const state = useUserState();
  const [newReview, setNewReview] = useState<string>("");

  const { user } = state;
  const userId = user?.id;
  const bookISBN10 = book?.ISBN10;

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newReview) return;
    const addReview = { User: user, review: newReview };
    const postReview = { userId, book, review: newReview };
    console.log("addReview", addReview);
    setReviews((prevReviews: Review[]) => [addReview, ...prevReviews]);
    setNewReview("");
    fetch(`/api/bookDB/reviews/newReview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postReview),
    }).catch((err) => console.error(err));

    handleClose();
  };

  return (
    <Box width='80%'>
      <AddReviewModal open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        {/* Adjust maxWidth as per need */}
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Add Your Written Review</DialogContentText>
            <TextField
              autoFocus
              id='name'
              // label='Review'
              // type='Review'
              // variant='standard'
              onChange={handleReviewChange}
              fullWidth
              multiline
              rows={5}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Add Review</Button>
          </DialogActions>
        </form>
      </AddReviewModal>
    </Box>
  );
};
