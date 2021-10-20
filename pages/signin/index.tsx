import { useForm } from "react-hook-form";
import {
    Button,
    TextField
} from "@mui/material";
import { useAuth } from "../../firebase/auth";
import { useRouter } from "next/router";
import styles from './Signin.module.css';
import { User } from "@firebase/auth";

type LoginData = {
    email: string,
    password: string,
}

const SignInScreen: React.FC = () => {

    const { register, handleSubmit } = useForm();
    const auth = useAuth();
    const router = useRouter();

    const handleSignin = (data: LoginData) => {
        console.log('here');
        console.log(auth.signInEmailPassword)
        auth.signInEmailPassword(data.email, data.password);
        router.push('/Transactions')
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
                        {...register('password', { required: true })}
                    />
                    <Button type='submit'>Sign In</Button>
                </div>
            </div>
        </form>
    )
};

export default SignInScreen;