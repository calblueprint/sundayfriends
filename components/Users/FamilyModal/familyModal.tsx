import * as React from "react";
import {
  FormControlLabel,
  Modal,
  RadioGroup,
  Radio,
  Snackbar,
} from "@mui/material";
import styles from "./FamilyModal.module.css";
import { Family, User_Invite } from "../../../types/schema";
import Icon from "../../../assets/Icon";
import UserList from "../UsersList/usersList";
import { useEffect, useState } from "react";
import { getFamilyById } from "../../../firebase/firestore/family";
import { addUserInvite } from "../../../firebase/firestore/userInvite";

type FamilyModalProps = {
  family: Family;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
};

const FamilyModal: React.FunctionComponent<FamilyModalProps> = ({
  family,
  isOpen,
  setIsOpen,
  refresh,
}: FamilyModalProps) => {
  const [newFamily, setNewFamily] = useState<Family>();
  const [users, setUsers] = useState(family.users);
  const [wasEdited, setWasEdited] = useState(false);
  const [state, setState] = useState("home");
  const [hoveringAdd, setHoveringAdd] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const getFamilies = async () => {
      if (family) {
        const data = await getFamilyById(family.family_id.toString());
        setNewFamily(data);
      }
    };
    getFamilies();
    setWasEdited(false);
    refresh();
  }, [wasEdited]);

  const getUpdated = (): Family => {
    console.log(family);
    console.log(newFamily);
    return newFamily ? newFamily : family;
  };

  const addMember = () => {
    const emailRegex =
      RegExp("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$");
    if (memberName == "") {
      setSnackbarMessage("Invalid Name");
      setSnackbarOpen(true);
    } else if (!emailRegex.test(memberEmail)) {
      setSnackbarMessage("Invalid Email");
      setSnackbarOpen(true);
    } else if (memberRole == "") {
      setSnackbarMessage("Invalid Role");
      setSnackbarOpen(true);
    } else {
      const memberInvite = {
        family_id: family.family_id,
        name: memberName,
        email: memberEmail,
        status: memberRole,
      };
      addUserInvite(memberInvite as User_Invite);
      setState("home");
      setSnackbarMessage(`${memberName} has been invited to the family.`);
      setSnackbarOpen(true);
    }
  };

  const closeModal = () => {
    if (state == "home") {
      setIsOpen(false);
    } else if (state == "add") {
      setState("home");
    }
  };

  const renderHeader = () => {
    return (
      <div className={styles["colSpacing"]}>
        <div className={styles["navBar"]}>
          <button className={styles["navButton"]}>
            <Icon className={styles["chevron"]} type={"chevronLeft"} />
          </button>
          <button className={styles["navButton"]}>
            <Icon className={styles["chevron"]} type={"chevronRight"} />
          </button>
          {renderBreadcrumbs()}
        </div>
        <button className={styles["closeButton"]} onClick={closeModal}>
          <Icon className={styles["addIcon"]} type={"close"} />
        </button>
      </div>
    );
  };

  const renderBreadcrumbs = () => {
    if (state == "home") {
      return (
        <div className={styles["activeBreadcrumb"]}>
          {getUpdated().family_name} Family
        </div>
      );
    } else if (state == "add") {
      return (
        <>
          <div>{getUpdated().family_name} Family</div>
          <div className={styles["breadcrumbDivider"]}>/</div>
          <div className={styles["activeBreadcrumb"]}>Add Members</div>
        </>
      );
    }
  };

  if (state == "home") {
    return (
      <Modal open={isOpen}>
        <div className={styles["modal"]}>
          {renderHeader()}
          <div className={styles["modalHeading"]}>
            <div className={styles["familyName"]}>
              <h1 className={styles["header"]}>
                {getUpdated().family_name} Family
              </h1>
              <div className={styles["colSpacing"]}>
                <h4 className={styles["headerDetails"]}>
                  FID: {getUpdated().family_id}
                </h4>
                <h4 className={styles["headerDetails"]}>|</h4>
                <h4 className={styles["headerDetails"]}>
                  {getUpdated().user_ids.length} Members
                </h4>
                <h4 className={styles["headerDetails"]}>|</h4>
                <h4 className={styles["headerDetails"]}>
                  Last Active: {getUpdated().last_active}
                </h4>
              </div>
            </div>
            <div>
              <h1 className={styles["header"]}>{getUpdated().total_points}</h1>
              <h4 className={styles["headerDetails"]}>Total Balance</h4>
            </div>
          </div>
          <hr className={styles["break"]} />
          <h4>Family Members</h4>
          <div className={styles["modalContent"]}>
            <UserList
              allUsers={users}
              users={users}
              setUsers={setUsers}
              family={family}
              isFamilyPath={true}
              setIsOpenFam={setIsOpen}
              setEdited={setWasEdited}
              refresh={refresh}
            />
          </div>
          <div
            className={styles["addTransaction"]}
            onClick={() => {
              setState("add");
              setHoveringAdd(false);
            }}
            onMouseEnter={() => setHoveringAdd(true)}
            onMouseLeave={() => setHoveringAdd(false)}
          >
            <Icon
              className={
                hoveringAdd ? styles["userAddHover"] : styles["userAdd"]
              }
              type={"userAdd"}
            />
            <div className={hoveringAdd && styles["addText"]}>
              Add New Family Member
            </div>
          </div>
        </div>
      </Modal>
    );
  } else if (state == "add") {
    return (
      <Modal open={isOpen}>
        <div className={styles["newMemberModal"]}>
          {renderHeader()}
          <div className={styles["contentContainer"]}>
            <div className={styles["blackHeading"]}>Add Member</div>
            <div className={styles["headDescription"]}>
              Add a parent or child to the family.
            </div>
            <div className={styles["modalContainer"]}>
              <div className={styles["containerFirst"]}>
                <div>
                  <div className={styles["headingText"]}>FULL NAME</div>
                  <input
                    id="fullname"
                    name="fullname"
                    className={styles["headTextField"]}
                    placeholder={"Firstname Lastname"}
                    onChange={(e) => setMemberName(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles["containerSecond"]}>
                <div>
                  <div className={styles["headingText"]}>EMAIL</div>
                  <input
                    id="email"
                    name="email"
                    className={styles["headTextField"]}
                    placeholder={"thisisanemail@gmail.com"}
                    onChange={(e) => setMemberEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles["containerThird"]}>
                <div>
                  <div className={styles["headingText"]}>ROLE</div>
                  <RadioGroup
                    row
                    onChange={(e) => setMemberRole(e.target.value)}
                  >
                    <FormControlLabel
                      value="Parent"
                      control={<Radio />}
                      label={<div>Parent</div>}
                    />
                    <FormControlLabel
                      value="Child"
                      control={<Radio />}
                      label={<p className={styles["radio-label"]}>Child</p>}
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className={styles["modalButtons"]}>
              <button
                className={styles["cancelButton"]}
                onClick={() => {
                  setState("home");
                }}
              >
                <Icon className={styles["cancelIcon"]} type={"cancelx"} />
                Cancel
              </button>
              <button
                className={styles["createFamilyButton"]}
                onClick={() => addMember()}
              >
                <Icon className={styles["checkmarkIcon"]} type={"checkmark"} />
                Confirm
              </button>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </div>
      </Modal>
    );
  }
};

export default FamilyModal;
