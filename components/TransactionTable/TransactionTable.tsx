import React, { useEffect, useState } from "react";
import Icon from "../../assets/Icon";
import { Box } from "@mui/system";
import styles from "../TransactionTable/TransactionTable.module.css";
import { Input } from "@mui/material";
import { Transaction } from "../../types/schema";
import { TransactionList } from "../TransactionList/TransactionList";

type TransactionTableProps = {
  transactions: Transaction[];
  setTransactions: Function;
  userPath?: boolean;
};

export const TransactionTable: React.FunctionComponent<TransactionTableProps> =
  ({ transactions, setTransactions, userPath }) => {
    const [isLoading, setIsLoading] = useState(false);

    const getNextSunday = (date) => {
      var resultDate = new Date(date);
      resultDate.setDate(date.getDate() + ((7 - date.getDay()) % 7));
      return resultDate;
    };

    const getLastSunday = (date) => {
      var resultDate = new Date(date);
      resultDate.setDate(date.getDate() + ((7 - date.getDay()) % 7) - 7);
      return resultDate;
    };

    const [prevSunday, setPrevSunday] = useState(getLastSunday(new Date()));
    const [nextSunday, setNextSunday] = useState(getNextSunday(new Date()));
    const [weekTransactions, setWeekTransactions] = useState(
      transactions.filter((item) => {
        let date = new Date(item.date.toString()).getTime();
        return date >= prevSunday.getTime() && date <= nextSunday.getTime();
      })
    );
    const [filteredTransactions, setFilteredTransactions] =
      useState(weekTransactions);

    useEffect(() => {
      setWeekTransactions(
        transactions.filter((item) => {
          let date = new Date(item.date.toString()).getTime();
          return date >= prevSunday.getTime() && date <= nextSunday.getTime();
        })
      );
    }, [transactions]);

    useEffect(() => {
      console.log(weekTransactions);
      setFilteredTransactions(weekTransactions);
      return () => setIsLoading(false);
    }, [weekTransactions]);

    const filterWeek = (prev: Date, next: Date) => {
      console.log(prev);
      console.log(next);
      var week =
        transactions != null
          ? transactions.filter((item) => {
              let date = new Date(item.date.toString()).getTime();
              return date >= prev.getTime() && date <= next.getTime();
            })
          : transactions.filter((item) => {
              let date = new Date(item.date.toString()).getTime();
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
      setIsLoading(true);
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
      setIsLoading(true);
      filterWeek(prev, next);
    };

    const nextWeekAvailable = () => {
      if (nextSunday.getTime() >= new Date().getTime()) {
        return false;
      }
      return true;
    };

    const filterSearch = (event) => {
      setFilteredTransactions(
        weekTransactions.filter((item) => {
          return (
            item.user_name
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            item.admin_name
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          );
        })
      );
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
            {nextWeekAvailable() && (
              <div className={styles["chevron-wrapper"]} onClick={nextWeek}>
                <Icon
                  className={styles["chevron-right"]}
                  type={"chevronRight"}
                ></Icon>
              </div>
            )}
          </div>
          <Input
            disableUnderline={true}
            placeholder="Search for a transaction"
            className={styles["search-bar"]}
            onChange={filterSearch}
            endAdornment={
              <Icon className={styles["search-icon"]} type={"search"}></Icon>
            }
          />
        </div>
      );
    };

    return (
      <div>
        {renderFilterHeader()}
        {console.log(transactions)}
        {!isLoading && (
          <TransactionList
            transactions={filteredTransactions}
            setTransactions={setTransactions}
            userPath={userPath ? true : false}
          />
        )}
      </div>
    );
  };
