import * as React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./UsersPage.module.css";
import FamilyCards from "../../components/Users/FamilyCard/familyCard";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { getAllUsers } from "../../firebase/firestore/user";
import { getAllFamilies } from "../../firebase/firestore/family";
import FullUsersList from "../../components/Users/FullUsersList/fullUsersList";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";
import { Admin, Family, User } from "../../types/schema";

type UsersPageProps = {
  currentAdmin: Admin;
  allUsers: User[];
  allFamilies: Family[];
};

const UsersPage: React.FunctionComponent<UsersPageProps> = ({
  currentAdmin,
  allUsers,
  allFamilies,
}: UsersPageProps) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title="Users">
      <div className={styles["container"]}>
        <h1 className={styles["heading"]}>USER ACCOUNTS</h1>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={styles["tabs"]}
        >
          <Tab className={styles["tabs"]} label="Families View" />
          <Tab className={styles["tabs"]} label="List View" />
        </Tabs>
        {value == 0 ? (
          <FamilyCards families={allFamilies} />
        ) : (
          <FullUsersList users={allUsers} />
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const users = await getAllUsers();
    const families = await getAllFamilies();
    const cookies = nookies.get(ctx);
    const userToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const adminUid = userToken.uid;
    const adminData = await getAdmin(adminUid);
    return {
      props: {
        currentAdmin: adminData,
        allUsers: users,
        allFamilies: families,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permament: false,
        destination: "/",
      },
    };
  }
};

export default UsersPage;
