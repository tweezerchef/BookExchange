import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FC, useState, useEffect } from "react";
import { useHomeState } from "../../../context/context";

interface AddFriendButtonProps {
  friendId: string;
}

export const AddFriendButton: FC<AddFriendButtonProps> = ({ friendId }) => {
  const [isFriend, setIsFriend] = useState(false);
  const {
    user: { id: userId },
  } = useHomeState() || {};

  const follow = () => {
    setIsFriend((prevIsFriend) => !prevIsFriend);
    const action = isFriend;
    fetch(`/api/user/friendRoute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, userId, friendId }),
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        if ("message" in data) {
          console.log(data.message);
        }
      })
      .catch((error) => {
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
        right: "1.7rem",
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
