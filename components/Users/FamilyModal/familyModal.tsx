import * as React from "react";
import { Modal } from "@mui/material";
import styles from "./FamilyModal.module.css";
import { Family } from "../../../types/schema";
import Icon from "../../../assets/Icon";
import UserList from "../UsersList/usersList";

type FamilyModalProps = {
  family: Family;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FamilyModal: React.FunctionComponent<FamilyModalProps> = ({
  family,
  isOpen,
  setIsOpen,
}: FamilyModalProps) => {
  return (
    <Modal open={isOpen}>
      <div className={styles["modal"]}>
        <div className={styles["colSpacing"]}>
          <div className={styles["navBar"]}>
            <button className={styles["navButton"]}>
              <Icon className={styles["chevron"]} type={"chevronLeft"} />
            </button>
            <button className={styles["navButton"]}>
              <Icon className={styles["chevron"]} type={"chevronRight"} />
            </button>
            {family.family_name} Family
          </div>
          <button
            className={styles["closeButton"]}
            onClick={() => setIsOpen(false)}
          >
            <Icon className={styles["addIcon"]} type={"close"} />
          </button>
        </div>
        <div className={styles["modalHeading"]}>
          <div className={styles["familyName"]}>
            <h1 className={styles["header"]}>{family.family_name} Family</h1>
            <div className={styles["colSpacing"]}>
              <h4>FID: {family.family_id}</h4>
              <h4>*</h4>
              <h4>{family.user_ids.length} Members</h4>
              <h4>*</h4>
              <h4>Total Transactions: {family.total_points}</h4>
            </div>
          </div>
          <div>
            <h1 className={styles["header"]}>{family.total_points}</h1>
            <h4>Total Balance</h4>
          </div>
        </div>
        <hr className={styles["break"]} />
        <h4>Family Members</h4>
        <div className={styles["modalContent"]}>
          <UserList
            users={family.user_ids}
            family={family}
            isFamilyPath={true}
            setIsOpenFam={setIsOpen}
          />
        </div>
        <div className={styles["addTransaction"]}>
          <Icon className={styles["userAdd"]} type={"userAdd"} />
          <div>Add New Family Member</div>
        </div>
      </div>
    </Modal>
  );
};

export default FamilyModal;
