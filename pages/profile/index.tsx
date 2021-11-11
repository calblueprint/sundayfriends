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

  const [isEditing, setIsEditing] = useState(false);

  function displayinfo() {
    return (
      <div className={styles.profile}>
        <hr className={styles.hr}></hr>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <ProfileInfo
              data={aboutData}
              cardTitle="About"
              isEditing={isEditing}
            />
          </div>
          <div className={styles.box}>
            <ProfileInfo
              data={loginInfo}
              cardTitle="Login Details"
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>
    );
  }

  function editbuttons() {
    if (isEditing) {
      return (
        <div className={styles.editingButtons}>
          <Button
            className={styles.cancelButton}
            startIcon={<Icon type="smallX" />}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={styles.saveButton}
            startIcon={<Icon type="smallCheck" />}
            //onclick, save state and changes
          >
            Save
          </Button>
        </div>
      );
    }
    return (
      <Button
        variant="contained"
        className={styles.button}
        startIcon={<Icon type="editpencil" />}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>
    );
  }

  return (
    <Layout title="Profile">
      <div className={styles.page}>
        <div className={styles.pagetitle}>
          <Icon type="settings"></Icon>
          <h2>PROFILE SETTINGS</h2>
        </div>
        <div className={styles.namebar}>
          <h1> Cindo Zhang </h1>
          {editbuttons()}
        </div>
        {displayinfo()}
      </div>
    </Layout>
  );
};

export default ProfileSettingsPage;
