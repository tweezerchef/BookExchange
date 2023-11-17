import { useState, FC } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Step1Dialog } from "./regCompStyles";

interface IntroStep1Props {
  setStep2: React.Dispatch<React.SetStateAction<boolean>>;
}
export const IntroStep1: FC<IntroStep1Props> = ({ setStep2 }) => {
  const [open, setOpen] = useState(true);

  const next = () => {
    setStep2(true);
  };

  const handleClose = () => {
    setOpen(false);
    next();
  };

  return (
    <Step1Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='tutorial-dialog-title'
    >
      <DialogTitle id='tutorial-dialog-title'>
        Welcome to BookExchange!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let's take a quick tour to get you started. Follow these steps to
          complete your registration and start exploring the world of books.
          This will also help us personalize your experience.
        </DialogContentText>
        {/* Add more content or steps here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' variant='contained'>
          Next
        </Button>
      </DialogActions>
    </Step1Dialog>
  );
};
