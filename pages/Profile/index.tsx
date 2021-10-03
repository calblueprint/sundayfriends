import { style } from '@mui/system';
import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";

const ProfileSettingsPage: React.FunctionComponent = () => {
    
    return (
        <Layout title = 'Profile'>
            <div className = {styles.title}>
                Profile Settings
            <div className = {styles.name}>
                Cindy Zhang
            <hr></hr>
            <div className = {styles.boxes}>
                <div className = {styles.box}>
                    <div className = {styles.subtitle}>About Info</div>
                    <div className = {styles.boldtitle}>Role</div>  
                    <div className = {styles.info}>Executive Director</div>
                </div>
                <div className = {styles.box}>
                    <div className = {styles.subtitle}>
                        Contact Info
                    </div>
                </div>
                </div>
            </div>
            </div>
        </Layout>
    );
}

export default ProfileSettingsPage;