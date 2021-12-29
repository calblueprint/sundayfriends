import * as React from "react";
import styles from "../../pages/transactions/Transactions.module.css";
import { Box } from "@mui/material";

type TabPanelProps = React.PropsWithChildren<{
  index: number;
  value: number;
}>;

export const TabPanel: React.FunctionComponent<TabPanelProps> = ({
  children,
  index,
  value,
}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className={styles["box"]}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            height: "fit-content",
            padding: "0%",
            marginLeft: "7px",
            borderRadius: "0px 30px 30px 30px",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
          }}
        >
          <h3 className={styles["children"]}>{children}</h3>
        </Box>
      )}
    </div>
  );
};
