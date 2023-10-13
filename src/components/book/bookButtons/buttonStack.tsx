import Stack from "@mui/material/Stack";
import { WishListButton } from "./wishListButton";
import { LendingLibraryButton } from "./lendingLibraryButton";

export const ButtonStack: React.FC = () => (
  <Stack direction="row" spacing={2}>
    <LendingLibraryButton />
    <WishListButton />
  </Stack>
);
