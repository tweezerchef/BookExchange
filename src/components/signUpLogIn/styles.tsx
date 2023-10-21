import { styled } from "@mui/material/styles";
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

export const BackgroundBox = styled(Box)`
  width: 100%;
  max-width: 350px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 50px;
  margin: -20px auto 60px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.1);

  text-align: center;
  background-size: cover;
  background-image: url(https://nobe.s3.us-east-2.amazonaws.com/DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png);
  background-repeat: no-repeat;
`;
