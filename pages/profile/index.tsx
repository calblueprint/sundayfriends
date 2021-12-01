import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { Admin } from "../../types/schema";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";

import {
  ProfileInfo,
  FieldInfo,
} from "../../components/ProfileInfo/ProfileInfo";
import Icon from "../../assets/Icon";

type ProfileSettingsPageProps = {
  currentAdmin: Admin;
};

const ProfileSettingsPage: React.FunctionComponent<ProfileSettingsPageProps> =
  ({ currentAdmin }) => {
    const aboutData: FieldInfo[] = [
      {
        iconName: "nameicon",
        fieldName: "NAME",
        fieldValue: currentAdmin.full_name,
      },
      {
        iconName: "singleperson",
        fieldName: "ROLE",
        fieldValue: currentAdmin.role,
      },
      {
        iconName: "lastactive",
        fieldName: "LAST ACTIVE",
        fieldValue: "sdsd",
      },
      {
        iconName: "datejoined",
        fieldName: "DATE JOINED",
        fieldValue: currentAdmin.created_at,
      },
    ];

    const loginInfo: FieldInfo[] = [
      {
        iconName: "email",
        fieldName: "EMAIL",
        fieldValue: currentAdmin.email,
      },
      {
        iconName: "phone",
        fieldName: "PHONE #",
        fieldValue: currentAdmin.phone_number,
      },
      {
        iconName: "password",
        fieldName: "PASSWORD",
        fieldValue: currentAdmin.password,
      },
    ];

    return (
      <Layout title="Profile">
        <div className={styles["page"]}>
          <div className={styles["pagetitle"]}>
            <Icon type="settings"></Icon>
            <h2>MY PROFILE SETTINGS</h2>
          </div>
          <ProfileInfo
            aboutData={aboutData}
            loginInfo={loginInfo}
            admin={currentAdmin}
          />
        </div>
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
      props: { currentAdmin: adminData },
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permament: false,
        destination: "/",
      },
    };
  }
};

export default ProfileSettingsPage;
