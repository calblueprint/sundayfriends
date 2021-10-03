import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from './Admins.module.css';
import { Grid, Button, Box, List, ListItem } from "@mui/material";
// import firebase from "../../firebase/firebase";
import { getDocs } from '@firebase/firestore';

const AdminPage: React.FunctionComponent = () => {

  const AdminRow = ({ name, role, email, phone }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <ListItem className={styles['row']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['name']}>{role}</div>
        <div className={styles['name']}>{email}</div>
        <div className={styles['name']}>{phone}</div>
        <div className={styles['name']}>
          <Button className={styles['manageButton']}>herro</Button>
        </div>
      </ListItem>
    );
  }

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
          <h2 className={styles['h2']}>ADMIN ACCOUNTS</h2>

          <Button className={styles['button']}>INVITE ADMIN</Button>
        </div>
        <List className={styles['table']}>
          <AdminRow name="harold" role="president" email="pres@google.com" phone="8575009958" />
          <AdminRow name="harolddddddddddd" role="presidentttttt" email="pres@google.commmm" phone="8575009958" />
          <AdminRow name="harolddddddddddd" role="president" email="pres@google.com" phone="8575009958" />
          <AdminRow name="harolddddddddddd" role="president" email="pres@gogle.com" phone="8575009958" />
          {/* {AdminRow()}
          {AdminRow()}
          {AdminRow()}
          {AdminRow()} */}
          {/* {admins.map(admin => (
            <AdminRow
              name={admin.name}
              role={admin.}
              email={ }
              phone={ } />
          ))} */}
        </List>
      </main>
    </Layout>
  );
}

export default AdminPage;