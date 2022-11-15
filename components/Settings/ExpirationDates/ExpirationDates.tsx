import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import React, { useEffect, useState } from "react";
import {
  getExpirations,
  updateExpirations,
} from "../../../firebase/firestore/expirationDates";
import styles from "./ExpirationDates.module.css";

const ExpirationDates = () => {
  const [expirations, setExpirations] = useState([]);
  const [somethingChanged, setSomethingChanged] = useState(false);

  useEffect(() => {
    getExpirations().then((expirations) => {
      setExpirations(expirations);
    });
  }, []);

  const updateList = (index: number, value: Moment) => {
    const newExpirations = [];
    expirations.map((date, i) => {
      if (i == index) {
        newExpirations.push(value.toDate());
      } else {
        newExpirations.push(date);
      }
    });
    setExpirations(newExpirations);
    setSomethingChanged(true);
  };

  const saveTiers = () => {
    console.log(expirations);
    updateExpirations(expirations);
    setSomethingChanged(false);
  };

  return (
    <div>
      <div className={styles["header"]}>Set Point Cutoffs For Each Tier</div>
      <div className={styles["tiers"]}>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>January</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[0]}
                onChange={(newValue) => {
                  updateList(0, newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>February</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[1]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>March</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[2]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className={styles["tiers"]}>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>April</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[3]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>May</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[4]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>June</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[5]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className={styles["tiers"]}>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>July</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[6]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>August</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[7]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>September</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[8]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className={styles["tiers"]}>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>October</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[9]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>November</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[10]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>December</p>
          <div className={styles["tier-range"]}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={expirations[11]}
                onChange={(newValue) => {
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <Button
        disabled={!somethingChanged}
        className={styles["confirm-button"]}
        onClick={() => {
          saveTiers();
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default ExpirationDates;
