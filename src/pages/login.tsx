import Box from "@mui/material/Box";
import EntryCard from "../components/signUpLogIn/LogInCard";

const Login = (props) => (
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
    <EntryCard />
  </Box>
);

export default Login;
