import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Activity, Books, User } from "@prisma/client";
import { FC } from "react";

interface StarRatingProps {
  description: string;
}

export const StarRating: FC<StarRatingProps> = ({ description }) => {
  const rating = parseFloat(description.split(" ")[4]);
  return (
    <div>
      <Rating
        name='read-only'
        value={rating}
        readOnly
        precision={0.5}
        size='small'
      />
      <Typography variant='body2'>{description} Stars</Typography>
    </div>
  );
};
