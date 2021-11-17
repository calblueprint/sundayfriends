import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";
import Button from "@mui/material/Button";
import {
  ProfileInfo,
  FieldInfo,
} from "../../components/ProfileInfo/ProfileInfo";
import Icon from "../../assets/Icon";

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

  return (
    <Layout title="Profile">
      <div className={styles["page"]}>
        <div className={styles["pagetitle"]}>
          <Icon type="settings"></Icon>
          <h2>MY PROFILE SETTINGS</h2>
        </div>
        <ProfileInfo aboutData={aboutData} loginInfo={loginInfo} />
      </div>
    </Layout>
  );
};

export default ProfileSettingsPage;
