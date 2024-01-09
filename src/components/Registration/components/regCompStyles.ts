import { styled, css } from "@compiled/react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
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
});

export const hiddenFileInputStyle = css({
  display: "none",
});



export const LargeAvatar = styled(Avatar)({
  margin: 4,
  width: 7,
  height:7,
});

export const BigIconButton = styled(IconButton)({
  size: "large",
  margin: 4,
  "&:hover": {
    backgroundColor: "rgba(23, 58, 212, 0.459)",
  },
});

export const Step1Dialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    backgroundColor: "#ffd700",
    borderRadius: 4,
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    fontWeight: "bold",
  },
  "& .MuiDialogContentText-root": {
    color: '#000',
  },
  "& .MuiDialogActions-root": {
    justifyContent: "space-around",
  },
});

export const Step2Dialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    backgroundColor: "#ffd700",
    borderRadius: 4,
    position: "fixed",
    top: "1%",
    left: "40%",
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    fontWeight: "bold",
  },
  "& .MuiDialogContentText-root": {
    color: '#000',
  },
  "& .MuiDialogActions-root": {
    justifyContent: "space-around",
  },
});
export const StarRatingPopover = styled(Popover)({
  "& .MuiPopover-paper": {
    backgroundColor: "#ffd700",
    borderRadius: 10,
  },
});
