import { Box, Avatar, Grid, Modal } from "@mui/material";
import styles from "./FamilyCard.module.css";
import { Family, User } from "../../types/schema";
import { useState } from "react";

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
      <div className={styles.familyMember}>
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
  return (
    <div>
      <Modal open={isOpen}>
        <div className={styles.modal}> Hello this is a modal </div>
      </Modal>
      <Box className={styles.card} onClick={() => setIsOpen(true)}>
        <div>
          <div className={styles.row}>
            <div className={styles.row}>
              <h2 className={styles.headText}>{family.familyName} </h2>
              <div className={styles.smallText}>FID: {family.familyId}</div>
            </div>
            <h3>{family.totalPoints}</h3>
          </div>
          <Grid container spacing={2}>
            {family.userIds.map((user) => (
              <FamilyMember key={user.email} user={user} />
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
    <div className={styles.familyCards}>
      {families.map((family) => (
        <FamilyCard key={family.familyId} family={family}></FamilyCard>
      ))}
    </div>
  );
};

export default FamilyCards;
