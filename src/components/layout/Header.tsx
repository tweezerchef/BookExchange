import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useUserState } from "../../context/context";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const menuItems = ["Home", "Explore", "Wishlist", "Lending Library"];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { user } = useUserState();

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

  return (
    <AppBar
      position='sticky'
      sx={{
        width: "100%",
        height: "150px",
        backgroundImage:
          "url(https://nobe.s3.us-east-2.amazonaws.com/TopBanner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: "24px",
      }}
    >
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src={user.picture} />
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
