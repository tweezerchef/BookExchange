/* eslint-disable react/require-default-props */
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FC, useState } from "react";
import { useHomeState } from "../../../context/context";

interface AddFriendButtonProps {
  friendId: string;
  isFriend: boolean;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export const AddFriendButton: FC<AddFriendButtonProps> = ({
  friendId,
  isFriend: initialIsFriend,
  user = null,
}) => {
  const [isFriend, setIsFriend] = useState(initialIsFriend);
  const homeState = useHomeState();
  const userId = user?.id ?? homeState?.user?.id;

  const follow = () => {
    setIsFriend((prevIsFriend) => !prevIsFriend);
    const action = isFriend;
    fetch(`/api/user/friendRoute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, userId, friendId }),
    }).catch((error) => {
      console.error("Error fetching signed URL:", error);
    });
  };

  return (
    <IconButton
      aria-label='Lending Library'
      size='small'
      color={isFriend ? "secondary" : "primary"}
      sx={{
        position: "absolute",
        borderRadius: "50%",
        right: -20,
        transform: "translate(50%, -50%)",
      }}
      onClick={follow}
    >
      <Tooltip
        title={isFriend ? "Unfollow" : "Follow"}
        placement='top-start'
        arrow
      >
        {isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
      </Tooltip>
    </IconButton>
  );
};
