import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import WishList from "./wishList";
import Box from "@mui/material/Box";

type WishListProps = {
  books: Book[];
};

const wishListBox: React.FC = () => {
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
};

export default wishListBox;
