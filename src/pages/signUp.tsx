import Box from "@mui/material/Box";
import { SignUpCard } from "../components/signUpLogIn/SignUpCard";

const Login = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      minHeight: "98vh",
      backgroundColor: " #fbfbfb",
    }}
  >
    <SignUpCard />
  </Box>
);

export default Login;
