import { FC, useEffect, useState } from "react";
import MessagesIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { OpenDrawerBox } from "../messageStyle";
import { SearchField } from "./components/SearchField";

type AutoCompleteData = string;
interface MessagesHeaderProps {
  toggleDrawer: (open: boolean) => () => void;
  autoCompleteData: AutoCompleteData[];
}

type UserNames = string;

export const MessagesHeader: FC<MessagesHeaderProps> = ({
  toggleDrawer,
  autoCompleteData,
}) => {
  const [search, setSearch] = useState<string>("");
  const [userNames, setUserNames] = useState<UserNames[]>([]);
  const isValidUser = autoCompleteData.includes(search);

  const handleAdd = () => {
    if (autoCompleteData.includes(search)) {
      console.log(search);
      setUserNames([...userNames, search]);
      setSearch("");
    } else {
      // Handle invalid username (e.g., show an error message)
      console.log("Invalid username");
    }
  };

  return (
    <OpenDrawerBox>
      <Box justifyContent='left'>
        <KeyboardArrowDownIcon onClick={toggleDrawer(false)} />
      </Box>

      <SearchField setSearch={setSearch} autoCompleteData={autoCompleteData} />

      <AddIcon
        onClick={handleAdd}
        style={{ color: isValidUser ? "inherit" : "red" }}
      />
      <MessagesIcon />
    </OpenDrawerBox>
  );
};
