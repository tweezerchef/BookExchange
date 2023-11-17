import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FC, useState, useEffect } from "react";
import { Icon } from "@mui/material";
import { useHomeState } from "../../../context/context";

export const MessageButton: FC = () => {
  const { user } = useHomeState() || {};
  const { userName } = user || {};
  return (
    <IconButton
      aria-label='Lending Library'
      size='small'
      color='primary'
      sx={{
        position: "absolute",
        borderRadius: "50%",
        right: 85, // Set right and top values // Set right and top values
        transform: "translate(50%, -50%)",
      }}
    >
      <Tooltip title={`Message ${userName}`} placement='top-end' arrow>
        <ChatBubbleIcon sx={{ transform: "scaleX(-1)" }} />
      </Tooltip>
    </IconButton>
  );
};
