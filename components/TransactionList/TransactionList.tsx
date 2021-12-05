import React, { useEffect, useState } from "react";
import Icon from "../../assets/Icon";
import { Box } from "@mui/system";
import { TransactionItem } from "../TransactionItem/TransactionItem";
import { SortTriangles } from "../SortTriangles/SortTriangles";
import { List } from "@mui/material";
import styles from "../TransactionList/TransactionList.module.css";
import itemstyles from "../TransactionItem/TransactionItem.module.css";
import { Transaction } from "../../types/schema";

type TransactionListProps = {
  transactions: Transaction[];
  setTransactions: Function;
  userPath?: boolean;
};

export const TransactionList: React.FunctionComponent<TransactionListProps> = ({
  transactions,
  setTransactions,
  userPath,
}) => {
  const renderCategoryHeader = () => {
    return (
      <Box className={styles["section-header"]}>
        <Box
          className={userPath ? styles["dateV2"] : itemstyles["date"]}
          id={styles["category"]}
        >
          <body id={styles["category-text"]}>Date</body>
          <SortTriangles />
        </Box>
        {userPath ? null : (
          <div className={itemstyles["username"]} id={styles["category"]}>
            <body id={styles["category-text"]}>User</body>
            <SortTriangles />
          </div>
        )}
        {userPath ? null : (
          <div className={itemstyles["fid"]} id={styles["category"]}>
            <body id={styles["category-text"]}>FID</body>
            <SortTriangles />
          </div>
        )}
        <div
          className={userPath ? styles["adminV2"] : itemstyles["admin"]}
          id={styles["category"]}
        >
          <body id={styles["category-text"]}>Admin</body>
          <SortTriangles />
        </div>
        <div
          className={userPath ? styles["actionV2"] : itemstyles["action"]}
          id={styles["category"]}
        >
          <body id={styles["category-text"]}>Action</body>
          <SortTriangles />
        </div>
        <div
          className={userPath ? styles["messageV2"] : itemstyles["message"]}
          id={styles["category-text"]}
        >
          Message
        </div>
        <div className={itemstyles["change"]} id={styles["category-text"]}>
          Change
        </div>
      </Box>
    );
  };

  const renderHistory = () => {
    return (
      <List className={styles["list"]}>
        {transactions.map((transaction) => {
          console.log(transaction);
          return (
            <TransactionItem
              id={transaction.transaction_id}
              key={transaction.transaction_id}
              date={transaction.date}
              userName={userPath ? null : transaction.user_name}
              fid={userPath ? null : transaction.family_id}
              adminName={transaction.admin_name}
              message={transaction.description}
              change={transaction.point_gain}
              setTransactions={setTransactions}
            />
          );
        })}
      </List>
    );
  };

  return (
    <div>
      {renderCategoryHeader()}
      {renderHistory()}
    </div>
  );
};
