import Box from "@mui/material/Box";
import Drawer, {DrawerProps} from "@mui/material/Drawer";
import { styled } from '@compiled/react'

interface StyledDrawerProps extends DrawerProps {
    scrollbarWidth?: number;
    }



export const DrawerButton = styled(Box)(({ theme }) => ({
    display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: '#ffe99bbe',
  cursor: 'pointer',
  boxShadow: theme.shadows[1],
  position: 'fixed',
  bottom: 0,
  height: 40,
  width: `calc(350px - ${theme.spacing(2)})`,
  zIndex: theme.zIndex.drawer + 2,
  right: theme.spacing(2),
  }));

  export const OpenDrawerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    borderTopLeftRadius: 8, // Only round the top corners
    borderTopRightRadius: 8,
    backgroundColor: '#ffea9b',
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
      height: 400,
      maxWidth: '100%',
      backgroundColor: '#adacacff',
      right: `calc(${theme.spacing(2)} + ${scrollbarWidth}px)`, // Adjust for scrollbar
      left: 'auto',
      boxSizing: 'border-box',
    },
  }));