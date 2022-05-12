import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Icon from "../../../assets/Icon";
import styles from "./newFamilyModal.module.css";
import { User } from "../../../types/schema";
import NewFamilyCard from "../NewFamilyCard/newFamilyCard";
import { getCountAndIncrement } from "../../../firebase/firestore/family";
import { addUserInvite } from "../../../firebase/firestore/userInvite";
import { User_Invite } from "../../../types/schema";


type NewFamilyModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewFamilyModal: React.FC<NewFamilyModalProps> = ({
  isOpen,
  setIsOpen,
}: NewFamilyModalProps) => {
  const [state, setState] = useState("home");
  const [head, setHead] = useState(false);
  const [headName, setHeadName] = useState("");
  const [headEmail, setHeadEmail] = useState("");

  const [counter, setCounter] = useState(0);

  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState("");

  useEffect(() => {
    console.log(members);
  }, []);

  useEffect(() => {
    console.log(members);
    console.log(counter);
  }, [counter]);

  const closeModal = () => {
    setIsOpen(false);
    setHead(false);
    setMembers([]);
    setState("home");
  };

  const addHead = () => {
    // form validation?
    setHead(true);
    setState("home");
  };

  const addMember = () => {
    const mem = {
      name: memberName,
      email: memberEmail,
      role: memberRole,
    };
    var newmems = members;
    newmems.push(mem);
    setMembers(newmems);
    setState("home");
  };

  const deleteMember = (index) => {
    var newmems = members;
    newmems.splice(index, 1);
    setMembers(newmems);
    setCounter(counter + 1);
  };

  const inviteFamily = () => {
    closeModal();
    getCountAndIncrement().then((count) => {
      const headInvite = {
        family_id: count,
        name: headName,
        email: headEmail,
        status: "Head",
      }
      addUserInvite(headInvite as User_Invite);
      members.map((member) => {
        const memberInvite = {
          family_id: count,
          name: member.name,
          email: member.email,
          status: member.role,
        }
        addUserInvite(memberInvite as User_Invite);
      })
    });
  }

  const renderContent = () => {
    switch (state) {
      case "home":
        return (
          <div className={styles["contentContainer"]}>
            <div className={styles["title"]}>
              <Icon type={"family"} className={styles["familyIcon"]} />
              <div className={styles["modalHeading"]}>INVITE FAMILY</div>
            </div>
            <div className={styles["modalContainer"]}>
              <div className={styles["containerLeft"]}>
                <div>
                  <div className={styles["headingText"]}>Assign a Head</div>
                  {head ? (
                    <NewFamilyCard
                      name={headName}
                      email={headEmail}
                      role={"Head"}
                      deleteFunction={() => setHead(false)}
                    ></NewFamilyCard>
                  ) : (
                    <button
                      className={styles["addHeadButton"]}
                      onClick={() => setState("Head")}
                    >
                      <Icon className={styles["addHead"]} type={"addCircle"} />
                    </button>
                  )}
                </div>
              </div>
              <div className={styles["containerRight"]}>
                <div className={styles["headingText"]}>Add Members</div>
                <div className={styles["memberList"]}>
                  {Array.from(Array(members.length).keys()).map((index) => {
                    return (
                      <NewFamilyCard
                        key={members[index].name}
                        name={members[index].name}
                        email={members[index].email}
                        role={members[index].role}
                        deleteFunction={() => deleteMember(index)}
                      />
                    );
                  })}
                  <button
                    className={styles["addHeadButton"]}
                    onClick={() => setState("member")}
                  >
                    <Icon className={styles["addHead"]} type={"addCircle"} />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles["modalButtons"]}>
              <button
                className={styles["cancelButton"]}
                onClick={() => closeModal()}
              >
                <Icon className={styles["cancelIcon"]} type={"cancelx"} />
                Cancel
              </button>
              <button
                className={styles["createFamilyButton"]}
                onClick={() => inviteFamily()}
              >
                <Icon className={styles["checkmarkIcon"]} type={"checkmark"} />
                Invite Family
              </button>
            </div>
          </div>
        );
      case "Head":
        return (
          <div className={styles["contentContainer"]}>
            <div className={styles["blackHeading"]}>Assign a Head</div>
            <div className={styles["headDescription"]}>
              Assign a user the role of family head, responsible for managing
              family transactions and dependent accounts.{" "}
            </div>
            <div className={styles["modalContainer"]}>
              <div className={styles["containerLeft"]}>
                <div>
                  <div className={styles["headingText"]}>FULL NAME</div>
                  <input
                    id="fullname"
                    name="fullname"
                    className={styles["headTextField"]}
                    placeholder={"Firstname Lastname"}
                    onChange={(e) => setHeadName(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles["containerRight"]}>
                <div>
                  <div className={styles["headingText"]}>EMAIL</div>
                  <input
                    id="email"
                    name="email"
                    className={styles["headTextField"]}
                    placeholder={"thisisanemail@gmail.com"}
                    onChange={(e) => setHeadEmail(e.target.value)}
                  />
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
                onClick={() => addHead()}
              >
                <Icon className={styles["checkmarkIcon"]} type={"checkmark"} />
                Confirm
              </button>
            </div>
          </div>
        );
      case "member":
        return (
          <div className={styles["contentContainer"]}>
            <div className={styles["blackHeading"]}>Add Members</div>
            <div className={styles["headDescription"]}>
              Add parents and children to the family as members.{" "}
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
        );
    }
  };

  const renderBreadcrumbs = () => {
    switch (state) {
      case "home":
        return (
          <div className={styles["breadcrumb"]}>
            <button
              className={styles["chevronButton"]}
              onClick={() => setIsOpen(false)}
            >
              <Icon className={styles["chevron"]} type={"chevronLeft"} />
            </button>
            <button
              className={styles["chevronButton"]}
              onClick={() => setIsOpen(false)}
            >
              <Icon className={styles["chevron"]} type={"chevronRight"} />
            </button>
            Invite Family
          </div>
        );
      case "Head":
        return (
          <div className={styles["breadcrumb"]}>
            <button
              className={styles["chevronButton"]}
              onClick={() => setState("home")}
            >
              <Icon className={styles["chevron"]} type={"chevronLeft"} />
            </button>
            {/* <button
              className={styles["chevronButton"]}
              onClick={() => setIsOpen(false)}
            >
              <Icon className={styles["chevron"]} type={"chevronRight"} />
            </button> */}
            <div>New Family</div>
            <div className={styles["breadcrumbDivider"]}>/</div>
            <div className={styles["activeBreadcrumb"]}>Assign a Head</div>
          </div>
        );
      case "member":
        return (
          <div className={styles["breadcrumb"]}>
            <button
              className={styles["chevronButton"]}
              onClick={() => setState("home")}
            >
              <Icon className={styles["chevron"]} type={"chevronLeft"} />
            </button>
            {/* <button
              className={styles["chevronButton"]}
              onClick={() => setIsOpen(false)}
            >
              <Icon className={styles["chevron"]} type={"chevronRight"} />
            </button> */}
            <div>New Family</div>
            <div className={styles["breadcrumbDivider"]}>/</div>
            <div className={styles["activeBreadcrumb"]}>Add Members</div>
          </div>
        );
    }
  };

  return (
    <Modal open={isOpen}>
      <div
        className={
          state == "home"
            ? styles["newFamModal"]
            : state == "Head"
            ? styles["newHeadModal"]
            : styles["newMemberModal"]
        }
      >
        <div className={styles["modalHeadContanier"]}>
          {renderBreadcrumbs()}
          <button
            className={styles["closeButton"]}
            onClick={() => closeModal()}
          >
            <Icon className={styles["closeIcon"]} type={"popoverclose"} />
          </button>
        </div>
        {renderContent()}
      </div>
    </Modal>
  );
};

export default NewFamilyModal;
