import React, { useEffect, useState } from 'react';
import Icon from '../../assets/Icon';
import { Box } from '@mui/system';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import { SortTriangles } from '../SortTriangles/SortTriangles';
import { List } from '@mui/material';
import styles from '../TransactionList/TransactionList.module.css';
import itemstyles from '../TransactionItem/TransactionItem.module.css';
import { getAllTransactions, getPosTransactions, getNegTransactions } from '../../firebase/firestore/transaction';
import { Transaction } from '../../types/schema';

type TransactionListProps = {
    tabIndex: number,
    transactions: Transaction[];
};
 
export const TransactionList: React.FunctionComponent<TransactionListProps> = ({
    tabIndex, 
    transactions
}) => {
    // const [alltransactions, setTransactions] = useState([]);

    // useEffect(() => {
    //     if (tabIndex == 0) {
    //         getAllTransactions().then(items => {
    //             setTransactions(items);
    //         })
    //     } else if (tabIndex == 1) {
    //         getNegTransactions().then(items => {
    //             console.log(items);
    //             setTransactions(items);
    //         })
    //     } else if (tabIndex == 2) {
    //         getPosTransactions().then(items => {
    //             setTransactions(items)
    //         })
    //     }
        
    // }, []);

    const renderCategoryHeader = () => {
        return (
            <Box className={styles['section-header']}>
                <Box className={itemstyles['date']} id={styles['category']}>
                    <body id={styles['category-text']}>Date</body>
                    <SortTriangles/>
                </Box>
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
            </Box>
        )
    }

    const renderHistory = () => {

        return(
            <List className={styles['list']}>
                {
                    transactions.map((transaction) => {
                        return(
                            <TransactionItem date={transaction.date} userName={transaction.userId} fid={transaction.familyId}
                            adminName={transaction.adminId} message={transaction.description} change={transaction.pointGain}/>
                        )
                    })
                }
            </List>
        )
    }

   return (
       <div>
            {renderCategoryHeader()}
            {renderHistory()}
       </div>
        
   );
}
