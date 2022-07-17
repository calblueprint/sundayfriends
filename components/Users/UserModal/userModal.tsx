import { Box, Input, Modal, Button, List } from "@mui/material";
import styles from "./UserModal.module.css";
import { Family, User } from "../../../types/schema";
import Icon from "../../../assets/Icon";
import { TransactionItem } from "../../TransactionItem/TransactionItem";
import { SortTriangles } from "../../../components/SortTriangles/SortTriangles";
import itemstyles from "../../../components/TransactionItem/TransactionItem.module.css";
import React, { useState, useEffect } from "react";
import { getUser } from "../../../firebase/firestore/user";
import { TransactionTable } from "../../TransactionTable/TransactionTable";
import UsersList from "../UsersList/usersList";

type UserModalProps = {
  family?: Family;
  user: User;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFamilyPath: boolean;
  setIsOpenFam: React.Dispatch<React.SetStateAction<boolean>>;
  setEdited?: React.Dispatch<React.SetStateAction<boolean>>;
  refresh?: () => void;
};

const UserModal: React.FunctionComponent<UserModalProps> = ({
  family,
  user,
  isOpen,
  setIsOpen,
  isFamilyPath,
  setIsOpenFam,
  setEdited,
  refresh,
}: UserModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currUser, setCurrUser] = useState(user);
  const [role, setRole] = useState(user?.role);
  const [email, setEmail] = useState(user?.email);
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [load, setLoad] = useState(false);
  const [transactions, setTransactions] = useState(user?.transactions);

  useEffect(() => {
    console.log(user);
    const callFunc = async () => {
      if (user != undefined) {
        const data = await getUser(user?.user_id);
        setCurrUser(data);
      }
    };
    callFunc();
  }, []);

  useEffect(() => {
    setTransactions(user?.transactions);
  }, [user]);

  async function onSubmit(event?: React.BaseSyntheticEvent): Promise<void> {
    event?.preventDefault();
    const newData = {};
    try {
      setError("");
      if (role && role != user?.role) {
        if (role !== "Head" && role !== "Parent" && role !== "Child") {
          throw new Error(
            "Input for role must be 'Head' or 'Parent' or 'Child'"
          );
        }
        newData["role"] = role;
      }
      if (email != user?.email && email != undefined) {
        const emailRegExp = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!emailRegExp.test(email)) {
          throw new Error("Invalid Email");
        }
        newData["email"] = email;
      }
      if (phoneNumber != user?.phone_number && phoneNumber != undefined) {
        const phoneRegExp = new RegExp(
          "^[(]?([0-9]{3})[)]?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"
        );
        if (!phoneRegExp.test(phoneNumber)) {
          throw new Error("Invalid Phone Number");
        }
        newData["phone_number"] = phoneNumber.replace(
          phoneRegExp,
          "($1) $2-$3"
        );
      }
      setLoad(true);
      const userUid = user.user_id;
      const res = await fetch("/api/auth/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userUID: userUid,
          userData: newData,
        }),
      });
      const updatedUser = await getUser(user.user_id);
      setCurrUser(updatedUser);
      setError("");
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      if (setEdited) {
        setEdited(true);
      }
      setLoad(false);
      refresh();
    }
  }
  return (
    <Modal open={isOpen} hideBackdrop={isFamilyPath ? true : false}>
      <div className={load ? styles["modalLoading"] : styles["modal"]}>
        <div
          className={
            isFamilyPath ? styles["colSpacing"] : styles["withOutNavRoute"]
          }
        >
          {isFamilyPath ? (
            <div className={styles["navBar"]}>
              <button
                className={styles["navButton"]}
                onClick={() => setIsOpen(false)}
              >
                <Icon className={styles["chevron"]} type={"chevronLeft"} />
              </button>
              <button className={styles["navButton"]}>
                <Icon className={styles["chevron"]} type={"chevronRight"} />
              </button>
              {family.family_name} Family /{" "}
              {currUser ? currUser.full_name : user?.full_name}
            </div>
          ) : null}
          <button
            className={styles["closeButton"]}
            onClick={() => {
              setIsOpen(false);
              isFamilyPath ? setIsOpenFam(false) : null;
            }}
          >
            <Icon className={styles["closeIcon"]} type={"close"} />
          </button>
        </div>
        <div className={styles["modalHeading"]}>
          <div className={styles["familyName"]}>
            <h1 className={styles["header"]}>
              {currUser ? currUser.full_name : user?.full_name}
            </h1>
            <div className={styles["colSpacing"]}>
              <h4>
                {currUser
                  ? currUser.full_name.split(" ")[1]
                  : user?.full_name.split(" ")[1]}{" "}
                Family
              </h4>
              <h4>|</h4>
              <h4>FID: {currUser ? currUser.family_id : user?.family_id}</h4>
            </div>
          </div>
          <div>
            <h1 className={styles["header"]}>
              {currUser ? currUser.points : user?.points}
            </h1>
            <h4>Individual Balance</h4>
          </div>
        </div>
        <hr className={styles["break"]} />
        <div>
          <form onSubmit={onSubmit}>
            <div className={styles["modalInfo"]}>
              <div className={styles["modalAbout"]}>
                <div className={styles["heading"]}>
                  <h3>About Information</h3>
                  {isEditing ? (
                    <div className={styles["buttonSection"]}>
                      <Button
                        className={styles["editButton"]}
                        onClick={() => {
                          setError("");
                          setIsEditing(false);
                          setLoad(false);
                        }}
                      >
                        <p>Cancel</p>
                      </Button>
                      {load ? (
                        <Button
                          className={styles["submitButton"]}
                          type="submit"
                        >
                          <p>Saving...</p>
                        </Button>
                      ) : (
                        <Button
                          className={styles["submitButton"]}
                          type="submit"
                        >
                          <p>Save Changes</p>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      className={styles["editButton"]}
                      onClick={() => setIsEditing(true)}
                    >
                      <Icon className={styles["editIcon"]} type={"edit"} />
                      <p>Edit</p>
                    </Button>
                  )}
                </div>
                <div className={styles["aboutInfoContainer"]}>
                  <div className={styles["icons"]}>
                    <Icon
                      className={styles["nameIconSpacing"]}
                      type={"nameicon"}
                    />
                    <Icon className={styles["iconSpacing"]} type={"email"} />
                    {/* <Icon className={styles["iconSpacing"]} type={"phone"} /> */}
                    <Icon className={styles["iconSpacing"]} type={"password"} />
                  </div>
                  <div className={styles["aboutInfo"]}>
                    <div className={styles["subTitle"]}>Role</div>
                    <div className={styles["subTitle"]}>Email</div>
                    {/* <div className={styles["subTitle"]}>Phone</div> */}
                    <div className={styles["subTitle"]}>Password</div>
                  </div>
                  <div className={styles["aboutInfoEditing"]}>
                    {isEditing ? (
                      <div>
                        <div className={styles["editSection"]}>
                          <input
                            className={styles["editTitle"]}
                            defaultValue={currUser ? currUser.role : user?.role}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <Icon
                            className={styles["inLineEditIcon"]}
                            type={"edit"}
                          />
                        </div>
                        <div className={styles["editSection"]}>
                          <input
                            className={styles["editTitle"]}
                            defaultValue={
                              currUser ? currUser.email : user?.email
                            }
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Icon
                            className={styles["inLineEditIcon"]}
                            type={"edit"}
                          />
                        </div>
                        {/* <div className={styles["editSection"]}>
                          <input
                            className={styles["editTitle"]}
                            defaultValue={
                              currUser
                                ? currUser.phone_number
                                : user?.phone_number
                            }
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          <Icon
                            className={styles["inLineEditIcon"]}
                            type={"edit"}
                          />
                        </div> */}
                        <div className={styles["infoSpacing"]}>
                          <input
                            className={styles["password"]}
                            value="password"
                            type="password"
                          />
                          <div className={styles["passwordButton"]}>
                            <Icon
                              className={styles["resetIcon"]}
                              type={"hidepassword"}
                            />
                            <a className={styles["resetText"]}>
                              Reset Password
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={styles["infoSpacing"]}>
                          {currUser ? currUser.role : user?.role}
                        </div>
                        <div className={styles["infoSpacing"]}>
                          {currUser ? currUser.email : user?.email}
                        </div>
                        {/* <div className={styles["infoSpacing"]}>
                          {currUser
                            ? currUser.phone_number
                            : user?.phone_number}
                        </div> */}
                        <div className={styles["infoSpacing"]}>
                          <input
                            className={styles["password"]}
                            value="password"
                            type="password"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles["errorTitle"]}>
                  {error != "" ? error : ""}
                </div>
              </div>
            </div>
          </form>
        </div>
        <hr className={styles["break"]} />
        <div className={styles["transactionHeader"]}>
          <h3>Transaction History</h3>
          <Button className={styles["editButton"]}>
            <Icon className={styles["addIcon"]} type={"add"} />
            <p>Add</p>
          </Button>
        </div>

        <div>
          {transactions !== undefined ? (
            <TransactionTable
              transactions={transactions}
              setTransactions={setTransactions}
              userPath={true}
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
