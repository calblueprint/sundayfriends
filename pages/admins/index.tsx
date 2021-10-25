import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from './Admins.module.css';
import { Button, List, ListItem, Input } from "@mui/material";
import Icon from "../../assets/Icon";
import { AdminItem } from '../../components/AdminItem/AdminItem';
import itemstyles from '../../components/AdminItem/AdminItem.module.css';
import firebase from "../../firebase/firebase";
import { getDocs } from '@firebase/firestore';
import InviteAdminModal from '../../components/InviteAdminModal/InviteAdminModal';
import { SortTriangles } from "../../components/SortTriangles/SortTriangles";

const AdminPage: React.FunctionComponent = () => {

  const renderCategoryHeader = () => {
    return (
      <div className={styles['section-header']}>
        <div className={itemstyles['name']} id={styles['category']}>
          <body id={styles['category-text']}>Admin</body>
          {/* <SortTriangles /> */}
        </div>
        <div className={itemstyles['role']} id={styles['category']}>
          <body id={styles['category-text']}>Role</body>
        </div>
        <div className={itemstyles['email']} id={styles['category']}>
          <body id={styles['category-text']}>Email</body>
        </div>
        <div className={itemstyles['phone']} id={styles['category']}>
          <body id={styles['category-text']}>Phone #</body>
        </div>
        <div className={itemstyles['buttons']} id={styles['category-text']}>Manage</div>
      </div >
    )
  }

  const temp = [
    { name: 'Firstname Lastname', role: 'admin', email: "pres@google.com", phone: "8575009958" },
    { name: 'Firstname Lastname', role: 'admin', email: "pres@google.com", phone: "8575009958" },
    { name: 'Firstname Lastname', role: 'admin', email: "pres@google.com", phone: "8575009958" },
    { name: 'Firstname Lastname', role: 'admin', email: "pres@google.com", phone: "8575009958" },
    { name: 'Firstname Lastname', role: 'admin', email: "pres@google.com", phone: "8575009958" },
    { name: 'Firstname Lastname', role: 'admin', email: "pres@google.com", phone: "8575009958" },
  ]

  const renderAdminList = () => {
    return (
      <List className={styles['list']}>
        {
          temp.map((admin) => {
            return (
              <AdminItem name={admin.name} email={admin.email} role={admin.role}
                phone={admin.phone} />
            )
          })
        }
      </List>
    )
  }

  const renderFilters = () => {
    return (
      <ListItem className={styles['topRow']}>
        <Input
          disableUnderline={true}
          placeholder="Search for an admin"
          className={styles["search-bar"]}
          endAdornment={
            <Icon className={styles["search-icon"]} type={"search"}></Icon>
          }
        />
      </ListItem>
    );
  }


  // Query Firebase
  // const db = getFirestore(firebase);
  // const dbQuery = query(collection(db, "admins"));
  // const getAdmins = async () => {
  //   const qs = await getDocs(dbQuery);
  //   return qs;
  // }
  // const admins = getAdmins();

  return (
    <Layout title='Admins'>
      <main className={styles['main']}>
        <div className={styles['header']}>
          <Icon className={styles["admin-icon"]} type={"admin"}></Icon>
          <h2 className={styles['title']}>ADMIN ACCOUNTS</h2>
          <div className={styles['button']}>
            <InviteAdminModal />
          </div>
          {/* <Button className={styles['button']}>INVITE ADMIN</Button> */}
        </div>
        <List className={styles['table']}>
          {renderFilters()}
          {renderCategoryHeader()}
          {renderAdminList()}
        </List>
      </main>
    </Layout>
  );
}

export default AdminPage;