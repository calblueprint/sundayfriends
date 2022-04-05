import React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import Icon from "../../assets/Icon";
import { Typography, Button } from "@mui/material";
import { Admin } from "../../types/schema";
import router from "next/router";
import styles from "./AdminProfileForm.module.css";
import { styled } from "@mui/material/styles";

type AdminProfileFormProps = {
  currentAdmin: Admin;
};

export type AdminUpdateData = {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
};

const StyledButton = styled(Button)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#253c85",
  color: "white",
  borderRadius: "7px",
  padding: "12px",
  width: "93px",
  height: "37px",
  fontSize: "14px",
  marginRight: "20px",
  textTransform: "none",
  justifyContent: "space-evenly",
  "&:hover": {
    backgroundColor: "#253c85",
  },
  fontFamily: "Avenir",
}));

const DisabledSaveButton = styled(StyledButton)(() => ({
  backgroundColor: "#A9A9A9",
  "&:hover": {
    backgroundColor: "#A9A9A9",
  },
}));

const CancelButton = styled(Button)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "12px",
  width: "93px",
  height: "37px",
  backgroundColor: "white",
  color: "#253C85",
  border: "1.5px solid #253C85",
  boxSizing: "border-box",
  borderRadius: "7px",
  fontSize: "14px",
  marginRight: "20px",
  textTransform: "none",
  fontFamily: "Avenir",
}));

const ResetPasswordButton = styled(Button)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  border: "1.5px solid #253C85",
  background: "white",
  borderRadius: "6px",
  padding: "8px 12px",
  width: "154px",
  height: "37px",
  fontSize: "14px",
  color: "#253C85",
  lineHeight: "19px",
  textTransform: "none",
  fontFamily: "Avenir",
}));

