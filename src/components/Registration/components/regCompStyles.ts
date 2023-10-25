
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

export const Wrapper = styled("div")(({ theme }) => ({
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      zIndex: 2,
    },
  }));

export const HiddenFileInput = styled("input")({
    display: "none",
  });

export const LargeAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
  }));
