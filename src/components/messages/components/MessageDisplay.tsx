/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */

import { FC, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Conversations, DirectMessages, User } from "@prisma/client";

import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { useHomeState } from "../../../context/context";
import { clientGetS3URL } from "../../../utils/clientUtils/clientGetS3URL";

interface DirectMessage extends DirectMessages {
  sender: User;
}

interface Conversation extends Conversations {
  messages: DirectMessage[];
}
type AutoCompleteData = {
  userName: string;
  id: string;
};

interface MessageDisplayProps {
  conversation?: Conversation;
  // eslint-disable-next-line react/no-unused-prop-types
  conversations?: Conversation[];
  userNames: AutoCompleteData[];
  setActiveConversation?: (value: Conversation) => void;
}

export const MessageDisplay: FC<MessageDisplayProps> = ({
  conversation,
  conversations,
  userNames,
  setActiveConversation,
}) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState<string>(conversation?.title || "");
  const userId = useHomeState().user.id;
  console.log("conversations", conversations);
  const handleSendMessage = async () => {
    console.log(
      "Sending message:",
      message,
      conversation?.id,
      userId,
      userNames
    );
    const newMessage = await fetch("/api/messages/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationId: conversation?.id || null,
        userId,
        memberIds: userNames,
      }),
    });
    const parsedNewMessage = await newMessage.json();
    console.log("newMessage", parsedNewMessage);
  };

  return (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box
        flexGrow={1}
        overflow='auto'
        sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      >
        {conversation ? (
          <List>
            {conversation.messages.map((msg: DirectMessage) => (
              <>
                <ListItem key={msg.id}>
                  {/* <Avatar src={msg.sender.picture} /> */}
                  <ListItemText primary={msg.message} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        ) : Array.isArray(conversations) && conversations.length > 0 ? (
          <List>
            {conversations.map((convo: Conversation) => (
              <>
                <ListItem
                  onClick={() => setActiveConversation(convo)}
                  key={convo.id}
                >
                  <Avatar src={convo.messages[0].sender.picture} />
                  <ListItemText primary={convo.messages[0].message} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        ) : (
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Create A Conversation Title'
          />
        )}
      </Box>
      <Box display='flex' alignItems='center' gap={2} padding={1}>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message'
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </Box>
    </Box>
  );
};

export default MessageDisplay;
