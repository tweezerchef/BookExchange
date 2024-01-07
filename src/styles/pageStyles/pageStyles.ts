import {styled} from "@compiled/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const BackgroundImageContainer = styled.div`
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
export const CreateClubBox = styled.div`
  position : relative;
  `;

export const HeaderContainer = styled(Container)`
top: 0;
margin-bottom: 1em;
padding: 0;
/* @media (max-width: 960px) {
  width: 100%;
} */
`;
export const ContentContainer = styled(Container)`


  position: relative;
`;
export const BannerContainer = styled(Box)`
  position: relative;
  height: 500px; // Or any other height you prefer
  width: 90%;
  margin: 0 auto;
  padding: 0;
`;