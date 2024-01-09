import { styled } from '@compiled/react'
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export const StyledBookCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: .5rem;
  margin: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  min-height: 200px;
  max-height: 250px;

&:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
  min-height: 100px;
  max-height: 120px;
  justify-content: start;
  align-items: start;
  background-color: transparent;
`;

export const ImageBox = styled(Box)`
  transition: box-shadow 0.3s;
  position: relative;
  width: 70%;
  height: 90%;
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: show;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
`;

export const ContentContainer = styled(Box)`
  padding: 0em;
  margin-top: 0.5em;
  margin-bottom: 0em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  text-justify: center;
  background-color: transparent;
`;

export const TitleTypography = styled(Typography)`
    font-size: .8rem;
    justify-self: center;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    letter-spacing: 0.4px;
    white-space: pre-line;
    line-height: 1.1em;
    padding: 0 5px;
    margin-bottom: 5px;
    &:hover {
        color: #333;
    }
`;
export const AuthorTypography = styled(Typography)`
  font-size: .9rem;
  text-overflow: ellipsis " [..]";
  white-space: pre-line;
  line-height: 1.1em;
`;
