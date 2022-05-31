import * as React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./UsersPage.module.css";
import FamilyCards from "../../components/Users/FamilyCard/familyCard";
import { Tabs, Tab, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../firebase/firestore/user";
import { getAllFamilies } from "../../firebase/firestore/family";
import FullUsersList from "../../components/Users/FullUsersList/fullUsersList";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";
import { Admin, Family, User } from "../../types/schema";
import { useRouter } from "next/router";
import Icon from "../../assets/Icon";
import NewFamilyModal from "../../components/Users/NewFamilyModal/newFamilyModal";

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
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState(allUsers);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(15);

  useEffect(() => {
    setUsers(allUsers.slice(startIndex, endIndex));
  }, [startIndex]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const router = useRouter();
  const refreshData = (): void => {
    router.replace(router.asPath);
  };

  return (
    <Layout title="Users">
      <NewFamilyModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles["container"]}>
        <div className={styles["headingContainer"]}>
          <div className={styles["title"]}>
            <Icon className={styles["userIcon"]} type={"usersnavicon"} />
            <h2 className={styles["heading"]}>USER ACCOUNTS</h2>
          </div>
          <button
            className={styles["addFamilyButton"]}
            onClick={() => setIsOpen(true)}
          >
            <Icon className={styles["familyButtonIcon"]} type={"family"} />
            New Family
          </button>
        </div>
        <Tabs
          TabIndicatorProps={{
            style: {
              color: "black",
            },
          }}
          value={value}
          onChange={handleChange}
          textColor={"inherit"}
          aria-label="basic tabs example"
          className={styles["alltabs"]}
        >
          <Tab
            className={value == 0 ? styles["sel-tabs"] : styles["tabs"]}
            label="Family View"
          />
          <Tab
            className={value == 1 ? styles["sel-tabs"] : styles["tabs"]}
            label="User View"
          />
        </Tabs>
        {value == 0 ? (
          <FamilyCards families={allFamilies} refresh={() => refreshData()} />
        ) : (
          <FullUsersList
            allUsers={allUsers}
            users={users}
            setUsers={setUsers}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            endIndex={endIndex}
            setEndIndex={setEndIndex}
            refresh={() => refreshData()}
          />
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
