import { useState, FC } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Icon, IconButton } from "@mui/material";
import { CustomDialog } from "./regCompStyles";

interface IntroStep2Props {
  setStep2: React.Dispatch<React.SetStateAction<boolean>>;
}
type CustomColor = "success";
export const IntroStep2: FC<IntroStep2Props> = ({ setStep2 }) => {
  const [open, setOpen] = useState(true);

  const next = () => {
    setStep2(true);
  };

  const handleClose = () => {
    setOpen(false);
    next();
  };

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='tutorial-dialog-title'
    >
      <DialogTitle id='tutorial-dialog-title'>Books!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This app is mostly made up of carousels. You can scroll through them
          to find books and friends. Below you will see a list of popular books.
          You can search our database for books in the search dialog, but if
          they are not there we will search the web. If you click on the{" "}
          <IconButton color='success'>
            <BookmarkAddIcon />
          </IconButton>
          icon, it will be added to your "wishlist" of books you would like to
          borrow and read. Click it again to remove. The other icon{" "}
          <IconButton color='success'>
            <LibraryBooksIcon />
          </IconButton>
          is for adding the book to your "library" of books you own and will
          lend out. Click it again to remove.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' variant='contained'>
          Next
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};
