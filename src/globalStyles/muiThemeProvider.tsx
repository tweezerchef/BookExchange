import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./materialUITheme";

interface MuiThemeProviderProps {
  children: ReactNode;
}

const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default MuiThemeProvider;
