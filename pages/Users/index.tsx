import Layout from "../../components/Layout/Layout";
import styles from "./UserAccounts.module.css";
import FamilyCard from "../../components/Users/familyCard";
// import firstore;
// import { firestore } from "firebase-admin";

const UsersPage: React.FunctionComponent = () => {
  //   const db = getFirestore(firebase);
  //   const dbQuery = query(collection(db, "families"));
  //   const getFamilies = async () => {
  //     const qs = await getDocs(dbQuery);
  //     console.log(qs);
  //     return qs;
  //   };
  //   const familes = getFamilies();
  //   const [families, familiesLoading, familiesError] = useCollection(
  //     firestore().collection("families"),
  //     {}
  //   );

  //   if (!familiesLoading && families) {
  //     families.docs.map((doc) => console.log(doc.data()));
  //   }

  return (
    <Layout title="Users">
      <div className={styles["container"]}>
        <h1>User Accounts</h1>
        <FamilyCard
          familyId={123}
          familyName="Nguyen"
          userIds={[]}
          totalPoints={12000}
        >
          {" "}
        </FamilyCard>
      </div>
    </Layout>
  );
};

export default UsersPage;
