import { styled, css } from '@compiled/react'
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import { Popover } from "@mui/material";

export const Wrapper = styled(Box)({
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  })

export const hiddenFileInputStyle = css({
  display: 'none',
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

 export const Step1Dialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      backgroundColor: "#ffd700", // Or any other color from your palette
      borderRadius: theme.shape.borderRadius,
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

 export const Step2Dialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#ffd700", // Or any other color from your palette
    borderRadius: theme.shape.borderRadius,
    position: 'fixed', // Ensures the dialog is positioned in relation to the viewport
    top: '1%', // Adjust the vertical position
    left: '40%', // Adjust the horizontal position
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
export const StarRatingPopover = styled(Popover)({
  "& .MuiPopover-paper": {
    backgroundColor: "#ffd700", // Or any other color from your palette
    borderRadius: 10,
  },
})
