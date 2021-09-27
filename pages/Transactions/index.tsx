import * as React from 'react';
import Layout from "../../components/Layout/Layout";
import PropTypes from 'prop-types';
import { Grid, Button, Tabs, Tab, Box } from "@mui/material";
import styles from './Transactions.module.css';

const TransactionsPage: React.FunctionComponent = () => {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            className={styles.box}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }} className={styles.tabbox}>
                <h3>{children}</h3>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    function BasicTabs() {
        const [value, setValue] = React.useState(0);
        
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
        
        return (
            <Box sx={{ width: '100%', height: '60%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="History" {...a11yProps(0)} />
                <Tab label="Redemptions" {...a11yProps(1)} />
                <Tab label="Earnings" {...a11yProps(2)} />
                </Tabs>
            </Box>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        );
    }
      
    return(
        <Layout title='Transactions'>
            <Grid container className={styles.container}>
                <Grid item xs={8}>
                    <h2 className={styles.h2}>TRANSACTIONS</h2>
                </Grid>
                <Grid item xs={2}>
                    <Button className={styles.button}>Add Single Transaction</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button className={styles.button}>Upload Bulk Transactions</Button>
                </Grid>
                {BasicTabs()}
            </Grid>
        </Layout>
    );
}

export default TransactionsPage;