import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Button,
  Tabs,
  Tab,
  Box,
  List,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
} from "@mui/material";
import styles from "./Transactions.module.css";
import { TabPanel } from "../../components/TabPanel/TabPanel";
import Icon from "../../assets/Icon";
import { TransactionList } from "../../components/TransactionList/TransactionList";
import { AddPopover } from "../../components/AddPopover/AddPopover";
import { getAllTransactions } from "../../firebase/firestore/transaction";
import { getAllUsers } from "../../firebase/firestore/user";
import { User, Transaction, Admin } from "../../types/schema";
import next, { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";
import { UploadPopover } from "../../components/UploadPopover/UploadPopover";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";

type TransactionPageProps = {
  currentAdmin: Admin;
  transactions: Transaction[];
  users: User[];
};

const TransactionsPage: React.FunctionComponent<TransactionPageProps> = ({
  currentAdmin,
  transactions,
  users,
}) => {
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [uploadAnchorEl, setUploadAnchorEl] = React.useState(null);
  const [allUsers, setUsers] = React.useState(users);
  const [allTransactions, setTransactions] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => setIsLoading(false);
  }, [allTransactions])

  const changeTransactions = (trans) => {
    setTransactions(trans);
    setIsLoading(true);
  }

  const clickAddButton = (event) => {
    setAddAnchorEl(event.currentTarget);
  };

  const closeAdd = () => {
    setAddAnchorEl(null);
  };

  const closeUpload = () => {
    setUploadAnchorEl(null);
  };

  const clickUploadButton = (event) => {
    setUploadAnchorEl(event.currentTarget);
  };

  const BasicTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const redemptions =
      allTransactions != null
        ? allTransactions.filter((transaction) => transaction.point_gain < 0)
        : transactions.filter((transaction) => transaction.point_gain < 0);

    const earnings =
      allTransactions != null
        ? allTransactions.filter((transaction) => transaction.point_gain >= 0)
        : transactions.filter((transaction) => transaction.point_gain >= 0);

    return (
      <Box className={styles["transaction-container"]}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          textColor={"inherit"}
          aria-label="basic tabs example"
          className={styles["tabs"]}
        >
          <Tab
            label="History"
            className={value == 0 ? styles["sel-tab"] : styles["tab"]}
          />
          <Tab
            label="Redemptions"
            className={value == 1 ? styles["sel-tab"] : styles["tab"]}
          />
          <Tab
            label="Earnings"
            className={value == 2 ? styles["sel-tab"] : styles["tab"]}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          {!isLoading && <TransactionTable transactions={allTransactions != null ? allTransactions: transactions}/>}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TransactionTable transactions={redemptions}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TransactionTable transactions={earnings}/>
        </TabPanel>
      </Box>
    );
  };

  const addOpen = Boolean(addAnchorEl);
  const popoverid = addOpen ? "add-popover" : undefined;
  const uploadOpen = Boolean(uploadAnchorEl);
  const uploadpopoverid = uploadOpen ? "upload-popover" : undefined;
  return (
    <Layout title="Transactions">
      <div className={styles["screen"]}>
        <div className={styles["container"]}>
          <div className={styles["title-div"]}>
            <Icon
              className={styles["transaction-icon"]}
              type={"transaction"}
            ></Icon>
            <h2 className={styles["h2"]}>TRANSACTIONS</h2>
          </div>
          <div className={styles["button-container"]}>
            <Button
              aria-describedby={popoverid}
              sx={{
                display: {
                  backgroundColor: "#253c85",
                  color: "white",
                  borderRadius: "7px",
                  height: "33px",
                  fontSize: "14px",
                  marginRight: "20px",
                  textTransform: "none",
                },
                "&:hover": {
                  backgroundColor: "#253c85",
                  color: "#686868",
                },
              }}
              onClick={clickAddButton}
            >
              <Icon className={styles["add-icon"]} type={"add"}></Icon>
              Add
            </Button>
            <Button
              aria-describedby={uploadpopoverid}
              sx={{
                display: {
                  backgroundColor: "#253c85",
                  color: "white",
                  borderRadius: "7px",
                  height: "33px",
                  fontSize: "14px",
                  marginRight: "20px",
                  textTransform: "none",
                },
                "&:hover": {
                  backgroundColor: "#253c85",
                  color: "#686868",
                },
              }}
              onClick={clickUploadButton}
            >
              <Icon className={styles["add-icon"]} type={"upload"}></Icon>
              Upload
            </Button>
          </div>
          <AddPopover
            addAnchor={addAnchorEl}
            closeAdd={closeAdd}
            allUsers={allUsers}
            popoverid={popoverid}
            currentAdmin={currentAdmin}
            setTransactions={changeTransactions}
          />
          <UploadPopover
            uploadAnchor={uploadAnchorEl}
            closeUpload={closeUpload}
            popoverid={uploadpopoverid}
          />
        </div>
        {BasicTabs()}
      </div>
    </Layout>
  );
};

//Use SSR to load admins!
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const users = await getAllUsers();
    const transactions = await getAllTransactions();
    const cookies = nookies.get(ctx);
    const userToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const adminUid = userToken.uid;
    const adminData = await getAdmin(adminUid);
    return {
      props: {
        currentAdmin: adminData,
        users: users,
        transactions: transactions,
      },
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

export default TransactionsPage;
