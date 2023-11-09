import { useState } from "react";
import { User, Books } from "@prisma/client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useHomeState } from "../../context/context";
import { AddReviewModal } from "./bigBookStyles";

type Review = {
  User: Partial<User>;
  review: string;
};
interface UserReviewProps {
  book: Books;
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
  const state = useHomeState();
  const [newReview, setNewReview] = useState<string>("");

  const thisUser = state.user;
  const userId = thisUser?.id;

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newReview) return;
    const addReview: Review = { User: thisUser, review: newReview };
    const postReview = { userId, book, review: newReview };
    fetch(`/api/bookDB/reviews/newReview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postReview),
    }).catch((err) => console.error(err));
    setReviews((prevReviews: Review[]) => [addReview, ...prevReviews]);
    setNewReview("");
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
