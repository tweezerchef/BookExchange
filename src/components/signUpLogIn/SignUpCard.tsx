/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { InputGroup, Input, BackgroundBox } from "./styles";
import GoogleButton from "./googleButton";

export const SignUpCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMSG, setEmailErrorMSG] = useState("");
  const [passwordErrorMSG, setPasswordErrorMSG] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const signUpHandler = async () => {
    try {
      const response = await fetch("/api/auth/emailSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        // Redirect to the home page (client-side) after successful login
        window.location.href = "/home";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BackgroundBox>
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
        <Typography
          component='label'
          htmlFor='login-email-confirm'
          variant='body1'
        >
          Confirm Email Address{" "}
          {emailError && <span style={{ color: "red" }}>{emailErrorMSG}</span>}
        </Typography>
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
      </InputGroup>
      <InputGroup>
        <Typography component='label' htmlFor='login-password' variant='body1'>
          Password
        </Typography>
        <Input
          type='password'
          placeholder='Password'
          id='login-password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup>
        <Typography
          component='label'
          htmlFor='login-password-confirm'
          variant='body1'
        >
          Confirm Password{" "}
          {passwordError && (
            <span style={{ color: "red" }}>{passwordErrorMSG}</span>
          )}
        </Typography>
        <Input
          type='password'
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
        {passwordError && <p className='error'>{passwordErrorMSG}</p>}
      </InputGroup>
      <Button
        onClick={signUpHandler}
        style={{ marginBottom: "40px" }}
        disabled={emailError || passwordError}
      >
        Sign Up
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div id='loginDiv' />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div id='loginDiv' />
      </div>
      <GoogleButton />
    </BackgroundBox>
  );
};
