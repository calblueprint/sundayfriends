import React from 'react';
import Layout from "../../components/Layout/Layout";
import styles from './Admins.module.css';
import { Grid, Button, Box } from "@mui/material";

const AdminPage: React.FunctionComponent = () => {

  const AdminRow = ({ name, role, email, phone }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div className={styles['row']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <Layout title='Admins'>
      <main className={styles['main']}>
        <div className={styles['header']}>
          <h2 className={styles['h2']}>ADMIN ACCOUNTS</h2>

          <Button className={styles['button']}>INVITE ADMIN</Button>
        </div>
        <div className={styles['table']}>
          {/* {AdminRow()}
          {AdminRow()}
          {AdminRow()}
          {AdminRow()}
          {admins.map(admin => (
            <AdminRow
              name={}
              role={}
              email={}
              phone={} />
          ))} */}
        </div>
      </main>
    </Layout>
  );
}

export default AdminPage;