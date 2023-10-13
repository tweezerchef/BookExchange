import { useContext, useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import UserContext from "../../hooks/Context";

// interface WishListButtonProps {
//   book: any;
//   isWishListed: boolean;
//   setIsWishListed: React.Dispatch<React.SetStateAction<boolean>>;
// }

type CustomColor = "success" | "danger";

// function WishListButton({
//   book,
//   isWishListed,
//   setIsWishListed,
// }: WishListButtonProps) {
//   const userContext = useContext(UserContext);
//   const user = userContext?.user;
//   const id = user?.id;
export const WishListButton: React.FC = () => {
  const [color, setColor] = useState<CustomColor>("danger");
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(
    <h1>Add to Wishlist</h1>
  );

  const addToWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // axios.post("/user-books/wishlist", {
    //   book,
    //   id,
    //   color,
    // });
    if (color === "success") {
      //   setIsWishListed(false);
      setColor("error" as CustomColor);
      setToolTip(<h1>Add to Wishlist</h1>);
    } else {
      //   setIsWishListed(true);
      setColor("success" as CustomColor);
      setToolTip(<h1>Remove from Wishlist</h1>);
    }
  };
  useEffect(() => {
    // if (isWishListed) {
    //   setColor("success" as CustomColor);
    //   setToolTip(<h1>Remove from Wishlist</h1>);
    // } else {
    setColor("error" as CustomColor);
    setToolTip(<h1>Add to Wishlist</h1>);
  }, []);

  return (
    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Lending Library"
        size="small"
        color={color === "danger" ? "error" : color}
        onClick={addToWishlist}
      >
        <BookmarkAddIcon />
      </IconButton>
    </Tooltip>
  );
};
