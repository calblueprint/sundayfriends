import * as React from "react";
import styles from "../TransactionItem/TransactionItem.module.css";
import { ListItem } from "@mui/material";
import Icon from "../../assets/Icon";
import { Timestamp } from "@firebase/firestore";
import { styled } from "@mui/styles";
import {
  getAllTransactions,
  deleteTransaction,
} from "../../firebase/firestore/transaction";

type TransactionItemProps = {
  id: string;
  date: Date | Timestamp;
  userName?: string;
  fid?: string;
  adminName: string;
  message: string;
  change: number;
  setTransactions: Function;
};

const StyledListItem = styled(ListItem)(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  minHeight: "54px",
  paddingLeft: "2%",
  paddingRight: "2%",
  borderTop: "1px solid #ebebeb",
  color: "#646464",
  fontWeight: "normal",
  fontSize: "13.5px",
}));

export const TransactionItem: React.FunctionComponent<TransactionItemProps> = ({
  id,
  date,
  userName,
  fid,
  adminName,
  message,
  change,
  setTransactions,
}: TransactionItemProps) => {
  const handleDelete = async () => {
    await deleteTransaction(id);
    let trans = await getAllTransactions();
    setTransactions(trans);
  };

  return (
    <StyledListItem>
      <div className={fid ? styles["date"] : styles["dateV2"]}>{date}</div>
      {userName ? <div className={styles["username"]}>{userName}</div> : null}
      {fid ? <div className={styles["fid"]}>{fid}</div> : null}
      <div className={fid ? styles["admin"] : styles["adminV2"]}>
        {adminName}
      </div>
      <div className={fid ? styles["action"] : styles["actionV2"]}>
        {change > 0 ? (
          <div className={styles["earn-action"]}>Earn</div>
        ) : (
          <div className={styles["redeem-action"]}>Redeem</div>
        )}
      </div>
      <div className={fid ? styles["message"] : styles["messageV2"]}>
        {message}
      </div>
      {change > 0 ? (
        <div className={fid ? styles["pos-change"] : styles["pos-changeV2"]}>
          {"+ " + change}
        </div>
      ) : (
        <div className={fid ? styles["neg-change"] : styles["neg-changeV2"]}>
          {"- " + Math.abs(change)}
        </div>
      )}
      <div className={styles["trash"]} onClick={handleDelete}>
        <Icon className={styles["trash-icon"]} type={"trash"}></Icon>
      </div>
    </StyledListItem>
  );
};
