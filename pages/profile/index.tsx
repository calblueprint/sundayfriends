import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";
import Button from "@mui/material/Button";
import {
  ProfileInfo,
  FieldInfo,
} from "../../components/ProfileInfo/ProfileInfo";
import Icon from "../../assets/Icon";
import { ProfileSettings } from "../../components/ProfileSettings/ProfileSettings";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";

const ProfileSettingsPage: React.FunctionComponent = () => {
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
          <Button
            variant="contained"
            className={styles.button}
            startIcon={<Icon type="editpencil" className={styles.editicon} />}
          >
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
        <Breadcrumbs />
        <ProfileSettings />
        <div className={styles.pagetitle}>
          <Icon type="settings"></Icon>
          <h2>PROFILE SETTINGS</h2>
        </div>
        {displayinfo()}
      </div>
    </Layout>
  );
};

export default ProfileSettingsPage;
