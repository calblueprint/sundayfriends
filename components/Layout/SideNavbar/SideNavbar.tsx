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
          disableRipple={true}
        >
          <ListItemText className={styles["item"]} primary={"Sunday Friends"} />
        </ListItem>
        {["Users", "Admins", "Transactions", "Inventory"].map((text) => (
          // iterate through items in the list to generate tabs for the navbar/drawer
          <ListItem
            button
            key={text}
            onClick={() => {
              router.push(`/${text}`);
            }}
            disableRipple={true}
          >
            <ListItemText className={styles["item"]} primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavbar;
