import Box from "@mui/material/Box";
import Drawer, {DrawerProps} from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

interface StyledDrawerProps extends DrawerProps {
    scrollbarWidth?: number;
    }



export const DrawerButton = styled(Box)(({ theme }) => ({
    display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(1),
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  boxShadow: theme.shadows[1],
  position: 'fixed',
  bottom: 0,
  width: `calc(350px - ${theme.spacing(2)})`,
  zIndex: theme.zIndex.drawer + 2,
  }));

  export const OpenDrawerButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    borderTopLeftRadius: 8, // Only round the top corners
    borderTopRightRadius: 8,
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    boxShadow: theme.shadows[1],
    bottom: 0,
    right: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 2,
  }));


  export const StyledDrawer = styled(Drawer)<StyledDrawerProps>(({ theme, scrollbarWidth }) => ({
    '.MuiDrawer-paper': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      width: 350,
      maxWidth: '100%',
      right: `calc(${theme.spacing(2)} + ${scrollbarWidth}px)`, // Adjust for scrollbar
      left: 'auto',
      boxSizing: 'border-box',
    },
  }));