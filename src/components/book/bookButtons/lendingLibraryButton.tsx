import React, { useContext, useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useUserDispatch, useUserState } from "../../../context/context";
import {
  SET_LENDING_LIBRARY,
  SET_LENDING_LIBRARY_IDS,
} from "../../../context/actions";

type CustomColor = "success" | "danger";

interface LendingLibraryButtonProps {
  book: Book;
}

export const LendingLibraryButton: React.FC<LendingLibraryButtonProps> = ({
  book,
}) => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const [color, setColor] = useState<CustomColor>("danger");
  //work on this later
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(
    <h1>Add to Lending Library</h1>
  );
  const { lendingLibraryIDs } = state;
  const { user } = state;
  const userID = user?.id;
  const bookID = book?.id;

  const isInLendingLibrary = lendingLibraryIDs?.includes(bookID);

  const lendingLibraryAction = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const currentColor = color;
    if (color === "success") {
      setColor("error" as CustomColor);
      setToolTip(<h1>Add to Lending Library</h1>);
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: state.lendingLibraryIDs.filter((b) => b !== bookID),
      });
      dispatch({
        type: SET_LENDING_LIBRARY,
        payload: state.lendingLibrary.filter((b) => b.id !== bookID),
      });
    } else {
      setColor("success" as CustomColor);
      setToolTip(<h1>Remove from LendingLibrary</h1>);
      //there might be an issue here when the book is directly from google books potentially fix
      //on server side call
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: [...state.lendingLibraryIDs, bookID],
      });
      dispatch({
        type: SET_LENDING_LIBRARY,
        payload: [...state.lendingLibrary, book],
      });
    }
    try {
      await fetch(`/api/user/lendingLibrary/${bookID}`, {
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
    } catch (error) {
      // If the server request fails, revert the local state
      if (color === "success") {
        setColor("error" as CustomColor);
        setToolTip(<h1>Remove from Lending Library</h1>);
        // Add the book back to the wishlist locally
        dispatch({
          type: SET_LENDING_LIBRARY_IDS,
          payload: [...state.lendingLibraryIDs, book.id],
        });
      } else {
        setColor("success" as CustomColor);
        setToolTip(<h1>Add to Lending Library</h1>);
        // Remove the book from the wishlist locally
        dispatch({
          type: SET_LENDING_LIBRARY_IDS,
          payload: state.lendingLibraryIDs.filter((b) => b !== bookID),
        });
      }
    }
  };
  useEffect(() => {
    console.log(lendingLibraryIDs);
    if (isInLendingLibrary) {
      setColor("success" as CustomColor);
      setToolTip(<h1>Remove from Lending Library</h1>);
    } else {
      setColor("error" as CustomColor);
      setToolTip(<h1>Add to Lending Library</h1>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip title={toolTip} placement='top-end'>
      <IconButton
        aria-label='Lending Library'
        size='small'
        color={color === "danger" ? "error" : color}
        onClick={lendingLibraryAction}
      >
        <LibraryBooksIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LendingLibraryButton;
