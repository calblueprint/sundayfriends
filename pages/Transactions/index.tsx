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
   MenuItem,
   Popover,
   TextField,
   RadioGroup,
   FormControlLabel,
   Radio,
   Autocomplete,}
from "@mui/material";
import styles from './Transactions.module.css';
import itemstyles from '../../components/TransactionItem/TransactionItem.module.css';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import Icon from '../../assets/Icon';
import { Transaction } from '../../types/schema';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { getAllTransactions } from '../../firebase/firestore/transaction'; 
import { getAllUsers } from '../../firebase/firestore/user';
 
const TransactionsPage: React.FunctionComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [allUsers, setUsers] = React.useState([]);
    const [allTransactions, setTransactions] = useState([]);
    const [success, setSuccess] = useState(false);
    const [addUser, setAddUser] = useState('');
    const [addPoints, setAddPoints] = useState('');
    const [addSign, setAddSign] = useState('');
    const [addMessage, setAddMessage] = useState('');

    useEffect(() => {
        getAllUsers().then(users => {
            setUsers(users);
        })
        getAllTransactions().then(items => {
            setTransactions(items);
        })
    }, []);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleConfirm = () => {
        //handle post request
        console.log(addMessage);
        setSuccess(true);
        
    }

    const handleAddMore = () => {
        resetFields();
        setSuccess(false);
    }

    const handleClose = () => {
        setAnchorEl(null);
        sleep(1000).then(() => {
            setSuccess(false);
        })
        resetFields();
    };

    const resetFields = () => {
        setAddUser('');
        setAddPoints('');
        setAddSign('');
        setAddMessage('');
    }
 
   const BasicTabs = () => {
       const [value, setValue] = useState(0);
      
       const handleChange = (event, newValue) => {
           setValue(newValue);
       };

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
 
       const redemptions = allTransactions.filter(transaction => transaction.point_gain < 0);
       const earnings = allTransactions.filter(transaction => transaction.point_gain >= 0);
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
                       <TransactionList transactions={allTransactions}/>
                   </div>
               </TabPanel>
               <TabPanel value={value} index={1}>
                   <div>
                       {renderFilterHeader()}
                       <TransactionList transactions={redemptions}/>
                   </div>
               </TabPanel>
               <TabPanel value={value} index={2}>
                   <div>
                       {renderFilterHeader()}
                       <TransactionList transactions={earnings}/>
                   </div>
               </TabPanel>
           </Box>
       );
   }

   const popoverContent = () => {
       switch(success) {
           case true:
                return(
                    <div className={styles['success-div']}>
                        <p className={styles['success-title']}>Success!</p>
                        <p className={styles['success-message']}>Transaction for {addUser} has been added</p>
                        <div>
                            <Button className={styles['success-close-button']} onClick={handleClose}>Close</Button>
                            <Button className={styles['add-more-button']} onClick={handleAddMore}>Add More</Button>
                        </div>
                    </div>
                )
           case false:
               return(
                   <div className={styles['popover-div']}>
                       <div className={styles['popover-header']}>
                            <h3 className={styles['add-title']}>Add Transaction</h3>
                            <div className={styles['x-button']} onClick={handleClose}>
                                <Icon  type={"close"}></Icon>
                            </div>
                        </div>
                        <div>
                            <p className={styles['select-category']}>USER</p>
                            <Autocomplete
                                id="country-select-demo"
                                sx={{ width: 300 }}
                                options={allUsers}
                                autoHighlight
                                getOptionLabel={(option) => option.full_name}
                                size='small'
                                // renderOption={(props, option) => (
                                //     <Box component="li" {...props}>
                                //         {option.full_name}
                                //     </Box>
                                // )}
                                renderInput={(params) => (
                                    <TextField
                                    className= {styles['autocomplete-text-field']}
                                    {...params}
                                    label="Select User"
                                    InputLabelProps={{
                                        className: styles['autocomplete-input']
                                    }}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles['amount-action']}>
                            <div id={styles['amount']}>
                                <p className={styles['select-category']}>AMOUNT</p>
                                <TextField
                                    className={styles['amount-field']}
                                    rows={1}
                                    defaultValue="10"
                                    variant="standard"
                                    type='number'
                                    onChange={(e) => setAddPoints(e.target.value)}
                                />
                            </div>
                            <div id={styles['action']}>
                                <p className={styles['select-category']}>ACTION</p>
                                <RadioGroup row>
                                    <FormControlLabel value="female" control={<Radio />} label={<p className={styles['radio-label']}>Redeem</p>} />
                                    <FormControlLabel value="male" control={<Radio />} label={<p className={styles['radio-label']}>Earn</p>} />
                                </RadioGroup>
                            </div>
                        </div>
                        <div>
                            <p className={styles['select-category']}>MESSAGE</p>
                            <TextField
                                className={styles['message-field']}
                                multiline
                                rows={2}
                                placeholder="Explain how user redeemed or earned credits (max 100 characters)"
                                variant="standard"
                                inputProps={{maxLength: 100, className: styles['message-field-input']}}
                                onChange={(e) => setAddMessage(e.target.value)}
                                />
                        </div>
                        <Button className={styles['confirm-button']} onClick={handleConfirm}>
                            Confirm
                        </Button>
                   </div>
               )
       }
   }
    
   const addOpen = Boolean(anchorEl);
   const popoverid = addOpen ? 'simple-popover' : undefined;
   return(
       <Layout title='Transactions'>
           <div className={styles['screen']}>
               <div className={styles['container']}>
                   <div className={styles['title-div']}>
                       <Icon className={styles['transaction-icon']} type={"transaction"}></Icon>
                       <h2 className={styles['h2']}>TRANSACTIONS</h2>
                   </div>
                   <div className={styles['button-container']}>
                       <Button aria-describedby={popoverid} className={styles['add-button']} onClick={handleClick}>
                           <Icon className={styles['add-icon']} type={"add"}></Icon>
                           Add
                       </Button>
                       <Button className={styles['upload-button']}>
                           <Icon className={styles['add-icon']} type={"upload"}></Icon>
                           Upload
                       </Button>
                   </div>
                   <Popover 
                        PaperProps={{className: styles['popover-container']}}
                        open={addOpen} 
                        id={popoverid}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                            
                        {popoverContent()}
                            
                    </Popover>
               </div>
               {BasicTabs()}
           </div>
          
       </Layout>
   );
}
 
export default TransactionsPage;
