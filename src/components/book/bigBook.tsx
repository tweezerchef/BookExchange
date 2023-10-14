import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import { CenteredModal } from "./bookStyles";
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
    <CenteredModal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { style: { backgroundColor: "transparent" } },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "grey.500",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {/* Add more detailed information and interactivity here */}
        <Typography variant="h4">{book.title}</Typography>
        <Typography variant="h6">{book.author}</Typography>
        <Typography variant="body2">{book.description}</Typography>
        {/* ... other details and interactive elements ... */}
      </DialogContent>
    </CenteredModal>
  );
};
