import styles from "../AdminItem/AdminItem.module.css";
import { ListItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

type AdminItemProps = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

export const AdminItem: React.FunctionComponent<AdminItemProps> = ({
  name,
  role,
  email,
  phone,
}: AdminItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ListItem className={styles["list-item"]}>
      <div className={styles["name"]}>{name}</div>
      <div className={styles["role"]}>{role}</div>
      <div className={styles["email"]}>{email}</div>
      <div className={styles["phone"]}>{phone}</div>
      <div className={styles["buttons"]}>
        <Button className={styles["delete"]}>Delete</Button>
        <Button className={styles["reset"]}>Reset Password</Button>
        {isEditing ? (
          <p>hello</p>
        ) : (
          <Button className={styles["edit"]}>Edit</Button>
        )
        }
        {/* <Button className={styles["edit"]}>Edit</Button> */}
      </div>
    </ListItem >
  );
};
