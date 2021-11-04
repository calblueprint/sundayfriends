import React, { useState, useEffect } from "react";
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
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Autocomplete,}
from "@mui/material";
import styles from './Transactions.module.css';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import Icon from '../../assets/Icon';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { getAllTransactions, addTransaction } from '../../firebase/firestore/transaction'; 
import { getAllUsers } from '../../firebase/firestore/user';
import { Transaction } from '../../types/schema';
 
const TransactionsPage: React.FunctionComponent = () => {
    const [addAnchorEl, setAddAnchorEl] = React.useState(null);
    const [uploadAnchorEl, setUploadAnchorEl] = React.useState(null);
    const [allUsers, setUsers] = React.useState([]);
    const [allTransactions, setTransactions] = useState([]);
    const [success, setSuccess] = useState(false);
    const [selectedUser, setSelectedUser] = useState('Select User')
    const [expanded, setExpanded] = useState(false);
    const [addUser, setAddUser] = useState(null);
    const [addPoints, setAddPoints] = useState('10');
    const [addType, setAddType] = useState('');
    const [addMessage, setAddMessage] = useState('');

    useEffect(() => {
        getAllUsers().then(users => {
            setUsers(users);
        })
        getAllTransactions().then(items => {
            setTransactions(items);
        })
    }, []);

    /*
    added this sleep function because handleClose function set success back to false before the anchor was set to null
    (meaning that the) popover would switch back to the first page before closing.
    The sleep makes this look cleaner, but let me know if there is a less hacky fix.
    */
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const clickAddButton = (event) => {
        setAddAnchorEl(event.currentTarget);
    };

    const clickUploadButton = (event) => {
        setUploadAnchorEl(event.currentTarget);
    }

    const handleExpand = () => {
        setExpanded(!expanded);
    }

    const selectAutocomplete = (value) => {
        setAddUser(value);
        if (value != null) {
            setSelectedUser(value.full_name);
        } else {
            setSelectedUser('Select User');
        }
        setExpanded(false);
    }

    const handleAddConfirm = () => {
        //handle post request
        const adding = {
            admin_name: 'current Admin',
            date: new Date(),
            description: addMessage,
            family_id: addUser.family_id,
            point_gain: addType == 'redeem' ? -parseInt(addPoints) : parseInt(addPoints),
            user_name: addUser.full_name,
        }
        addTransaction(adding as Transaction);

        setSuccess(true);
        
    }

    const handleAddMore = () => {
        resetFields();
        setSuccess(false);
    }

    const handleAddClose = () => {
        setAddAnchorEl(null);
        sleep(1000).then(() => {
            setSuccess(false);
            setAddUser(null);
        })
        resetFields();
    };

    const handleUploadClose = () => {
        setUploadAnchorEl(null);
    }

    const resetFields = () => {
        setSelectedUser('Select User');
        
        setAddPoints('10');
        setAddType('');
        setAddMessage('');
    }

    const handleUploadConfirm = () => {
        
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

   const addPopoverContent = () => {
       switch(success) {
           case true:
                return(
                    <div className={styles['success-div']}>
                        <p className={styles['success-title']}>Success!</p>
                        <p className={styles['success-message']}>Transaction for {addUser.full_name} has been added</p>
                        <div>
                            <Button className={styles['success-close-button']} onClick={handleAddClose}>Close</Button>
                            <Button className={styles['add-more-button']} onClick={handleAddMore}>Add More</Button>
                        </div>
                    </div>
                )
           case false:
               return(
                   <div className={styles['popover-div']}>
                       <div className={styles['popover-header']}>
                            <h3 className={styles['add-title']}>Add Transaction</h3>
                            <div className={styles['x-button']} onClick={handleAddClose}>
                                <Icon  type={"close"}></Icon>
                            </div>
                        </div>
                        <div>
                            <p className={styles['select-category']}>USER</p>
                            <Accordion expanded={expanded} onChange={handleExpand} disableGutters>
                                <AccordionSummary
                                expandIcon={<Icon className={styles['drop-triangle']} type={"dropTriangle"}></Icon>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={expanded ? styles['accordion-open'] : styles['accordion']}
                                >
                                <div>{selectedUser}</div>
                                </AccordionSummary>
                                <AccordionDetails style={{padding: '0px'}}>
                                    <Autocomplete
                                        onChange={(event, value) => selectAutocomplete(value)}
                                        id="country-select-demo"
                                        options={allUsers}
                                        autoHighlight
                                        getOptionLabel={(option) => option.full_name}
                                        size='small'
                                        forcePopupIcon={false}
                                        renderOption={(props, option) => (
                                            <Box component='li' sx={{ style:{backgroundColor: 'black' } }} {...props}>
                                                {option.full_name}
                                            </Box>
                                        )}
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
                                </AccordionDetails>
                            </Accordion>
                            
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
                                <RadioGroup row onChange={(e) => setAddType(e.target.value)}>
                                    <FormControlLabel value="redeem" control={<Radio />} label={<p className={styles['radio-label']}>Redeem</p>} />
                                    <FormControlLabel value="earn" control={<Radio />} label={<p className={styles['radio-label']}>Earn</p>} />
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
                        <Button className={styles['confirm-button']} onClick={handleAddConfirm}>
                            Confirm
                        </Button>
                   </div>
               )
       }
   }

   const uploadPopoverContent = () => {
    switch(success) {
        case true:
             return(
                 <div className={styles['success-div']}>
                     <p className={styles['success-title']}>Success!</p>
                     <p className={styles['success-message']}>Transaction for {addUser.full_name} has been added</p>
                     <div>
                         <Button className={styles['success-close-button']} onClick={handleAddClose}>Close</Button>
                         <Button className={styles['add-more-button']} onClick={handleAddMore}>Add More</Button>
                     </div>
                 </div>
             )
        case false:
            return(
                <div className={styles['popover-div']}>
                    <div className={styles['popover-header']}>
                         <h3 className={styles['add-title']}>Upload your file</h3>
                         <div className={styles['x-button']} onClick={handleUploadClose}>
                             <Icon  type={"close"}></Icon>
                         </div>
                     </div>
                     <p className={styles['upload-message']}>Selected file should be .csv</p>
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
                     <Button className={styles['confirm-button']} onClick={handleUploadConfirm}>
                         Upload
                     </Button>
                </div>
            )
         }
    }
    
   const addOpen = Boolean(addAnchorEl);
   const uploadOpen = Boolean(uploadAnchorEl);
   const popoverid = addOpen ? 'add-popover' : undefined;
   const uploadpopoverid = uploadOpen ? 'upload-popover' : undefined;
   return(
       <Layout title='Transactions'>
           <div className={styles['screen']}>
               <div className={styles['container']}>
                   <div className={styles['title-div']}>
                       <Icon className={styles['transaction-icon']} type={"transaction"}></Icon>
                       <h2 className={styles['h2']}>TRANSACTIONS</h2>
                   </div>
                   <div className={styles['button-container']}>
                       <Button aria-describedby={popoverid} className={styles['add-button']} onClick={clickAddButton}>
                           <Icon className={styles['add-icon']} type={"add"}></Icon>
                           Add
                       </Button>
                       <Button aria-describedby={uploadpopoverid} className={styles['upload-button']} onClick={clickUploadButton}>
                           <Icon className={styles['add-icon']} type={"upload"}></Icon>
                           Upload
                       </Button>
                   </div>
                   <Popover 
                        PaperProps={{className: styles['popover-container']}}
                        open={addOpen} 
                        id={popoverid}
                        anchorEl={addAnchorEl}
                        onClose={handleAddClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                            
                        {addPopoverContent()}
                    </Popover>
                    <Popover 
                        PaperProps={{className: styles['popover-container']}}
                        open={uploadOpen} 
                        id={uploadpopoverid}
                        anchorEl={uploadAnchorEl}
                        onClose={handleUploadClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                            
                        {uploadPopoverContent()} 
                    </Popover>
               </div>
               {BasicTabs()}
           </div>
          
       </Layout>
   );
}
 
export default TransactionsPage;
