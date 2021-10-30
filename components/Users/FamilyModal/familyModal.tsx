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
            {family.familyName} Family
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
            <h1 className={styles["header"]}>{family.familyName} Family</h1>
            <div className={styles["colSpacing"]}>
              <h4>FID: {family.familyId}</h4>
              <h4>*</h4>
              <h4>{family.userIds.length} Members</h4>
              <h4>*</h4>
              <h4>Total Transactions: {family.totalPoints}</h4>
            </div>
          </div>
          <div>
            <h1 className={styles["header"]}>{family.totalPoints}</h1>
            <h4>Total Balance</h4>
          </div>
        </div>
        <hr className={styles["break"]} />
        <h4>Family Members</h4>
        <div className={styles["modalContent"]}>
          <UserList
            users={family.userIds}
            family={family}
            isFamilyPath={true}
            setIsOpenFam={setIsOpen}
          />
        </div>
        <div className={styles["addTransaction"]}>
          <Icon className={styles["userAdd"]} type={"userAdd"} />
          <div>Add New Transaction</div>
        </div>
      </div>
    </Modal>
  );
};

export default FamilyModal;
