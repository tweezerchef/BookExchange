import { CardMedia } from "@mui/material";
import ExploreBooks from "../Carousels/exploreBooks";
import Card from "@mui/material/Card";
import Image from "next/image";

interface BookProps {
  book: Book;
}

export const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <Card variant="outlined">
      <CardMedia>
        <Image
          src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center top"
        />
      </CardMedia>
      {book.title}
    </Card>
  );
};