export const AdminProfileForm: React.FC<AdminProfileFormProps> = ({
  currentAdmin,
}: AdminProfileFormProps) => {
  const [adminName, setAdminName] = useState<string>(currentAdmin.name);
  const [adminRole, setAdminRole] = useState<string>(currentAdmin.role);
  const [adminEmail, setAdminEmail] = useState<string>(currentAdmin.email);
  const [adminPhone, setAdminPhone] = useState<string>(currentAdmin.phone);

  const [editingForm, setEditingForm] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [newAdminData, setNewAdminData] = useState<AdminUpdateData>({});
  const [saving, setSaving] = useState<boolean>(false);

  const [editingName, setEditingName] = useState<boolean>(false);
  const [editingRole, setEditingRole] = useState<boolean>(false);
  const [editingEmail, setEditingEmail] = useState<boolean>(false);
  const [editingPhone, setEditingPhone] = useState<boolean>(false);

  // monitor changes in editable fields
  useEffect(() => {
    if (editingForm) {
      setEdited(true);
    }
  }, [adminName, adminRole, adminEmail, adminPhone]);

  const refresh = () => {
    router.replace(router.asPath);
  };

  const resetEditing = (): void => {
    setEditingEmail(false);
    setEditingName(false);
    setEditingRole(false);
    setEditingPhone(false);
  };

  // reset to default values
  const resetFields = (): void => {
    setAdminName(currentAdmin.name);
    setAdminEmail(currentAdmin.email);
    setAdminPhone(currentAdmin.phone);
    setAdminRole(currentAdmin.role);
    setNewAdminData({});
  };

  // TODO error handling
  const handleSubmit = async (): Promise<void> => {
    try {
      resetEditing();
      setSaving(true);
      setEditingForm(false);
      setEdited(false);
      await fetch("/api/auth/updateAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          adminUID: currentAdmin.admin_id,
          adminData: newAdminData,
        }),
      });
      setSaving(false);
      refresh();
    } catch (err) {
      console.error(err.message);
    }
  };

  const renderButtons = () => {
    if (editingForm) {
      return (
        <div className={styles["edit-buttons-container"]}>
          <CancelButton
            onClick={() => {
              setEditingForm(false);
              setEdited(false);
              resetFields();
              resetEditing();
            }}
            disableElevation={true}
          >
            <Icon type="smallX" />
            Cancel
          </CancelButton>
          {edited ? (
            <StyledButton
              variant="contained"
              disableElevation={true}
              startIcon={<Icon type="smallCheck" />}
              onClick={handleSubmit}
            >
              Save
            </StyledButton>
          ) : (
            <DisabledSaveButton
              variant="contained"
              disableElevation={true}
              startIcon={<Icon type="smallCheck" />}
            >
              Save
            </DisabledSaveButton>
          )}
        </div>
      );
    } else {
      if (saving) {
        return (
          <StyledButton variant="contained" disableElevation={true}>
            Saving...
          </StyledButton>
        );
      } else {
        return (
          <div className={styles["namebar-button-group"]}>
            <StyledButton
              variant="contained"
              disableElevation={true}
              onClick={() => setEditingForm(true)}
            >
              <Icon type="editpencil" />
              Edit
            </StyledButton>
            <ResetPasswordButton>
              <Icon type="resetarrow" />
              Reset Password
            </ResetPasswordButton>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className={styles["namebar"]}>
        <h1>{currentAdmin.name}</h1>
        {renderButtons()}
      </div>
      <hr className={styles["hr"]}></hr>
      <div className={styles["boxes"]}>
        <div className={styles["box"]}>
          <h4>About</h4>
          <hr className={styles["hr"]} />
          <br></br>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type="nameicon" />
              <Typography variant="subtitle1" fontWeight="bold">
                NAME
              </Typography>
            </div>
            <div
              className={
                editingForm
                  ? styles["edit-field-container-editing"]
                  : styles["edit-field-container"]
              }
              onClick={() => {
                if (editingForm) {
                  resetEditing();
                  setEditingName(true);
                }
              }}
            >
              {editingForm && editingName ? (
                <input
                  className={styles["editable-field"]}
                  type="text"
                  defaultValue={adminName}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setAdminName(event.target.value);
                    setEditingForm(true);
                    newAdminData.name = event.target.value;
                  }}
                />
              ) : (
                <div className={styles["info-field"]}>{adminName}</div>
              )}
              {editingForm && !editingName && (
                <Icon
                  type={"editpencilgrey"}
                  className={styles["edit-pencil"]}
                />
              )}
            </div>
          </div>
          <br></br>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type="singleperson" />
              <Typography variant="subtitle1" fontWeight="bold">
                ROLE
              </Typography>
            </div>
            <div
              className={
                editingForm
                  ? styles["edit-field-container-editing"]
                  : styles["edit-field-container"]
              }
              onClick={() => {
                if (editingForm) {
                  resetEditing();
                  setEditingRole(true);
                }
              }}
            >
              {editingForm && editingRole ? (
                <input
                  className={styles["editable-field"]}
                  defaultValue={adminRole}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setAdminRole(event.target.value);
                    setEditingForm(true);
                    newAdminData.role = event.target.value;
                  }}
                />
              ) : (
                <div className={styles["info-field"]}>{adminRole}</div>
              )}
              {editingForm && !editingRole && (
                <Icon
                  type={"editpencilgrey"}
                  className={styles["edit-pencil"]}
                />
              )}
            </div>
          </div>
          <br></br>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type="lastactive" />
              <Typography variant="subtitle1" fontWeight="bold">
                LAST ACTIVE
              </Typography>
            </div>
            <div className={styles["info-field"]}>
              {currentAdmin.last_active}
            </div>
          </div>
          <br></br>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type="datejoined" />
              <Typography variant="subtitle1" fontWeight="bold">
                DATE JOINED
              </Typography>
            </div>
            <div className={styles["info-field"]}>
              {currentAdmin.created_at}
            </div>
          </div>
          <br></br>
        </div>
        <div className={styles["box"]}>
          <h4>Login Details</h4>
          <hr className={styles["hr"]}></hr>
          <br></br>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type="email" />
              <Typography variant="subtitle1" fontWeight="bold">
                EMAIL
              </Typography>
            </div>
            <div
              className={
                editingForm
                  ? styles["edit-field-container-editing"]
                  : styles["edit-field-container"]
              }
              onClick={() => {
                if (editingForm) {
                  resetEditing();
                  setEditingEmail(true);
                }
              }}
            >
              {editingForm && editingEmail ? (
                <input
                  className={styles["editable-field"]}
                  type="email"
                  defaultValue={adminEmail}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setAdminEmail(event.target.value);
                    setEditingForm(true);
                    newAdminData.email = event.target.value;
                  }}
                />
              ) : (
                <div className={styles["info-field"]}>{adminEmail}</div>
              )}
              {editingForm && !editingEmail && (
                <Icon
                  type={"editpencilgrey"}
                  className={styles["edit-pencil"]}
                />
              )}
            </div>
          </div>
          <br></br>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type="phone" />
              <Typography variant="subtitle1" fontWeight="bold">
                PHONE #
              </Typography>
            </div>
            <div
              className={
                editingForm
                  ? styles["edit-field-container-editing"]
                  : styles["edit-field-container"]
              }
              onClick={() => {
                if (editingForm) {
                  resetEditing();
                  setEditingPhone(true);
                }
              }}
            >
              {editingForm && editingPhone ? (
                <input
                  className={styles["editable-field"]}
                  type="tel"
                  defaultValue={adminPhone}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setAdminPhone(event.target.value);
                    setEditingForm(true);
                    newAdminData.phone = event.target.value;
                  }}
                />
              ) : (
                <div className={styles["info-field"]}>{adminPhone}</div>
              )}
              {editingForm && !editingPhone && (
                <Icon
                  type={"editpencilgrey"}
                  className={styles["edit-pencil"]}
                />
              )}
            </div>
          </div>
          <br></br>
          <div className={styles["info"]}>
            <div className={styles["fields"]}>
              <Icon type="password" />
              <Typography variant="subtitle1" fontWeight="bold">
                PASSWORD
              </Typography>
            </div>
            <div className={styles["info-field"]}>************</div>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};
