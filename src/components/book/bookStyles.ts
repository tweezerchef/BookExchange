import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export const StyledBookCard = styled(Card)`
  width: 18vw;
  height: 20vw;
  min-height: 200px;
  max-height: 250px;
  min-width: 220px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s, background-color 0.3s;

&:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Adjust shadow as needed */
  background-color: rgba(230, 244, 253, 0.836);
}
//eventually add some sort of animation to the card when it is clicked
`;
export const TopContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;
  justify-content: start;
  align-items: start;
  background-color: transparent;
`;

export const ImageBox = styled(Box)`
  position: relative;
  width: 80%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const SideOfImageBox = styled(Box)`
  display: flex;
  /* position: relative; */
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  background-color: transparent;
  cursor: pointer;
`;

export const ContentContainer = styled(Box)`
  margin-top: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center; // Vertically center the content
  align-items: center; // Horizontally center the content
  justify-items: center;
  width: 100%;
  height: auto; // Take up the remaining space
  text-align: center; // Center the text
  text-justify: center;
`;

export const TitleTypography = styled(Typography)`
  /* max-height: 50%; // Adjust as needed */
  text-overflow: ellipsis;
  white-space: pre-line;
  line-height: 1.2em; // Or whatever line height you want
  /* padding: 0 5px; // Add some padding to prevent text touching the edges */
`;
