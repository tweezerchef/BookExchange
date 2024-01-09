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
  justify-content: flex-start;
  padding: .5rem;
  margin: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  height: auto;

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
export const StarRatingBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const UnderStarBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 150px;
  max-width: 80%;
  width: 100%;
`;



export const ImageBox = styled(Box)`
  transition: box-shadow 0.3s;
  position: relative;
  width: 80px;
  height: 150px;
  overflow: hidden;
  background-color: transparent;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  text-align: center;
  text-justify: center;
  background-color: transparent;
`;

export const TitleTypography = styled(Typography)`
    font-size: .8rem;
    justify-self: center;
    text-overflow: ellipsis;
    letter-spacing: 0.4px;
    white-space: nowrap;
    overflow: hidden;
`;
export const AuthorTypography = styled(Typography)`
  font-size: .7rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
