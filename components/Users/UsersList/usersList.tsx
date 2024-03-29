import * as React from "react";
import {
  Button,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import styles from "./UsersList.module.css";
import { Family, User } from "../../../types/schema";
import UserModal from "../UserModal/userModal";
import { useState } from "react";
import {
  deleteUser,
  getAllUsers,
  suspendUserToggle,
} from "../../../firebase/firestore/user";

type UsersListProps = {
  allUsers: User[];
  users: User[];
  setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
  setSlicedUsers?: Function;
  isFamilyPath: boolean;
  family?: Family;
  setIsOpenFam?: React.Dispatch<React.SetStateAction<boolean>>;
  setEdited?: React.Dispatch<React.SetStateAction<boolean>>;
  refresh?: () => void;
  startIndex?: number;
  endIndex?: number;
};

type UsersListItemProps = {
  user: User;
  removeUser: Function;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isFamilyPath: boolean;
  suspend: Function;
};

const UsersListItem: React.FC<UsersListItemProps> = ({
  user,
  removeUser,
  setIsOpen,
  setUser,
  isFamilyPath,
  suspend,
}: UsersListItemProps) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <TableRow key={user.email} className={styles["tableRow"]}>
      <TableCell className={`${styles["tableRow"]} ${styles["name"]}`}>
        {user.full_name}
      </TableCell>
      {isFamilyPath ? null : (
        <TableCell className={`${styles["tableRow"]} ${styles["FID"]}`}>
          {user.family_id}
        </TableCell>
      )}
      <TableCell className={`${styles["tableRow"]} ${styles["role"]}`}>
        {user.role}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["email"]}`}>
        {user.email}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["balance"]}`}>
        {user.points}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["transactions"]}`}>
        {user.suspended ? (
          <div className={styles["suspendedBubble"]}>Suspended</div>
        ) : (
          <div className={styles["activeBubble"]}>Active</div>
        )}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["manage"]}`}>
        <div className={styles["manageButtons"]}>
          <Button
            className={styles["viewButton"]}
            onClick={() => {
              setIsOpen(true);
              setUser(user);
            }}
          >
            View
          </Button>
          <Button className={styles["button"]} onClick={() => suspend(user)}>
            {user.suspended ? "Unsuspend" : "Suspend"}
          </Button>
          <Button
            className={
              confirmingDelete ? styles["button"] : styles["deleteButton"]
            }
            onClick={
              confirmingDelete
                ? () => {
                    setConfirmingDelete(false);
                  }
                : () => {
                    setConfirmingDelete(true);
                  }
            }
          >
            {confirmingDelete ? "Cancel" : "Delete"}
          </Button>
          {confirmingDelete && (
            <Button
              className={styles["confirmDeleteButton"]}
              onClick={() => {
                deleteUser(user.user_id);
                setConfirmingDelete(false);
                removeUser();
              }}
            >
              Confirm?
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const UsersList: React.FC<UsersListProps> = ({
  allUsers,
  users,
  setUsers,
  isFamilyPath,
  family,
  setIsOpenFam,
  setEdited,
  refresh,
}: UsersListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();

  const toggleSuspend = async (user: User) => {
    await suspendUserToggle(user.user_id);
    const allUsers = users;
    allUsers.map((match) => {
      if (match == user) {
        match.suspended = !match.suspended;
      }
    });
    setUsers(allUsers);
    refresh();
  };

  const deleteUser = (index) => {
    let newUsers = [...users];
    newUsers.slice(index, 1);
    setUsers(newUsers);
    refresh();
  };

  const renderUsersList = () => {
    return users.map((user, index) => (
      <UsersListItem
        key={user.email}
        user={user}
        removeUser={() => deleteUser(index)}
        setIsOpen={setIsOpen}
        setUser={setUser}
        isFamilyPath={isFamilyPath}
        suspend={toggleSuspend}
      />
    ));
  };

  return (
    <TableContainer>
      <UserModal
        user={user}
        family={family}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isFamilyPath={isFamilyPath}
        setIsOpenFam={setIsOpenFam}
        setEdited={setEdited}
        refresh={refresh}
      />

      <Table stickyHeader aria-label="user table">
        <TableHead className={styles["tableHead"]}>
          <TableRow>
            <TableCell className={`${styles["headingRow"]} ${styles["name"]}`}>
              Name
            </TableCell>
            {isFamilyPath ? null : (
              <TableCell className={`${styles["headingRow"]} ${styles["FID"]}`}>
                FID
              </TableCell>
            )}
            <TableCell className={`${styles["headingRow"]} ${styles["role"]}`}>
              Role
            </TableCell>
            <TableCell className={`${styles["headingRow"]} ${styles["email"]}`}>
              Email
            </TableCell>
            <TableCell
              className={`${styles["headingRow"]} ${styles["balance"]}`}
            >
              Balance
            </TableCell>
            <TableCell
              className={`${styles["headingRow"]} ${styles["status"]}`}
            >
              Status
            </TableCell>
            <TableCell
              className={`${styles["headingRow"]} ${styles["manage"]}`}
            >
              Manage
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderUsersList()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
