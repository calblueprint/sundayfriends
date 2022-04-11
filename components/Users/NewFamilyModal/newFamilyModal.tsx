import * as React from "react";
import { useState } from "react";
import { Modal} from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Icon from "../../../assets/Icon"
import styles from "./newFamilyModal.module.css";
import { User } from "../../../types/schema";

type NewFamilyModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewFamilyModal: React.FC<NewFamilyModalProps> = ({
    isOpen,
    setIsOpen
}: NewFamilyModalProps) => {
  const [state, setState] = useState("home");
  const [head, setHead] = useState<User>();
  const [headName, setHeadName] = useState("");
  const [headEmail, setHeadEmail] = useState("");

  const [memberRole, setMemberRole] = useState("");

  const closeModal = () => {
    setIsOpen(false);
    setState("home");
  }

  const renderContent = () => {
    switch(state) {
      case "home":
        return (
          <div className={styles["contentContainer"]}>
            <div className={styles["title"]}>
              <Icon type={"family"} className={styles["familyIcon"]} />
              <div className={styles["modalHeading"]}>NEW FAMILY</div>
            </div>
            <div className={styles["modalContainer"]}>
              <div className={styles["containerLeft"]}>
                <div>
                  <div className={styles["headingText"]}>Assign a Head</div>
                  <button
                    className={styles["addHeadButton"]}
                    onClick={() => setState("head")}
                  >
                    <Icon className={styles["addHead"]} type={"addCircle"} />
                  </button>
                </div>
              </div>
              <div className={styles["containerRight"]}>
                <div>
                  <div className={styles["headingText"]}>Add Members</div>
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
                <Icon
                  className={styles["cancelIcon"]}
                  type={"popoverclose"}
                />
                Cancel
              </button>
              <button
                className={styles["createFamilyButton"]}
                onClick={() => {
                  return;
                }}
              >
                <Icon
                  className={styles["checkmarkIcon"]}
                  type={"checkmark"}
                />
                Create Family
              </button>
            </div>
          </div>
        )
      case "head":
        return (
          <div className={styles["contentContainer"]}>
            <div className={styles["blackHeading"]}>Assign a Head</div>
            <div className={styles["headDescription"]}>Assign a user the role of family head, responsible for managing family transactions and dependent accounts. </div>
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
                <Icon
                  className={styles["cancelIcon"]}
                  type={"popoverclose"}
                />
                Cancel
              </button>
              <button
                className={styles["createFamilyButton"]}
                onClick={() => {
                  return;
                }}
              >
                <Icon
                  className={styles["checkmarkIcon"]}
                  type={"checkmark"}
                />
                Confirm
              </button>
            </div>
          </div>
        )
      case "member":
        return (
          <div className={styles["contentContainer"]}>
            <div className={styles["blackHeading"]}>Add Members</div>
            <div className={styles["headDescription"]}>Add parents and children to the family as members. </div>
            <div className={styles["modalContainer"]}>
              <div className={styles["containerFirst"]}>
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
              <div className={styles["containerSecond"]}>
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
              <div className={styles["containerThird"]}>
                <div>
                  <div className={styles["headingText"]}>ROLE</div>
                  <RadioGroup row onChange={(e) => setMemberRole(e.target.value)}>
                    <FormControlLabel
                      value="redeem"
                      control={<Radio />}
                      label={<div>Parent</div>}
                    />
                    <FormControlLabel
                      value="earn"
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
                <Icon
                  className={styles["cancelIcon"]}
                  type={"popoverclose"}
                />
                Cancel
              </button>
              <button
                className={styles["createFamilyButton"]}
                onClick={() => {
                  return;
                }}
              >
                <Icon
                  className={styles["checkmarkIcon"]}
                  type={"checkmark"}
                />
                Confirm
              </button>
            </div>
          </div>
        )
    }
  }

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
            New Family
          </div>
        )
      case "head":
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
        )
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
        )

    }
  }

  return (
    <Modal open={isOpen}>
      <div className={state=="home"?styles["newFamModal"]:(state=="head"?styles["newHeadModal"]:styles["newMemberModal"])}>
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
  )
}

export default NewFamilyModal;