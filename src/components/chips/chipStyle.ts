import { styled } from "@mui/system";
import { blueGrey } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import  Divider  from "@mui/material/Divider";

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