import { useRef, useState, useLayoutEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MessagesIcon from "@mui/icons-material/Message";
import Typography from "@mui/material/Typography";
import { useScrollbarWidth } from "./hooks/useScrollbarWidth";
import { DrawerButton, OpenDrawerButton, StyledDrawer } from "./messageStyle";
import { MessagesHeader } from "./components/MessagesHeader";

type KnownEvent = KeyboardEvent | MouseEvent;

export function MessagesDrawerComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef();
  const scrollbarWidth = useScrollbarWidth();
  const drawerButtonRight = isOpen ? 0 : scrollbarWidth;
  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  // Placeholder for messages
  const messages = ["Message 1", "Message 2", "Message 3"];

  return (
    <>
      <StyledDrawer
        anchor='bottom'
        open={isOpen}
        onClose={toggleDrawer(false)}
        ref={drawerRef}
        scrollbarWidth={isOpen ? scrollbarWidth : 0}
      >
        <MessagesHeader toggleDrawer={toggleDrawer} />
        <List sx={{ width: "100%" }}>
          {messages.map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
      {!isOpen && (
        <DrawerButton onClick={toggleDrawer(true)}>
          <MessagesIcon />
          <Typography variant='subtitle1' sx={{ ml: 1 }}>
            Messages
          </Typography>
        </DrawerButton>
      )}
    </>
  );
}
