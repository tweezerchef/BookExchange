import Stack from "@mui/material/Stack";
import { Books } from "@prisma/client";
import { WishListButton } from "./WishListButton";
import { LendingLibraryButton } from "./LendingLibraryButton";

interface ButtonStackProps {
  book: Books;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}
export const ButtonStack: React.FC<ButtonStackProps> = ({
  book,
  user = null,
}) => (
  <Stack direction='row' spacing={2}>
    <LendingLibraryButton book={book} {...(user ? { user } : {})} />
    <WishListButton book={book} {...(user ? { user } : {})} />
  </Stack>
);
