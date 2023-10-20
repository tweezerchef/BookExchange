import Header from "./Header";
import Sidebar from "./SideBar";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  const isLoginPage = router.pathname === "/login";
  const isIndexPage = router.pathname === "/";

  // Don't render Header and Sidebar on the Login and Index pages
  if (isLoginPage || isIndexPage) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flexGrow: 1 }}>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
