import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { Activity, User, Books } from "@prisma/client";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import { BigBook } from "../../../components/book/BigBook";

type Review = {
  User: User;
  review: string;
};

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string; // Now expecting a string instead of a Date
  Books: Books;
  user: User;
}

interface SideCarBookProps {
  activity: ExtendedActivity;
}

export const SideCarBook: FC<SideCarBookProps> = ({ activity }) => {
  const { Books: book } = activity;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bigBookOpen, setBigBookOpen] = useState(false);
  const handleBookClick = () => {
    setBigBookOpen(true);
  };

  const handleCloseBigBook = () => {
    setBigBookOpen(false);
  };
  const getBookReviews = useCallback(async () => {
    if (!book?.id) return;
    try {
      const res = await fetch(`/api/bookDB/reviews/${book.id}`);
      const data: Review[] = (await res.json()) as Review[];
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  }, [book]);

  useEffect(() => {
    void getBookReviews();
  }, [getBookReviews]);

  return (
    <>
      {bigBookOpen && (
        <BigBook
          book={book}
          bigBookOpen={bigBookOpen}
          handleCloseBigBook={handleCloseBigBook}
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
      <Tooltip title='See Review' placement='right-start' arrow>
        <Box margin={1} sx={{ cursor: "pointer" }}>
          <Image
            src={book.image}
            alt={book.title}
            width={80}
            height={110}
            onClick={handleBookClick}
          />
        </Box>
      </Tooltip>
    </>
  );
};
