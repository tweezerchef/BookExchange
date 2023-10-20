import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import { CenteredModal, CloseButton } from "./bigBookStyles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface BigBookProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}

export const BigBook: React.FC<BigBookProps> = ({ book, open, onClose }) => {
  if (!book) return null;

  return (
    <CenteredModal open={open} onClose={onClose}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <DialogContent>
        <Typography variant='h4'>{book.title}</Typography>
        <Typography variant='h6'>{book.author}</Typography>
        <Typography variant='body2'>{book.description}</Typography>
      </DialogContent>
    </CenteredModal>
  );
};
