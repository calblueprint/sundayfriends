import React from "react";
import { useLocation } from "react-dom";
import Icon from "../../assets/Icon";

export const Breadcrumbs: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <div>
      <Icon type="backarrow" />
      <Icon type="forwardarrow" />
      <location.pathname />
    </div>
  );
};
