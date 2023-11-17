import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Activity, Books, User } from "@prisma/client";
import { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import { StyledRating } from "./cardStyles";

interface StarRatingProps {
  description: string;
}

export const StarRating: FC<StarRatingProps> = ({ description }) => {
  const rating = parseFloat(description.split(" ")[4]);
  return (
    <Tooltip title={description} placement='right-start' arrow>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <StyledRating
          name='read-only'
          value={rating}
          readOnly
          precision={0.5}
          size='small'
        />
        <Typography variant='body2' alignSelf='center' margin={1}>
          Rated
        </Typography>
      </div>
    </Tooltip>
  );
};
