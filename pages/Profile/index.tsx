import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css" ;
import Button from "@mui/material/Button";
import { AboutInfo } from '../../components/ProfileInfo/AboutInfo';
import { ContactInfo } from '../../components/ProfileInfo/ContactInfo';
import { Typography } from '@mui/material';

const ProfileSettingsPage: React.FunctionComponent = () => {
    
    const displayinfo = () => {
        return (
            <div className={styles.profile}>
                <div className = {styles.namebar}>
                    <Typography variant="h4">Cindy Zhang</Typography>
                    <Button className={styles.button}>Edit</Button>
                </div>
                <hr></hr>
                <div className = {styles.boxes}>
                    <div className = {styles.box}>
                        <AboutInfo name="Cindy Zhang" role="Executive Director" last_active="September 20, 2021" date_joined="September 20, 2021"></AboutInfo>
                    </div>
                    <div className = {styles.box}>
                        <ContactInfo email="chloeisarealdog@gmail.com" phone="123-456-7890" password="********"></ContactInfo>
                    </div>
                </div>                
            </div>
        )
    }

    return (
        <Layout title = 'Profile'>
            <div className = {styles.all}>
                <h2 className={styles.h2}>PROFILE SETTINGS</h2>
                {displayinfo()}
            </div>
        </Layout>
    );
}

export default ProfileSettingsPage;
