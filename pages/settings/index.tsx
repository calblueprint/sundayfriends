import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Icon from "../../assets/Icon";
import styles from "./Settings.module.css";
import TierCutoffs from "../../components/Settings/TierCutoffs/TierCutoffs";
import TierDescriptions from "../../components/Settings/TierDescriptions/TierDescriptions";
import ExpirationDates from "../../components/Settings/ExpirationDates/ExpirationDates";

const SettingsPage: React.FunctionComponent = () => {
  const [settingPage, setSettingPage] = useState(0);

  const renderSettings = () => {
    switch (settingPage) {
      case 0:
        return <TierCutoffs />;
      case 1:
        return <TierDescriptions />;
      case 2:
        return <ExpirationDates />;
    }
  };

  return (
    <Layout title="Settings">
      <div className={styles["screen"]}>
        <div className={styles["container"]}>
          <div className={styles["title-div"]}>
            <Icon
              className={styles["transaction-icon"]}
              type={"settings"}
            ></Icon>
            <h2 className={styles["h2"]}>PROGRAM SETTINGS</h2>
          </div>
        </div>
        <div className={styles["mainContainer"]}>
          <div className={styles["leftContainer"]}>
            <div
              className={
                settingPage == 0
                  ? styles["cutoffs-selected"]
                  : styles["cutoffs-select"]
              }
              onClick={() => {
                setSettingPage(0);
              }}
            >
              <Icon
                className={styles["picker-icon"]}
                type={"tierpointcutoffs"}
              ></Icon>
              <div className={styles["picker-text"]}>Tier Point Cutoffs</div>
            </div>
            <div
              className={
                settingPage == 1
                  ? styles["descrip-selected"]
                  : styles["descrip-select"]
              }
              onClick={() => {
                setSettingPage(1);
              }}
            >
              <Icon
                className={styles["picker-icon"]}
                type={"tierdescriptions"}
              ></Icon>
              <div className={styles["picker-text"]}>Tier Descriptions</div>
            </div>
            <div
              className={
                settingPage == 2
                  ? styles["dates-selected"]
                  : styles["dates-select"]
              }
              onClick={() => {
                setSettingPage(2);
              }}
            >
              <Icon
                className={styles["picker-icon"]}
                type={"expirationdates"}
              ></Icon>
              <div className={styles["picker-text"]}>Expiration Dates</div>
            </div>
          </div>
          <div className={styles["rightContainer"]}>{renderSettings()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
