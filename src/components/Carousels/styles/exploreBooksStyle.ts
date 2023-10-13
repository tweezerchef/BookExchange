import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import  Stack  from "@mui/material/Stack";

export const OuterBox = styled(Box)`
display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: 100%;
        height: 35vw;
        max-height: 370px;
        //   marginTop: 1.5vh;
        //   paddingBottom: 0;
        `
export const StyledIconButton = styled(IconButton)`
        margin-right: 10;
        padding: 0;
        align-self: center;
        justify-self: start;

`

export const BookBox = styled(Box)`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        `
    // for some reason not working
export const BookStack = styled(Stack)`
                direction: row;
                max-width: 100%;
                max-height: 100%;
                align-content: center;
                justify-content: center;
`
