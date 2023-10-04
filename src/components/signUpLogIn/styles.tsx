import { styled } from "@mui/system";
import Box from "@mui/material/Box";

export const InputGroup = styled(Box)`
  margin-bottom: 24px;
  text-align: left;

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled("input")`
  width: 100%;
  outline: none;
  padding: 8px 16px;
  border: 1px solid #e0e6e8;
  border-radius: 4px;
  transition: box-shadow 0.2s;

  &::placeholder {
    color: #dedede;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(169, 172, 255, 0.5);
  }
`;
