import { useState } from "react";
import {
    Button,
    TextField
} from "@mui/material";
import { signinUser } from "../../firebase/auth";
import styles from './Signin.module.css';
import { User } from "@firebase/auth";

const SignInScreen: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignin = async () => {
        console.log('called');
        const user = await signinUser(email, password);
        console.log(user);
    }

    return (
        <div className={styles['container']}>
            <div className={styles['signin-container']}>
                <TextField
                    label='Username'
                    required
                    variant='filled'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <TextField
                    label='Password'
                    required
                    hidden={true}
                    variant='filled'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <Button
                    variant='contained'
                    onClick={handleSignin}                >
                    Sign In
                </Button>
            </div>
        </div>
    )
};

export default SignInScreen;