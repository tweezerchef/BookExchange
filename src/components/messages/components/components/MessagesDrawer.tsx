import { FC, useState } from "react";
import { Conversations, DirectMessages, User } from "@prisma/client";
import { useHomeState } from "../../../../context/context";
import { StyledDrawer } from "../../messageStyle";
import { MessageDisplay } from "../MessageDisplay";
import { MessagesHeader } from "../MessagesHeader";
import { useScrollbarWidth } from "../../hooks/useScrollbarWidth";

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
interface MessagesDrawerProps {
  autoCompleteData: AutoCompleteData[];
  isOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
  drawerRef: React.RefObject<HTMLDivElement>;
  scrollbarWidth: number;
  conversations: Conversation[];
}

export const MessagesDrawer: FC<MessagesDrawerProps> = ({
  autoCompleteData,
  isOpen,
  toggleDrawer,
  drawerRef,
  scrollbarWidth,
  conversations,
}) => {
  const userId = useHomeState().user.id;
  const [activeConversation, setActiveConversation] =
    useState<Conversation>(null);
  return (
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
  );
};
