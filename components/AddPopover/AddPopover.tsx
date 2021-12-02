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

  const [noUserSnackbar, setUserSnackbar] = useState(false);
  const [amountSnackbar, setAmountSnackbar] = useState(false);
  const [validAmountSnackbar, setValidAmountSnackbar] = useState(false);
  const [noAction, setNoAction] = useState(false);

  useEffect(() => {
    if (addAnchor) {
      setSuccess(false);
      setAddUser(null);
      resetFields();
    }
  }, [addAnchor]);

  const handleAddConfirm = async () => {
    if (selectedUser=="Select User") {
      setUserSnackbar(true);
    } else if (addType=="") {
      setNoAction(true);
    } else if (parseInt(addPoints) >= 10000) {
      setAmountSnackbar(true);
    } else if (parseInt(addPoints) == 0) {
      setValidAmountSnackbar(true);
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
      };
      await addTransaction(adding as Transaction);
  
      getAllTransactions().then((items) => {
        setTransactions(items);
      });
  
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
          <div className={styles["amount-action"]}>
            <div id={styles["amount"]}>
              <p className={styles["select-category"]}>AMOUNT</p>
              <TextField
                className={styles["amount-field"]}
                rows={1}
                defaultValue="10"
                variant="standard"
                type="number"
                inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
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
            <p className={styles["select-category"]}>MESSAGE</p>
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
            open={noUserSnackbar}
            autoHideDuration={3000}
            onClose={() => setUserSnackbar(false)}
            message="No User Selected"
          />
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={amountSnackbar}
            autoHideDuration={3000}
            onClose={() => setAmountSnackbar(false)}
            message="Amount chosen too large. Please reduce to below 10000"
          />
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={validAmountSnackbar}
            autoHideDuration={3000}
            onClose={() => setValidAmountSnackbar(false)}
            message="Please choose a valid amount number."
          />
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={noAction}
            autoHideDuration={3000}
            onClose={() => setNoAction(false)}
            message="Select Redeem or Earn"
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
