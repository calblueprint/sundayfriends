import Layout from "../../components/Layout/Layout";
import styles from "./UsersPage.module.css";
import FamilyCards from "../../components/Users/FamilyCard/familyCard";
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { getAllUsers } from "../../firebase/firestore/user";
import { getAllFamilies } from "../../firebase/firestore/family";
import FullUsersList from "../../components/Users/FullUsersList/fullUsersList";

import { Family, User } from "../../types/schema";

type UsersPageProps = {
  allUsers: User[];
  allFamilies: Family[];
};

const UsersPage: React.FunctionComponent<UsersPageProps> = ({
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

export async function getServerSideProps(): Promise<{
  props: {
    allUsers: User[];
    allFamilies: Family[];
  };
}> {
  try {
    const users = await getAllUsers().then((items) => {
      return items;
    });
    const families = await getAllFamilies().then((items) => {
      return items;
    });
    return { props: { allUsers: users, allFamilies: families } };
  } catch (err) {
    console.log(err);
  }
}

export default UsersPage;
