import React from 'react';
import styles from "..ProfileInfo/ProfileBox.module.css"
import { Typography } from '@mui/material';

type ContactInfoProps = {
    email: string,
    phone: string,
    password: string,
};

export const ContactInfo: React.FunctionComponent<ContactInfoProps> = ({
    email,
    phone,
    password,
}) => {
    return (
        <div>
            <Typography variant="h5" fontWeight="bold">Login Details</Typography>
            <hr></hr>
            <Typography variant="h6" fontWeight="bold">Email</Typography>
            <Typography variant="subtitle2" color="#131313">{email}</Typography>
            <br></br>
            <Typography variant="h6" fontWeight="bold">Phone #</Typography>
            <Typography variant="subtitle2" color="#131313">{phone}</Typography>
            <br></br>
            <Typography variant="h6" fontWeight="bold">Password</Typography>
            <Typography variant="subtitle2" color="#131313">{password}</Typography>
        </div>
    );
}
