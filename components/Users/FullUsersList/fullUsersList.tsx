import * as React from "react";
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
import { useState, useEffect } from "react";
import {
  getAllUsers,
  getUsersByRole,
  getUsersSearch,
} from "../../../firebase/firestore/user";

type FullUsersListProps = {
  users: User[];
};

const FullUsersList: React.FC<FullUsersListProps> = ({
  users,
}: FullUsersListProps) => {
  const [searchQ, setSearchQ] = useState("");
  const [filterRole, setFilterRole] = useState();
  const [newUsers, setNewUsers] = useState<User[]>();

  const handleChangeRole = (event) => {
    setFilterRole(event.target.value);
  };

  useEffect(() => {
    console.log(searchQ);
    console.log(filterRole);
    const getUsersQ = async () => {
      if (filterRole) {
        if (filterRole == "All Roles") {
          const data = await getAllUsers();
          setNewUsers(data);
        } else {
          const data = await getUsersByRole(filterRole);
          setNewUsers(data);
          console.log(data);
        }
      }
      if (searchQ != "") {
        const data = await getUsersSearch(searchQ);
        console.log(data);
      }
    };
    getUsersQ();
  }, [searchQ, filterRole]);
  return (
    <div>
      <div className={styles["filters"]}>
        <div>
          <FormControl className={styles["filter-select"]} size="small">
            <InputLabel id="All Roles" className={styles["filter-label"]}>
              All Roles
            </InputLabel>
            <Select
              id="All Roles"
              variant="outlined"
              className={styles["select"]}
              label="All Roles"
              value={filterRole}
              onChange={handleChangeRole}
            >
              <MenuItem value={"All Roles"}>All Roles</MenuItem>
              <MenuItem value={"Head"}>Head</MenuItem>
              <MenuItem value={"Parent"}>Parent</MenuItem>
              <MenuItem value={"Child"}>Child</MenuItem>
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
            onChange={(e) => {
              setSearchQ(e.target.value);
            }}
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
        <UsersList users={newUsers ? newUsers : users} isFamilyPath={false} />
      </div>
    </div>
  );
};

export default FullUsersList;
