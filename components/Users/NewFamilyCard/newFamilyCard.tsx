import * as React from "react";
import { useState } from "react";
import styles from "./newFamilyCard.module.css";
import Icon from "../../../assets/Icon"


type NewFamilyCardProps = {
    name: string,
    email: string,
    role: string,
    deleteFunction: Function,
};

const NewFamilyCard: React.FC<NewFamilyCardProps> = ({
    name,
    email,
    role,
    deleteFunction
}: NewFamilyCardProps) => {

    const imagePath = (): string => {
        if (role == "head") {
            return "/smiley - head.svg";
        } else if (role == "Parent") {
            return "/smiley - parent.svg";
        } else if (role == "Child") {
            return "/smiley - child.svg";
        }
    }

  return (
    <div className={styles["container"]}>
        {/* <Icon className={styles["roleIcon"]} type={"headRole"}></Icon> */}
        <div className={styles["content"]}>
            <img src={imagePath()}></img>
            <div className={styles["textContent"]}>
                <div className={styles["name"]}>{name}</div>
                <div className={styles["email"]}>{email}</div>
            </div>
        </div>
        <button
        className={styles["closeButton"]}
        onClick={() => deleteFunction()}
        >
            <Icon className={styles["closeIcon"]} type={"popoverclose"} />
        </button>
    </div>
  )
}

export default NewFamilyCard;