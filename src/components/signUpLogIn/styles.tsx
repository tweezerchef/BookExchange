import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const InputGroup = styled(Box)`
  width: 210px;
  text-align: left;

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled("input")`
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

export const BackgroundImageContainer = styled("div")`
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
