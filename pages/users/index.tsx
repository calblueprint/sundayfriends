import * as React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./UsersPage.module.css";
import FamilyCards from "../../components/Users/FamilyCard/familyCard";
import { Tabs, Tab, Modal } from "@mui/material";
import { useState } from "react";
import { getAllUsers } from "../../firebase/firestore/user";
import { getAllFamilies } from "../../firebase/firestore/family";
import FullUsersList from "../../components/Users/FullUsersList/fullUsersList";
import firebaseAdmin from "../../firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { getAdmin } from "../../firebase/firestore/admin";
import nookies from "nookies";
import { Admin, Family, User } from "../../types/schema";
import { useRouter } from "next/router";
import Icon from "../../assets/Icon";

type UsersPageProps = {
  currentAdmin: Admin;
  allUsers: User[];
  allFamilies: Family[];
};

const UsersPage: React.FunctionComponent<UsersPageProps> = ({
  currentAdmin,
  allUsers,
  allFamilies,
}: UsersPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const router = useRouter();
  const refreshData = (): void => {
    router.replace(router.asPath);
  };
  return (
    <Layout title="Users">
      <Modal open={isOpen}>
        <div className={styles["newFamModal"]}>
          <div className={styles["modalHeadContanier"]}>
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
            <button
              className={styles["closeButton"]}
              onClick={() => setIsOpen(false)}
            >
              <Icon className={styles["closeIcon"]} type={"popoverclose"} />
            </button>
          </div>
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
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={styles["addHead"]} type={"addCircle"} />
                </button>
              </div>
              <div>
                <div className={styles["headingText"]}>Add Dependents</div>
                <div className={styles["subText"]}>
                  Those who don’t have emails can be added under the head’s
                  account
                </div>
                <button
                  className={styles["addDepButton"]}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={styles["addDep"]} type={"addCircle"} />
                </button>
              </div>
            </div>
            <div className={styles["containerRight"]}>
              <div>
                <div className={styles["headingText"]}>Add Members</div>
                <button
                  className={styles["addHeadButton"]}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={styles["addHead"]} type={"addCircle"} />
                </button>
              </div>
              <div className={styles["modalButtons"]}>
                <button
                  className={styles["cancelButton"]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Icon className={styles["cancelIcon"]} type={"popoverclose"} />
                  Cancel
                </button>
                <button
                  className={styles["createFamilyButton"]}
                  onClick={() => {
                    return;
                  }}
                >
                  Create Family
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles["container"]}>
        <div className={styles["headingContainer"]}>
          <div className={styles["title"]}>
            <Icon className={styles["userIcon"]} type={"usersnavicon"} />
            <h2 className={styles["heading"]}>USER ACCOUNTS</h2>
          </div>
          <button
            className={styles["addFamilyButton"]}
            onClick={() => setIsOpen(true)}
          >
            <Icon className={styles["familyButtonIcon"]} type={"family"} />
            New Family
          </button>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={styles["tabs"]}
        >
          <Tab className={styles["tabs"]} label="Families View" />
          <Tab className={styles["tabs"]} label="List View" />
        </Tabs>
        {value == 0 ? (
          <FamilyCards families={allFamilies} refresh={() => refreshData()} />
        ) : (
          <FullUsersList users={allUsers} refresh={() => refreshData()} />
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const users = await getAllUsers();
    const families = await getAllFamilies();
    const cookies = nookies.get(ctx);
    const userToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const adminUid = userToken.uid;
    const adminData = await getAdmin(adminUid);
    return {
      props: {
        currentAdmin: adminData,
        allUsers: users,
        allFamilies: families,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permament: false,
        destination: "/",
      },
    };
  }
};

export default UsersPage;
