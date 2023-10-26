
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

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

export const LargeAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
  }));
