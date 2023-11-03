import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export const StyledBookCard = styled(Card)`
  width: 18vw;
  height: 20vw;
  min-height: 205px;
  max-height: 220px;
  min-width: 220px;
  max-width: 220px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: box-shadow 0.3s, background-color 0.3s;

&:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Adjust shadow as needed */
  background-color: #ffffff94;
}
.backgroundImage{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: -1;
}
`;

export const TopContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 65%;
  justify-content: start;
  align-items: start;
  background-color: transparent;
`;

export const ImageBox = styled(Box)`
  transition: box-shadow 0.3s;
  position: relative;
  width: 80%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.15);
  }
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
  padding: 0.5em;
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
    justify-self: center;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    letter-spacing: 0.4px;
    white-space: pre-line;
    line-height: 1.2em;
    padding: 0 5px;
    margin-bottom: 5px;

    &:hover {
        color: #333;
    }
`;
export const AuthorTypography = styled(Typography)`
  text-overflow: ellipsis " [..]";
  white-space: pre-line;
  line-height: 1.2em; // Or whatever line height you want
`;
