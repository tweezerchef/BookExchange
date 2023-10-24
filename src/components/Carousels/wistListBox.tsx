import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import WishList from "./wishList";

type WishListProps = {
  books: Book[];
};

const wishListBox: React.FC = () => (
  <>
    <Divider textAlign='right'>
      <Chip label='Your Wish List' />
    </Divider>
    <WishList />
  </>
);

export default wishListBox;
