import { style } from '@mui/system';
import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";

const ProfileSettingsPage: React.FunctionComponent = () => {
    
    return (
        <body className = {styles.body}>
            <Layout title = 'Profile'>
                <div className = {styles.all}>
                    <div className = {styles.header}>
                        <h2>Profile Settings</h2>
                    <div className = {styles.namebar}>
                        <h2>Cindy Zhang</h2>
                        <button className={styles.button}>Edit Profile</button>
                    </div>
                    <hr></hr>
                    <div className = {styles.boxes}>
                        <div className = {styles.box}>
                            <div className = {styles.subheader}>About Info</div>
                            <hr></hr>
                            <div className = {styles.boldtitle}>Role</div>  
                            <div className = {styles.info}>Executive Director</div>
                            <br></br>
                            <div className = {styles.boldtitle}>Date Last Active</div>
                            <div className = {styles.info}> October 3, 2021 - 3:34:56 </div>
                            <br></br>
                            <div className = {styles.boldtitle}>Date Joined</div>
                            <div className = {styles.info}>October 3, 2021 - 3:36:55</div>
                        </div>
                        <div className = {styles.box}>
                            <div className = {styles.subheader}>Contact Info</div>
                            <hr></hr>
                            <div className = {styles.boldtitle}>Email Address</div>  
                            <div className = {styles.info}>cindyzhangyayayayayay@gmail.com</div>
                            <br></br>
                            <div className = {styles.boldtitle}>Phone Number</div>  
                            <div className = {styles.info}>123-456-7890</div>
                        </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </body>
    );
}

export default ProfileSettingsPage;
