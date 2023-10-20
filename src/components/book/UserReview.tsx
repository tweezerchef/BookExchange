import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type Review = {
  user: User;
  review: string;
};
interface UserReviewProps {
  open: boolean;
  handleClose: () => void;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

// eslint-disable-next-line react/function-component-definition
export const UserReview: React.FC<UserReviewProps> = ({
  open,
  handleClose,
  setReviews,
}) => {
  const [review, setReview] = useState("");

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setReview(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        {" "}
        {/* Adjust maxWidth as per need */}
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Add Your Written Review</DialogContentText>
            <TextField
              autoFocus
              id='name'
              label='Review'
              type='Review'
              variant='standard'
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
      </Dialog>
    </Box>
  );
};
