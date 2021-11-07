import React from "react";
import styles from "./Breadcrumbs.module.css";
import { useLocation } from "route-react-dom";
import Icon from "../../assets/Icon";

export const Breadcrumbs: React.FunctionComponent = () => {

  const location = useLocation();

  return (
    <div>
      <Icon type="backarrow" />
      <Icon type="forwardarrow" />
      <location.pathname/>
    </div>
  );
};
