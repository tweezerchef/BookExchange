/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";

import {
  InputGroup,
  Input,
  LoginBox,
  BackgroundImageContainer,
} from "./styles";
import GoogleButton from "./googleButton";

const backgroundImageFile = "loginBackground.png";
const logoImageFile = "Nobe_Logo.png";

function EntryCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>("");
  const [logoImageURL, setLogoImageUrl] = useState<string>("");
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);

  const router = useRouter();
  const loginHandler = async () => {
    try {
      const response = await fetch("/api/auth/emailLogin", {
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
        void router.push("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const signUpHandler = () => {
    void router.push("/signUp");
  };

  useEffect(() => {
    const fileNames = [backgroundImageFile, logoImageFile]
      .filter(Boolean)
      .join(",");
    if (!fileNames) {
      console.error("No valid file names provided");
      return;
    }

    const encodedFileNames = encodeURIComponent(fileNames);
    fetch(`/api/AWS/signedURL?fileNames=${encodedFileNames}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          if (data.urls.length >= 2) {
            setBackgroundImageUrl(data.urls[0]);
            setLogoImageUrl(data.urls[1]);
          } else {
            console.error("Not enough URLs in response");
          }
        } else if (data.url) {
          console.log("Received a single URL:", data.url);
        } else if (data.message) {
          console.error("Error:", data.message);
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
          <Box
            sx={{
              width: "auto",
              height: "auto",
              marginTop: "-30px",
              marginBottom: "10px",
              filter: "brightness(1.2) contrast(1.2)",
            }}
          >
            <Image
              src={logoImageURL}
              alt='logo'
              width={185}
              height={165}
              quality={80}
            />
          </Box>
          <InputGroup>
            <Typography component='label' htmlFor='login-email' variant='body1'>
              Email Address
            </Typography>
            <Input
              type='text'
              placeholder='name@email.com'
              id='login-email'
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </InputGroup>
          <InputGroup>
            <Typography
              component='label'
              htmlFor='login-password'
              variant='body1'
            >
              Password
            </Typography>
            <Input
              type='password'
              placeholder='Password'
              id='login-password'
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </InputGroup>
          <Button
            onClick={loginHandler}
            variant='contained'
            color='primary'
            style={{ marginBottom: "10px" }}
          >
            Log in
          </Button>
          <Button
            onClick={signUpHandler}
            variant='contained'
            color='primary'
            style={{ marginBottom: "10px" }}
          >
            Not Registered Yet? Sign Up
          </Button>
          <GoogleButton />
        </>
      ) : null}
    </LoginBox>
  );
}
export default EntryCard;
