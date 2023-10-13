import Rating from "@mui/material/Rating";

export const StarRating: React.FC = () => (
  <Rating
    name="half-rating"
    defaultValue={2.5}
    precision={0.5}
    style={{
      marginTop: 5,
    }}
  />
);
