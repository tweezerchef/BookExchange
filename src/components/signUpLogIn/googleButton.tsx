/* eslint-disable no-return-assign */
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleLoginButton = () => (
  <Button
    variant='contained'
    color='primary'
    startIcon={<GoogleIcon />}
    onClick={() =>
      (window.location.href = "/api/auth/google/googleAuth?operation=auth")
    }
  >
    Sign in with Google
  </Button>
);

export default GoogleLoginButton;
