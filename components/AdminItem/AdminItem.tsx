import styles from '../AdminItem/AdminItem.module.css';
import { ListItem, SvgIcon, Button } from "@mui/material";

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
                <Button className={styles['delete']}>Delete</Button>
                <Button className={styles['reset']}>Reset Password</Button>
                <Button className={styles['edit']}>Edit</Button >
            </div>
        </ListItem>
    );
}