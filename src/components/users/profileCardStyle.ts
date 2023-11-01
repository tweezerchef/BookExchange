import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";


export const StyledProfileCard = styled(Card)`
    width: 18vw;
    height: 20vw;
    min-width: 150px;
    max-width: 200px;
    min-height: 200px;
    max-height: 230px;
    overflow: clip; // Add this to hide content that overflows the card
    display: flex;
    flex-direction: column;
`;
