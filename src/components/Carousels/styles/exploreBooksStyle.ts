import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Mobile } from "aws-sdk";

interface OuterWrapperBoxProps extends BoxProps {
  isMobile: boolean;
}

export const OuterWrapperBox = styled(Box)<OuterWrapperBoxProps>`
  ${({ isMobile }) => ({
    height: isMobile ? "80vw" : "20vw",
    maxHeight: isMobile ? "80vw" : "230px",
    marginTop: isMobile ? ".2vh" : "1.5vh",
    maxWidth: "100vw",
    overflowX: "hidden",
  })}
`;
export const MobileBox = styled(Box)`
display: flex;
flex-direction: row;
overflow-x: auto;
width: 100%;
height: 30vh;
&::-webkit-scrollbar: {
        display: none;
      },
      msOverflowStyle: none;
`;

export const OuterBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  min-height: 230px;
  height: 100%;
  //   marginTop: 1.5vh;
  //   paddingBottom: 0;
`;
export const LeftIconButton = styled(IconButton)`
  padding: 0;
  left: 0;
`;
export const RightIconButton = styled(IconButton)`
  padding: 0;
  right: 0;
`;

export const BookBox = styled(Box)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
