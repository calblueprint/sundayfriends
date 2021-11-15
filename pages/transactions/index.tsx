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
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from "@mui/material";
import styles from "./Transactions.module.css";
import { TabPanel } from "../../components/TabPanel/TabPanel";
import Icon from "../../assets/Icon";
import { TransactionList } from "../../components/TransactionList/TransactionList";
import { AddPopover } from "../../components/AddPopover/AddPopover";
import {
  getAllTransactions,
  addTransaction,
} from "../../firebase/firestore/transaction";
import { getAllUsers } from "../../firebase/firestore/user";
import { User, Transaction, Admin } from "../../types/schema";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { createRouteLoader } from "next/dist/client/route-loader";
import { useRouter } from "next/router";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";

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

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const router = useRouter();
  const refresh = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);
  
  useEffect(() => {
      console.log(allTransactions)
      refresh();
  }, [allTransactions])

//   useEffect(() => {
//     // if (!props.users || !props.transactions) {
//     //     return <ErrorPage statusCode={404} />;
//     //   }
//     // getAllUsers().then(users => {
//     //     setUsers(users);
//     // })
//     // getAllTransactions().then(items => {
//     //     setTransactions(items);
//     // })
//     // console.log(transactions);
//     // setTransactions(transactions);
//     // setUsers(users);
//   }, []);

  /*
    added this sleep function because handleClose function set success back to false before the anchor was set to null
    (meaning that the) popover would switch back to the first page before closing.
    The sleep makes this look cleaner, but let me know if there is a less hacky fix.
    */
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const clickAddButton = (event) => {
    setAddAnchorEl(event.currentTarget);
  };

  const closeAdd = () => {
    setAddAnchorEl(null);
  };

  const clickUploadButton = (event) => {
    setUploadAnchorEl(event.currentTarget);
  };

  const handleUploadClose = () => {
    setUploadAnchorEl(null);
  };

  const handleUploadConfirm = () => {};

  const BasicTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const renderFilterHeader = () => {
      return (
        <div className={styles["filter-row"]}>
          <div className={styles["date-range"]}>
            <Box className={styles["calendar-box"]}>
              <Icon
                className={styles["calendar-icon"]}
                type={"calendar"}
              ></Icon>
            </Box>
            <Box className={styles["date-display"]}>Sep 5 - Sep 12</Box>
            <Icon
              className={styles["chevron-left"]}
              type={"chevronLeft"}
            ></Icon>
            <Icon
              className={styles["chevron-right"]}
              type={"chevronRight"}
            ></Icon>
          </div>
          <div className={styles["filters"]}>
            <FormControl className={styles["filter-select"]} size="small">
              <InputLabel className={styles["filter-label"]}>
                Filters
              </InputLabel>
              <Select
                variant="outlined"
                className={styles["select"]}
                label="Filters"
              >
                <MenuItem>Keep it PG</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Input
            disableUnderline={true}
            placeholder="Search for a transaction"
            className={styles["search-bar"]}
            endAdornment={
              <Icon className={styles["search-icon"]} type={"search"}></Icon>
            }
          />
        </div>
      );
    };

    const redemptions = (allTransactions!=null ? 
        allTransactions.filter((transaction) => transaction.point_gain < 0) :
        transactions.filter((transaction) => transaction.point_gain < 0));

    const earnings = (allTransactions!=null ? 
        allTransactions.filter((transaction) => transaction.point_gain >= 0) :
        transactions.filter((transaction) => transaction.point_gain >= 0));

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
          <div>
            {renderFilterHeader()}
            <TransactionList transactions={allTransactions==null ? transactions : allTransactions} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            {renderFilterHeader()}
            <TransactionList transactions={redemptions} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            {renderFilterHeader()}
            <TransactionList transactions={earnings} />
          </div>
        </TabPanel>
      </Box>
    );
  };

  const uploadPopoverContent = () => {
    switch (uploadSuccess) {
      case true:
        return <div className={styles["success-div"]}></div>;
      case false:
        return (
          <div className={styles["popover-div"]}>
            <div className={styles["popover-header"]}>
              <h3 className={styles["add-title"]}>Upload your file</h3>
              <div className={styles["x-button"]} onClick={handleUploadClose}>
                <Icon type={"close"}></Icon>
              </div>
            </div>
            <p className={styles["upload-message"]}>
              Selected file should be .csv
            </p>
            <Button
              className={styles["confirm-button"]}
              onClick={handleUploadConfirm}
            >
              Upload
            </Button>
          </div>
        );
    }
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
              className={styles["add-button"]}
              onClick={clickAddButton}
            >
              <Icon className={styles["add-icon"]} type={"add"}></Icon>
              Add
            </Button>
            <Button
              aria-describedby={uploadpopoverid}
              className={styles["upload-button"]}
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
            setTransactions={setTransactions}
          />
          <Popover
            PaperProps={{ className: styles["popover-container"] }}
            open={uploadOpen}
            id={uploadpopoverid}
            anchorEl={uploadAnchorEl}
            onClose={handleUploadClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {uploadPopoverContent()}
          </Popover>
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
