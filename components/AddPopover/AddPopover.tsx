import React, { useState, useEffect, ReactElement } from "react";
import styles from "./AddPopover.module.css";
import {
  Button,
  Popover,
  Box,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import Icon from "../../assets/Icon";
import { Transaction, User, Admin } from "../../types/schema";
import {
  addTransaction,
  getAllTransactions,
} from "../../firebase/firestore/transaction";
import { getExpirations } from "../../firebase/firestore/expirationDates";
import { integerPropType } from "@mui/utils";
import { updateLastActive } from "../../firebase/firestore/family";

type AddPopoverProps = {
  allUsers: User[];
  addAnchor: Element;
  closeAdd: Function;
  popoverid: string;
  currentAdmin: Admin;
  setTransactions: Function;
};

export const AddPopover: React.FunctionComponent<AddPopoverProps> = ({
  allUsers,
  addAnchor,
  closeAdd,
  popoverid,
  currentAdmin,
  setTransactions,
}: AddPopoverProps) => {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [addUser, setAddUser] = useState(null);

  const [success, setSuccess] = useState(false);
  const [addPoints, setAddPoints] = useState("10");
  const [addMessage, setAddMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (addAnchor) {
      setSuccess(false);
      setAddUser(null);
      resetFields();
    }
  }, [addAnchor]);

  const handleAddConfirm = async () => {
    if (selectedUser == "Select User") {
      setSnackbarMessage("No User Selected.");
      setSnackbarOpen(true);
    } else if (parseInt(addPoints) >= 10000) {
      setSnackbarMessage(
        "Amount chosen too large. Please reduce to below 10000."
      );
      setSnackbarOpen(true);
    } else if (parseInt(addPoints) == 0) {
      setSnackbarMessage("Please choose a valid amount number.");
      setSnackbarOpen(true);
    } else if (addMessage == "") {
      setSnackbarMessage("Please type a description.");
      setSnackbarOpen(true);
    } else {
      //handle post request
      const activeDate = new Date();
      const expireDate = await getExpirations().then((dates) => {
        return (
          dates[activeDate.getMonth()]
        )
      })
      const deleteDate = new Date(expireDate);
      deleteDate.setMonth(expireDate.getMonth() + 1);
      const adding = {
        expire_id: null,
        admin_name: currentAdmin.name,
        date: activeDate,
        deleteDate: deleteDate,
        description: addMessage,
        family_id: addUser.family_id,
        point_gain:
          parseInt(addPoints),
        user_name: addUser.full_name,
        user_id: addUser.user_id,
      };
      await addTransaction(adding as Transaction, expireDate, deleteDate);
      updateLastActive(addUser.family_id.toString(), activeDate);
      

      let trans = await getAllTransactions();
      setTransactions(trans);

      setSuccess(true);
    }
  };

  const selectAutocomplete = (value) => {
    setAddUser(value);
    if (value != null) {
      setSelectedUser(value.full_name);
    } else {
      setSelectedUser("Select User");
    }
  };

  const handleAddMore = () => {
    resetFields();
    setSuccess(false);
  };

  const handleAddClose = () => {
    closeAdd();
  };

  const resetFields = () => {
    setSelectedUser("Select User");
    setAddPoints("10");
    setAddMessage("");
  };

  const addPopoverContent = () => {
    if (success) {
      return (
        <div className={styles["success-div"]}>
          <p className={styles["success-title"]}>Success!</p>
          <p className={styles["success-message"]}>
            Transaction for {addUser?.full_name} has been added
          </p>
          <div>
            <Button
              className={styles["success-close-button"]}
              onClick={handleAddClose}
            >
              Close
            </Button>
            <Button
              className={styles["add-more-button"]}
              onClick={handleAddMore}
            >
              Add More
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles["popover-div"]}>
          <div className={styles["popover-header"]}>
            <h3 className={styles["add-title"]}>Add Transaction</h3>
            <div className={styles["x-button"]} onClick={handleAddClose}>
              <Icon type={"close"}></Icon>
            </div>
          </div>
          <div>
            <p className={styles["select-category"]}>USER</p>
            <Autocomplete
              onChange={(event, value) => selectAutocomplete(value)}
              id="country-select-demo"
              options={allUsers}
              autoHighlight
              getOptionLabel={(option) => option.full_name}
              size="small"
              forcePopupIcon={false}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ style: { backgroundColor: "black" } }}
                  {...props}
                >
                  {option.full_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  className={styles["autocomplete-text-field"]}
                  {...params}
                  label="Select User"
                  InputLabelProps={{
                    className: styles["autocomplete-input"],
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </div>
          <div>
            <p className={styles["select-category"]}>DESCRIPTION</p>
            <TextField
              className={styles["message-field"]}
              multiline
              rows={2}
              placeholder="Explain how user redeemed or earned credits (max 100 characters)"
              variant="standard"
              inputProps={{
                maxLength: 100,
                className: styles["message-field-input"],
              }}
              onChange={(e) => setAddMessage(e.target.value)}
            />
          </div>
          <div className={styles["amount-action"]}>
            <div id={styles["amount"]}>
              <p className={styles["select-category"]}>AMOUNT</p>
              <TextField
                className={styles["amount-field"]}
                rows={1}
                placeholder="0"
                defaultValue={0}
                variant="standard"
                type="number"
                inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => setAddPoints(e.target.value)}
              />
            </div>
          </div>
          <Button
            className={styles["confirm-button"]}
            onClick={handleAddConfirm}
          >
            Confirm
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </div>
      );
    }
  };

  const addOpen = Boolean(addAnchor);

  return (
    <Popover
      PaperProps={{ className: styles["popover-container"] }}
      open={addOpen}
      id={popoverid}
      anchorEl={addAnchor}
      onClose={handleAddClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {addPopoverContent()}
    </Popover>
  );
};
