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

interface EmailSignUpProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  validateEmail: React.Dispatch<React.SetStateAction<string>>;
  setConfirmedEmail: React.Dispatch<React.SetStateAction<string>>;
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailErrorMSG: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  emailError: boolean;
  emailErrorMSG: string;
  confirmedEmail: string;
}
export const EmailSignUp: React.FC<EmailSignUpProps> = ({
  email,
  emailErrorMSG,
  emailError,
  confirmedEmail,
  setEmail,
  validateEmail,
  setConfirmedEmail,
  setEmailError,
  setEmailErrorMSG,
}) => (
  <>
    <InputGroup>
      <Typography component='label' htmlFor='login-email' variant='body1'>
        Email Address
      </Typography>
      <Input
        type='text'
        placeholder='name@email.com'
        id='login-email'
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
      />
    </InputGroup>
    <InputGroup>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography
            component='label'
            htmlFor='login-email-confirm'
            variant='body1'
          >
            <ErrorBox>
              <Fade in={Boolean(emailError)}>
                <FormHelperText error>{emailErrorMSG}</FormHelperText>
              </Fade>
            </ErrorBox>
            Confirm Email Address
          </Typography>
        </Box>
        <Input
          type='text'
          placeholder='Confirm Email Address'
          id='login-email-confirm'
          value={confirmedEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmedEmail(e.target.value);
            if (e.target.value !== email) {
              setEmailError(true);
              setEmailErrorMSG("Emails Do Not Match");
            } else {
              setEmailError(false);
              setEmailErrorMSG("");
            }
          }}
        />
      </Box>
    </InputGroup>
  </>
);
