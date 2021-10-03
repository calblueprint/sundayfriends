import { style } from '@mui/system';
import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";

const ProfileSettingsPage: React.FunctionComponent = () => {
    
    return (
        <Layout title = 'Profile'>
            <div className = {styles.header}>
                <h2>Profile Settings</h2>
                <h2>Cindy Zhang</h2>
            <hr></hr>
            <div className = {styles.boxes}>
                <div className = {styles.box}>
                    <div className = {styles.subtitle}>About Info</div>
                    <br></br>
                    <div className = {styles.boldtitle}>Role</div>
                    <br></br>  
                    <div className = {styles.info}>Executive Director</div>
                </div>
                <div className = {styles.box}>
                    <div className = {styles.subtitle}>
                        Contact Info
                    </div>
                </div>
                </div>
            
            </div>
        </Layout>
    );
}

export default ProfileSettingsPage;
