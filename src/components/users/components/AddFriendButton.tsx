import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FC, useState, useEffect } from "react";

export const AddFriendButton: FC = () => {
  const [isFriend, setIsFriend] = useState(false);
  const [buttonText, setButtonText] = useState("Follow" || "Unfollow");

  const follow = () => {
    setIsFriend((prevIsFriend) => !prevIsFriend);
    setButtonText((prevButtonText) =>
      prevButtonText === "Follow" ? "Unfollow" : "Follow"
    );
  };

  return (
    <div>
      <Tooltip title={isFriend ? "Unfollow" : "Follow"} placement='top-end'>
        <IconButton
          aria-label='Lending Library'
          size='small'
          color={isFriend ? "secondary" : "primary"}
          sx={{
            position: "absolute",
            borderRadius: "50%",
            right: "1.7rem", // Set right and top values
            transform: "translate(50%, -50%)",
          }}
          onClick={follow}
        >
          {isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
};
