import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Profile.module.css";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { Admin } from "../../types/schema";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  ProfileInfo,
  FieldInfo,
} from "../../components/ProfileInfo/ProfileInfo";
import Icon from "../../assets/Icon";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";

type ProfileSettingsPageProps = {
  currentAdmin: Admin;
};

const ProfileSettingsPage: React.FunctionComponent<ProfileSettingsPageProps> =
  ({ currentAdmin }) => {

    const [adminName, setAdminName] = useState<string>(currentAdmin.name);
    const [adminRole, setAdminRole] = useState<string>(currentAdmin.role);
    const [adminEmail, setAdminEmail] = useState<string>(currentAdmin.email);
    const [adminPhone, setAdminPhone] = useState<string>(currentAdmin.phone);

    const [editingForm, setEditingForm] = useState<boolean>(false);
    const [editingName, setEditingName] = useState<boolean>(false);
    const [editingRole, setEditingRole] = useState<boolean>(false);
    const [editingEmail, setEditingEmail] = useState<boolean>(false);
    const [editingPhone, setEditingPhone] = useState<boolean>(false);

    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        name: adminName,
        role: adminRole,
        email: adminEmail,
        phone: adminPhone,
      }
    });

    const displayinfo = () => {
      return (
        <div>
          <div className={styles["namebar"]}>
            <h1>{currentAdmin.name}</h1>
            <Button variant="contained" className={styles["button"]}>
              <Icon type="editpencil" />
              Edit
            </Button>
          </div>
          <hr className={styles["hr"]}></hr>
          <div className={styles["boxes"]}>
            <div className={styles["box"]}>
              <Typography variant="h5" fontWeight="bold">
                About
              </Typography>
              <hr></hr>
              <br></br>
              <div className={styles["info"]}>
                <div className={styles["fields"]}>
                  <Icon type="nameicon" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    NAME
                  </Typography>
                </div>
                <Typography variant="subtitle2" color="#131313">
                  {adminName}
                </Typography>
              </div>
              <br></br>
              <div className={styles["info"]}>
                <div className={styles["fields"]}>
                  <Icon type="singleperson" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    ROLE
                  </Typography>
                </div>
                <Typography variant="subtitle2" color="#131313">
                  {adminRole}
                </Typography>
              </div>
              <br></br>
              <div className={styles["info"]}>
                <div className={styles["fields"]}>
                  <Icon type="lastactive" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    LAST ACTIVE
                  </Typography>
                </div>
                <Typography variant="subtitle2" color="#131313">
                  {currentAdmin.last_active}
                </Typography>
              </div>
              <br></br>
              <div className={styles["info"]}>
                <div className={styles["fields"]}>
                  <Icon type="datejoined" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    DATE JOINED
                  </Typography>
                </div>
                <Typography variant="subtitle2" color="#131313">
                  {currentAdmin.created_at}
                </Typography>
              </div>
              <br></br>
            </div>
            <div className={styles["box"]}>
              <Typography variant="h5" fontWeight="bold">
                Login Details
              </Typography>
              <hr></hr>
              <br></br>
              <div className={styles["info"]}>
                <div className={styles["fields"]}>
                  <Icon type="email" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    EMAIL
                  </Typography>
                </div>
                <Typography variant="subtitle2" color="#131313">
                  {adminEmail}
                </Typography>
              </div>
              <br></br>
              <div className={styles["info"]}>
                <div className={styles["fields"]}>
                  <Icon type="phone" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    PHONE #
                  </Typography>
                </div>
                <Typography variant="subtitle2" color="#131313">
                  {adminPhone}
                </Typography>
              </div>
              <br></br>
              <div className={styles["info"]}>
                <div className={styles["fields"]}>
                  <Icon type="password" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    PASSWORD
                  </Typography>
                </div>
                <Typography variant="subtitle2" color="#131313">
                  *********
                </Typography>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      );
    };

    return (
      <Layout title="Profile">
        <div className={styles["page"]}>
          <div className={styles["pagetitle"]}>
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
