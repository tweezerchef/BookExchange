import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { useHomeState } from "../../context/context";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const menuItems = ["Home", "Explore", "Wishlist", "Lending Library"];

const Header = () => {
  const backgroundImageFile = "TopBanner.png";
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>(
    "" || null
  );
  const [userAvi, setUserAvi] = useState<string>("" || null);
  const { user } = useHomeState();
  const rawUserPicture = user?.picture;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const fileNames = [backgroundImageFile, rawUserPicture]
      .filter(Boolean)
      .join(",");
    if (!fileNames) {
      console.error("No valid file names provided");
      return;
    }

    const encodedFileNames = encodeURIComponent(fileNames);

    fetch(`/api/AWS/signedURL?fileNames=${encodedFileNames}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.urls) {
          if (data.urls.length >= 2) {
            setBackgroundImageUrl(data.urls[0]);
            setUserAvi(data.urls[1]);
          } else {
            console.error("Not enough URLs in response");
          }
        } else if (data.url) {
          console.log("Received a single URL:", data.url);
        } else if (data.message) {
          console.error("Error:", data.message);
        }
      })
      .catch(console.error); // Log errors to the console
  }, [rawUserPicture, backgroundImageFile]);
  return (
    <AppBar
      position='sticky'
      sx={{
        width: "100%",
        height: "150px",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={handleOpenNavMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id='menu-appbar'
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item}
              onClick={handleCloseNavMenu}
              component={item === "Home" ? Link : "div"} // Use Link for "Home", otherwise use 'div'
              href={item === "Home" ? "/home" : undefined} // Set href only for "Home"
              sx={{ textDecoration: "none" }} // Add this to remove underline from links
            >
              <Typography textAlign='center'>{item}</Typography>
            </MenuItem>
          ))}
        </Menu>
        <Box />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src={userAvi} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={handleCloseUserMenu}
                component={setting === "Logout" ? Link : "div"} // Use Link for "Logout", otherwise use 'div'
                href={setting === "Logout" ? "/" : undefined} // Set href only for "Logout"
                sx={{ textDecoration: "none" }} // Add this to remove underline from links
              >
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
