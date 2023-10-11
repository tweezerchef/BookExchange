import ExploreBooks from "../Carousels/exploreBooks";
import Card from "@mui/material/Card";
import Image from "next/image";
interface BookProps {
  book: Book;
}

export const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <Card key={book.id} variant="outlined">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center top"
        />
      </div>
    </Card>
  );
};
