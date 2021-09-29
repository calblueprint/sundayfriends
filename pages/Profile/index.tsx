import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";

const ProfileSettingsPage: React.FunctionComponent = () => {
    
    return (
        <Layout title = 'Profile'>
            <main className = {styles.main}>
                Profile Settings
            </main>
        </Layout>
    );
}

export default ProfileSettingsPage;