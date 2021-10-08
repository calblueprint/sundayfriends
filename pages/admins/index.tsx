import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Admins.module.css";
import { Grid, Button } from "@mui/material";

const AdminPage: React.FunctionComponent = () => {
  return (
    <Layout title="Admins">
      <main className={styles["main"]}>
        <Grid container className={styles["container"]}>
          <Grid item xs={8}>
            <h2 className={styles["h2"]}>ADMIN ACCOUNTS</h2>
          </Grid>
          <Grid item className={styles["buttons"]} xs={2}>
            <Button className={styles["button"]}>INVITE ADMIN</Button>
          </Grid>
          <Grid container className={styles["table"]}></Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default AdminPage;
