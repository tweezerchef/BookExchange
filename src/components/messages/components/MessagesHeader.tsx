import { FC, useState } from "react";
import MessagesIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Conversations, DirectMessages, User } from "@prisma/client";
import { OpenDrawerBox } from "../messageStyle";
import { SearchField } from "./components/SearchField";

type AutoCompleteData = {
  userName: string;
  id: string;
};

interface DirectMessage extends DirectMessages {
  user: User;
}

interface Conversation extends Conversations {
  messages: DirectMessage[];
}
interface MessagesHeaderProps {
  toggleDrawer: (open: boolean) => () => void;
  autoCompleteData: AutoCompleteData[];
  setActiveConversation: (value: Conversation) => void;
  search: AutoCompleteData;
  setSearch: (value: AutoCompleteData) => void;
  setUserNames: (value: AutoCompleteData[]) => void;
  userNames: AutoCompleteData[];
}

export const MessagesHeader: FC<MessagesHeaderProps> = ({
  toggleDrawer,
  autoCompleteData,
  setActiveConversation,
  search,
  setSearch,
  setUserNames,
  userNames,
}) => {
  const isValidUser =
    search && autoCompleteData.some((user) => user.id === search.id);
  // const findOrCreateConversationWithUser = (
  //   userNames,
  //   title,
  //   conversationId = null
  // ) =>
  //   // Fetch or create a conversation with this user
  //   // This can be an API call or a local state query depending on your application logic
  //   // For now, returning a placeholder
  //   ({
  //     id: "new-conversation-id", // This would be the actual conversation ID
  //     messages: [], // This would be the actual conversation messages
  //   });
  const handleAdd = () => {
    if (isValidUser && !userNames.some((u) => u.id === search.id)) {
      console.log("Adding user", userNames, search);
      setUserNames([...userNames, search]);
      setSearch(null); // Reset search after adding
    } else {
      console.log("Invalid username");
    }
    // Find the conversation with this user or create a new one
    // const conversation = findOrCreateConversationWithUser(userNames);
    // setActiveConversation(conversation);
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
