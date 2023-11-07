/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import { EmailSignUp } from "./components/EmailSignUp";
import { PasswordSignUp } from "./components/PasswordSignUp";
import { LoginBox, BackgroundImageContainer } from "./styles";
import GoogleButton from "./googleButton";

const fileName = "loginBackground.png";

export const SignUpCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMSG, setEmailErrorMSG] = useState("");
  const [passwordErrorMSG, setPasswordErrorMSG] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);

  const router = useRouter();
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
      console.log(email, password);
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
        void router.push("/register");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const logInHandler = () => {
    console.log("log in");
    void router.push("/login");
  };
  useEffect(() => {
    fetch(`/api/AWS/signedURL?fileNames=${fileName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Response) => {
        if ("url" in data) {
          const { url } = data;
          setBackgroundImageUrl(url);
        }
      })
      .catch(console.error); // Log errors to the console
  }, []);

  return (
    <LoginBox>
      {backgroundImageUrl && (
        <BackgroundImageContainer>
          <Image
            src={backgroundImageUrl}
            alt='Background'
            fill
            sizes='600px 500px'
            quality={100}
            priority
            onLoad={() => setIsBgImageLoaded(true)}
          />
        </BackgroundImageContainer>
      )}
      {isBgImageLoaded ? (
        <>
          <EmailSignUp
            setEmail={setEmail}
            validateEmail={validateEmail}
            setConfirmedEmail={setConfirmedEmail}
            setEmailError={setEmailError}
            setEmailErrorMSG={setEmailErrorMSG}
            email={email}
            emailError={emailError}
            emailErrorMSG={emailErrorMSG}
            confirmedEmail={confirmedEmail}
          />
          <Box marginTop='1rem' />
          <PasswordSignUp
            setPassword={setPassword}
            validatePassword={validatePassword}
            setConfirmedPassword={setConfirmedPassword}
            setPasswordError={setPasswordError}
            setPasswordErrorMSG={setPasswordErrorMSG}
            password={password}
            passwordError={passwordError}
            passwordErrorMSG={passwordErrorMSG}
            confirmedPassword={confirmedPassword}
          />
          <Box marginTop='1rem' />
          <Button
            onClick={signUpHandler}
            variant='contained'
            disabled={emailError || passwordError}
          >
            Sign Up
          </Button>
          <Box marginTop='.5rem' />
          <Button onClick={logInHandler} variant='contained' color='primary'>
            Already Registered? Log In
          </Button>
          <Box marginTop='.5rem' />
          <GoogleButton />
        </>
      ) : null}
    </LoginBox>
  );
};
