import { styled } from '@compiled/react'
import Box, { BoxProps } from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

interface OuterWrapperBoxProps extends BoxProps {
  isMobile: boolean;
}

interface MobileBoxProps extends BoxProps {
  booksPerPage: number;
}

export const OuterWrapperBox = styled(Box)`
position: relative;
display: flex;
align-items: center;
flex-direction: row;
justify-content: center;
width: 100%;
height: 20vw;
max-height: 220px;
margin-top: 1.5vh;
overflow: hidden;
padding-bottom: 0;

@media (min-width: 450px) {
  width: 100%;
  height: 100%;
  margin-top: 0.2vh;
}
`;

export const MobileBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  flexGap: '5em',
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
  margin-left: 3px;
  margin-right: 3px;
  width: 100%;
  height: 100%;
`;

export const ExploreBooksBoxWrapper = styled(Box)`
  min-height: 150px;
  max-height: 300px;
  margin-top: 1.5vh;
  min-width: 630px;
  width: 100%;
  overflow: clip;
  align-items: center;
  align-content: center;


  @media (max-width: 450px) {
    min-height: 30vw;
    max-height: 80vw;
    margin-top: 0.2vh;
    min-width: 100%;
  }
`;
