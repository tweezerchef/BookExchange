import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { memo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container } from "@mui/material";
import Header from "./Header";
import Sidebar from "./SideBar";

const Layout = ({ children }) => {
  const router = useRouter();

  const isLoginPage = router.pathname === "/login";
  const isIndexPage = router.pathname === "/";
  const isSignUpPage = router.pathname === "/signUp";
  const isRegistrationPage = router.pathname === "/register";
  const matches = useMediaQuery("(max-width:450px)");

  // Don't render Header and Sidebar on the Login and Index pages
  if (isLoginPage || isIndexPage || isSignUpPage || isRegistrationPage) {
    return <main>{children}</main>;
  }

  return (
    <Container>
      <Header />

      <Box maxWidth='1350px' width='100%' display='flex'>
        {!matches && <Sidebar />}
        <main style={{ flexGrow: 1 }}>{children}</main>
      </Box>
    </Container>
  );
};

export default memo(Layout);
