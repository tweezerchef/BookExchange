/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useHomeState, useHomeDispatch } from "../../../context/context";
import { SET_WISHLIST, SET_WISHLIST_IDS } from "../../../context/actions";

type CustomColor = "success" | "danger";
interface Book {
  id?: string;
  title?: string;
  subTitle?: string;
  pubDate?: string;
  pageCount?: number;
  author?: string;
  selfLink?: string;
  description?: string;
  content?: string;
  image?: string;
  mainGenre?: string;
  buyLink?: string;
  viewAbility?: string;
  rating?: number;
  ISBN10?: string;
  books?: Book[];
}

interface WishListButtonProps {
  book: Book;
  user?: {
    id: string;
    email: string;
    userName: string;
  };
}

export function WishListButton({ book, user = null }: WishListButtonProps) {
  const state = useHomeState();
  const dispatch = useHomeDispatch();

  const [color, setColor] = useState<CustomColor>("danger");
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(
    "Add to Lending Library"
  );

  const { wishListIDs } = state;
  const userID = user?.id ?? state?.user?.id;
  const bookID = book?.id;
  // console.log("bookID:", user);
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
