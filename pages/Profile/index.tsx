import * as React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";

const ProfileSettingsPage: React.FunctionComponent = () => {
    
    return (
        <Layout title = 'Profile'>
            <main className = {styles.main}>
                <h1 className = {styles.title}>
                    Profile Settings
                </h1>
            </main>
        </Layout>
                
    );

}

export default ProfileSettingsPage;