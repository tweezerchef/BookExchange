import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    // mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#cfcf10f1',
      paper: 'rgba(215, 240, 255, 0.37)',
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
};
const theme = createTheme(themeOptions);
export default theme;