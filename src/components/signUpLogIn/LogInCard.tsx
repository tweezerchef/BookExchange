/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react";
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

const fileName =
  "DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png";

function EntryCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );

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
        // Redirect to the home page (client-side) after successful login
        window.location.href = "/home";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`/api/AWS/signedURL?fileNames=${fileName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        if ("url" in data) {
          const { url } = data;
          console.log("data", data);
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
            quality={100}
            priority
          />
        </BackgroundImageContainer>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "start",
          mt: "0",
          width: "280px",
          height: "auto",
          marginTop: "-30px",
          marginBottom: "10px",
          filter: "brightness(1.2) contrast(1.2)",
        }}
      >
        <Image
          src='https://nobe.s3.us-east-2.amazonaws.com/Nobe_Logo.png'
          alt='logo'
          width={220} // You need to provide a width
          height={220} // You need to provide a height, adjust this based on your image's aspect ratio
          quality={100}
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
        <Typography component='label' htmlFor='login-password' variant='body1'>
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
      <Button onClick={loginHandler} style={{ marginBottom: "40px" }}>
        Log in
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
    </LoginBox>
  );
}
export default EntryCard;
