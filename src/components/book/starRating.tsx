import Rating from "@mui/material/Rating";

export const StarRating: React.FC = () => (
  // book has many userbooks, we need to pull the userbook asociated with the user
  <Rating
    name='half-rating'
    defaultValue={2.5}
    precision={0.5}
    style={{
      marginTop: 5,
    }}
  />
);
