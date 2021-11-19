import { AuthProvider } from "../firebase/auth";
import { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css";
// import Router from "next/router";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Router.events.on("routeChangeStart", () => NProgress.start());
  // Router.events.on("routeChangeComplete", () => NProgress.done());
  // Router.events.on("routeChangeError", () => NProgress.done());
  useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
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
