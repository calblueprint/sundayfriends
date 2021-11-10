import React from "react";
import Icon from "../../assets/Icon";
import styles from "./Breadcrumbs.module.css";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";

export const Breadcrumbs: React.FunctionComponent = () => {
  return (
    <div className={styles.breadcrumbs}>
      <Icon type="backarrow" className={styles.arrows} />
      <Icon type="forwardarrow" className={styles.arrows} />
    </div>
  );
};
