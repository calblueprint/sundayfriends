import styles from '../TransactionItem/TransactionItem.module.css';
import { ListItem, SvgIcon } from "@mui/material";
 
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
               <SvgIcon viewBox="0, 0, 12, 14" className={styles['trash-icon']}>
                   <path d="M9.33333 13.6667H2.66667C1.93029 13.6667 1.33333 13.0697 1.33333
                   12.3333V3.66668H0V2.33334H2.66667V1.66668C2.66667 0.930297 3.26362 0.333344
                   4 0.333344H8C8.73638 0.333344 9.33333 0.930297 9.33333 1.66668V2.33334H12V3.66668H10.6667V12.3333C10.6667
                   13.0697 10.0697 13.6667 9.33333 13.6667ZM2.66667 3.66668V12.3333H9.33333V3.66668H2.66667ZM4
                   1.66668V2.33334H8V1.66668H4ZM8 11H6.66667V5.00001H8V11ZM5.33333 11H4V5.00001H5.33333V11Z" fill="#525454"/>
               </SvgIcon>
           </div>
       </ListItem>
   );
}
