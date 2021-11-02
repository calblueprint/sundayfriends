import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";
import firebaseAdmin from '../../firebase/firebaseAdmin';
import { GetServerSidePropsContext } from 'next';
import { Admin } from "../../types/schema";
import { getAdmin } from '../../firebase/firestore/admin';
import nookies from "nookies";

type ProfileSettingsPageProps = {
  currentAdmin: Admin
}

const ProfileSettingsPage: React.FunctionComponent<ProfileSettingsPageProps> = ({
  currentAdmin
}) => {
  return (
    <Layout title="Profile">
      <main className={styles.main}>Profile Settings</main>
    </Layout>
  );
};

// Use SSR to load admins!
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const userToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const adminUid = userToken.uid;
    const adminData = await getAdmin(adminUid);
    return {
      props: { currentAdmin: adminData }
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permament: false,
        destination: '/',
      }
    }
  }
}

export default ProfileSettingsPage;
