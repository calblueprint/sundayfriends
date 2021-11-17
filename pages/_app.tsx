import { AuthProvider } from "../firebase/auth";
import { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
    console.log(jssStyles);
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
