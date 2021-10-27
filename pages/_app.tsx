import "../styles/globals.css";
<<<<<<< HEAD
import { AuthProvider } from "../firebase/auth";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
=======

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
>>>>>>> d956ab6d048db07da5415eca6da6db431c30d24b
}

export default MyApp;
