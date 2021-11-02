import { AuthProvider } from "../firebase/auth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
