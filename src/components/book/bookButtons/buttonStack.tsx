import Stack from "@mui/material/Stack";
import { WishListButton } from "./wishListButton";
import { LendingLibraryButton } from "./lendingLibraryButton";

interface ButtonStackProps {
  book: Book;
}
export const ButtonStack: React.FC<ButtonStackProps> = ({ book }) => (
  <Stack direction='row' spacing={2}>
    <LendingLibraryButton book={book} />
    <WishListButton book={book} />
  </Stack>
);
