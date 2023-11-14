import { styled } from "@mui/material/styles";
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
    minHeight: isMobile ? "30vw" : "200px",
    height: isMobile ? "80vw" : "20vw",
    maxHeight: isMobile ? "30vw" : "220px",
    marginTop: isMobile ? ".2vh" : "1.5vh",
    overflow: "hidden",
    paddingBottom: 0,
  })}
`;
export const MobileBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'booksPerPage', // This prevents the custom prop from being forwarded to the DOM element
})<MobileBoxProps>(({ booksPerPage, theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto', // Make sure to use camelCase for the overflowX property
  scrollSnapType: 'x mandatory',

  '& > div': {
    flex: 'none',
    scrollSnapAlign: 'start',
    width: `calc((100% / ${booksPerPage}) - 10px)`, // Use the booksPerPage variable directly
    marginRight: '10px', // Add some space between the items
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none', // Use camelCase for the scrollbarWidth property
}));

export const OuterBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  min-height: 230px;
  height: 100%;
  //   marginTop: 1.5vh;
  //   paddingBottom: 0;
`;
export const LeftIconButton = styled(IconButton)`
  position: absolute;
  left: 0;
  z-index: 1;
`;
export const RightIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
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
  width: "100%",
  overflow: "clip",
  alightItems: "center",
  alightContent: "center",
})}
`;

// export const ExploreBooksBox = styled(Box)<OuterWrapperBoxProps>`
// ${({ isMobile }) => ({

// })}
// `