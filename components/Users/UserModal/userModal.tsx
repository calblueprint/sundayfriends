import { Box, Input, Modal, Button, List } from "@mui/material";
import styles from "./UserModal.module.css";
import { Family, User } from "../../../types/schema";
import Icon from "../../../assets/Icon";
import { TransactionItem } from "../../TransactionItem/TransactionItem";
import { SortTriangles } from "../../../components/SortTriangles/SortTriangles";
import itemstyles from "../../../components/TransactionItem/TransactionItem.module.css";
import { getAllTransactions } from "../../../firebase/firestore/transaction";
import React, { useState, useEffect } from "react";

type UserModalProps = {
  family?: Family;
  user: User;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFamilyPath: boolean;
  setIsOpenFam: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserModal: React.FunctionComponent<UserModalProps> = ({
  family,
  user,
  isOpen,
  setIsOpen,
  isFamilyPath,
  setIsOpenFam,
}: UserModalProps) => {
  const [allTransactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions().then((items) => {
      setTransactions(items);
    });
  }, []);
  return (
    <Modal open={isOpen}>
      <div className={styles["modal"]}>
        <div
          className={
            isFamilyPath ? styles["colSpacing"] : styles["withOutNavRoute"]
          }
        >
          {isFamilyPath ? (
            <div className={styles["navBar"]}>
              <button
                className={styles["navButton"]}
                onClick={() => setIsOpen(false)}
              >
                <Icon className={styles["chevron"]} type={"chevronLeft"} />
              </button>
              <button className={styles["navButton"]}>
                <Icon className={styles["chevron"]} type={"chevronRight"} />
              </button>
              {family.family_name} Family / {user?.full_name}
            </div>
          ) : null}
          <button
            className={styles["closeButton"]}
            onClick={() => {
              setIsOpen(false);
              isFamilyPath ? setIsOpenFam(false) : null;
            }}
          >
            <Icon className={styles["closeIcon"]} type={"close"} />
          </button>
        </div>
        <div className={styles["modalHeading"]}>
          <div className={styles["familyName"]}>
            <h1 className={styles["header"]}>{user?.full_name}</h1>
            <div className={styles["colSpacing"]}>
              <h4>{user?.full_name.split(" ")[1]} Family</h4>
              <h4>*</h4>
              <h4>FID: {user?.family_id}</h4>
            </div>
          </div>
          <div>
            <h1 className={styles["header"]}>{user?.points}</h1>
            <h4>Individual Balance</h4>
          </div>
        </div>
        <hr className={styles["break"]} />
        <div>
          <div className={styles["modalInfo"]}>
            <div>
              <h3>About Information</h3>
              <div className={styles["aboutInfoContainer"]}>
                <div className={styles["squareBullet"]}>
                  <Icon
                    className={styles["infoSpacing"]}
                    type={"squareBullet"}
                  />
                  <Icon
                    className={styles["infoSpacing"]}
                    type={"squareBullet"}
                  />
                  <Icon
                    className={styles["infoSpacing"]}
                    type={"squareBullet"}
                  />
                  <Icon
                    className={styles["infoSpacing"]}
                    type={"squareBullet"}
                  />
                </div>
                <div className={styles["aboutInfo"]}>
                  <div className={styles["subTitle"]}>Role</div>
                  <div className={styles["subTitle"]}>Email</div>
                  <div className={styles["subTitle"]}>Phone</div>
                  <div className={styles["subTitle"]}>Password</div>
                </div>
                <div className={styles["aboutInfo"]}>
                  <div className={styles["infoSpacing"]}>
                    {user?.family_head ? "Head" : "Member"}
                  </div>
                  <div className={styles["infoSpacing"]}>{user?.email}</div>
                  <div className={styles["infoSpacing"]}>
                    {user?.phone_number}
                  </div>
                  <div className={styles["infoSpacing"]}>password</div>
                </div>
              </div>
            </div>
            <Button className={styles["editButton"]}>
              <Icon className={styles["editIcon"]} type={"edit"} />
              <p>Edit</p>
            </Button>
          </div>
        </div>
        <hr className={styles["break"]} />
        <div className={styles["transactionHeader"]}>
          <h3>Transaction History</h3>
          <Button className={styles["editButton"]}>
            <Icon className={styles["addIcon"]} type={"add"} />
            <p>Add</p>
          </Button>
        </div>
        <div className={styles["transactionHeader"]}>
          <div className={styles["date-range"]}>
            <Icon className={styles["chevron"]} type={"chevronLeft"}></Icon>
            <Icon className={styles["chevron"]} type={"chevronRight"}></Icon>
            <Box className={styles["calendar-box"]}>
              <Icon
                className={styles["calendar-icon"]}
                type={"calendar"}
              ></Icon>
            </Box>
            <Box className={styles["date-display"]}>Sep 5 - Sep 12</Box>
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
        <div className={styles["sectionHeader"]}>
          <div className={itemstyles["dateV2"]} id={styles["category"]}>
            <body id={styles["categoryText"]}>Date</body>
            <SortTriangles />
          </div>
          <div className={itemstyles["adminV2"]} id={styles["category"]}>
            <body id={styles["categoryText"]}>Admin</body>
            <SortTriangles />
          </div>
          <div className={itemstyles["actionV2"]} id={styles["category"]}>
            <body id={styles["categoryText"]}>Action</body>
            <SortTriangles />
          </div>
          <div className={itemstyles["messageV2"]} id={styles["categoryText"]}>
            Message
          </div>
          <div id={styles["categoryText"]}>Change</div>
        </div>
        <div className={styles["transactionBox"]}>
          <List className={styles["list"]}>
            {allTransactions.map((transaction) => {
              return (
                <TransactionItem
                  key={transaction.user_name}
                  date={transaction.date}
                  adminName={transaction.admin_name}
                  message={transaction.description}
                  change={transaction.point_gain}
                />
              );
            })}
          </List>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
