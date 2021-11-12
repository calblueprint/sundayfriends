import styles from "../../pages/Transactions/Transactions.module.css";
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
        <Box sx={{ p: 3 }} className={styles["tab-box"]}>
          <h3 className={styles["children"]}>{children}</h3>
        </Box>
      )}
    </div>
  );
};
