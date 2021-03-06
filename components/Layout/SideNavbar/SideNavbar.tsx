import * as React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./SideNavbar.module.css";
import Icon from "../../../assets/Icon";

const SideNavbar: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        display: {
          width: "110px",
          flexShrink: "0",
        },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "110px",
          backgroundColor: "#253c85",
          border: "transparent",
          borderRadius: "0px 20px 20px 0px",
          color: "white",
        },
      }}
    >
      <List className={styles["list"]}>
        <ListItem key="logo" className={styles["navbar"]}>
          <div className={styles["icon"]}>
            <div className={styles["border"]}>
              <Icon type="sundayfriendslogo" className={styles["SFlogo"]} />
            </div>
          </div>
        </ListItem>
        <ListItem
          button
          key={"users"}
          onClick={() => {
            router.push("/users");
          }}
          className={styles["item"]}
        >
          <div className={styles["icon"]}>
            <Icon type="usersnavicon" className={styles["pageicons"]} />
          </div>
          <ListItemText
            disableTypography
            className={styles["item"]}
            primary={"Users"}
          />
        </ListItem>
        <ListItem
          button
          key={"admins"}
          onClick={() => {
            router.push("/admins");
          }}
          className={styles["item"]}
        >
          <div className={styles["icon"]}>
            <Icon type="adminnavicon" className={styles["pageicons"]} />
          </div>
          <ListItemText
            disableTypography
            className={styles["item"]}
            primary={"Admins"}
          />
        </ListItem>
        <ListItem
          button
          key={"transactions"}
          onClick={() => {
            router.push("/transactions");
          }}
          className={styles["item"]}
        >
          <div className={styles["icon"]}>
            <Icon type="transactionsnavicon" className={styles["pageicons"]} />
          </div>
          <ListItemText
            disableTypography
            className={styles["item"]}
            primary={"Transactions"}
          />
        </ListItem>
        <ListItem
          button
          key={"settings"}
          onClick={() => {
            router.push("/settings");
          }}
          className={styles["item"]}
        >
          <div className={styles["icon"]}>
            <Icon type="settingsnavicon" className={styles["pageicons"]} />
          </div>
          <ListItemText
            disableTypography
            className={styles["item"]}
            primary={"Settings"}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavbar;
