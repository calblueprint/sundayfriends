import styles from '../AdminItem/AdminItem.module.css';
import { ListItem, SvgIcon } from "@mui/material";

type AdminItemProps = {
    name: string,
    role: string,
    email: string,
    phone: string
};

export const AdminItem: React.FunctionComponent<AdminItemProps> = ({
    name,
    role,
    email,
    phone,
}) => {
    return (
        <ListItem className={styles['list-item']}>
            <div className={styles['name']}>{name}</div>
            <div className={styles['role']}>{role}</div>
            <div className={styles['email']}>{email}</div>
            <div className={styles['phone']}>{phone}</div>
            <div className={styles['buttons']}>
                <div className={styles['action']}>Delete</div>
                <div className={styles['action2']}>Reset Password</div>
                <div className={styles['action3']}>Edit</div>
            </div>
        </ListItem>
    );
}