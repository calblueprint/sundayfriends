import React from "react";
import styles from "../ProfileInfo/ProfileInfo.module.css";
import { Typography } from "@mui/material";
import Icon from "../../assets/Icon";
import { IconType } from "../../assets/Icon";
import { UseFormRegister } from "react-hook-form";

export type FieldInfo = {
  iconName: IconType;
  fieldName: string;
  fieldValue: string;
  editable: boolean;
};

type ProfileInfoProps = {
  data: FieldInfo[];
  cardTitle: string;
  register: UseFormRegister<{
    name: string;
    role: string;
    email: string;
    phone: string;
  }>;
};

export const ProfileInfo: React.FunctionComponent<ProfileInfoProps> = ({
  data,
  cardTitle,
}) => {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold">
        {cardTitle}
      </Typography>
      <hr></hr>
      <br></br>
      {data.map((field) => (
        <div key={field.fieldName}>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type={field.iconName} />
              <Typography variant="subtitle1" fontWeight="bold">
                {field.fieldName}
              </Typography>
            </div>
            <div className={styles["information"]}>
              <Typography variant="subtitle2" color="#131313">
                {field.fieldValue}
              </Typography>
            </div>
          </div>
          <br></br>
        </div>
      ))}
      <input className={styles["editable-field"]} name="test" value="test" />
    </div>
  );
};
