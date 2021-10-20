import React, { useState, useEffect } from 'react';
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
   MenuItem}
from "@mui/material";
import styles from './Transactions.module.css';
import itemstyles from '../../components/TransactionItem/TransactionItem.module.css';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import Icon from '../../assets/Icon';
import { Transaction } from '../../types/schema';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { getAllTransactions } from '../../firebase/firestore/transaction'; 
import { getAdmin } from '../../firebase/firestore/admin';
import { getUser } from '../../firebase/firestore/user';
 
const TransactionsPage: React.FunctionComponent = () => {
 
   const BasicTabs = () => {
       const [value, setValue] = useState(0);
       const [allTransactions, setTransactions] = useState([]);

       useEffect(() => {
            getAllTransactions().then(items => {
                for (let i = 0; i < items.length; i++) {
                    getUser(items[i].userId).then(item => {
                        items[i].userId = item.full_name;
                    })
                    getAdmin(items[i].adminId).then(item => {
                        items[i].adminId = item.full_name;
                    })
                }
                setTransactions(items);
            })
        }, []);
      
       const handleChange = (event, newValue) => {
           setValue(newValue);
       };

       const parseRedemptions = () => {
            const newTransactions = allTransactions;
            for (let i = 0; i < newTransactions.length; i++) {
                const trans = allTransactions[i];
                getUser(trans.userId).then(item => {
                    newTransactions
                })
                getAdmin(trans.adminId).then(item => {

                })
            }

            // for (let i = 0; i < items.length; i++) {
            //     getUser(items[i].userId).then(item => {
            //         items[i].userId = item.full_name;
            //     })
            //     getAdmin(items[i].adminId).then(item => {
            //         items[i].adminId = item.full_name;
            //     })
            // }
       }

       const renderFilterHeader = () => {
           return (
               <div className={styles['filter-row']}>
                   <div className={styles['date-range']}>
                       <Box className={styles['calendar-box']}>
                           <Icon className={styles['calendar-icon']} type={"calendar"}></Icon>
                       </Box>
                       <Box className={styles['date-display']}>
                           Sep 5 - Sep 12
                       </Box>
                       <Icon className={styles['chevron-left']} type={"chevronLeft"}></Icon>
                       <Icon className={styles['chevron-right']} type={"chevronRight"}></Icon>
                   </div>
                   <div className={styles['filters']}>
                       <FormControl className={styles['filter-select']} size="small">
                           <InputLabel className={styles['filter-label']}>Filters</InputLabel>
                           <Select variant="outlined"
                               className={styles['select']}
                               label="Filters"
                           >
                               <MenuItem>Keep it PG</MenuItem>
                           </Select>
                       </FormControl>
                   </div>
                   <Input disableUnderline={true} placeholder="Search for a transaction" className={styles['search-bar']}
                   endAdornment={
                       <Icon className={styles['search-icon']} type={"search"}></Icon>
                   }/>
               </div>
           )
       }
 
      
       return (
           <Box className={styles['transaction-container']}>
               <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {display: 'none'}}}
                textColor={"inherit"} aria-label="basic tabs example" className={styles['tabs']}>
                    <Tab label="History" className={value==0 ? styles['sel-tab'] : styles['tab']}/>
                    <Tab label="Redemptions" className={value==1 ? styles['sel-tab'] : styles['tab']}/>
                    <Tab label="Earnings" className={value==2 ? styles['sel-tab'] : styles['tab']}/>
                </Tabs>
               <TabPanel value={value} index={0}>
                   <div>
                       {renderFilterHeader()}
                       {console.log(allTransactions)}
                       <TransactionList tabIndex={0} transactions={allTransactions}/>
                   </div>
               </TabPanel>
               <TabPanel value={value} index={1}>
                   <div>
                       {renderFilterHeader()}
                        
                       <TransactionList tabIndex={1} transactions={allTransactions}/>
                   </div>
               </TabPanel>
               <TabPanel value={value} index={2}>
                   <div>
                       {renderFilterHeader()}
                       <TransactionList tabIndex={2} transactions={allTransactions}/>
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
                       <Icon className={styles['transaction-icon']} type={"transaction"}></Icon>
                       <h2 className={styles['h2']}>TRANSACTIONS</h2>
                   </div>
                   <div className={styles['button-container']}>
                       <Button className={styles['add-button']}>
                           <Icon className={styles['add-icon']} type={"add"}></Icon>
                           Add
                       </Button>
                       <Button className={styles['upload-button']}>
                           <Icon className={styles['add-icon']} type={"upload"}></Icon>
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
