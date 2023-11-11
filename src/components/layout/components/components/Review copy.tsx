import Typography from "@mui/material/Typography";
import { FC } from "react";
import { ReviewBox } from "./cardStyles";

type ReviewProps = {
  description: string;
};

export const Review: FC<ReviewProps> = ({ description }) => (
  <ReviewBox>
    <Typography variant='body2' justifySelf='center' overflow='hidden'>
      {description}
    </Typography>
  </ReviewBox>
);
