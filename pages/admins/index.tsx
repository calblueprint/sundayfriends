import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Admins.module.css";
import { Button, List, ListItem } from "@mui/material";
import { AdminItem } from "../../components/AdminItem/AdminItem";
import itemstyles from "../../components/AdminItem/AdminItem.module.css";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { Admin } from "../../types/schema";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";

type AdminPageProps = {
  currentAdmin: Admin;
};

const AdminPage: React.FunctionComponent<AdminPageProps> = ({
  currentAdmin,
}) => {
  const renderCategoryHeader = () => {
    return (
      <div className={styles["section-header"]}>
        <div className={itemstyles["name"]} id={styles["category"]}>
          <body id={styles["category-text"]}>Name</body>
        </div>
        <div className={itemstyles["role"]} id={styles["category"]}>
          <body id={styles["category-text"]}>Role</body>
        </div>
        <div className={itemstyles["email"]} id={styles["category"]}>
          <body id={styles["category-text"]}>Email</body>
        </div>
        <div className={itemstyles["phone"]} id={styles["category"]}>
          <body id={styles["category-text"]}>Phone</body>
        </div>
        <div className={itemstyles["buttons"]} id={styles["category-text"]}>
          Manage
        </div>
      </div>
    );
  };

  const temp = [
    {
      name: "Firstname Lastname",
      role: "admin",
      email: "pres@google.com",
      phone: "8575009958",
    },
    {
      name: "Firstname Lastname",
      role: "admin",
      email: "pres@google.com",
      phone: "8575009958",
    },
  ];

  const renderAdminList = () => {
    return (
      <List className={styles["list"]}>
        {temp.map((admin, index) => {
          return (
            <AdminItem
              key={index}
              name={admin.name}
              email={admin.email}
              role={admin.role}
              phone={admin.phone}
            />
          );
        })}
      </List>
    );
  };

  const renderFilters = () => {
    return <ListItem className={styles["row"]} />;
  };

  // Query Firebase
  // const db = getFirestore(firebase);
  // const dbQuery = query(collection(db, "admins"));
  // const getAdmins = async () => {
  //   const qs = await getDocs(dbQuery);
  //   return qs;
  // }
  // const admins = getAdmins();

  return (
    <Layout title="Admins">
      <main className={styles["main"]}>
        <div className={styles["header"]}>
          <h2 className={styles["h2"]}>ADMIN ACCOUNTS</h2>

          <Button className={styles["button"]}>INVITE ADMIN</Button>
        </div>
        <List className={styles["table"]}>
          {renderFilters()}
          {renderCategoryHeader()}
          {renderAdminList()}
        </List>
      </main>
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

export default AdminPage;
