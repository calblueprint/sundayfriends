import React, { useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { Grid, Button, Tabs, Tab, Box, SvgIcon, List, ListItem} from "@mui/material";
import Icon from '@mui/material/Icon';
import styles from './Transactions.module.css';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import addIcon from '../../public/plus_circle_outline.png';

const TransactionsPage: React.FunctionComponent = () => {

    const BasicTabs = () => {
        const [value, setValue] = React.useState(0);
        
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const renderFilterHeader = () => {
            return (
                <div className={styles['filter-row']}>
                    <div>
                        Sep 5 - Sep 12
                    </div>
                    <div>
                        Filters
                    </div>
                    <div>
                        Filter Name
                    </div>
                    <div>
                        Search
                    </div>
                </div>
            )
        }

        const renderCategoryHeader = () => {
            return (
                <div className={styles['section-header']}>
                    <div>Date</div>
                    <div>User</div>
                    <div>FID</div>
                    <div>Admin</div>
                    <div>Action</div>
                    <div>Message</div>
                    <div>Change</div>
                </div>
            )
        }

        const renderHistory = () => {
            return(
                <List className={styles['list']}>
                    <ListItem className={styles['list-item']}>
                        <div>09/01/21</div>
                        <div>Firstname Lastname</div>
                        <div>H1234</div>
                        <div>Firstname Lastname</div>
                        <div>Redeem</div>
                        <div>Short messaging</div>
                        <div>-10.00</div>
                    </ListItem>
                    <ListItem className={styles['list-item']}>
                        Hi Hello
                    </ListItem>
                    <ListItem className={styles['list-item']}>
                        Hi Hello
                    </ListItem>
                    <ListItem className={styles['list-item']}>
                        Hi Hello
                    </ListItem>
                </List>
            )
        }
        
        return (
            <Box sx={{ width: '100%', maxHeight: '62%'}}>
            <Box>
                <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {background: "white"}}} 
                textColor={"inherit"} aria-label="basic tabs example">
                <Tab label="History" className={value==0 ? styles['sel-tab'] : styles['tab']}/>
                <Tab label="Redemptions" className={value==1 ? styles['sel-tab'] : styles['tab']}/>
                <Tab label="Earnings" className={value==2 ? styles['sel-tab'] : styles['tab']}/>
                </Tabs>
            </Box>
                <TabPanel value={value} index={0}>
                    <div>
                        {renderFilterHeader()}
                        {renderCategoryHeader()}
                        {renderHistory()}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        {renderFilterHeader()}
                        {renderCategoryHeader()}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        {renderFilterHeader()}
                        {renderCategoryHeader()}
                    </div>
                </TabPanel>
            </Box>
        );
    }
      
    return(
        <Layout title='Transactions'>
            <div className={styles['screen']}>
                <div className={styles['container']}>
                    <h2 className={styles['h2']}>TRANSACTIONS</h2>
                    <div className={styles['button-container']}>
                        <Button className={styles['button']}>
                            Add
                        </Button>
                        <Button className={styles['button']}>
                            Upload
                        </Button>
                    </div>
                </div>
                {BasicTabs()}
            </div>
            
        </Layout>
    );
}

export default TransactionsPage;
