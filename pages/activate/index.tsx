import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./Activate.module.css";
import { checkAdminActivationStatus } from "../../firebase/firestore/activate";
import Icon from "../../assets/Icon";
import { ClassNames } from "@emotion/react";

type AdminActivateData = {
  email: string;
};

const ActivateScreen: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [errMessage, setErrMessage] = useState(null);

  // TODO clear fields after error in submission
  const handleCheckAdminInvite = async (data: AdminActivateData) => {
    try {
      const validEmail = await checkAdminActivationStatus(data.email);
      console.log(validEmail);
      if (validEmail) {
        router.push("/register");
      } else {
        setErrMessage("Invalid email/password.");
      }
    } catch (e) {
      reset();
      console.error(e.message);
    }
  };

  return (
    <div className={styles["page-container"]}>
      <form onSubmit={handleSubmit(handleCheckAdminInvite)}>
        <Icon type="sundayfriendslogo" className={styles.SFlogo} />
        <div className={styles["container"]}>
          <div className={styles["box-styling"]}>
            <div className={styles["signin-container"]}>
              <h1 className={styles["welcome-title"]}>Activate Account</h1>
              <h4 className={styles["title-subtext"]}>
                Enter the email address you received an invite from to continue.
              </h4>
              <div className={styles["input"]}>
                <label className={styles["email-input-label"]}>EMAIL</label>
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
                    Log in!
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

export default ActivateScreen;
