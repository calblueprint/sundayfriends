import * as React from "react";
import styles from "../SortTriangles/SortTriangles.module.css";

export const SortTriangles: React.FunctionComponent = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["upper-triangle"]}></div>
      <div className={styles["lower-triangle"]}></div>
    </div>
  );
};
