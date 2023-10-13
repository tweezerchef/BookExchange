import type { AppProps } from "next/app";
import { useState } from "react";
import UserContext from "../context/context";
import MuiThemeProvider from "../globalStyles/muiThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  return (
    <MuiThemeProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}
