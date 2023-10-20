import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useUserState, useUserDispatch } from "../../../context/context";
import { SET_WISHLIST, SET_WISHLIST_IDS } from "../../../context/actions";

type CustomColor = "success" | "danger";

interface WishListButtonProps {
  book: Book;
}

export function WishListButton({ book }: WishListButtonProps) {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const [color, setColor] = useState<CustomColor>("danger");
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(
    "Add to Lending Library"
  );

  const { wishListIDs, user } = state;
  const userID = user?.id;
  const bookID = book?.id;

  const isInWishList = wishListIDs?.includes(bookID);

  useEffect(() => {
    if (isInWishList) {
      setColor("success" as CustomColor);
      setToolTip("Remove from Wishlist");
    } else {
      setColor("danger" as CustomColor);
      setToolTip("Add to Wishlist");
    }
  }, [isInWishList]);

  const toggleWishList = () => {
    try {
      const oldColor = color;
      const newColor = color === "success" ? "danger" : "success";
      const newToolTip =
        newColor === "success" ? "Add to Wishlist" : "Remove from Wishlist";
      setColor(newColor);
      setToolTip(newToolTip);

      const updatedWishList = isInWishList
        ? state.wishList.filter((b) => b.id !== bookID)
        : [book, ...state.wishList];
      const updatedWishListIDs = isInWishList
        ? state.wishListIDs.filter((b) => b !== bookID)
        : [book.id, ...state.wishListIDs];

      // Update local state immediately
      dispatch({ type: SET_WISHLIST, payload: updatedWishList });
      dispatch({ type: SET_WISHLIST_IDS, payload: updatedWishListIDs });

      // You can make this part async
      // But no need to await if you don't need the response
      fetch(`/api/user/wishList/${bookID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: oldColor,
          book,
          userId: userID,
        }),
      }).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
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
}
