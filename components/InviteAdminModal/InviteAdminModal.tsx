import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './InviteAdminModal.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Icon from "../../assets/Icon";

export default function InviteAdminModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#253C85',
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button className={styles['text']} variant="contained" style={{ textTransform: 'none' }} onClick={handleClickOpen}>
          Invite Admin
        </Button>
      </ThemeProvider>
      {/* <div className={styles['modal']}> */}
      <Dialog classes={{ paper: styles['modal'] }} maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
        {/* <DialogTitle>INVITE ADMINS</DialogTitle> */}

        <h2 className={styles['title']}>
          <Icon
            className={styles["invite-icon"]}
            type={"invite"}
          ></Icon>
          INVITE ADMINS
        </h2>
        {/* <DialogContent> */}
        {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText> */}
        <div className={styles['form']}>
          <div className={styles['row']}>
            <div className={styles['col']}>
              <h4 className={styles['text']}> FULL NAME *</h4>
            </div>
            <div className={styles['col']}>
              <h4 className={styles['text']}>EMAIL *</h4>
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
                className={styles['font']}
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
                className={styles['font']}
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
                className={styles['font']}
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
                className={styles['font']}
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
                className={styles['font']}
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
                className={styles['font']}
              />
            </div>
          </div>

        </div>
        <div className={styles['actions']}>
          <DialogActions>
            <ThemeProvider theme={theme}>
              <Button style={{ textTransform: 'none' }} className={styles['font']} variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button style={{ textTransform: 'none' }} className={styles['font']} variant="contained" onClick={handleClose}>Send Invites</Button>
            </ThemeProvider>
          </DialogActions>
        </div>
        {/* </DialogContent> */}
      </Dialog >
      {/* </div> */}
    </div >
  );
}