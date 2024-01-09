import { styled } from '@compiled/react'
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export const StyledClubCard = styled(Card)`
width: 280px;
height: 140px;
border-radius: 10px;
display: flex;
flex-direction: row;
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
        width: 280px;
        height: 140px;
      }
      @media (max-width: ${breakpoints.values.sm}px) {
        width: 150px;
        height: 72px;
      }

      @media (max-width: ${breakpoints.values.xs}px) {
        width: 150px;
        height: 73px;
      }
`;

export const StyledClubBox = styled(Box)`
position: relative;
display: grid;
grid-template-rows: 2fr 1fr;
width: 50%;
height: 100%;
flex-direction: row;
`;

export const ClubImageBox = styled(Box)`
position: relative;
height: 100%;
width: 50%;
padding-top: 1em;
justify-self: center;
`;
export const LowerClubBox = styled(Box)`
position: relative;
display: grid;
height: 100%;
flex-direction: row;
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


