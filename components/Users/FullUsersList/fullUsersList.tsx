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
  allUsers: User[];
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  endIndex: number;
  setEndIndex: React.Dispatch<React.SetStateAction<number>>;
  refresh: () => void;
};

const FullUsersList: React.FC<FullUsersListProps> = ({
  allUsers,
  users,
  setUsers,
  startIndex,
  setStartIndex,
  endIndex,
  setEndIndex,
  refresh,
}: FullUsersListProps) => {
  const [searchQ, setSearchQ] = useState("");
  const [filterRole, setFilterRole] = useState();
  const [newUsers, setNewUsers] = useState<User[]>();

  const handleChangeRole = (event) => {
    setFilterRole(event.target.value);
  };

  useEffect(() => {
    if (searchQ != "") {
      setUsers(
        allUsers.filter((user) => {
          return user.full_name.includes(searchQ);
        })
      );
    } else {
      setUsers(allUsers.slice(startIndex, endIndex));
    }
  }, [searchQ]);

  const handlePaginationIndex = (direction) => {
    if (direction == "back") {
      startIndex == 1
        ? null
        : startIndex > 1 && endIndex != allUsers.length
        ? [
            setStartIndex(startIndex - 15),
            setEndIndex(endIndex - 15),
            setUsers(users.slice(startIndex, endIndex)),
          ]
        : endIndex == allUsers.length
        ? [
            setStartIndex(startIndex - 15),
            setEndIndex(endIndex - (endIndex - startIndex)),
            setUsers(users.slice(startIndex, endIndex)),
          ]
        : null;
    }
    if (direction == "forward") {
      endIndex == allUsers.length
        ? null
        : endIndex + 15 >= allUsers.length
        ? [
            setStartIndex(startIndex + 15),
            setEndIndex(allUsers.length),
            setUsers(users.slice(startIndex, endIndex)),
          ]
        : [
            setStartIndex(startIndex + 15),
            setEndIndex(endIndex + 15),
            setUsers(users.slice(startIndex, endIndex)),
          ];
    }
  };

  const applyFilters = async () => {
    if (filterRole != "All Roles") {
      setUsers(
        allUsers.filter((user) => {
          return user.role == filterRole;
        })
      );
      // const data = await getFilteredUsers(filterRole);
      // setUsers(data);
      // console.log(data);
    } else {
      setUsers(allUsers.slice(startIndex, endIndex));
    }
    // if (searchQ != "") {
    //   const data = await getUsersSearch(searchQ);
    //   console.log(data);
    // }
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
            placeholder="Search for a family or user"
            className={styles["search-bar"]}
            onChange={(e) => {
              setSearchQ(e.target.value);
            }}
            startAdornment={
              <div className={styles["center"]}>
                <Icon className={styles["search-icon"]} type={"search"}></Icon>
              </div>
            }
          />
          <div className={styles["pageNav"]}>
            {startIndex + 1}-{endIndex} of {allUsers.length}
            <div
              onClick={() => handlePaginationIndex("back")}
              className={styles["center"]}
            >
              <Icon className={styles["chevronLeft"]} type={"chevronLeft"} />
            </div>
            <div
              onClick={() => handlePaginationIndex("forward")}
              className={styles["center"]}
            >
              <Icon className={styles["chevronRight"]} type={"chevronRight"} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["container"]}>
        <UsersList
          allUsers={allUsers}
          users={users}
          setUsers={setUsers}
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
