import React, { useState } from "react";
import styles from "../ProfileInfo/ProfileInfo.module.css";
import { Typography, IconButton } from "@mui/material";
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

  const [isSelected, setIsSelected] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [oneEdit, setOneEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function inLineEdit(field) {
    if (isEdit) {
      return (
        <div onClick={() => setIsEdit(false)}>
          <form>
            <input
              type="text"
              value={field.fieldValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </div>
      );
    }
    return (
      <div className={styles["editState2"]}>
        <Typography
          variant="subtitle2"
          color="#131313"
          className={styles.text}
          onClick={() => setIsEdit(true)}
        >
          {field.fieldValue}
        </Typography>
        <IconButton onClick={() => setIsSelected(!isSelected)}>
          <Icon type="editingpencil" />
        </IconButton>
      </div>
    );
  }

  function fieldValues(field) {
    // if (
    //   isSelected &&
    //   isEditing &&
    //   (field.fieldName == "NAME" ||
    //     field.fieldName == "ROLE" ||
    //     field.fieldName == "EMAIL" ||
    //     field.fieldName == "PHONE #")
    // ) {
    //   return (
    //     <div className={isEdit ? styles["editing"] : styles["editState2"]}>
    //       <form>
    //         <input type="text" value={field.fieldValue} />
    //       </form>
    //       <IconButton onClick={() => setisEdit(!isEdit)}>
    //         <Icon type="editingpencil" />
    //       </IconButton>
    //     </div>
    //   );
    // }
    // if (isEdit) {
    //   return {inLineEdit(field)}
    // }
    if (
      isEditing &&
      (field.fieldName == "NAME" ||
        field.fieldName == "ROLE" ||
        field.fieldName == "EMAIL" ||
        field.fieldName == "PHONE #")
    ) {
      if (isSelected) {
        return inLineEdit(field);
      }
      return (
        <div className={styles["editState1"]}>
          <Typography
            variant="subtitle2"
            color="#131313"
            className={styles.text}
          >
            {field.fieldValue}
          </Typography>
          <IconButton onClick={() => setIsSelected(true)}>
            <Icon type="editingpencil" />
          </IconButton>
        </div>
      );
    }
    return (
      <div className={styles.values}>
        <Typography variant="subtitle2" color="#131313" className={styles.text}>
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
