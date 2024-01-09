import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { memo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import Sidebar from "./SideBar";

const Layout = ({ children }) => {
  const router = useRouter();

  const isLoginPage = router.pathname === "/login";
  const isIndexPage = router.pathname === "/";
  const isSignUpPage = router.pathname === "/signUp";
  const isRegistrationPage = router.pathname === "/register";
  const matches = useMediaQuery("(min-width:505px)");

  // Don't render Header and Sidebar on the Login and Index pages
  if (isLoginPage || isIndexPage || isSignUpPage || isRegistrationPage) {
    return <main>{children}</main>;
  }

  return (
    <Container disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "97vh",
          maxWidth: "1500px",
        }}
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {matches && <Sidebar />}
          <Box
            component='main'
            sx={{ flexGrow: 1, overflowY: "auto", overflowX: "clip" }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(Layout);
