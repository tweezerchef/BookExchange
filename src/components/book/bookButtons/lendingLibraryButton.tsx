import React, { useContext, useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import UserContext from "../../hooks/Context";
// import { Book } from "../../typings/types";

type CustomColor = "success" | "danger";

interface LendingLibraryButtonProps {
  book: Book;
  isLendingLibrary: boolean;
  setIsLendingLibrary: React.Dispatch<React.SetStateAction<boolean>>;
}

// function LendingLibraryButton({
//   book,
//   isLendingLibrary,
//   setIsLendingLibrary,
// }: LendingLibraryButtonProps) {
//   const userContext = useContext(UserContext);
//   const user = userContext?.user;
//   const id = user?.id;
export const LendingLibraryButton: React.FC = () => {
  const [color, setColor] = useState<CustomColor>("danger");
  // eslint-disable-next-line max-len
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(
    <h1>Add to Lending Library</h1>
  );

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // axios.post('/user-books/lendinglibrary', {
    //   book,
    //   id,
    //   color,
    // // eslint-disable-next-line no-return-assign
    // }).then((data) => (user?.UserBooks ? data.data : null));
    if (color === "success") {
      //   setIsLendingLibrary(false);
      setColor("error" as CustomColor);
      setToolTip(<h1>Add to Lending Library</h1>);
    } else {
      //   setIsLendingLibrary(true);
      setColor("success" as CustomColor);
      setToolTip(<h1>Remove from Lending Library</h1>);
    }
  };
  useEffect(() => {
    // if (isLendingLibrary) {
    //   setColor("success" as CustomColor);
    //   setToolTip(<h1>Remove from Lending Library</h1>);
    // } else {
    setColor("error" as CustomColor);
    setToolTip(<h1>Add to Lending Library</h1>);
    //}
  }, []);

  return (
    <Tooltip title={toolTip} placement="top-end">
      <IconButton
        aria-label="Lending Library"
        size="small"
        color={color === "danger" ? "error" : color}
        onClick={onClick}
      >
        <LibraryBooksIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LendingLibraryButton;
