import Stack from "@mui/material/Stack";
import { WishListButton } from "./WishListButton";
import { LendingLibraryButton } from "./LendingLibraryButton";
import { StarRating } from "../StarRating";

interface ButtonStackProps {
  book: Book;
}
export const BigBookButtonStack: React.FC<ButtonStackProps> = ({ book }) => (
  <Stack direction='row' justifySelf='flex-start' spacing={2}>
    <StarRating book={book} />
    <LendingLibraryButton book={book} />
    <WishListButton book={book} />
  </Stack>
);
