import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./Activate.module.css";
import { checkAdminActivationStatus } from "../../firebase/firestore/invite_admin";
import Icon from "../../assets/Icon";

type AdminActivateData = {
  email: string;
};

const ActivateScreen: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [errMessage, setErrMessage] = useState(null);
  const [validEmail, setValidEmail] = useState(true);

  // TODO clear fields after error in submission
  const handleCheckAdminInvite = async (data: AdminActivateData) => {
    try {
      const validEmail = await checkAdminActivationStatus(data.email);
      if (validEmail) {
        router.push("/register");
      } else {
        setValidEmail(false);
        setErrMessage("Invalid email.");
      }
    } catch (e) {
      reset();
      setValidEmail(false);
      console.error(e.message);
    }
  };

  return validEmail ? (
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
  ) : (
    <div className={styles["page-container"]}>
      <Icon type="sundayfriendslogo" className={styles.SFlogo} />
      <div className={styles["container"]}>
        <div className={styles["box-styling"]}>
          <div className={styles["oops-container"]}>
            <h1 className={styles["oops-title"]}>Oops!</h1>
            <h4 className={styles["oops-subtext"]}>
              Your email address does not exist in our records. <br />
              Contact an admin if you think this is a mistake.
            </h4>
            <div className={styles["bottom-row"]}>
              <Button
                onClick={() => {
                  setValidEmail(true);
                }}
                className={styles["try-again-button"]}
              >
                Try a different email
              </Button>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                className={styles["exit-button"]}
              >
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateScreen;
