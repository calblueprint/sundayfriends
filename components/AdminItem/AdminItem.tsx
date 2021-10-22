import styles from '../AdminItem/AdminItem.module.css';
<<<<<<< HEAD
import { ListItem, SvgIcon } from "@mui/material";
=======
import { ListItem, SvgIcon, Button } from "@mui/material";
>>>>>>> main

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
<<<<<<< HEAD
                <div className={styles['action']}>Delete</div>
                <div className={styles['action2']}>Reset Password</div>
                <div className={styles['action3']}>Edit</div>
=======
                <Button className={styles['delete']}>Delete</Button>
                <Button className={styles['reset']}>Reset Password</Button>
                <Button className={styles['edit']}>Edit</Button >
>>>>>>> main
            </div>
        </ListItem>
    );
}