import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import styles from "./AdminRegister.module.css";
import Icon from "../../assets/Icon";
import { Admin, AdminInvite } from "../../types/schema";
import { useRouter } from "next/router";
import { registerWithEmailAndPassword } from "../../firebase/auth";

type AdminRegisterData = {
  phone: string;
  role: string;
  createpass: string;
  confirmpass: string;
};

type AdminRegisterProps = {
  currentInvite: AdminInvite;
  setRegisterState: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminRegister: React.FC<AdminRegisterProps> = (props) => {
  const { currentInvite, setRegisterState } = props;
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [createPass, setCreatePass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const router = useRouter();

  const checkPhone = () => {
    if (phone.length == 10) {
      return true;
    }
    return false;
  };

  const checkPasswords = () => {
    if (createPass == confirmPass) {
      return true;
    }
    return false;
  };

  const checkFields = () => {
    if (!checkPhone()) {
      return false;
    }
    if (role.length == 0) {
      return false;
    }
    if (createPass.length == 0) {
      return false;
    }
    if (!checkPasswords()) {
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (checkFields()) {
      const newAdmin = {
        created_at: new Date(),
        email: currentInvite.email,
        last_active: new Date(),
        name: currentInvite.full_name,
        role: role,
        phone: phone,
      };
      registerWithEmailAndPassword(newAdmin as Admin, createPass);
      router.push("/");
    } else {
    }
  };

  return (
    <div className={styles["page-container"]}>
      <Icon type="sundayfriendslogo" className={styles.SFlogo} />
      <div className={styles["container"]}>
        <div className={styles["box-styling"]}>
          <div className={styles["signin-container"]}>
            <h1 className={styles["welcome-title"]}>
              Welcome, {currentInvite.full_name}!
            </h1>
            <h4 className={styles["title-subtext"]}>
              Finish activating your account by completing the following fields.
            </h4>
            <div className={styles["input"]}>
              <label className={styles["email-input-label"]}>PHONE #</label>
              <div className={styles["input-field"]}>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles["email-input-field"]}
                />
                {!checkPhone() && (
                  <div className={styles["error-message"]}>
                    {phone.length == 0
                      ? "* Enter a phone number"
                      : "* Enter a valid phone number"}
                  </div>
                )}
              </div>
            </div>
            <div className={styles["input"]}>
              <label className={styles["email-input-label"]}>
                ADMIN <br />
                ROLE
              </label>
              <div className={styles["input-field"]}>
                <input
                  id="role"
                  name="role"
                  className={styles["email-input-field"]}
                  onChange={(e) => setRole(e.target.value)}
                />
                {role.length == 0 && (
                  <div className={styles["error-message"]}>* Enter a role</div>
                )}
              </div>
            </div>
            <div className={styles["input"]}>
              <label className={styles["email-input-label"]}>
                CREATE <br />
                PASSWORD
              </label>
              <div className={styles["input-field"]}>
                <input
                  id="createpass"
                  name="createpass"
                  className={styles["email-input-field"]}
                  onChange={(e) => setCreatePass(e.target.value)}
                />
                {createPass.length == 0 && (
                  <div className={styles["error-message"]}>
                    * Enter a password
                  </div>
                )}
              </div>
            </div>
            <div className={styles["input"]}>
              <label className={styles["email-input-label"]}>
                CONFIRM <br />
                PASSWORD
              </label>
              <div className={styles["input-field"]}>
                <input
                  id="confirmpass"
                  name="confirmpass"
                  className={styles["email-input-field"]}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                {!checkPasswords() && (
                  <div className={styles["error-message"]}>
                    * Passwords do not match
                  </div>
                )}
              </div>
            </div>
            <div className={styles["bottom-row"]}>
              <div className={styles["bottom-row-text"]}>
                {"Haven't activated your account yet? "}
                <a
                  className={styles["activate-now"]}
                  onClick={() => setRegisterState(false)}
                >
                  Activate now
                </a>
              </div>
              <Button
                type="submit"
                className={styles["sign-in-button"]}
                onClick={onSubmit}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
