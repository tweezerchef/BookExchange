import { useRef, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MessagesIcon from "@mui/icons-material/Message";
import Typography from "@mui/material/Typography";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import { Conversations, DirectMessages, User } from "@prisma/client";
import { useScrollbarWidth } from "./hooks/useScrollbarWidth";
import { DrawerButton, StyledDrawer } from "./messageStyle";
import { MessagesHeader } from "./components/MessagesHeader";
import { useHomeState } from "../../context/context";
import { MessageDisplay } from "./components/MessageDisplay";

type AutoCompleteData = string;

interface DirectMessage extends DirectMessages {
  user: User;
}

interface Conversation extends Conversations {
  messages: DirectMessage[];
}

interface ReplyObject {
  namesArray: AutoCompleteData[];
  userWithConversations: Conversation[];
}

export function MessagesDrawerComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessages, setNewMessages] = useState(true);
  const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData[]>(
    []
  );
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation>(null);
  const { user } = useHomeState();
  const userId = user?.id;

  const drawerRef = useRef();
  const scrollbarWidth = useScrollbarWidth();
  const drawerButtonRight = isOpen ? 0 : scrollbarWidth;
  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  // Placeholder for messages
  const messages = ["Message 1", "Message 2", "Message 3"];
  useEffect(() => {
    if (userId) {
      fetch(`/api/messages/getUserNamesConvos?userId=${userId}`)
        .then((response) => response.json())
        .then((replyObject: ReplyObject) => {
          const { namesArray, userWithConversations } = replyObject;
          setAutoCompleteData(namesArray);
          setConversations(userWithConversations);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  return (
    <>
      {!isOpen && (
        <DrawerButton onClick={toggleDrawer(true)}>
          <Box justifyContent='left'>
            <KeyboardArrowUpIcon />
          </Box>
          <Box width='200px' justifyItems='center' alignContent='center'>
            <Typography variant='body1' sx={{ ml: 1, alignSelf: "center" }}>
              Messages
            </Typography>
          </Box>
          {newMessages ? (
            <MessagesIcon sx={{ color: "green" }} />
          ) : (
            <Box sx={{ width: 48, height: 48 }} />
          )}
        </DrawerButton>
      )}
      <StyledDrawer
        anchor='bottom'
        open={isOpen}
        onClose={toggleDrawer(false)}
        ref={drawerRef}
        scrollbarWidth={isOpen ? scrollbarWidth : 0}
      >
        <MessagesHeader
          toggleDrawer={toggleDrawer}
          autoCompleteData={autoCompleteData}
          setActiveConversation={setActiveConversation}
        />
        {activeConversation ? (
          <MessageDisplay conversation={activeConversation} />
        ) : (
          <MessageDisplay conversations={conversations} />
        )}
      </StyledDrawer>
    </>
  );
}
