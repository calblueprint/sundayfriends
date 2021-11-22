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

  const getNextSunday = (date) => {
    var resultDate = new Date(date);
    resultDate.setDate(date.getDate() + ((7 - date.getDay()) % 7));
    return resultDate;
  };

  const getLastSunday = (date) => {
    var resultDate = new Date(date);
    var yesterday = new Date(date - 1);
    resultDate.setDate(date.getDate() + ((7 - date.getDay()) % 7) - 7);
    return resultDate;
  };

  const [prevSunday, setPrevSunday] = useState(getLastSunday(new Date()));
  const [nextSunday, setNextSunday] = useState(getNextSunday(new Date()));
  const [weekTransactions, setWeekTransactions] = useState(
    transactions.filter((item) => {
      let date = new Date(item.date).getTime();
      return date >= prevSunday.getTime() && date <= nextSunday.getTime();
    })
  );
  const [value, setValue] = useState(0); // integer state

  const router = useRouter();
  const refresh = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  const useForceUpdate = () => {
    return () => setValue((value) => value + 1); // update the state to force render
  };

  // useEffect(() => {
  //   filterWeek();
  // }, [prevSunday, nextSunday]);

  useEffect(() => {
    console.log(weekTransactions);
    refresh();
    useForceUpdate();
  }, [weekTransactions]);

  const filterWeek = (prev: Date, next: Date) => {
    console.log(prev);
    console.log(next);
    var week =
      allTransactions != null
        ? allTransactions.filter((item) => {
            let date = new Date(item.date).getTime();
            return date >= prev.getTime() && date <= next.getTime();
          })
        : transactions.filter((item) => {
            let date = new Date(item.date).getTime();
            return date >= prev.getTime() && date <= next.getTime();
          });
    setWeekTransactions(week);
  };

  const prevWeek = () => {
    var prev = new Date(
      prevSunday.getFullYear(),
      prevSunday.getMonth(),
      prevSunday.getDate() - 7
    );
    var next = new Date(
      nextSunday.getFullYear(),
      nextSunday.getMonth(),
      nextSunday.getDate() - 7
    );
    setPrevSunday(prev);
    setNextSunday(next);
    filterWeek(prev, next);
  };

  const nextWeek = () => {
    var prev = new Date(
      prevSunday.getFullYear(),
      prevSunday.getMonth(),
      prevSunday.getDate() + 7
    );
    var next = new Date(
      nextSunday.getFullYear(),
      nextSunday.getMonth(),
      nextSunday.getDate() + 7
    );
    setPrevSunday(prev);
    setNextSunday(next);
    filterWeek(prev, next);
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
            <Box className={styles["date-display"]}>
              {prevSunday.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {nextSunday.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Box>
            <div className={styles["chevron-wrapper"]} onClick={prevWeek}>
              <Icon
                className={styles["chevron-left"]}
                type={"chevronLeft"}
              ></Icon>
            </div>
            <div className={styles["chevron-wrapper"]} onClick={nextWeek}>
              <Icon
                className={styles["chevron-right"]}
                type={"chevronRight"}
              ></Icon>
            </div>
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

    const redemptions =
      weekTransactions != null
        ? weekTransactions.filter((transaction) => transaction.point_gain < 0)
        : transactions.filter((transaction) => transaction.point_gain < 0);

    const earnings =
      weekTransactions != null
        ? weekTransactions.filter((transaction) => transaction.point_gain >= 0)
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
          <div>
            {renderFilterHeader()}
            <TransactionList transactions={weekTransactions} />
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
