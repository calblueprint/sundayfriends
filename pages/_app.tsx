import "../styles/globals.css";
import { AuthProvider } from "../firebase/auth";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
