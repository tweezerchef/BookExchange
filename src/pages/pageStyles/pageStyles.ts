import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const BackgroundBox = styled(Box)`
  min-height: 750px;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.1);

  text-align: center;
  background-size: cover;
  background-image: url(https://nobe.s3.us-east-2.amazonaws.com/DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png);
  background-repeat: no-repeat;
  margin: auto;
`;

export const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const RegisterBox = styled(Box)`
  position : relative;
  min-height: 750px;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.1);

  text-align: center;
`;
