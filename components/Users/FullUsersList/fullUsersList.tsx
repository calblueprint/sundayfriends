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
  const [filterStatus, setFilterStatus] = useState();
  const [newUsers, setNewUsers] = useState<User[]>();

  const handleChangeRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setFilterStatus(event.target.value);
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

  //PENDING/ACTIVE DOES NOT WORK YET BECAUSE THERE IS NO FIELD IN FIREBASE; ONLY SUSPENDED FOR NOW
  const applyFilters = async () => {
    if (filterStatus && filterStatus != "All Statuses") {
      if (filterRole && filterRole != "All Roles") {
        return setUsers(
          allUsers.filter((user) => {
            return user.role == filterRole && filterStatus == "Suspended"
              ? user.suspended
              : !user.suspended;
          })
        );
      }
      return filterStatus == "Suspended"
        ? setUsers(
            allUsers.filter((user) => {
              return user.suspended == true;
            })
          )
        : setUsers(
            allUsers.filter((user) => {
              return user.suspended == false;
            })
          );
    }
    if (filterRole && filterRole != "All Roles") {
      return setUsers(
        allUsers.filter((user) => {
          return user.role == filterRole;
        })
      );
    }
    return setUsers(allUsers.slice(startIndex, endIndex));
  };

  return (
    <div className={styles["pageContainer"]}>
      <div className={styles["filters"]}>
        <div>
          <FormControl className={styles["filter-role"]} size="small">
            <InputLabel id="All Roles" className={styles["filter-label"]}>
              Filter by Role
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
          <FormControl className={styles["filter-status"]} size="small">
            <InputLabel id="All Statuses" className={styles["filter-label"]}>
              Filter by Status
            </InputLabel>
            <Select
              id="All Statuses"
              variant="outlined"
              className={styles["select"]}
              label="All Statuses"
              value={filterStatus}
              onChange={handleChangeStatus}
            >
              <MenuItem value={"All Statuses"}>All Statuses</MenuItem>
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Suspended"}>Suspended</MenuItem>
            </Select>
          </FormControl>
          <Button
            className={styles["applyButton"]}
            onClick={filterRole || filterStatus ? applyFilters : null}
          >
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
