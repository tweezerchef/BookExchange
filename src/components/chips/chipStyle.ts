import { styled } from '@compiled/react'
import { blueGrey } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import  Divider  from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

export const StyledDivider = styled(Divider)`
    width: 100%;
    color: ${blueGrey[100]};
`;

export const FlameStyledChip = styled(Chip)`
    background-image: url("https://i.imgur.com/N9ZrzL0.jpg");
    width: 100%;
    color: black;
    size: lg;
`
export const ChipContainer = styled("div")({
    display: "inline-flex",
    alignItems: "center",
    width: "300px",
    backgroundColor: "transparent",
    padding: "5px 10px",
    borderRadius: "100px",
    gap: "5px",
  });

  export const RoundedTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      width : "300px",
    },
  });
