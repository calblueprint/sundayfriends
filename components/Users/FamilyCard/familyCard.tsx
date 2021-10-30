import { Box, Avatar, Grid } from "@mui/material";
import styles from "./FamilyCard.module.css";
import { Family, User } from "../../../types/schema";
import { useState, useEffect } from "react";
import FamilyModal from "../FamilyModal/familyModal";
import { getUser } from "../../../firebase/firestore/user";

type FamilyCardProps = {
  family: Family;
};

type FamilyCardsProps = {
  families: Family[];
};

type FamilyMemberProps = {
  user: User;
};

const FamilyMember: React.FC<FamilyMemberProps> = ({
  user,
}: FamilyMemberProps) => {
  return (
    <Grid item xs={6}>
      {console.log(user.full_name)}
      <div className={styles["familyMember"]}>
        <Avatar alt="smiley pic" src="/smiley.png" />
        <div>{user.full_name}</div>
      </div>
    </Grid>
  );
};

const FamilyCard: React.FunctionComponent<FamilyCardProps> = ({
  family,
}: FamilyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsersById = async (user_ids: string[]): Promise<User[]> => {
      const users = [];
      user_ids.map((user) =>
        getUser(user).then((items) => {
          users.push(items);
        })
      );
      return users;
    };
    getUsersById(family?.user_ids).then((items) => {
      setUsers(items);
    });
  }, [family]);

  return (
    <div>
      <FamilyModal
        family={family}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        users={users}
      />
      <Box className={styles["card"]} onClick={() => setIsOpen(true)}>
        <div>
          <div className={styles["row"]}>
            <div className={styles["row"]}>
              <h2 className={styles["headText"]}>{family.family_name} </h2>
              <div className={styles["smallText"]}>FID: {family.family_id}</div>
            </div>
            <h3>{family.total_points}</h3>
          </div>
          <Grid container spacing={2}>
            {users !== [] &&
              users?.map((user) => (
                <FamilyMember key={user.full_name} user={user} />
              ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
};

const FamilyCards: React.FunctionComponent<FamilyCardsProps> = ({
  families,
}: FamilyCardsProps) => {
  return (
    <div className={styles["familyCards"]}>
      {families.map((family) => (
        <FamilyCard key={family.family_id} family={family}></FamilyCard>
      ))}
    </div>
  );
};

export default FamilyCards;
