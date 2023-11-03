import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export const StyledProfileCard = styled(Card)`
    width: 18vw;
    height: 18vw;
    min-width: 170px;
    max-width: 190px;
    min-height: 238px;
    max-height: 250px;
    overflow: clip;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: linear-gradient(135deg, #e1e8ed, #8bc0f5d2);
    border: .5px solid #acace6a1;
    transition: box-shadow 0.3s, background-color 0.3s;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg, #e1e8ed, #569adfd2)
      }
      padding: 1em;
`;

export const StyledAvatar = styled(Avatar)`
width: 85px;
height: 85px;
border: 1.5px solid #e0e0e0;
boxShadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

export const GenreBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: center;
gap: 1.5em;
backgroundColor: rgba(240, 240, 240, 0.5);
padding: 0.5em;
border-radius: 8px;

`;


export const AvatarBox = styled(Box)`
position: relative;
display: flex;
justify-content: center;
padding-top: 1em;
gap: 1em;
`;

export const NameTypography = styled(Typography)`
fontWeight: 600;
textShadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
margin-bottom: 0.2em;
font-weight: 500;
`;
