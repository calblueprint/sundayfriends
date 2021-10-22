import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './InviteAdminModal.module.css';

export default function InviteAdminModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={styles['button']} onClick={handleClickOpen}>
        INVITE ADMIN
      </Button>
      {/* <div className={styles['modal']}> */}
      <Dialog classes={{ paper: styles['modal'] }} maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
        {/* <DialogTitle>INVITE ADMINS</DialogTitle> */}
        <h2 className={styles['title']}>INVITE ADMINS</h2>
        {/* <DialogContent> */}
        {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText> */}
        <div className={styles['form']}>
          <div className={styles['row']}>
            <div className={styles['col']}>
              <h4>FULL NAME *</h4>
            </div>
            <div className={styles['col']}>
              <h4>EMAIL *</h4>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['col']}>
              <TextField
                fullWidth
                autoFocus
                margin="dense"
                id="name"
                placeholder="Firstname Lastname"
                type="text"
                variant="standard"
              />
            </div>
            <div className={styles['col']}>
              <TextField
                fullWidth
                autoFocus
                margin="dense"
                id="name"
                placeholder="thisisanemail@email.com"
                type="text"
                variant="standard"
              />
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['col']}>
              <TextField
                fullWidth
                autoFocus
                margin="dense"
                id="name"
                placeholder="Firstname Lastname"
                type="text"
                variant="standard"
              />
            </div>
            <div className={styles['col']}>
              <TextField
                fullWidth
                autoFocus
                margin="dense"
                id="name"
                placeholder="thisisanemail@email.com"
                type="text"
                variant="standard"
              />
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['col']}>
              <TextField
                fullWidth
                autoFocus
                margin="dense"
                id="name"
                // label="Full Name"
                placeholder="Firstname Lastname"
                type="text"
                variant="standard"
              />
            </div>
            <div className={styles['col']}>
              <TextField
                fullWidth
                autoFocus
                margin="dense"
                id="name"
                // label="Full Name"
                placeholder="thisisanemail@email.com"
                type="text"
                variant="standard"
              />
            </div>
          </div>

        </div>
        <div className={styles['actions']}>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" className={styles['edit']} onClick={handleClose}>Send Invites</Button>
          </DialogActions>
        </div>
        {/* </DialogContent> */}
      </Dialog >
      {/* </div> */}
    </div >
  );
}