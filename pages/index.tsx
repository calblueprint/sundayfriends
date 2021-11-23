import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { signInWithEmailAndPassword } from "../firebase/auth";
import { useRouter } from "next/router";
import styles from "./Signin.module.css";
import firebaseAdmin from "../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Icon from "../assets/Icon";

type LoginData = {
  email: string;
  password: string;
};

const SignInScreen: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [inputType, setInputType] = useState("password");
  const [errMessage, setErrMessage] = useState(null);

  // TODO clear fields after error in submission
  const handleSignin = async (data: LoginData) => {
    try {
      await signInWithEmailAndPassword(data.email, data.password);
      router.push("/transactions");
    } catch (e) {
      reset();
      console.error(e.message);
      setErrMessage("Invalid email/password.");
    }
  };

  const toggleVisibility = () => {
    inputType == "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <div className={styles["page-container"]}>
      <form onSubmit={handleSubmit(handleSignin)}>
        <Icon type="sundayfriendslogo" className={styles.SFlogo} />
        <div className={styles["container"]}>
          <div className={styles["box-styling"]}>
            <div className={styles["signin-container"]}>
              <h1 className={styles["welcome-title"]}>Welcome Back!</h1>
              <h4 className={styles["title-subtext"]}>Sign in to continue</h4>
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
              <div className={styles["input"]}>
                <label className={styles["password-input-label"]}>
                  PASSWORD
                </label>
                <input
                  id="password"
                  name="password"
                  type={inputType}
                  className={styles["password-input-field"]}
                  {...register("password", { required: true })}
                />
                <button
                  className={styles["hide-password-button"]}
                  onClick={toggleVisibility}
                >
                  <Icon type="hidepassword" className={styles.hidepassword} />
                </button>
              </div>
              <div className={styles["forgot-password"]}>
                <a href="/">Forgot password? </a>
              </div>
              <div className={styles["login-error-message"]}>
                {errMessage ? <div>{errMessage}</div> : null}
              </div>
              <div className={styles["bottom-row"]}>
                <div className={styles["bottom-row-text"]}>
                  {"Haven't activated your account yet? "}
                  <a className={styles["activate-now"]} href="/">
                    Activate now!
                  </a>
                </div>
                <Button type="submit" className={styles["sign-in-button"]}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    if (token) {
      return {
        redirect: {
          permament: false,
          destination: "/users",
        },
      };
    }
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default SignInScreen;
