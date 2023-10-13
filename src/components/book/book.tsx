import Image from "next/image";
import { CardMedia } from "@mui/material";
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
        height: "60%",
        overflow: "hidden",
        alignContent: "center",
        margin: "0",
        padding: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
      // onClick={handleOnClick}
    >
      {/* <CardMedia
        component="img"
        image={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
        alt="Book Cover "
        style={{
          position: "static",
          width: "100%",
          height: "100%",
          objectFit: "none",
          margin: "3",
        }}
      /> */}
      <Image
        src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
        alt="Book Cover"
        layout="fill" // This will make the image take the full dimensions of its parent
        objectFit="cover" // Adjust this as needed
      />
    </Box>
    {book.title}
  </StyledBookCard>
);
