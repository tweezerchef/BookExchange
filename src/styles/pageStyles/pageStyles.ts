import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const BackgroundImageContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const LibraryCardBox = styled(Box)`
display: flex;
justify-content: center;
align-content: center;
mt: 0
width: auto;
height: auto;
`;

export const RegisterBox = styled(Box)`
  position : relative;
  min-height: 600px;
  min-width: 600px;
  max-width: 1000px;
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
