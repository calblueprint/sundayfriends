import styles from '../../pages/Transactions/Transactions.module.css';
import { Box } from "@mui/material";

type TabPanelProps = {
    index: number,
    value: number,
};

export const TabPanel: React.FunctionComponent<TabPanelProps> = ({
    children, 
    index, 
    value
}) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        className={styles['box']}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }} className={styles['tabbox']}>
            <h3>{children}</h3>
          </Box>
        )}
      </div>
    );
}
  