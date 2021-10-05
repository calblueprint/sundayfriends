import React, { useState } from 'react';
import Layout from "../../components/Layout/Layout";
import { Button, 
    Tabs, 
    Tab, 
    Box, 
    List, 
    Input, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    SvgIcon} 
from "@mui/material";
import Icon from '@mui/material/Icon';
import styles from './Transactions.module.css';
import itemstyles from '../../components/TransactionItem/TransactionItem.module.css';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';
import { SortTriangles } from '../../components/SortTriangles/SortTriangles';
import chevronleft from '../../public/Vector 13.svg';

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
                        <Box className={styles['temp-icon']}></Box>
                        <Box className={styles['date-display']}>
                            Sep 5 - Sep 12
                        </Box>
                        <SvgIcon viewBox="0, 0, 8, 13" className={styles['chevron-left']}>
                            <path d="M6.5 1L1 6.19444L6.5 12" stroke="#253C85" stroke-width="1.57143" stroke-linecap="round" stroke-linejoin="round"/>
                        </SvgIcon>
                        <SvgIcon viewBox="0, 0, 8, 13" className={styles['chevron-right']}>
                            <path d="M1 1L6.5 6.19444L1 12" stroke="#253C85" stroke-width="1.57143" stroke-linecap="round" stroke-linejoin="round"/>
                        </SvgIcon>
                    </div>
                    <div className={styles['filters']}>
                        <FormControl className={styles['filter-select']} size="small">
                            <InputLabel className={styles['filter-label']}>Filters</InputLabel>
                            <Select variant="outlined"
                                className={styles['select']}
                                label="Filters"
                            >
                                <MenuItem>Butt</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Input disableUnderline={true} placeholder="Search for a transaction" className={styles['search-bar']}
                    endAdornment={
                        <SvgIcon viewBox="0, 0, 16, 16" className={styles['search-icon']}>
                            <path d="M12.4512 13.0713L8.64124 9.26066C6.94635 10.4656 4.61086 10.1709 3.26849 
                            8.58261C1.92611 6.99433 2.02468 4.64239 3.49524 3.17199C4.96541 1.70096 7.31759 
                            1.60196 8.90617 2.94427C10.4947 4.28658 10.7897 6.62229 9.58457 8.31733L13.3946 
                            12.128L12.4519 13.0707L12.4512 13.0713ZM6.32324 3.33332C5.05904 3.33303 3.96837 
                            4.22044 3.71156 5.45828C3.45474 6.69612 4.10238 7.94418 5.26236 8.44682C6.42234 
                            8.94946 7.77584 8.56855 8.5034 7.53469C9.23096 6.50084 9.13262 5.0982 8.26791 
                            4.17599L8.67124 4.57599L8.21657 4.12266L8.20857 4.11466C7.70976 3.61278 7.03084 
                            3.33141 6.32324 3.33332Z" fill="#A9A9A9"/>
                        </SvgIcon>
                    }/>
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
            {date: new Date(), username: 'Jacob Kim', fid: '431', admin: 'Cindy Zhang', message: 'Jacob > Cindy', change: -10},
            {date: new Date(), username: 'bababooey', fid: '123', admin: 'Espinosa Dad', message: 'im not drunk i swear i am not i really am not i swera to god not drunk oh look its two lines and it looks good!', change: -10}
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
                    <div className={styles['title-div']}>
                        <SvgIcon viewBox="0, 0, 35, 35" className={styles['transaction-icon']}>
                        <path d="M13.1251 29.1667L5.83342 23.3333L13.1251 17.5V21.875H32.0834V24.7917H13.1251V29.1667ZM21.8751 
                        17.5V13.125H2.91675V10.2083H21.8751V5.83334L29.1668 11.6667L21.8751 17.5Z" fill="#253C85"/>
                        </SvgIcon>
                        <h2 className={styles['h2']}>TRANSACTIONS</h2>
                    </div>
                    <div className={styles['button-container']}>
                        <Button className={styles['add-button']}>
                            <SvgIcon viewBox="0, 0, 16, 17" className={styles['add-icon']}>
                                <path d="M8.00016 15.1666C4.31826 15.1666 1.3335 12.1819 1.3335 8.49998C1.3335 
                                4.81808 4.31826 1.83331 8.00016 1.83331C11.6821 1.83331 14.6668 4.81808 14.6668 
                                8.49998C14.6628 12.1802 11.6804 15.1626 8.00016 15.1666ZM2.66683 8.61465C2.69837 
                                11.5488 5.09423 13.9063 8.02852 13.8906C10.9628 13.8748 13.3332 11.4916 13.3332 8.55731C13.3332 
                                5.62298 10.9628 3.23983 8.02852 3.22398C5.09423 3.20828 2.69837 5.56582 2.66683 8.49998V8.61465ZM8.66683 
                                11.8333H7.3335V9.16665H4.66683V7.83331H7.3335V5.16665H8.66683V7.83331H11.3335V9.16665H8.66683V11.8333Z" 
                                fill="white"/>
                            </SvgIcon>
                            Add
                        </Button>
                        <Button className={styles['upload-button']}>
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
