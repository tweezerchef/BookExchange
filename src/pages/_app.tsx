import type { AppProps } from "next/app";
import { useState } from "react";
import { UserProvider } from "../context/context";
import MuiThemeProvider from "../globalStyles/muiThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  return (
    <MuiThemeProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </MuiThemeProvider>
  );
}
