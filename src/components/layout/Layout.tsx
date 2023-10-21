import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Header from "./Header";
import Sidebar from "./SideBar";

const Layout = ({ children }) => {
  const router = useRouter();

  const isLoginPage = router.pathname === "/login";
  const isIndexPage = router.pathname === "/";
  const isSignUpPage = router.pathname === "/signUp";

  // Don't render Header and Sidebar on the Login and Index pages
  if (isLoginPage || isIndexPage || isSignUpPage) {
    return <main>{children}</main>;
  }

  return (
    <Box
      maxWidth='1550px'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      margin='0 auto'
    >
      <Header />
      <Box width='100%' display='flex'>
        <Box maxWidth='1500px' width='100%' display='flex'>
          <Sidebar />
          <main style={{ flexGrow: 1 }}>{children}</main>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
