import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import  Stack  from "@mui/material/Stack";

export const OuterBox = styled(Box)`
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        width: 100%;
        position: relative;
        //   marginTop: 1.5vh;
        //   paddingBottom: 0;
        `
export const LeftIconButton = styled(IconButton)`
padding: 0;
left: 0;
`;
export const RightIconButton = styled(IconButton)`
  padding: 0;
  right: 0;
`;

export const BookBox = styled(Box)`
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        `


