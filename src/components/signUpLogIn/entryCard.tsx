import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { InputGroup, Input } from "./styles";
import UserContext from "../../context/context";

const EntryCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(UserContext);
  const { setUser } = context || {};

  const loginHandler = async () => {
    try {
      const response = await fetch("/auth/login-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data && setUser) {
        let { user } = data;
        setUser(user);
        user = JSON.stringify(user);
        localStorage.setItem("user", user);
      }

      if (
        data.user.radius !== null ||
        data.user.lastName !== null ||
        data.user.longitude !== null
      ) {
        <Link href="/home" />;
      } else {
        <Link href="/usersettings" />;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        maxHeight: "700px",
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
          src="https://nobe.s3.us-east-2.amazonaws.com/Nobe_Logo.png"
          alt="logo"
          width={280} // You need to provide a width
          height={280} // You need to provide a height, adjust this based on your image's aspect ratio
          layout="responsive" // This will make the image scale based on its parent's width
        />
      </Box>
      <InputGroup>
        <Typography component="label" htmlFor="login-email" variant="body1">
          Email Address
        </Typography>
        <Input
          type="text"
          placeholder="name@email.com"
          id="login-email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="login-password">Password</label>
        <Input
          type="password"
          placeholder="Password"
          id="login-password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
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
        <div id="loginDiv" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div id="loginDiv" />
      </div>
    </Box>
  );
};
export default EntryCard;
