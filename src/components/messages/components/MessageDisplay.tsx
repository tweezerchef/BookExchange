/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
// components/messages/MessageDisplay.js
import { FC, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Conversations, DirectMessages, User } from "@prisma/client";
import { Avatar } from "@mui/material";

interface DirectMessage extends DirectMessages {
  user: User;
}

interface Conversation extends Conversations {
  messages: DirectMessage[];
}

interface MessageDisplayProps {
  conversation?: Conversation;
  // eslint-disable-next-line react/no-unused-prop-types
  conversations?: Conversation[];
}

export const MessageDisplay: FC<MessageDisplayProps> = ({ conversation }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Send message logic here
    console.log("Sending message:", message);
    // Reset the message field
    setMessage("");
  };

  return (
    <Box>
      {conversation &&
      Array.isArray(conversation) &&
      conversation.length > 0 ? (
        <List>
          {conversation.messages.map((msg, index) => (
            <ListItem key={index}>
              <Avatar src={msg.user.picture} />
              <ListItemText primary={msg.text} />
            </ListItem>
          ))}
        </List>
      ) : (
        <p>Start a conversation</p>
      )}
      <Box>
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
