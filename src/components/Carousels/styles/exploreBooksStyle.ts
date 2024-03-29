import { styled } from '@compiled/react'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";



export const OuterWrapperBox = styled(Box)`
position: relative;
display: flex;
align-items: center;
flex-direction: row;
justify-content: center;
width: 100%;
height: 20vw;
min-height: 160px;
max-height: 220px;
margin-top: 1.5vh;
overflow: hidden;
padding-bottom: 0;

`;
export const GridContainer = styled(Box)`
  display: grid;
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
  padding: 16px;

`;

export const MobileBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  flexGap: '5em',
  justifyContent: 'center',
  width: '100%',
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
  min-height: 200px;
  max-height: 300px;
  margin-top: 1.5vh;
  min-width: 630px;
  width: 100%;
  overflow: clip;
  align-items: center;
  align-content: center;


  @media (max-width: 450px) {
    height: 230px;
    margin-top: 0.2vh;
    min-width: 100%;
    overflow-x: auto;
  }
`;
