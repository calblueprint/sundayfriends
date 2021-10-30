import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
} from "@mui/material";
import styles from "./FullUsersList.module.css";
import { User } from "../../../types/schema";
import UsersList from "../UsersList/usersList";
import Icon from "../../../assets/Icon";

type FullUsersListProps = {
  users: User[];
};

const FullUsersList: React.FC<FullUsersListProps> = ({
  users,
}: FullUsersListProps) => {
  return (
    <div>
      <div className={styles["filters"]}>
        <div>
          <FormControl className={styles["filter-select"]} size="small">
            <InputLabel className={styles["filter-label"]}>
              All Roles
            </InputLabel>
            <Select
              variant="outlined"
              className={styles["select"]}
              label="All Roles"
            >
              <MenuItem>Head</MenuItem>
              <MenuItem>Parent</MenuItem>
              <MenuItem>Child</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles["filter-select"]} size="small">
            <InputLabel className={styles["filter-label"]}>
              All Users
            </InputLabel>
            <Select
              variant="outlined"
              className={styles["select"]}
              label="All Roles"
            >
              <MenuItem>Some Users</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={styles["filter-select"]} size="small">
            <InputLabel className={styles["filter-label"]}>Sort By</InputLabel>
            <Select
              variant="outlined"
              className={styles["select"]}
              label="All Roles"
            >
              <MenuItem>A-Z</MenuItem>
              <MenuItem>Z-A</MenuItem>
            </Select>
          </FormControl>
          <Button className={styles["applyButton"]}>Apply</Button>
        </div>
        <div className={styles["searchNav"]}>
          <Input
            disableUnderline={true}
            placeholder="Search for a user"
            className={styles["search-bar"]}
            endAdornment={
              <Icon className={styles["search-icon"]} type={"search"}></Icon>
            }
          />
          <div className={styles["pageNav"]}>1-15 of 200</div>
          <div>
            <Icon className={styles["chevron"]} type={"chevronLeft"} />
            <Icon className={styles["chevron"]} type={"chevronRight"} />
          </div>
        </div>
      </div>
      <div className={styles["container"]}>
        <UsersList users={users} isFamilyPath={false} />
      </div>
    </div>
  );
};

export default FullUsersList;
