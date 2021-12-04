import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./Register.module.css";
import { getAdminNamebyEmail } from "../../firebase/firestore/invite_admin";
import Icon from "../../assets/Icon";

type AdminActivateData = {
  email: string;
};

const RegisterScreen: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [errMessage, setErrMessage] = useState(null);
  const name = await getAdminNamebyEmail

  // TODO clear fields after error in submission
  const handleCheckAdminInvite = async (data: AdminActivateData) => {
    try {
      // await checkAdminActivationStatus(data.email);
      router.push("/register");
    } catch (e) {
      reset();
      console.error(e.message);
      setErrMessage("Invalid email/password.");
    }
  };

  return (
    <div className={styles["page-container"]}>
      <form onSubmit={handleSubmit(handleCheckAdminInvite)}>
        <Icon type="sundayfriendslogo" className={styles.SFlogo} />
        <div className={styles["container"]}>
          <div className={styles["box-styling"]}>
            <div className={styles["signin-container"]}>
              <h1 className={styles["welcome-title"]}>Welcome, name!</h1>
              <h4 className={styles["title-subtext"]}>
                Finish activating your account by completing the following
                fields.
              </h4>
              <div className={styles["input"]}>
                <label className={styles["email-input-label"]}>PHONE #</label>
                <div className={styles["input-field"]}>
                  <input
                    id="email"
                    name="email"
                    className={styles["email-input-field"]}
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <label className={styles["email-input-label"]}>
                  ADMIN <br />
                  ROLE
                </label>
                <div className={styles["input-field"]}>
                  <input
                    id="email"
                    name="email"
                    className={styles["email-input-field"]}
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <label className={styles["email-input-label"]}>
                  CREATE <br />
                  PASSWORD
                </label>
                <div className={styles["input-field"]}>
                  <input
                    id="email"
                    name="email"
                    className={styles["email-input-field"]}
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className={styles["input"]}>
                <label className={styles["email-input-label"]}>
                  CONFIRM <br />
                  PASSWORD
                </label>
                <div className={styles["input-field"]}>
                  <input
                    id="email"
                    name="email"
                    className={styles["email-input-field"]}
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className={styles["login-error-message"]}>
                {errMessage ? <div>{errMessage}</div> : null}
              </div>
              <div className={styles["bottom-row"]}>
                <div className={styles["bottom-row-text"]}>
                  {"Already have an account? "}
                  <a className={styles["activate-now"]} href="/">
                    Sign in!
                  </a>
                </div>
                <Button type="submit" className={styles["sign-in-button"]}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
