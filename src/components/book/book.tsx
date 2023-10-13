import { CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { StyledBookCard } from "./bookStyles";

interface BookProps {
  book: Book;
}

export const Book: React.FC<BookProps> = ({ book }) => (
  <StyledBookCard>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "45%",
        overflow: "hidden",
        margin: "0",
        padding: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
      // onClick={handleOnClick}
    >
      <CardMedia
        component="img"
        height="194"
        image={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
        alt="Book Cover "
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "scale-down",
        }}
      />
    </Box>
    {book.title}
  </StyledBookCard>
);
