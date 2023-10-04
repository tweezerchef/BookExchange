import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import WishList from "@/components/Carousels/wishList";
import Box from "@mui/material/Box";
export default function wishListBox() {
  return (
    <>
      <Divider textAlign="right">
        <Chip label="Your Wish List" />
      </Divider>
      <Box overflow="hidden">
        <WishList />
      </Box>
    </>
  );
}
