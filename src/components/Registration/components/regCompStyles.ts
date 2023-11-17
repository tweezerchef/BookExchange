
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";

export const Wrapper = styled(Box)({
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  })

export const HiddenFileInput = styled("input")({
    display: "none",
  });

export const LargeAvatar = styled(Avatar)(({ theme }) => ({  margin: 4,
    width: theme.spacing(7),
    height: theme.spacing(7),
  }));

export const  BigIconButton = styled(IconButton)({
  size: "large",
  margin: 4,
  "&:hover": {
    backgroundColor: "rgba(23, 58, 212, 0.459)", // This is white with 10% opacity
  },

  })

 export const CustomDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      backgroundColor: "#ffd700", // Or any other color from your palette
      borderRadius: theme.shape.borderRadius,
      position: 'fixed', // Ensures the dialog is positioned in relation to the viewport
    top: '10%', // Adjust the vertical position
    right: '10%', // Adjust the horizontal position
    transform: 'translate(-10%, -10%)', // Adjust these v
    },
    "& .MuiDialogTitle-root": {
      textAlign: "center",
      fontWeight: "bold",
    },
    "& .MuiDialogContentText-root": {
      color: theme.palette.common.black, // Adjust text color as needed
    },
    "& .MuiDialogActions-root": {
      justifyContent: "space-around",
    },
  }));
