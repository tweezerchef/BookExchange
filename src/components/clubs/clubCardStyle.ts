import { styled } from "@mui/material/styles";
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

export const StyledClubCard = styled(Card)`
width: 300px;
height: 144px;
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
        width: 300px;
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
width: 100%;
padding-top: 1em;
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
  font-size: 1rem; // Smaller font size on medium screens
}
@media (max-width: ${breakpoints.values.sm}px) {
  font-size: 0.8rem; // Smaller font size on small screens
}

@media (max-width: ${breakpoints.values.xs}px) {
  font-size: 0.7rem; // Even smaller font size on extra small screens
}

&:hover {
    color: #333;
}
`;


