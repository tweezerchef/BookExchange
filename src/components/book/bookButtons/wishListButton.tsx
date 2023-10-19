import { useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useUserDispatch, useUserState } from "../../../context/context";
import { SET_WISHLIST, SET_WISHLIST_IDS } from "../../../context/actions";
import { mutate } from "swr"; // Import useSWR and mutate from SWR

interface WishListButtonProps {
  book: Book;
}

type CustomColor = "success" | "danger";

export const WishListButton: React.FC<WishListButtonProps> = ({ book }) => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const [color, setColor] = useState<CustomColor>("danger");
  const [toolTip, setToolTip] =
    useState<NonNullable<React.ReactNode>>("Add to Wishlist");

  const { wishListIDs } = state;
  const { user } = state;
  const userID = user?.id;
  const bookID = book?.id;

  const isInWishList = wishListIDs?.includes(bookID);

  useEffect(() => {
    if (isInWishList) {
      setColor("success" as CustomColor);
      setToolTip("Remove from Wishlist");
    } else {
      setColor("error" as CustomColor);
      setToolTip("Add to Wishlist");
    }
  }, [isInWishList]); // Watch for changes in isInWishList

  const wishListAction = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const currentColor = color;
    if (color === "success") {
      setColor("error" as CustomColor);
      setToolTip("Add to Wishlist");
      dispatch({
        type: SET_WISHLIST,
        payload: state.wishList.filter((b) => b.id !== bookID),
      });
      dispatch({
        type: SET_WISHLIST_IDS,
        payload: state.wishListIDs.filter((b) => b !== bookID),
      });
    } else {
      setColor("success" as CustomColor);
      setToolTip("Remove from Wishlist");
      dispatch({ type: SET_WISHLIST, payload: [...state.wishList, book] });
      // There might be an issue here when the book is directly from google books, potentially fix
      // On the server-side call
      dispatch({
        type: SET_WISHLIST_IDS,
        payload: [...state.wishListIDs, book.id],
      });
    }

    try {
      await fetch(`/api/user/wishList/${bookID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: currentColor,
          book: book,
          userId: userID,
        }),
      });

      // Use mutate to send the updated data to the server without fetching new data
      mutate(`/api/user/wishList/${userID}`);
    } catch (error) {
      // If the server request fails, revert the local state
      if (color === "success") {
        setColor("error" as CustomColor);
        setToolTip("Remove from Wishlist");
        // Add the book back to the wishlist locally
        dispatch({
          type: SET_WISHLIST,
          payload: [...state.wishList, book],
        });
      } else {
        setColor("success" as CustomColor);
        setToolTip("Add to Wishlist");
        // Remove the book from the wishlist locally
        dispatch({
          type: SET_WISHLIST,
          payload: state.wishList.filter((b) => b.id !== bookID),
        });
      }
    }
  };

  return (
    <Tooltip title={toolTip} placement='top-end'>
      <IconButton
        aria-label='add to wishlist'
        size='small'
        color={color === "danger" ? "error" : color}
        onClick={wishListAction}
      >
        <BookmarkAddIcon />
      </IconButton>
    </Tooltip>
  );
};
