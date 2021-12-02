import * as React from "react";
import { Modal } from "@mui/material";
import styles from "./FamilyModal.module.css";
import { Family } from "../../../types/schema";
import Icon from "../../../assets/Icon";
import UserList from "../UsersList/usersList";
import { useEffect, useState } from "react";
import { getFamilyById } from "../../../firebase/firestore/family";

type FamilyModalProps = {
  family: Family;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
};

const FamilyModal: React.FunctionComponent<FamilyModalProps> = ({
  family,
  isOpen,
  setIsOpen,
  refresh,
}: FamilyModalProps) => {
  const [newFamily, setNewFamily] = useState<Family>();
  const [wasEdited, setWasEdited] = useState(false);
  useEffect(() => {
    const getFamilies = async () => {
      if (family) {
        const data = await getFamilyById(family.family_id);
        setNewFamily(data);
      }
    };
    getFamilies();
    setWasEdited(false);
    refresh();
  }, [wasEdited]);
  const getUpdated = (): Family => {
    return newFamily ? newFamily : family;
  };
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
            {getUpdated().family_name} Family
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
            <h1 className={styles["header"]}>
              {getUpdated().family_name} Family
            </h1>
            <div className={styles["colSpacing"]}>
              <h4>FID: {getUpdated().family_id}</h4>
              <h4>*</h4>
              <h4>{getUpdated().user_ids.length} Members</h4>
              <h4>*</h4>
              <h4>Total Transactions: {getUpdated().total_points}</h4>
            </div>
          </div>
          <div>
            <h1 className={styles["header"]}>{getUpdated().total_points}</h1>
            <h4>Total Balance</h4>
          </div>
        </div>
        <hr className={styles["break"]} />
        <h4>Family Members</h4>
        <div className={styles["modalContent"]}>
          <UserList
            users={getUpdated().user_ids}
            family={family}
            isFamilyPath={true}
            setIsOpenFam={setIsOpen}
            setEdited={setWasEdited}
            refresh={refresh}
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
