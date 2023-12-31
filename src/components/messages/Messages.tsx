import { useRef, useState, useEffect } from "react";
import MessagesIcon from "@mui/icons-material/Message";
import Typography from "@mui/material/Typography";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import { Conversations, DirectMessages, User } from "@prisma/client";
import { useTheme } from "@mui/material/styles";
import { css } from "@compiled/react";
import { useScrollbarWidth } from "./hooks/useScrollbarWidth";
import { DrawerButton, StyledDrawer } from "./messageStyle";
import { MessagesDrawer } from "./components/components/MessagesDrawer";
import { useHomeState } from "../../context/context";

type AutoCompleteData = {
  userName: string;
  id: string;
};

interface DirectMessage extends DirectMessages {
  sender: User;
}

interface Conversation extends Conversations {
  messages: DirectMessage[];
}
type UserWithConversations = Conversation[];

interface ReplyObject {
  names: AutoCompleteData[];
  userWithConversations: UserWithConversations;
}

export function Messages() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [newMessages, setNewMessages] = useState(true);
  const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData[]>(
    []
  );
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useHomeState();
  const userId = user?.id;

  const drawerRef = useRef();
  const scrollbarWidth = useScrollbarWidth();
  const drawerButtonRight = isOpen ? 0 : scrollbarWidth;
  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  useEffect(() => {
    if (userId) {
      fetch(`/api/messages/getUserNamesConvos?userId=${userId}`)
        .then((response) => response.json())
        .then((replyObject: ReplyObject) => {
          const { names, userWithConversations } = replyObject;
          setAutoCompleteData(names);
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
        <DrawerButton
          onClick={toggleDrawer(true)}
          style={{
            width: `calc(350px - ${theme.spacing(2)})`,
            zIndex: theme.zIndex.drawer + 2,
            right: theme.spacing(2),
            boxShadow: theme.shadows[1],
          }}
        >
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
      <MessagesDrawer
        autoCompleteData={autoCompleteData}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        drawerRef={drawerRef}
        scrollbarWidth={scrollbarWidth}
        conversations={conversations}
      />
    </>
  );
}
