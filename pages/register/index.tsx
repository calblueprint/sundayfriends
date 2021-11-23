import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./Register.module.css";
import { checkAdminActivationStatus } from "../../firebase/firestore/invite_admin";
import Icon from "../../assets/Icon";

type AdminActivateData = {
  email: string;
};

const RegisterScreen: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [errMessage, setErrMessage] = useState(null);

  // TODO clear fields after error in submission
  const handleCheckAdminInvite = async (data: AdminActivateData) => {
    try {
      await checkAdminActivationStatus(data.email);
      router.push("/register");
    } catch (e) {
      reset();
      console.error(e.message);
      setErrMessage("Invalid email/password.");
    }
  };

  return <div className={styles["page-container"]}>success!</div>;
};

export default RegisterScreen;
