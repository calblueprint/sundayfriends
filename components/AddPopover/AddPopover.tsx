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
import { integerPropType } from "@mui/utils";

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
  const [addType, setAddType] = useState("");
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
    } else if (addType == "") {
      setSnackbarMessage("Select Redeem or Earn.");
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
      const adding = {
        admin_name: currentAdmin.name,
        date: new Date(),
        description: addMessage,
        family_id: addUser.family_id,
        point_gain:
          addType == "redeem" ? -parseInt(addPoints) : parseInt(addPoints),
        user_name: addUser.full_name,
        user_id: addUser.user_id,
      };
      await addTransaction(adding as Transaction);

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
    setAddType("");
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
                <Box component="li" {...props}>
                  <p className={styles["select-label"]}>{option.full_name}</p>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  sx={{
                    backgroundColor: "white",
                  }}
                  {...params}
                  label="Select User"
                  InputLabelProps={{
                    className: styles["autocomplete-input"],
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                    className: styles["autocomplete-input"],
                  }}
                />
              )}
            />
          </div>
          <div className={styles["amount-action"]}>
            <div id={styles["amount"]}>
              <p className={styles["select-category"]}>AMOUNT</p>
              <TextField
                className={styles["amount-field"]}
                rows={1}
                defaultValue="10"
                variant="standard"
                type="number"
                inputProps={{
                  inputmode: "numeric",
                  pattern: "[0-9]*",
                  className: styles["amount-text"],
                }}
                onChange={(e) => setAddPoints(e.target.value)}
              />
            </div>
            <div id={styles["action"]}>
              <p className={styles["select-category"]}>ACTION</p>
              <RadioGroup row onChange={(e) => setAddType(e.target.value)}>
                <FormControlLabel
                  value="redeem"
                  control={<Radio />}
                  label={<p className={styles["radio-label"]}>Redeem</p>}
                />
                <FormControlLabel
                  value="earn"
                  control={<Radio />}
                  label={<p className={styles["radio-label"]}>Earn</p>}
                />
              </RadioGroup>
            </div>
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
