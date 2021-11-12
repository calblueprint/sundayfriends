import React from "react";
import { Button } from "@mui/material";
import styles from "../ProfileSettings/ProfileSettings.module.css";

export const ProfileSettings: React.FunctionComponent = () => {
  return (
    <Button variant="contained" className={styles.button}>
      Cindy ▼
    </Button>
  );
};
