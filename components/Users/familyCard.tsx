import { Box, Avatar } from "@mui/material";
import styles from "./FamilyCard.module.css";

type User = {
  address: string;
};

type FamilyCardProps = {
  familyId: number;
  totalPoints: number;
  familyName: string;
  userIds: number[];
};

type FamilyMemberProps = {
  user: number;
};

const FamilyMember: React.FC<FamilyMemberProps> = ({
  user,
}: FamilyMemberProps) => {
  return <div>{user}</div>;
};

const FamilyCard: React.FunctionComponent<FamilyCardProps> = ({
  familyId,
  familyName,
  totalPoints,
  userIds,
}: FamilyCardProps) => {
  return (
    <Box className={styles.card}>
      <div>
        <div className={styles.row}>
          <div className={styles.row}>
            <h2 className={styles.headText}>{familyName} </h2>
            <div className={styles.smallText}>FID: {familyId}</div>
          </div>
          <h3>{totalPoints}</h3>
        </div>
        <div>
          <div className={styles.row}>
            <Avatar alt="smiley pic" src="/smiley.png" />
            <div>Alexandria</div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FamilyCard;
