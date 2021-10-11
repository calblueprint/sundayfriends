import React, { useState, useEffect } from 'react';
import styles from '../TransactionItem/TransactionItem.module.css';
import { ListItem} from "@mui/material";
import Icon from '../../assets/Icon';
import { Timestamp } from '@firebase/firestore';
import { getAdmin } from '../../firebase/firestore/admin';
import { Admin, User } from '../../types/schema';
import { getUser } from '../../firebase/firestore/user';

type TransactionItemProps = {
   date: Date,
   userId: string,
   fid: string,
   adminId: string,
   message: string,
   change: number
};
 
export const TransactionItem: React.FunctionComponent<TransactionItemProps> = ({
   date,
   userId,
   fid,
   adminId,
   message,
   change,
}) => {
    const [userName, setUserName] = useState("username not found");
    const [adminName, setAdminName] = useState("adminname not found");

    useEffect(() => {
        getUser(userId).then(item => {
            console.log(item);
            setUserName(item.full_name);
        })
        getAdmin(adminId).then(item => {
            console.log(item);
            setAdminName(item.full_name);
        })
    });

   return (
       <ListItem className={styles['list-item']}>
           <div className={styles['date']}>{new Date(date.seconds * 1000).toLocaleDateString("en-US")}</div>
           <div className={styles['username']}>{userName}</div>
           <div className={styles['fid']}>{fid}</div>
           <div className={styles['admin']}>{adminName}</div>
           <div className={styles['action']}>
               {
                   change>0?
                   <div className={styles['earn-action']}>Earn</div>:
                   <div className={styles['redeem-action']}>Redeem</div>
               }
           </div>
           <div className={styles['message']}>{message}</div>
           {
               change>0?
               <div className={styles['pos-change']}>{"+ " + change.toFixed(2)}</div>:
               <div className={styles['neg-change']}>{"- " + Math.abs(change).toFixed(2)}</div>
           }
           <div className={styles['trash']}>
                <Icon className={styles['trash-icon']} type={"trash"}></Icon>
           </div>
       </ListItem>
   );
}
