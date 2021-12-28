import React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import Icon from "../../assets/Icon";
import { Typography, Button } from "@mui/material";
import { Admin } from "../../types/schema";
import styles from "./AdminProfileForm.module.css";

type AdminProfileFormProps = {
    currentAdmin: Admin;
};

export const AdminProfileForm: React.FC<AdminProfileFormProps> = ({
    currentAdmin,
}: AdminProfileFormProps) => {
    const [adminName, setAdminName] = useState<string>(currentAdmin.name);
    const [adminRole, setAdminRole] = useState<string>(currentAdmin.role);
    const [adminEmail, setAdminEmail] = useState<string>(currentAdmin.email);
    const [adminPhone, setAdminPhone] = useState<string>(currentAdmin.phone);

    const [editingForm, setEditingForm] = useState<boolean>(false);
    const [edited, setEdited] = useState<boolean>(false);

    // monitor changes in editable fields
    useEffect(() => {
        if (editingForm) {
            setEdited(true);
        }
    }, [adminName, adminRole, adminEmail, adminPhone]);

    // reset to default values
    const resetFields = (): void => {
        setAdminName(currentAdmin.name);
        setAdminEmail(currentAdmin.email);
        setAdminPhone(currentAdmin.phone);
        setAdminRole(currentAdmin.role);
    };

    const renderButtons = () => {
        if (editingForm) {
            return (
                <div className={styles["edit-buttons-container"]}>
                    <Button
                        className={styles["cancel-button"]}
                        onClick={() => {
                            setEditingForm(false);
                            setEdited(false);
                            resetFields();
                        }}
                    >
                        <Icon type="smallX" className={styles["smallX"]} />
                        Cancel
                    </Button>
                    {edited && (
                        <Button
                            variant="contained"
                            className={styles["button"]}
                            startIcon={<Icon type="smallCheck" />}
                        >
                            Save
                        </Button>
                    )}
                </div>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    className={styles["button"]}
                    onClick={() => setEditingForm(true)}
                >
                    <Icon type="editpencil" />
                    Edit
                </Button>
            );
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
                    <Typography variant="h5" fontWeight="bold">
                        About
                    </Typography>
                    <hr></hr>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="nameicon" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                NAME
                            </Typography>
                        </div>
                        {editingForm ? (
                            <input
                                className={styles["editable-field"]}
                                type="text"
                                defaultValue={adminName}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setAdminName(event.target.value);
                                    setEditingForm(true);
                                }}
                            />
                        ) : (
                            <div className={styles["info-field"]}>{adminName}</div>
                        )}
                    </div>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="singleperson" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                ROLE
                            </Typography>
                        </div>
                        {editingForm ? (
                            <input
                                className={styles["editable-field"]}
                                defaultValue={adminRole}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setAdminRole(event.target.value);
                                    setEditingForm(true);
                                }}
                            />
                        ) : (
                            <div className={styles["info-field"]}>{adminRole}</div>
                        )}
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
                    <Typography variant="h5" fontWeight="bold">
                        Login Details
                    </Typography>
                    <hr></hr>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="email" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                EMAIL
                            </Typography>
                        </div>
                        {editingForm ? (
                            <input
                                className={styles["editable-field"]}
                                defaultValue={adminEmail}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setAdminEmail(event.target.value);
                                    setEditingForm(true);
                                }}
                            />
                        ) : (
                            <div className={styles["info-field"]}>{adminEmail}</div>
                        )}
                    </div>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="phone" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                PHONE #
                            </Typography>
                        </div>
                        {editingForm ? (
                            <input
                                className={styles["editable-field"]}
                                defaultValue={adminPhone}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setAdminPhone(event.target.value);
                                    setEditingForm(true);
                                }}
                            />
                        ) : (
                            <div className={styles["info-field"]}>{adminPhone}</div>
                        )}
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
