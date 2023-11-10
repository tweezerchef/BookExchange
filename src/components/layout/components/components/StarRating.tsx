import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Activity, Books, User } from "@prisma/client";
import { FC } from "react";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string; // Now expecting a string instead of a Date
  Books: Books;
  user: User;
}

interface StarRatingProps {
  activity: ExtendedActivity;
}

export const StarRating: FC<StarRatingProps> = ({ activity }) => {
  const rating = parseFloat(activity.description.split(" ")[4]);
  console.log(activity.description.split(" "));
  console.log(rating);
  return (
    <div>
      <Rating
        name='read-only'
        value={rating}
        readOnly
        precision={0.5}
        size='small'
      />
      <Typography variant='body2'>{activity.description} Stars</Typography>
    </div>
  );
};
