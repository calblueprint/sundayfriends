import React from 'react';
import styles from "../ProfileInfo/ProfileInfo.module.css"
import { Typography } from '@mui/material';

type LoginDetailsProps = {
    email: string,
    phone: string,
    password: string,
};

export const LoginDetails: React.FunctionComponent<LoginDetailsProps> = ({
    email,
    phone,
    password,
}) => {
    return (
        <div>
            <Typography variant="h5" fontWeight="bold">Login Details</Typography>
            <hr></hr>
            <div className={styles.info}>
                <Typography variant="subtitle1" fontWeight="bold">EMAIL</Typography>
                <Typography variant="subtitle2" color="#131313">{email}</Typography>
            </div>
            <br></br>
            <div className={styles.info}>
                <Typography variant="subtitle1" fontWeight="bold">PHONE #</Typography>
                <Typography variant="subtitle2" color="#131313">{phone}</Typography>
            </div>
            <br></br>
            <div className={styles.info}>
                <Typography variant="subtitle1" fontWeight="bold">PASSWORD</Typography>
                <Typography variant="subtitle2" color="#131313">{password}</Typography>
            </div>
        </div>
    );
}
