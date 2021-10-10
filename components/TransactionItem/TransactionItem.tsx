import styles from '../TransactionItem/TransactionItem.module.css';
import { ListItem, SvgIcon } from "@mui/material";
import Icon from '../../assets/Icon';
 
type TransactionItemProps = {
   date: Date,
   username: string,
   fid: string,
   admin: string,
   message: string,
   change: number
};
 
export const TransactionItem: React.FunctionComponent<TransactionItemProps> = ({
   date,
   username,
   fid,
   admin,
   message,
   change,
}) => {
   return (
       <ListItem className={styles['list-item']}>
           <div className={styles['date']}>{date.toLocaleDateString("en-US")}</div>
           <div className={styles['username']}>{username}</div>
           <div className={styles['fid']}>{fid}</div>
           <div className={styles['admin']}>{admin}</div>
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
