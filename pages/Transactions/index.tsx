import * as React from 'react';
import Layout from "../../components/Layout/Layout";
import PropTypes from 'prop-types';
import { Grid, Button, Tabs, Tab, Box } from "@mui/material";
import styles from './Transactions.module.css';
import { TabPanel } from '../../components/TabPanel';

const TransactionsPage: React.FunctionComponent = () => {

    const BasicTabs = () => {
        const [value, setValue] = React.useState(0);
        
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
        
        return (
            <Box sx={{ width: '100%', maxHeight: '62vh' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="History" className={value==0 ? styles['seltab'] : styles['tab']}/>
                <Tab label="Redemptions" className={value==1 ? styles['seltab'] : styles['tab']}/>
                <Tab label="Earnings" className={value==2 ? styles['seltab'] : styles['tab']}/>
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
            <Grid container rowSpacing={1} className={styles.container}>
                <Grid item xs={8}>
                    <h2 className={styles['h2']}>TRANSACTIONS</h2>
                </Grid>
                <Grid item xs={2}>
                    <Button className={styles['button']}>Add Single Transaction</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button className={styles['button']}>Upload Bulk Transactions</Button>
                </Grid>
                {BasicTabs()}
            </Grid>
        </Layout>
    );
}

export default TransactionsPage;