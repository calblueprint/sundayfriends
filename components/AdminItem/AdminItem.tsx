import styles from "../AdminItem/AdminItem.module.css";
import { ListItem, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Admin } from "../../types/schema";
import { getAdmin } from "../../firebase/firestore/admin";

type AdminItemProps = {
  admin: Admin;
  setEdited?: React.Dispatch<React.SetStateAction<boolean>>;
  refresh?: () => void;
};

export const AdminItem: React.FunctionComponent<AdminItemProps> = ({
  admin,
  setEdited,
  refresh,
}: AdminItemProps) => {
  const [name, setName] = useState(admin?.name);
  const [role, setRole] = useState(admin?.role);
  const [email, setEmail] = useState(admin?.email);
  const [phone, setPhone] = useState(admin?.phone);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [currAdmin, setCurrAdmin] = useState(admin);

  async function onSubmit(event?: React.BaseSyntheticEvent): Promise<void> {
    event?.preventDefault();
    const newData = {};
    try {
      setError("");
      if (role) {
        // if (role !== "Head" && role !== "Parent" && role !== "Child") {
        //   throw new Error(
        //     "Input for role must be 'Head' or 'Parent' or 'Child'"
        //   );
        // }
        newData["role"] = role;
      }
      if (email != undefined) {
        const emailRegExp = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!emailRegExp.test(email)) {
          throw new Error("Invalid Email");
        }
        newData["email"] = email;
      }
      if (phone != undefined) {
        const phoneRegExp = new RegExp(
          "^[(]?([0-9]{3})[)]?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"
        );
        if (!phoneRegExp.test(phone)) {
          throw new Error("Invalid Phone Number");
        }
        newData["phone"] = phone.replace(phoneRegExp, "($1) $2-$3");
      }
      setLoad(true);
      const adminUid = admin.admin_id;
      console.log("we get to this point");
      const res = await fetch("/api/auth/updateAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          adminUID: adminUid,
          adminData: newData,
        }),
      });
      const updatedAdmin = await getAdmin(admin.admin_id);
      setCurrAdmin(updatedAdmin);
      setError("");
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      if (setEdited) {
        setEdited(true);
      }
      setLoad(false);
      refresh();
    }
  }

  return (
    <div>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <ListItem className={styles["list-item"]}>
            <div className={styles["name"]}>
              <input
                className={styles["editTitle"]}
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles["role"]}>
              <input
                className={styles["editTitle"]}
                defaultValue={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className={styles["email"]}>
              <input
                className={styles["editTitle"]}
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["phone"]}>
              <input
                className={styles["editTitle"]}
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button type="submit" className={styles["edit"]}>
              Save
            </Button>
            <Button
              className={styles["cancel"]}
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </ListItem>
        </form>
      ) : (
        <ListItem className={styles["list-item"]}>
          <div className={styles["name"]}>
            {currAdmin ? currAdmin.name : admin.name}
          </div>
          <div className={styles["role"]}>
            {currAdmin ? currAdmin.role : admin.role}
          </div>
          <div className={styles["email"]}>
            {currAdmin ? currAdmin.email : admin.email}
          </div>
          <div className={styles["phone"]}>
            {currAdmin ? currAdmin.phone : admin.phone}
          </div>
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
