import { FC, useState } from "react";
import { Conversations, DirectMessages, User } from "@prisma/client";
import { useHomeState } from "../../../../context/context";
import { StyledDrawer } from "../../messageStyle";
import { MessageDisplay } from "../MessageDisplay";
import { MessagesHeader } from "../MessagesHeader";

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
  const [userNames, setUserNames] = useState<AutoCompleteData[]>([]);
  const [search, setSearch] = useState<AutoCompleteData>();
  const [activeConversation, setActiveConversation] =
    useState<Conversation>(null);

  const handleActiveConversation = async (conversation: Conversation) => {
    try {
      const response = await fetch(
        `/api/messages/getConversation?conversationId=${conversation.id}`
      );
      const newActiveConversation: Conversation =
        (await response.json()) as Conversation;
      setActiveConversation(newActiveConversation);
    } catch (error) {
      console.error(error);
    }
  };

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
        setActiveConversation={void handleActiveConversation}
        search={search}
        setSearch={setSearch}
        setUserNames={setUserNames}
        userNames={userNames}
      />
      {activeConversation ? (
        <MessageDisplay
          conversation={activeConversation}
          userNames={userNames}
        />
      ) : (
        <MessageDisplay
          conversations={conversations}
          userNames={userNames}
          setActiveConversation={setActiveConversation}
        />
      )}
    </StyledDrawer>
  );
};
