import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: 'rgba(255,255,255,0.9)',
      paper: 'rgba(159,220,239,0.31)',
    },
  },
  components: {
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTable: {
        defaultProps: {
      size: 'small',
        }
    },
    MuiButton: {
        defaultProps: {
      size: 'small',
    },
    },
    MuiButtonGroup: {
        defaultProps: {
      size: 'small',
    },
    },
    MuiCheckbox: {
       defaultProps: {
      size: 'small',
    },
    },
    MuiFab: {
        defaultProps: {
      size: 'small',
        },
    },
    MuiFormControl: {
        defaultProps: {
      margin: 'dense',
      size: 'small',
    },
},
    MuiFormHelperText: {
        defaultProps: {
      margin: 'dense',
    },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
    },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
    },
    },
    MuiInputLabel: {
        defaultProps: {
      margin: 'dense',
    },
},
    MuiRadio: {
        defaultProps: {
      size: 'small',
    },
    },
    MuiSwitch: {
        defaultProps: {
      size: 'small',
    },
    },
    MuiTextField: {
        defaultProps: {
      margin: 'dense',
      size: 'small',
    },
  },
    },
  typography: {
    h6: {
      fontFamily: 'Lato',
    },
    subtitle1: {
      fontFamily: 'Lato',
    },
    subtitle2: {
      fontFamily: 'Lato',
    },
  },
};
const theme = createTheme(themeOptions);
export default theme;