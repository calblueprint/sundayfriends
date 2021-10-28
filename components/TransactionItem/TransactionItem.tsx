import styles from "../TransactionItem/TransactionItem.module.css";
import { ListItem, SvgIcon } from "@mui/material";
import Icon from "../../assets/Icon";

type TransactionItemProps = {
  date: Date;
  username?: string;
  fid?: string;
  admin: string;
  message: string;
  change: number;
};

export const TransactionItem: React.FunctionComponent<TransactionItemProps> = ({
  date,
  username,
  fid,
  admin,
  message,
  change,
}: TransactionItemProps) => {
  return (
    <ListItem className={styles["list-item"]}>
      <div className={fid ? styles["date"] : styles["dateV2"]}>
        {date.toLocaleDateString("en-US")}
      </div>
      {username ? <div className={styles["username"]}>{username}</div> : null}
      {fid ? <div className={styles["fid"]}>{fid}</div> : null}
      <div className={fid ? styles["admin"] : styles["adminV2"]}>{admin}</div>
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
          {"+ " + change.toFixed(2)}
        </div>
      ) : (
        <div className={fid ? styles["neg-change"] : styles["neg-changeV2"]}>
          {"- " + Math.abs(change).toFixed(2)}
        </div>
      )}
      <div className={styles["trash"]}>
        <Icon className={styles["trash-icon"]} type={"trash"}></Icon>
      </div>
    </ListItem>
  );
};
