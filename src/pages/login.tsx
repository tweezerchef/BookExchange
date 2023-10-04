import Box from "@mui/material/Box";
import EntryCard from "../components/signUpLogIn/entryCard";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: "100vh",
        backgroundColor: " #fbfbfb",
      }}
    >
      <EntryCard />
    </Box>
  );
};

export default Login;
