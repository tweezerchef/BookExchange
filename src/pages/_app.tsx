/* eslint-disable react/jsx-props-no-spreading */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { UserProvider } from "../context/context";
import MuiThemeProvider from "../globalStyles/muiThemeProvider";
import "../styles/global.css";
import Layout from "../layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiThemeProvider>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </MuiThemeProvider>
    </LocalizationProvider>
  );
}
