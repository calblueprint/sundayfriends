import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllTiers, updateTiers } from "../../../firebase/firestore/tiers";
import styles from "./TierCutoffs.module.css";

const TierCutoffs = () => {
  const [tier1, setTier1] = useState("100");
  const [tier2, setTier2] = useState("200");
  const [tier3, setTier3] = useState("300");
  const [somethingChanged, setSomethingChanged] = useState(false);

  useEffect(() => {
    getAllTiers().then((tiers) => {
      setTier1(tiers.tier2.toString());
      setTier2(tiers.tier3.toString());
      setTier3(tiers.tier4.toString());
    });
  }, []);

  const saveTiers = () => {
    updateTiers(Number(tier1), Number(tier2), Number(tier3));
    setSomethingChanged(false);
  };

  return (
    <div>
      <div className={styles["header"]}>Set Point Cutoffs For Each Tier</div>
      <div className={styles["tiers"]}>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>Tier 1</p>
          <div className={styles["tier-range"]}>
            <TextField
              className={styles["amount-field"]}
              disabled
              rows={1}
              placeholder="0"
              defaultValue={0}
              variant="standard"
              type="number"
            />
            <p className={styles["to"]}>to</p>
            <TextField
              className={styles["amount-field"]}
              rows={1}
              placeholder="0"
              value={tier1}
              variant="standard"
              type="number"
              inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => {
                setTier1(e.target.value), setSomethingChanged(true);
              }}
            />
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>Tier 2</p>
          <div className={styles["tier-range"]}>
            <TextField
              className={styles["amount-field"]}
              disabled
              rows={1}
              value={tier1 == "" ? 0 : tier1}
              variant="standard"
              type="number"
            />
            <p className={styles["to"]}>to</p>
            <TextField
              className={styles["amount-field"]}
              rows={1}
              placeholder="0"
              value={tier2}
              variant="standard"
              type="number"
              inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => {
                setTier2(e.target.value), setSomethingChanged(true);
              }}
            />
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>Tier 3</p>
          <div className={styles["tier-range"]}>
            <TextField
              className={styles["amount-field"]}
              disabled
              rows={1}
              value={tier2 == "" ? 0 : tier2}
              variant="standard"
              type="number"
            />
            <p className={styles["to"]}>to</p>
            <TextField
              className={styles["amount-field"]}
              rows={1}
              placeholder="0"
              value={tier3}
              variant="standard"
              type="number"
              inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => {
                setTier3(e.target.value), setSomethingChanged(true);
              }}
            />
          </div>
        </div>
        <div className={styles["tier"]}>
          <p className={styles["tiertitle"]}>Tier 4</p>
          <div className={styles["tier-range"]}>
            <TextField
              className={styles["amount-field"]}
              disabled
              rows={1}
              value={tier3 == "" ? 0 : tier3}
              variant="standard"
              type="number"
            />
            <p className={styles["to"]}>onward</p>
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

export default TierCutoffs;
