import { useRef, useState, useLayoutEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MessagesIcon from "@mui/icons-material/Message";

import Typography from "@mui/material/Typography";
import { DrawerButton, OpenDrawerButton, StyledDrawer } from "./messageStyle";

type KnownEvent = KeyboardEvent | MouseEvent;
function useScrollbarWidth() {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useLayoutEffect(() => {
    const calculateScrollbarWidth = () => {
      const documentWidth = document.documentElement.clientWidth;
      const windowWidth = window.innerWidth;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const scrollbarWidth = windowWidth - documentWidth;
      setScrollbarWidth(scrollbarWidth);
    };

    // Calculate it initially and whenever the window is resized
    calculateScrollbarWidth();
    window.addEventListener("resize", calculateScrollbarWidth);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", calculateScrollbarWidth);
  }, []);

  return scrollbarWidth;
}

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
        <OpenDrawerButton onClick={toggleDrawer(false)}>
          <MessagesIcon />
          <Typography variant='subtitle1' sx={{ ml: 1 }}>
            Messages
          </Typography>
        </OpenDrawerButton>
        <List sx={{ width: "100%" }}>
          {messages.map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
      {!isOpen && (
        <DrawerButton
          onClick={toggleDrawer(true)}
          sx={{ right: `${drawerButtonRight}px` }}
        >
          <MessagesIcon />
          <Typography variant='subtitle1' sx={{ ml: 1 }}>
            Messages
          </Typography>
        </DrawerButton>
      )}
    </>
  );
}
