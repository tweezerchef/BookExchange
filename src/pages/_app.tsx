/* eslint-disable react/jsx-props-no-spreading */
import { UserProvider } from "../context/context";
import MuiThemeProvider from "../globalStyles/muiThemeProvider";
import "../styles/global.css";
import Layout from "../layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <MuiThemeProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </MuiThemeProvider>
  );
}
