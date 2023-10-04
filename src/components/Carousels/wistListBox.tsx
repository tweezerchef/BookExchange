import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import WishList from "./wishList";
import Box from "@mui/material/Box";

type WishListProps = {
  books: Book[];
};

const wishListBox: React.FC<WishListProps> = ({ books }) => {
  return (
    <>
      <Divider textAlign="right">
        <Chip label="Your Wish List" />
      </Divider>
      <Box overflow="hidden">
        <WishList books={books} />
      </Box>
    </>
  );
};

export default wishListBox;
