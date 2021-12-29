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
  CircularProgress,
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
import { styled } from "@mui/system";
import { UploadPopover } from "../../components/UploadPopover/UploadPopover";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";

type TransactionPageProps = {
  currentAdmin: Admin;
  transactions: Transaction[];
  users: User[];
};

const TransactionTab = styled(Tab)(() => ({
  minWidth: "90px",
  width: "12%",
  marginLeft: "7px",
  marginRight: "7px",
  backgroundColor: "#526dc2",
  borderRadius: "15px 15px 0px 0px",
  color: "#e6ecfe",
  textTransform: "none",
  fontSize: "14px",
  fontFamily: "Avenir",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
  marginTop: "10px",
  fontWeight: "bold",
}));

const SelectedTab = styled(Tab)(() => ({
  fontFamily: "Avenir",
  backgroundColor: "white",
  borderRadius: "15px 15px 0px 0px",
  minWidth: "110px",
  width: "12%",
  marginLeft: "7px",
  marginRight: "7px",
  color: "#253c85",
  textDecorationLine: "underline",
  textDecorationThickness: "2px",
  textDecorationColor: "#253c85",
  textUnderlineOffset: "6px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "bold",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
  marginTop: "10px",
}));

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

  const [redemptions, setRedemptions] = useState(
    allTransactions != null
      ? allTransactions.filter((transaction) => transaction.point_gain < 0)
      : transactions.filter((transaction) => transaction.point_gain < 0)
  );

  const [earnings, setEarnings] = useState(
    allTransactions != null
      ? allTransactions.filter((transaction) => transaction.point_gain >= 0)
      : transactions.filter((transaction) => transaction.point_gain >= 0)
  );

  useEffect(() => {
    setRedemptions(
      allTransactions != null
        ? allTransactions.filter((transaction) => transaction.point_gain < 0)
        : transactions.filter((transaction) => transaction.point_gain < 0)
    );
    setEarnings(
      allTransactions != null
        ? allTransactions.filter((transaction) => transaction.point_gain >= 0)
        : transactions.filter((transaction) => transaction.point_gain >= 0)
    );
    return () => setIsLoading(false);
  }, [allTransactions]);

  const changeTransactions = (trans) => {
    setTransactions(trans);
    setIsLoading(true);
  };

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

    return (
      <Box
        sx={{
          width: "100%",
          borderRadius: "15px 15px 30px 30px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          textColor={"inherit"}
          aria-label="basic tabs example"
        >
          {value == 0 ? (
            <SelectedTab label="History" />
          ) : (
            <TransactionTab label="History" />
          )}
          {value == 1 ? (
            <SelectedTab label="Redemptions" />
          ) : (
            <TransactionTab label="Redemptions" />
          )}
          {value == 2 ? (
            <SelectedTab label="Earnings" />
          ) : (
            <TransactionTab label="Earnings" />
          )}
        </Tabs>
        <TabPanel value={value} index={0}>
          {!isLoading && (
            <TransactionTable
              transactions={
                allTransactions != null ? allTransactions : transactions
              }
              setTransactions={changeTransactions}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!isLoading && (
            <TransactionTable
              transactions={redemptions}
              setTransactions={changeTransactions}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {!isLoading && (
            <TransactionTable
              transactions={earnings}
              setTransactions={changeTransactions}
            />
          )}
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
                  fontFamily: "Avenir",
                  backgroundColor: "#253c85",
                  color: "#e6ecfe",
                  borderRadius: "7px",
                  height: "38px",
                  fontSize: "14px",
                  marginRight: "20px",
                  padding: "7px 11px",
                  textTransform: "none",
                },
                "&:hover": {
                  backgroundColor: "#526dc2",
                  color: "#e6ecfe",
                },
              }}
              onClick={clickAddButton}
            >
              <Icon className={styles["add-icon"]} type={"add"}></Icon>
              <p className={styles["add-text"]}>Add</p>
            </Button>
            <Button
              aria-describedby={uploadpopoverid}
              sx={{
                display: {
                  backgroundColor: "#253c85",
                  color: "#e6ecfe",
                  borderRadius: "7px",
                  height: "38px",
                  padding: "7px 11px",
                  textTransform: "none",
                },
                "&:hover": {
                  backgroundColor: "#526dc2",
                  color: "#e6ecfe",
                },
              }}
              onClick={clickUploadButton}
            >
              <Icon className={styles["add-icon"]} type={"upload"}></Icon>
              <p className={styles["add-text"]}>Upload</p>
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
            setTransactions={changeTransactions}
          />
        </div>
        {BasicTabs()}
      </div>
      {isLoading && (
        <CircularProgress className={styles["circular-progress"]} />
      )}
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
