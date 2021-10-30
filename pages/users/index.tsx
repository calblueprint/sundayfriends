import Layout from "../../components/Layout/Layout";
import styles from "./UsersPage.module.css";
import FamilyCards from "../../components/Users/FamilyCard/familyCard";
import { Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../firebase/firestore/user";
import { getAllFamilies } from "../../firebase/firestore/family";
import FullUsersList from "../../components/Users/FullUsersList/fullUsersList";

const UsersPage: React.FunctionComponent = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allFamilies, setAllFamilies] = useState([]);

  useEffect(() => {
    getAllUsers().then((items) => {
      setAllUsers(items);
    });
    getAllFamilies().then((items) => {
      setAllFamilies(items);
    });
  }, []);

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

export default UsersPage;
