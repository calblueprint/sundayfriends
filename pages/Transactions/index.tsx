import React, { useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { Grid, Button, Tabs, Tab, Box } from "@mui/material";
import styles from './Transactions.module.css';
import { TabPanel } from '../../components/TabPanel/TabPanel';


const TransactionsPage: React.FunctionComponent = () => {

    const BasicTabs = () => {
        const [value, setValue] = React.useState(0);
        
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const renderHistory: React.ReactNode = () => {

        }
        
        return (
            <Box sx={{ width: '100%', maxHeight: '62vh' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} indicatorColor={'white'} textColor={"inherit"} aria-label="basic tabs example">
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
            <div className={styles['screen']}>
                <div className={styles['container']}>
                    <h2 className={'h2'}>TRANSACTIONS</h2>
                    <div className={styles['buttonContainer']}>
                        <Button className={styles['button']}>Add</Button>
                        <Button className={styles['button']}>Upload</Button>
                    </div>
                </div>
                {BasicTabs()}
            </div>
            
        </Layout>
    );
}

export default TransactionsPage;
