import type { AppProps } from "next/app";
import { UserProvider } from "../context/context";
import MuiThemeProvider from "../globalStyles/muiThemeProvider";
import "../styles/global.css";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
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
