import styles from "../AdminItem/AdminItem.module.css";
import { ListItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Admin } from "../../types/schema";

type AdminItemProps = {
  admin: Admin;
};

export const AdminItem: React.FunctionComponent<AdminItemProps> = ({
  admin,
}: AdminItemProps) => {
  const [userName, setUserName] = useState(admin.name);
  const [userRole, setUserRole] = useState(admin.role);
  const [userEmail, setUserEmail] = useState(admin.email);
  const [userPhone, setUserPhone] = useState(admin.phone);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <ListItem className={styles["list-item"]}>

          <div className={styles["name"]}>
            <input
              className={styles["editTitle"]}
              defaultValue={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={styles["role"]}>
            <input
              className={styles["editTitle"]}
              defaultValue={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            />
          </div>
          <div className={styles["email"]}>
            <input
              className={styles["editTitle"]}
              defaultValue={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className={styles["phone"]}>
            <input
              className={styles["editTitle"]}
              defaultValue={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          <Button
            className={styles["edit"]}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Save
          </Button>
        </ListItem>
      ) : (
        <ListItem className={styles["list-item"]}>
          <div className={styles["name"]}>{admin.name}</div>
          <div className={styles["role"]}>{admin.role}</div>
          <div className={styles["email"]}>{admin.email}</div>
          <div className={styles["phone"]}>{admin.phone}</div>
          <Button className={styles["delete"]}>Delete</Button>
          <Button className={styles["reset"]}>Reset Password</Button>
          <Button
            className={styles["edit"]}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        </ListItem>
      )}
    </div>
  );
};
