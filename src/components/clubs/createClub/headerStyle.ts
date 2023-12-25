import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";


export const HeaderContainer = styled(Container)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #fff;
border-bottom: 1px solid #ccc;

`;
const ContentContainer = styled(Container)`
  overflow-y: auto; // Makes the content area scrollable
  /* height: calc(100vh -  Height of your header and other offsets ); */
  position: relative;
`;
