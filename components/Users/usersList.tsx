import {
  Button,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import React from "react";
import styles from "./UsersList.module.css";
import { User } from "../../types/schema";

type UsersListProps = {
  users: User[];
};
type UsersListItemProps = {
  user: User;
};

const UsersListItem: React.FC<UsersListItemProps> = ({
  user,
}: UsersListItemProps) => {
  return (
    <TableRow key={user.email} className={styles.tableRow}>
      <TableCell className={`${styles.tableRow} ${styles.name}`}>
        {user.full_name}
      </TableCell>
      <TableCell className={`${styles.tableRow} ${styles.FID}`}>
        {user.family_id}
      </TableCell>
      <TableCell className={`${styles.tableRow} ${styles.role}`}>
        {user.family_head ? "Head" : "Member"}
      </TableCell>
      <TableCell className={`${styles.tableRow} ${styles.email}`}>
        {user.email}
      </TableCell>
      <TableCell className={`${styles.tableRow} ${styles.balance}`}>
        {user.points}
      </TableCell>
      <TableCell className={`${styles.tableRow} ${styles.lastActive}`}>
        {user.last_active.toLocaleString().split(",")[0]}
      </TableCell>
      <TableCell className={`${styles.tableRow} ${styles.manage}`}>
        <Button className={styles.button}>Delete</Button>
        <Button className={styles.button}>Suspend</Button>
        <Button className={styles.button}>Edit</Button>
      </TableCell>
    </TableRow>
  );
};

const UsersList: React.FC<UsersListProps> = ({ users }: UsersListProps) => {
  return (
    <div className={styles.container}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={styles.tableHead}>
              <TableCell className={`${styles.headingRow} ${styles.name}`}>
                Name
              </TableCell>
              <TableCell className={`${styles.headingRow} ${styles.FID}`}>
                FID
              </TableCell>
              <TableCell className={`${styles.headingRow} ${styles.role}`}>
                Role
              </TableCell>
              <TableCell className={`${styles.headingRow} ${styles.email}`}>
                Email
              </TableCell>
              <TableCell className={`${styles.headingRow} ${styles.balance}`}>
                Balance
              </TableCell>
              <TableCell
                className={`${styles.headingRow} ${styles.lastActive}`}
              >
                Last Active
              </TableCell>
              <TableCell className={`${styles.headingRow} ${styles.manage}`}>
                Manage
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UsersListItem key={user.email} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersList;
