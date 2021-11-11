import React from "react";
import Icon from "../../assets/Icon";
import styles from "./Breadcrumbs.module.css";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";

type BreadcrumbsProps = {
  title: string;
};

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  title,
}) => {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.arrows}>
        <Icon type="backarrow" className={styles.arrows} />
        <Icon type="forwardarrow" className={styles.arrows} />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
