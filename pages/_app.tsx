import AuthUserProvider from "../firebase/auth/useAuth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
