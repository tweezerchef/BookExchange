import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const BackgroundImageContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const RegisterBox = styled(Box)`
  position : relative;
  min-height: 600px;
width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: transparent;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.1);

  text-align: center;
`;
export const CreateClubBox = styled("div")`
  position : relative;
  `;

export const HeaderContainer = styled(Container)`
position: sticky;
top: 0;
z-index: 1100; // Keep it on top of other elements if necessary
margin-top: 2em;
margin-bottom: 2em;
padding: 0;
@media (max-width: 960px) {
  width: 100%;
}
`;
export const ContentContainer = styled(Container)`
  overflow-y: auto; // Makes the content area scrollable
  max-height: calc(100vh - 100px); // Adjust the 100px to the actual combined height of your header and any other non-scrollable content above the ContentContainer
  position: relative;
`;