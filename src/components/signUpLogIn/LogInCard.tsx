/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import { InputGroup, Input } from "./styles";
import GoogleButton from "./googleButton";

function EntryCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "350px",
        maxHeight: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        padding: "50px",
        margin: "-20px auto 60px",
        boxShadow:
          "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundSize: "cover",
        backgroundImage:
          "url(https://nobe.s3.us-east-2.amazonaws.com/DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png)",
        backgroundRepeat: "no-repeat",
      }}
    >
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
    </Box>
  );
}
export default EntryCard;
