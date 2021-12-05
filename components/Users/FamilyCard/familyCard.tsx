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

  const imagePath = (): string => {
    if (user.role == "Head") {
      return "/smiley - head.svg"
    }
    else if (user.role == "Parent") {
      return "/smiley - parent.svg"
    }
    else if (user.role == "Child") {
      return "/smiley - child.svg"
    }
    return "/smiley - dependent.svg"
  }
  return (
    <Grid item xs={6}>
      <div className={styles["familyMember"]}>
        <img alt="smiley pic" src={imagePath()} />
        <div className={styles["userName"]}>{user.full_name}</div>
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
              <h4 className={styles["headText"]}>{family.family_name} </h4>
              <div className={styles["smallText"]}>FID: {family.family_id}</div>
            </div>
            <h5>{family.total_points}</h5>
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
