import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAllTiers,
  updateTierDescriptions,
  updateTiers,
} from "../../../firebase/firestore/tiers";
import styles from "./TierDescriptions.module.css";

const TierDescriptions = () => {
  const [tier1Title, setTier1Title] = useState("The Basic Family");
  const [tier2Title, setTier2Title] = useState("The Good Family");
  const [tier3Title, setTier3Title] = useState("The Better Family");
  const [tier4Title, setTier4Title] = useState("The Best Family");
  const [tier1Description, setTier1Description] = useState("");
  const [tier2Description, setTier2Description] = useState("");
  const [tier3Description, setTier3Description] = useState("");
  const [tier4Description, setTier4Description] = useState("");
  const [somethingChanged, setSomethingChanged] = useState(false);

  useEffect(() => {
    getAllTiers().then((tiers) => {
      setTier1Title(tiers.tier1title);
      setTier2Title(tiers.tier2title);
      setTier3Title(tiers.tier3title);
      setTier4Title(tiers.tier4title);
      setTier1Description(tiers.tier1description);
      setTier2Description(tiers.tier2description);
      setTier3Description(tiers.tier3description);
      setTier4Description(tiers.tier4description);
    });
  }, []);

  const saveTiers = () => {
    updateTierDescriptions(
      tier1Title,
      tier2Title,
      tier3Title,
      tier4Title,
      tier1Description,
      tier2Description,
      tier3Description,
      tier4Description
    );
    setSomethingChanged(false);
  };

  return (
    <div>
      <div className={styles["header"]}>Set Point Cutoffs For Each Tier</div>
      <div className={styles["tiers"]}>
        <div className={styles["tier"]}>
          <div className={styles["tiertitle"]}>Tier 1</div>
          <p className={styles["to"]}>Offering Title</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="title"
            value={tier1Title}
            variant="standard"
            type="text"
            onChange={(e) => {
              setTier1Title(e.target.value), setSomethingChanged(true);
            }}
          />
          <p className={styles["to"]}>Description</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="description"
            value={tier1Description}
            variant="standard"
            type="text"
            inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setTier1Description(e.target.value), setSomethingChanged(true);
            }}
          />
        </div>
        <div className={styles["tier"]}>
          <div className={styles["tiertitle"]}>Tier 2</div>
          <p className={styles["to"]}>Offering Title</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="title"
            value={tier2Title}
            variant="standard"
            type="text"
            onChange={(e) => {
              setTier2Title(e.target.value), setSomethingChanged(true);
            }}
          />
          <p className={styles["to"]}>Description</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="description"
            value={tier2Description}
            variant="standard"
            type="text"
            inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setTier2Description(e.target.value), setSomethingChanged(true);
            }}
          />
        </div>
        <div className={styles["tier"]}>
          <div className={styles["tiertitle"]}>Tier 3</div>
          <p className={styles["to"]}>Offering Title</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="title"
            value={tier3Title}
            variant="standard"
            type="text"
            onChange={(e) => {
              setTier3Title(e.target.value), setSomethingChanged(true);
            }}
          />
          <p className={styles["to"]}>Description</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="description"
            value={tier3Description}
            variant="standard"
            type="text"
            inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setTier3Description(e.target.value), setSomethingChanged(true);
            }}
          />
        </div>
        <div className={styles["tier"]}>
          <div className={styles["tiertitle"]}>Tier 4</div>
          <p className={styles["to"]}>Offering Title</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="title"
            value={tier4Title}
            variant="standard"
            type="text"
            onChange={(e) => {
              setTier4Title(e.target.value), setSomethingChanged(true);
            }}
          />
          <p className={styles["to"]}>Description</p>
          <TextField
            className={styles["amount-field"]}
            multiline
            placeholder="description"
            value={tier4Description}
            variant="standard"
            type="text"
            inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setTier4Description(e.target.value), setSomethingChanged(true);
            }}
          />
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

export default TierDescriptions;
