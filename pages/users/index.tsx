import Layout from "../../components/Layout/Layout";
import styles from "./UserAccounts.module.css";
import FamilyCards from "../../components/Users/familyCard";
import UsersList from "../../components/Users/usersList";
// import { Family, User } from "../../types/schema";
import { Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
//import { useAuth } from "../../firebase/auth/useAuth";
import { useRouter } from "next/router";
// import firstore;
// import { firestore } from "firebase-admin";
import firebaseAdmin from '../../firebase/firebaseAdmin';
import { GetServerSidePropsContext } from 'next';
import { Admin } from "../../types/schema";
import { getAdmin } from '../../firebase/firestore/admin';
import nookies from "nookies";

type UserPageProps = {
  currentAdmin: Admin
}

const UsersPage: React.FunctionComponent<UserPageProps> = ({
  currentAdmin
}) => {
  //   const db = getFirestore(firebase);
  //   const dbQuery = query(collection(db, "families"));
  //   const getFamilies = async () => {
  //     const qs = await getDocs(dbQuery);
  //     console.log(qs);
  //     return qs;
  //   };
  //   const familes = getFamilies();
  //   const [families, familiesLoading, familiesError] = useCollection(
  //     firestore().collection("families"),
  //     {}
  //   );

  //   if (!familiesLoading && families) {
  //     families.docs.map((doc) => console.log(doc.data()));
  //   }

  const users = [
    {
      address: "2419 Yes Ave",
      created_at: new Date(),
      email: "hello@asldkjf.com",
      family_head: true,
      family_id: 12345,
      full_name: "Sydney Bui",
      last_active: new Date(),
      parent: true,
      points: 12000,
      reward_eligible: true,
      suspended: false,
    },
    {
      address: "2419 Yes Ave",
      created_at: new Date(),
      email: "hello@asldkjf.com",
      family_head: false,
      family_id: 12345,
      full_name: "Bob Builder",
      last_active: new Date(),
      parent: false,
      points: 12000,
      reward_eligible: true,
      suspended: false,
    },
    {
      address: "2419 Yes Ave",
      created_at: new Date(),
      email: "hello@asldkjf.com",
      family_head: false,
      family_id: 12345,
      full_name: "Hello Hello",
      last_active: new Date(),
      parent: false,
      points: 12000,
      reward_eligible: true,
      suspended: false,
    },
    {
      address: "2419 Yes Ave",
      created_at: new Date(),
      email: "hello@asldkjf.com",
      family_head: false,
      family_id: 12345,
      full_name: "Bye Hello",
      last_active: new Date(),
      parent: false,
      points: 12000,
      reward_eligible: true,
      suspended: false,
    },
    {
      address: "2419 Yes Ave",
      created_at: new Date(),
      email: "hello@asldkjf.com",
      family_head: false,
      family_id: 12345,
      full_name: "Oops Hello",
      last_active: new Date(),
      parent: false,
      points: 12000,
      reward_eligible: true,
      suspended: false,
    },
  ];
  const families = [
    {
      totalPoints: 12000,
      familyName: "Nguyen",
      userIds: users,
      familyId: 12345,
    },
    {
      totalPoints: 12000,
      familyName: "Nguyen",
      userIds: users,
      familyId: 12345,
    },
    {
      totalPoints: 12000,
      familyName: "Nguyen",
      userIds: users,
      familyId: 12345,
    },
    {
      totalPoints: 12000,
      familyName: "Nguyen",
      userIds: users,
      familyId: 12345,
    },
  ];
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout title="Users">
      <div className={styles["container"]}>
        <h1 className={styles.heading}>USER ACCOUNTS</h1>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={styles.tabs}
        >
          <Tab label="Families View" />
          <Tab label="List View" />
        </Tabs>
        {value == 0 ? (
          <FamilyCards families={families} />
        ) : (
          <UsersList users={users} />
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const userToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const adminUid = userToken.uid;
    const adminData = await getAdmin(adminUid);
    return {
      props: { currentAdmin: adminData }
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permament: false,
        destination: '/',
      }
    }
  }
}

export default UsersPage;
