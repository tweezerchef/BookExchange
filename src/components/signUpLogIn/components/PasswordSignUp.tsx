import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import {
  InputGroup,
  Input,
  LoginBox,
  BackgroundImageContainer,
  ErrorBox,
} from "../styles";

interface PasswordSignUpProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  validatePassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmedPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordErrorMSG: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  passwordError: boolean;
  passwordErrorMSG: string;
  confirmedPassword: string;
}
export const PasswordSignUp: React.FC<PasswordSignUpProps> = ({
  password,
  passwordErrorMSG,
  passwordError,
  confirmedPassword,
  setPassword,
  validatePassword,
  setConfirmedPassword,
  setPasswordError,
  setPasswordErrorMSG,
}) => (
  <>
    <InputGroup>
      <Typography component='label' htmlFor='login-password' variant='body1'>
        Password
      </Typography>
      <Input
        type='text'
        placeholder='password'
        id='login-password'
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
      />
    </InputGroup>
    <InputGroup>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography
            component='label'
            htmlFor='login-password-confirm'
            variant='body1'
          >
            <ErrorBox>
              <Fade in={Boolean(passwordError)}>
                <FormHelperText error>{passwordErrorMSG}</FormHelperText>
              </Fade>
            </ErrorBox>
            Confirm Password
          </Typography>
        </Box>
        <Input
          type='text'
          placeholder='Confirm Password'
          id='login-password-confirm'
          value={confirmedPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmedPassword(e.target.value);
            if (e.target.value !== password) {
              setPasswordError(true);
              setPasswordErrorMSG("Passwords Do Not Match");
            } else {
              setPasswordError(false);
              setPasswordErrorMSG("");
            }
          }}
        />
      </Box>
    </InputGroup>
  </>
);
