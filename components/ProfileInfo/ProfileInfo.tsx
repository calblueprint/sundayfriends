import React, { useState } from "react";
import styles from "../ProfileInfo/ProfileInfo.module.css";
import { Typography, IconButton, Button } from "@mui/material";
import Icon from "../../assets/Icon";
import { IconType } from "../../assets/Icon";

export type FieldInfo = {
  iconName: IconType;
  fieldName: string;
  fieldValue: string;
};

type ProfileInfoProps = {
  aboutData: FieldInfo[];
  loginInfo: FieldInfo[];
};

export const ProfileInfo: React.FunctionComponent<ProfileInfoProps> = ({
  aboutData,
  loginInfo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  function editbuttons() {
    if (isEditing) {
      return (
        <div className={styles["editingButtons"]}>
          <Button
            className={styles["cancelButton"]}
            startIcon={<Icon type="smallX" />}
            onClick={() => {
              setIsEditing(false), setIsSelected(false), setIsEdit(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className={styles["saveButton"]}
            startIcon={<Icon type="smallCheck" />}
            onClick={() => setIsEditing(false)}

            //onclick, save state and changes
          >
            Save
          </Button>
        </div>
      );
    }
    return (
      <Button
        variant="contained"
        className={styles["button"]}
        startIcon={<Icon type="editbuttonpencil" />}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>
    );
  }

  const [isSelected, setIsSelected] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currEdit, setCurrEdit] = useState("");

  function inLineEdit(field) {
    if (isEdit && field.fieldValue == currEdit) {
      return (
        <div>
          {/* <TextField
            hiddenLabel
            id="filed-hidden-label-small"
            defaultValue={field.fieldValue}
            variant="filled"
            size="small"
          /> */}
          <form>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles["edit"]}
            />
          </form>
        </div>
      );
    }
    if (field.fieldValue == currEdit) {
      return (
        <div className={styles["editState2"]}>
          <Typography
            variant="subtitle2"
            color="#131313"
            className={styles["text"]}
            onClick={() => setIsEdit(true)}
          >
            {field.fieldValue}
          </Typography>
          <IconButton
            onClick={() => {
              setIsSelected(false), setInputValue(field.fieldValue);
            }}
          >
            <Icon type="editingpencil" />
          </IconButton>
        </div>
      );
    }
    return (
      <div className={styles["values"]}>
        <Typography variant="subtitle2" color="#131313" className={styles.text}>
          {field.fieldValue}
        </Typography>
      </div>
    );
  }

  function fieldValues(field) {
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
            className={styles["text"]}
          >
            {field.fieldValue}
          </Typography>
          <IconButton
            onClick={() => {
              setInputValue(field.fieldValue),
                setIsSelected(true),
                setCurrEdit(field.fieldValue);
            }}
          >
            <Icon type="editingpencil" />
          </IconButton>
        </div>
      );
    }
    return (
      <div className={styles["values"]}>
        <Typography
          variant="subtitle2"
          color="#131313"
          className={styles["text"]}
        >
          {field.fieldValue}
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles["profile"]}>
      <div className={styles["namebar"]}>
        <h1> Cindo Zhang </h1>
        {editbuttons()}
      </div>
      <hr />
      <div className={styles["boxes"]}>
        <div className={styles["box"]}>
          <Typography variant="h5" fontWeight="bold">
            About
          </Typography>
          <hr></hr>
          <br></br>
          {aboutData.map((field) => (
            <div key={field.fieldName}>
              <div className={styles["row"]}>
                <div className={styles["fields"]}>
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
        <div className={styles["box"]}>
          <div>
            <Typography variant="h5" fontWeight="bold">
              Login Details
            </Typography>
            <hr></hr>
            <br></br>
            {loginInfo.map((field) => (
              <div key={field.fieldName}>
                <div className={styles["row"]}>
                  <div className={styles["fields"]}>
                    <Icon type={field["iconName"]} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {field.fieldName}
                    </Typography>
                  </div>
                  {fieldValues(field)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
