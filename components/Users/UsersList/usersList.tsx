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

type UsersListProps = {
  users: User[];
  isFamilyPath: boolean;
  family?: Family;
  setIsOpenFam?: React.Dispatch<React.SetStateAction<boolean>>;
};
type UsersListItemProps = {
  user: User;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isFamilyPath: boolean;
};

const UsersListItem: React.FC<UsersListItemProps> = ({
  user,
  setIsOpen,
  setUser,
  isFamilyPath,
}: UsersListItemProps) => {
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
        {user.family_head ? "Head" : "Member"}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["email"]}`}>
        {user.email}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["balance"]}`}>
        {user.points}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["lastActive"]}`}>
        {user.last_active}
      </TableCell>
      <TableCell className={`${styles["tableRow"]} ${styles["manage"]}`}>
        <div>
          <Button className={styles["button"]}>Delete</Button>
          <Button className={styles["button"]}>Suspend</Button>
          <Button
            className={styles["viewButton"]}
            onClick={() => {
              setIsOpen(true);
              setUser(user);
            }}
          >
            View
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  isFamilyPath,
  family,
  setIsOpenFam,
}: UsersListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  return (
    <TableContainer>
      <UserModal
        user={user}
        family={family}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isFamilyPath={isFamilyPath}
        setIsOpenFam={setIsOpenFam}
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
              className={`${styles["headingRow"]} ${styles["lastActive"]}`}
            >
              Last Active
            </TableCell>
            <TableCell
              className={`${styles["headingRow"]} ${styles["manage"]}`}
            >
              Manage
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UsersListItem
              key={user.email}
              user={user}
              setIsOpen={setIsOpen}
              setUser={setUser}
              isFamilyPath={isFamilyPath}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
