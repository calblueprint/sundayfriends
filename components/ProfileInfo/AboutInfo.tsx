import React from 'react';
import styles from "../ProfileInfo/ProfileInfo.module.css";
import { Typography } from "@mui/material";

type AboutInfoProps = {
    name: string,
    role: string,
    last_active: string,
    date_joined: string,
 };
  
 export const AboutInfo: React.FunctionComponent<AboutInfoProps> = ({
    name,
    role,
    last_active,
    date_joined,
 }) => {
     return (
        <div>
            <Typography variant="h5" fontWeight="bold">About</Typography>
            <hr></hr>
            <div className={styles.info}>
                <Typography variant="subtitle1" fontWeight="bold">NAME</Typography>
                <Typography variant="subtitle2" color="#131313">{name}</Typography>
            </div>
            <br></br>
            <div className={styles.info}>
                <div><Typography variant="subtitle1" fontWeight="bold">ROLE</Typography></div>
                <div><Typography variant="subtitle2" color="#131313">{role}</Typography></div>
            </div>
            <br></br>
            <div className={styles.info}>
                <Typography variant="subtitle1" fontWeight="bold">LAST ACTIVE</Typography>
                <Typography variant="subtitle2" color="#131313">{last_active}</Typography>
            </div>
            <br></br>
            <div className={styles.info}>
                <Typography variant="subtitle1" fontWeight="bold">DATE JOINED</Typography>
                <Typography variant="subtitle2" color="#131313">{date_joined}</Typography>  
            </div>
        </div>
     );
 }