import { useState } from "react";
import { useForm } from "react-hook-form";
import Icon from "../../assets/Icon";
import { Typography, Button } from "@mui/material";
import { Admin } from "../../types/schema";
import styles from "./AdminProfileForm.module.css";

type AdminProfileFormProps = {
    currentAdmin: Admin
}

export const AdminProfileForm: React.FC<AdminProfileFormProps> = ({
    currentAdmin
}: AdminProfileFormProps) => {
    const [adminName, setAdminName] = useState<string>(currentAdmin.name);
    const [adminRole, setAdminRole] = useState<string>(currentAdmin.role);
    const [adminEmail, setAdminEmail] = useState<string>(currentAdmin.email);
    const [adminPhone, setAdminPhone] = useState<string>(currentAdmin.phone);

    const [editingForm, setEditingForm] = useState<boolean>(false);
    const [editingName, setEditingName] = useState<boolean>(false);
    const [editingRole, setEditingRole] = useState<boolean>(false);
    const [editingEmail, setEditingEmail] = useState<boolean>(false);
    const [editingPhone, setEditingPhone] = useState<boolean>(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: adminName,
            role: adminRole,
            email: adminEmail,
            phone: adminPhone,
        }
    });

    return (
        <div>
            <div className={styles["namebar"]}>
                <h1>{currentAdmin.name}</h1>
                <Button variant="contained" className={styles["button"]}>
                    <Icon type="editpencil" />
                    Edit
                </Button>
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
                        <Typography variant="subtitle2" color="#131313">
                            {adminName}
                        </Typography>
                    </div>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="singleperson" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                ROLE
                            </Typography>
                        </div>
                        <Typography variant="subtitle2" color="#131313">
                            {adminRole}
                        </Typography>
                    </div>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="lastactive" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                LAST ACTIVE
                            </Typography>
                        </div>
                        <Typography variant="subtitle2" color="#131313">
                            {currentAdmin.last_active}
                        </Typography>
                    </div>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="datejoined" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                DATE JOINED
                            </Typography>
                        </div>
                        <Typography variant="subtitle2" color="#131313">
                            {currentAdmin.created_at}
                        </Typography>
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
                        <Typography variant="subtitle2" color="#131313">
                            {adminEmail}
                        </Typography>
                    </div>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="phone" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                PHONE #
                            </Typography>
                        </div>
                        <Typography variant="subtitle2" color="#131313">
                            {adminPhone}
                        </Typography>
                    </div>
                    <br></br>
                    <div className={styles["info"]}>
                        <div className={styles["fields"]}>
                            <Icon type="password" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                PASSWORD
                            </Typography>
                        </div>
                        <Typography variant="subtitle2" color="#131313">
                            *********
                        </Typography>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    );
};