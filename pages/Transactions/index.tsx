import React, { useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { Button, Tabs, Tab, Box, List, Input, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import Icon from '@mui/material/Icon';
import styles from './Transactions.module.css';
import itemstyles from '../../components/TransactionItem/TransactionItem.module.css';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import addIcon from '../../public/plus_circle_outline.png';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';
import { SortTriangles } from '../../components/SortTriangles/SortTriangles';

const TransactionsPage: React.FunctionComponent = () => {

    const BasicTabs = () => {
        const [value, setValue] = React.useState(0);
        
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const renderFilterHeader = () => {
            return (
                <div className={styles['filter-row']}>
                    <div className={styles['date-range']}>
                        <Box>
                            Sep 5 - Sep 12
                        </Box>
                        arrows
                    </div>
                    <div className={styles['filters']}>
                        <FormControl className={styles['filter-select']} size="small">
                            <InputLabel className={styles['input-label']}>Filters</InputLabel>
                            <Select variant="outlined"
                                className={styles['select']}
                                label="Filters"
                            >
                                <MenuItem>Butt</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Input disableUnderline={true} placeholder="Search for a transaction" className={styles['search-bar']}></Input>
                </div>
            )
        }

        const renderCategoryHeader = () => {
            return (
                <div className={styles['section-header']}>
                    <div className={itemstyles['date']} id={styles['category']}>
                        <body id={styles['category-text']}>Date</body>
                        <SortTriangles/>
                    </div>
                    <div className={itemstyles['username']} id={styles['category']}>
                        <body id={styles['category-text']}>User</body>
                        <SortTriangles/>
                    </div>
                    <div className={itemstyles['fid']} id={styles['category']}>
                        <body id={styles['category-text']}>Fid</body>
                        <SortTriangles/>
                    </div>
                    <div className={itemstyles['admin']} id={styles['category']}>
                        <body id={styles['category-text']}>Admin</body>
                        <SortTriangles/>
                    </div>
                    <div className={itemstyles['action']} id={styles['category']}>
                        <body id={styles['category-text']}>Action</body>
                        <SortTriangles/>
                    </div>
                    <div className={itemstyles['message']} id={styles['category-text']}>Message</div>
                    <div className={itemstyles['change']} id={styles['category-text']}>Change</div>
                </div>
            )
        }

        const temp = [
            {date: new Date(), username: 'Firstname Lastname', fid: 'H1234', admin: 'Firstname Lastname', message: 'short messaging explaining what the transaction was', change: 10},
            {date: new Date(), username: 'Jacob Kim', fid: '431', admin: 'Cindy Zhang', message: 'Jacob > Cindy', change: -10}
        ]

        const renderHistory = () => {

            return(
                <List className={styles['list']}>
                    {
                        temp.map((transaction) => {
                            return(
                                <TransactionItem date={transaction.date} username={transaction.username} fid={transaction.fid}
                                admin={transaction.admin} message={transaction.message} change={transaction.change}/>
                            )
                        })
                    }
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
                        {renderHistory()}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        {renderFilterHeader()}
                        {renderCategoryHeader()}
                        {renderHistory()}
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
