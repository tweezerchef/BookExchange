import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { Activity, User, Books } from "@prisma/client";
import Box from "@mui/material/Box";
import { BigBook } from "../../../book/BigBook";

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
    <Box margin={1}>
      <Image
        src={activity.Books.image}
        alt={activity.Books.title}
        width={80}
        height={110}
      />
    </Box>
  );
};
