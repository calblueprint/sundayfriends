import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { signInWithEmailAndPassword } from "../firebase/auth";
import { useRouter } from "next/router";
import styles from './Signin.module.css';

type LoginData = {
  email: string,
  password: string,
}

// TODO improve UI for sigin in screen
const SignInScreen: React.FC = () => {

  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleSignin = async (data: LoginData) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      router.push('/transactions');
    } catch (e) {
      // TODO improve error handling
      console.error(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignin)}>
      <div className={styles['container']}>
        <div className={styles['signin-container']}>
          <label>Email</label>
          <input
            id="email"
            name="email"
            {...register('email', { required: true })}
          />
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            {...register('password', { required: true })}
          />
          <Button type='submit'>Sign In</Button>
        </div>
      </div>
    </form>
  )
};

export default SignInScreen;
