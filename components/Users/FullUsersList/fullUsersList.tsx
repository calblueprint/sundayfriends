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
  getFilteredUsers,
  getUsersSearch,
} from "../../../firebase/firestore/user";

type FullUsersListProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  slicedUsers: User[];
  setSlicedUsers: Function;
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  endIndex: number;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
  refresh: () => void;
};

const FullUsersList: React.FC<FullUsersListProps> = ({
  users,
  setUsers,
  slicedUsers,
  setSlicedUsers,
  startIndex,
  setStartIndex,
  endIndex,
  setEndIndex,
  refresh,
}: FullUsersListProps) => {
  const [searchQ, setSearchQ] = useState("");
  const [filterRole, setFilterRole] = useState();
  const [newUsers, setNewUsers] = useState<User[]>();
  // const [startIndex, setStartIndex] = useState(0);
  // const [endIndex, setEndIndex] = useState(15);

  const handleChangeRole = (event) => {
    setFilterRole(event.target.value);
  };

  useEffect(() => {
    setSlicedUsers(startIndex, endIndex);
  }, [startIndex]);

  const handlePaginationIndex = (direction) => {
    if (direction == "back") {
      startIndex > 1 && endIndex != users.length
        ? [
            setStartIndex(startIndex - 15),
            setEndIndex(endIndex - 15),
            setSlicedUsers(startIndex, endIndex),
          ]
        : endIndex == users.length
        ? [
            setStartIndex(startIndex - (endIndex - startIndex) - 15),
            setEndIndex(endIndex - (endIndex - startIndex) - 1),
            setSlicedUsers(startIndex, endIndex),
          ]
        : null;
    }
    if (direction == "forward") {
      endIndex + 15 >= users.length && endIndex != users.length
        ? [
            setStartIndex(startIndex + 15),
            setEndIndex(users.length),
            setSlicedUsers(startIndex, endIndex),
          ]
        : endIndex == users.length
        ? null
        : [
            setStartIndex(startIndex + 15),
            setEndIndex(endIndex + 15),
            setSlicedUsers(startIndex, endIndex),
          ];
    }
  };

  const applyFilters = async () => {
    if (filterRole) {
      const data = await getFilteredUsers(filterRole);
      setNewUsers(data);
      console.log(data);
    }
    if (searchQ != "") {
      const data = await getUsersSearch(searchQ);
      console.log(data);
    }
  };
  return (
    <div className={styles["pageContainer"]}>
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
          <Button className={styles["applyButton"]} onClick={applyFilters}>
            Apply
          </Button>
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
          <div className={styles["pageNav"]}>
            {startIndex + 1}-{endIndex} of {users.length}
          </div>
          <div onClick={() => handlePaginationIndex("back")}>
            <Icon className={styles["chevron"]} type={"chevronLeft"} />
          </div>
          <div onClick={() => handlePaginationIndex("forward")}>
            <Icon className={styles["chevron"]} type={"chevronRight"} />
          </div>
        </div>
      </div>
      <div className={styles["container"]}>
        <UsersList
          allUsers={users}
          users={slicedUsers}
          setSlicedUsers={setSlicedUsers}
          isFamilyPath={false}
          refresh={refresh}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>
    </div>
  );
};

export default FullUsersList;
