import Box from "@mui/material/Box";
import { BoxProps , Theme } from "@mui/material";
import Drawer, {DrawerProps} from "@mui/material/Drawer";
import { styled } from '@compiled/react'

interface StyledDrawerProps extends DrawerProps {
    scrollbarWidth?: number;
    theme: Theme;
    }
    interface DrawerButtonProps extends BoxProps {
      theme: Theme;
    }



export const DrawerButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: '#ffe99bbe',
  cursor: 'pointer',
  position: 'fixed',
  bottom: 0,
  height: 40,
  zIndex: 1202, // Replace with a static value or use theme.zIndex.drawer + 2 in the component instance
  right: '16px', // Replace with a static value or use theme.spacing(2) in the component instance
  boxShadow: '0px 1px 1px -1px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)', // Replace with a static value or use theme.shadows[1] in the component instance
});

export const OpenDrawerBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: '#ffea9b',
  bottom: 0,
  // Static right, zIndex, and boxShadow values can be set here or dynamically in usage
});


  export const StyledDrawer = styled(Drawer)<StyledDrawerProps>({
    '.MuiDrawer-paper': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      width: 350,
      height: 400,
      maxWidth: '100%',
      backgroundColor: '#adacacff',
      left: 'auto',
      boxSizing: 'border-box',
    },
  });