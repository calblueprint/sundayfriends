import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./SideNavbar.module.css";

const SideNavbar: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className={styles["sidenav"]}
      classes={{
        paper: styles["sidenav-paper"],
      }}
    >
      <List className={styles.list}>
        <ListItem
          button
          key="logo"
          onClick={() => {
            router.push("/");
          }}
        >
          <ListItemText className={styles["item"]} primary={"Sunday Friends"} />
        </ListItem>
        <ListItem
          button
          key={"users"}
          onClick={() => {
            router.push(`/users`);
          }}
        >
          <ListItemText className={styles["item"]} primary={"Users"} />
        </ListItem>
        <ListItem
          button
          key={"admins"}
          onClick={() => {
            router.push(`/admins`);
          }}
        >
          <ListItemText className={styles["item"]} primary={"Admins"} />
        </ListItem>
        <ListItem
          button
          key={"transactions"}
          onClick={() => {
            router.push(`/transactions`);
          }}
        >
          <ListItemText className={styles["item"]} primary={"Transactions"} />
        </ListItem>
        <ListItem
          button
          key={"inventory"}
          onClick={() => {
<<<<<<< HEAD
            router.push(`/inventory`);
=======
            router.push(`/Inventory`);
>>>>>>> d5c21f20b9a75100db05b217487203e860871c26
          }}
        >
          <ListItemText className={styles["item"]} primary={"Inventory"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavbar;
