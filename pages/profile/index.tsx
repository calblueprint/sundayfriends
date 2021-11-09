import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { Admin } from "../../types/schema";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";
import Button from "@mui/material/Button";
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
        fieldValue: "Cindy Zhang",
      },
      {
        iconName: "singleperson",
        fieldName: "ROLE",
        fieldValue: "Executive Director",
      },
      {
        iconName: "lastactive",
        fieldName: "LAST ACTIVE",
        fieldValue: "October 20, 2021",
      },
      {
        iconName: "datejoined",
        fieldName: "DATE JOINED",
        fieldValue: "January 20, 2021",
      },
    ];

    const loginInfo: FieldInfo[] = [
      {
        iconName: "email",
        fieldName: "EMAIL",
        fieldValue: "chloeisnotarealdog@gmail.com",
      },
      {
        iconName: "phone",
        fieldName: "PHONE #",
        fieldValue: "(123) 456 - 7890",
      },
      {
        iconName: "password",
        fieldName: "PASSWORD",
        fieldValue: "*******",
      },
    ];

    const displayinfo = () => {
      return (
        <div className={styles.profile}>
          <div className={styles.namebar}>
            <h1> Cindo Zhang </h1>
            <Button variant="contained" className={styles.button}>
              <Icon type="editpencil" className={styles.editicon}></Icon>
              Edit
            </Button>
          </div>
          <hr className={styles.hr}></hr>
          <div className={styles.boxes}>
            <div className={styles.box}>
              <ProfileInfo data={aboutData} cardTitle="About" />
            </div>
            <div className={styles.box}>
              <ProfileInfo data={loginInfo} cardTitle="Login Details" />
            </div>
          </div>
        </div>
      );
    };

    return (
      <Layout title="Profile">
        <div className={styles.page}>
          <div className={styles.pagetitle}>
            <Icon type="settings"></Icon>
            <h2>PROFILE SETTINGS</h2>
          </div>
          {displayinfo()}
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
