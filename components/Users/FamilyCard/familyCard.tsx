import * as React from "react";
import { Box, Avatar, Grid } from "@mui/material";
import styles from "./FamilyCard.module.css";
import { Family, User } from "../../../types/schema";
import { useState } from "react";
import FamilyModal from "../FamilyModal/familyModal";

type FamilyCardProps = {
  family: Family;
  refresh: () => void;
};

type FamilyCardsProps = {
  families: Family[];
  refresh: () => void;
};

type FamilyMemberProps = {
  user: User;
};

const FamilyMember: React.FC<FamilyMemberProps> = ({
  user,
}: FamilyMemberProps) => {
  return (
    <Grid item xs={6}>
      <div className={styles["familyMember"]}>
        <Avatar alt="smiley pic" src="/smiley.png" />
        <div>{user.full_name}</div>
      </div>
    </Grid>
  );
};

const FamilyCard: React.FunctionComponent<FamilyCardProps> = ({
  family,
  refresh,
}: FamilyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <FamilyModal
        family={family}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refresh={refresh}
      />
      <Box className={styles["card"]} onClick={() => setIsOpen(true)}>
        <div>
          <div className={styles["row"]}>
            <div className={styles["row"]}>
              <div className={styles["headText"]}>{family.family_name} </div>
              <div className={styles["smallText"]}>FID: {family.family_id}</div>
            </div>
            <h3>{family.total_points}</h3>
          </div>
          <Grid container spacing={2}>
            {family.user_ids.map((user) => (
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
  refresh,
}: FamilyCardsProps) => {
  return (
    <div className={styles["familyCards"]}>
      {families.map((family) => (
        <FamilyCard
          key={family.family_id}
          family={family}
          refresh={refresh}
        ></FamilyCard>
      ))}
    </div>
  );
};

export default FamilyCards;
