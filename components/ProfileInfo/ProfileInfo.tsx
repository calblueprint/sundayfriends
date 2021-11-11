import React, { useState } from "react";
import styles from "../ProfileInfo/ProfileInfo.module.css";
import { TextField, Typography, IconButton } from "@mui/material";
import Icon from "../../assets/Icon";
import { IconType } from "../../assets/Icon";

export type FieldInfo = {
  iconName: IconType;
  fieldName: string;
  fieldValue: string;
};

type ProfileInfoProps = {
  data: FieldInfo[];
  cardTitle: string;
  isEditing: boolean;
};

export const ProfileInfo: React.FunctionComponent<ProfileInfoProps> = ({
  data,
  cardTitle,
  isEditing,
}) => {
  // const [editValue, setEditValue] = useState('');

  // function handleChange(e) {
  //   setEditValue(editValue + e);
  // }

  function fieldValues(field) {
    if (
      isEditing &&
      (field.fieldName == "NAME" ||
        field.fieldName == "ROLE" ||
        field.fieldName == "EMAIL" ||
        field.fieldName == "PHONE #")
    ) {
      return (
        <div className={styles.editState}>
          <form>
            <input type="text" value={field.fieldValue} />
          </form>
          <IconButton>
            <Icon type="editpencil" />
          </IconButton>
        </div>
        // <div className={styles.editing}>
        //   <Typography variant="subtitle2" color="#131313">
        //     {field.fieldName}
        //   </Typography>
        // </div>
      );
    }
    return (
      <div className={styles.values}>
        <Typography variant="subtitle2" color="#131313">
          {field.fieldValue}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" fontWeight="bold">
        {cardTitle}
      </Typography>
      <hr></hr>
      <br></br>
      {data.map((field) => (
        <div key={field.fieldName}>
          <div className={styles.row}>
            <div className={styles.fields}>
              <Icon type={field.iconName} />
              <Typography variant="subtitle1" fontWeight="bold">
                {field.fieldName}
              </Typography>
            </div>
            {fieldValues(field)}
          </div>
        </div>
      ))}
    </div>
  );
};
