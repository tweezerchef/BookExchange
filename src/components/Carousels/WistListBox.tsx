import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import WishList from "./WishList";
import { ExploreBooksBoxWrapper } from "./styles/exploreBooksStyle";

export default function WishListBox() {
  const isMobile = useMediaQuery("(max-width:460px)");
  let booksPerPage = 1;

  const isMedium = useMediaQuery("(min-width:650px)");
  const isLarge = useMediaQuery("(min-width:800px)");
  const isExtraLarge = useMediaQuery("(min-width:1100px)");

  if (isExtraLarge) {
    booksPerPage = 4;
  } else if (isLarge) {
    booksPerPage = 3;
  } else if (isMedium) {
    booksPerPage = 2;
  }

  return (
    <ExploreBooksBoxWrapper>
      <Divider textAlign='right'>
        <Chip label='Your Wish List' />
      </Divider>
      <WishList booksPerPage={booksPerPage} isMobile={isMobile} />
    </ExploreBooksBoxWrapper>
  );
}
