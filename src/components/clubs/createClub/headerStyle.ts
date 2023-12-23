import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";


export const HeaderContainer = styled(Container)`
  /* position: sticky;
  z-index: 1100;
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 960px) {
    width: 100%;
  } */
`;
const ContentContainer = styled(Container)`
  overflow-y: auto; // Makes the content area scrollable
  /* height: calc(100vh -  Height of your header and other offsets ); */
  position: relative;
`;