import { styled } from '@compiled/react'
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const breakpoints = {
  values: {
    xs: 0, // mobile
    sm: 600, // tablets
    md: 960, // small laptop
    lg: 1280, // desktop
    xl: 1920, // large screens
  },
};

export const StyledProfileCard = styled(Card)`
width: 160px;
height: 144px;
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
position: relative;
transition: box-shadow 0.3s, background-color 0.3s;
overflow: hidden;
    background: linear-gradient(135deg, #e1e8ed, #8bc0f5d2);
    border: .5px solid #acace6a1;
    transition: box-shadow 0.3s, background-color 0.3s;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background: linear-gradient(135deg, #e1e8ed, #569adfd2)
      }
      padding: 1em;
      @media (max-width: ${breakpoints.values.md}px) {
        width: 160px;
        height: 144px;
      }
      @media (max-width: ${breakpoints.values.sm}px) {
        width: 160px;
        height: 144px;
      }

      @media (max-width: ${breakpoints.values.xs}px) {
        width: 140px;
        height: 126px;
      }
`;

export const StyledAvatar = styled(Avatar)`
width: 70px;
height: 70px;
border: 1.5px solid #e0e0e0;
box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

export const GenreBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: center;
gap: 1.5em;
background-color: rgba(240, 240, 240, 0.5);
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
font-size: 1rem;
justify-self: center;
text-overflow: ellipsis;
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
letter-spacing: 0.4px;
white-space: pre-line;
line-height: 1.1em;
margin-top: .03em;
padding-top: 15px;
@media (max-width: ${breakpoints.values.md}px) {
  font-size: 1rem;
}
@media (max-width: ${breakpoints.values.sm}px) {
  font-size: 0.8rem;
}

@media (max-width: ${breakpoints.values.xs}px) {
  font-size: 0.7rem;
}

&:hover {
    color: #333;
}
`;

export const CityTypography = styled(Typography)`
font-size: .9rem;
justify-self: center;
text-overflow: ellipsis;
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
letter-spacing: 0.4px;
white-space: pre-line;
line-height: 1.1em;
@media (max-width: ${breakpoints.values.md}px) {
  font-size: .85rem;
}
@media (max-width: ${breakpoints.values.sm}px) {
  font-size: 0.8rem;
}

@media (max-width: ${breakpoints.values.xs}px) {
  font-size: 0.7rem;
}

&:hover {
    color: #333;
}
`;


