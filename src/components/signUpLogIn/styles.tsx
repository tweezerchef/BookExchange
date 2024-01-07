import { styled } from "@compiled/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

export const InputGroup = styled(Box)`
  width: 210px;
  text-align: left;

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled.input`
  width: 200px;
  outline: none;
  padding: 8px 16px;
  border: 1px solid #e0e6e8;
  border-radius: 4px;
  transition: box-shadow 0.2s;
  z-index: 2;
  &::placeholder {
    color: #dedede;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(169, 172, 255, 0.5);
  }
`;
export const ErrorBox = styled(Box)`
  height: 20px;
  margin: "0 10px";
`;

export const BackgroundImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export const LoginBox = styled(Box)`
  position: relative;
  height: 600px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  z-index: 2;
  background-color: transparent;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.1);

  text-align: center;
`;

export const CredentialModalBox = styled(Box)({
  backgroundColor: "#FFFF00 !important",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
  border: ".5px solid #FFFFFF",
});

export const CredentialModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "75px",
  width: "250px",
  zIndex: "2",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "transparent",
  transition: "all 0.2s ease-in-out",
});

export const ModalTypography = styled(Typography)({
  color: "#CA2C2C",
  fontSize: "16px",
  fontWeight: "bold",
});
