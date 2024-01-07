import { styled } from '@compiled/react'
import Box, { BoxProps } from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

interface OuterWrapperBoxProps extends BoxProps {
  isMobile: boolean;
}

interface MobileBoxProps extends BoxProps {
  booksPerPage: number;
}

export const OuterWrapperBox = styled(Box)<OuterWrapperBoxProps>`
  ${({ isMobile }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    minWidth: isMobile ? "100%" : "630px",
    minHeight: isMobile ? "30vw" : "200px",
    height: isMobile ? "80vw" : "20vw",
    maxHeight: isMobile ? "30vw" : "220px",
    marginTop: isMobile ? ".2vh" : "1.5vh",
    overflow: "hidden",
    paddingBottom: 0,
  })}
`;
export const MobileBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'booksPerPage',
})({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  justifyContent: 'center',
  width: '100%',
  overflowX: 'hidden',
  minHeight: '230px',
  height: '100%',
});

export const OuterBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  min-height: 230px;
  height: 100%;
`;
export const LeftIconButton = styled(IconButton)<{ booksPerPage: number }>`
  position: absolute;
  left: ${({ booksPerPage }) => {
    const halfCardWidth = '225px';
    if (booksPerPage === 2) {
      return `calc(50% - ${halfCardWidth})`;
    } if (booksPerPage === 1) {

      return `calc(50% - ${halfCardWidth})`;
    }
    return '0px';
  }};
  z-index: 1;
`;
export const RightIconButton = styled(IconButton)<{ booksPerPage: number}>`
  position: absolute;
  right: ${({ booksPerPage}) => {
    const halfCardWidth = `${225}px`;
    if (booksPerPage === 2) {
      return `calc(50% - ${halfCardWidth})`;
    } if (booksPerPage === 1) {
      return `calc(50% - ${halfCardWidth})`;
    }
    return `0px`;
  }};
  z-index: 1;
`;

export const BookBox = styled(Box)`
  top: 0;
  marginLeft: 3px;
  marginRight: 3px;
  width: 100%;
  height: 100%;
`;

export const ExploreBooksBoxWrapper = styled(Box)<OuterWrapperBoxProps>`
${({ isMobile }) => ({
  minHeight: isMobile ? "30vw" : "150px",
  maxHeight: isMobile ? "80vw" : "300px",
  marginTop: isMobile ? ".2vh" : "1.5vh",
  minWidth: isMobile ? "100%" : "630px",
  width: "100%",
  overflow: "clip",
  alightItems: "center",
  alightContent: "center",
})}
`;
