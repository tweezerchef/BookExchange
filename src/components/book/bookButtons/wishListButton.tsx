import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useUserState, useUserDispatch } from "../../../context/context";
import { SET_WISHLIST, SET_WISHLIST_IDS } from "../../../context/actions";
import { mutate } from "swr";

type CustomColor = "success" | "danger";

interface WishListButtonProps {
  book: Book;
}

export const WishListButton: React.FC<WishListButtonProps> = ({ book }) => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const { wishListIDs, user } = state;
  const userID = user?.id;
  const bookID = book?.id;

  const isInWishList = wishListIDs?.includes(bookID);
  const [color, setColor] = useState<CustomColor>(
    isInWishList ? "success" : "danger"
  );
  const [toolTip, setToolTip] = useState<React.ReactNode>(
    isInWishList ? "Remove from Wishlist" : "Add to Wishlist"
  );

  const toggleWishList = async () => {
    try {
      // Update color and tooltip immediately
      const newColor = isInWishList ? "danger" : "success";
      const newToolTip = isInWishList
        ? "Add to Wishlist"
        : "Remove from Wishlist";
      setColor(newColor);
      setToolTip(newToolTip);

      const updatedWishList = isInWishList
        ? state.wishList.filter((b) => b.id !== bookID)
        : [...state.wishList, book];
      const updatedWishListIDs = isInWishList
        ? state.wishListIDs.filter((b) => b !== bookID)
        : [...state.wishListIDs, book.id];

      // Update local state immediately
      dispatch({ type: SET_WISHLIST, payload: updatedWishList });
      dispatch({ type: SET_WISHLIST_IDS, payload: updatedWishListIDs });

      await fetch(`/api/user/wishList/${bookID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: newColor,
          book: book,
          userId: userID,
        }),
      });

      mutate(`/api/user/wishList/${userID}`);
    } catch (error) {
      // Handle errors here if needed
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleWishList();
  };

  return (
    <Tooltip title={toolTip} placement='top-end'>
      <IconButton
        aria-label={
          toolTip === "Add to Wishlist"
            ? "add to wishlist"
            : "remove from wishlist"
        }
        size='small'
        color={color === "danger" ? "error" : color}
        onClick={handleClick}
      >
        <BookmarkAddIcon />
      </IconButton>
    </Tooltip>
  );
};
