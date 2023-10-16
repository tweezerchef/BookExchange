import { useContext, useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useUserDispatch, useUserState } from "../../../context/context";

interface WishListButtonProps {
  book: Book;
}

type CustomColor = "success" | "danger";

export const WishListButton: React.FC<WishListButtonProps> = ({ book }) => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const [color, setColor] = useState<CustomColor>("danger");
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(
    <h1>Add to Wishlist</h1>
  );

  const { wishListIDs } = state;
  const { user } = state;
  const userID = user?.id;
  const bookID = book?.id;

  const isInWishList = wishListIDs?.includes(bookID);

  const addToWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const currentColor = color;
    if (color === "success") {
      setColor("error" as CustomColor);
      setToolTip(<h1>Add to Wishlist</h1>);
    } else {
      setColor("success" as CustomColor);
      setToolTip(<h1>Remove from Wishlist</h1>);
    }

    const newUserBook = await fetch(`/api/user/wishList/${bookID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ color: currentColor, book: book, userId: userID }),
    });
  };
  useEffect(() => {
    if (isInWishList) {
      setColor("success" as CustomColor);
      setToolTip(<h1>Remove from Wishlist</h1>);
    } else {
      setColor("error" as CustomColor);
      setToolTip(<h1>Add to Wishlist</h1>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
