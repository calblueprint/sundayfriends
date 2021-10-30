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

  const [state, setState] = React.useState({
    name1: "",
    email1: "",
    name2: "",
    email2: "",
    name3: "",
    email3: "",
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#253C85',
      },
    },
  });

  // const adminRow = (num) => {
  //   return (
  //     <div className={styles['row']}>
  //       <div className={styles['col']}>
  //         <TextField
  //           name="name1"
  //           value={state.name1}
  //           onChange={handleChange}
  //           fullWidth
  //           autoFocus
  //           margin="dense"
  //           id="name"
  //           placeholder="Firstname Lastname"
  //           type="text"
  //           variant="standard"
  //           className={styles['font']}
  //         />
  //       </div>
  //       <div className={styles['col']}>
  //         <TextField
  //           name="email1"
  //           value={state.email1}
  //           onChange={handleChange}
  //           fullWidth
  //           autoFocus
  //           margin="dense"
  //           id="name"
  //           placeholder="thisisanemail@email.com"
  //           type="text"
  //           variant="standard"
  //           className={styles['font']}
  //         />
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button className={styles['text']} variant="contained" style={{ textTransform: 'none' }} onClick={handleClickOpen}>
          Invite Admin
        </Button>
      </ThemeProvider>
      <Dialog classes={{ paper: styles['modal'] }} maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>

        <h2 className={styles['title']}>
          <Icon
            className={styles["invite-icon"]}
            type={"invite"}
          ></Icon>
          INVITE ADMINS
        </h2>
        <div className={styles['form']}>
          <div className={styles['row']}>
            <div className={styles['col']}>
              <h4 className={styles['text']}> FULL NAME *</h4>
            </div>
            <div className={styles['col']}>
              <h4 className={styles['text']}>EMAIL *</h4>
            </div>
          </div>
          {/* {adminRow(1)}
          {adminRow(2)}
          {adminRow(3)} */}
          <div className={styles['row']}>
            <div className={styles['col']}>
              <TextField
                name="name1"
                value={state.name1}
                onChange={handleChange}
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
                name="email1"
                value={state.email1}
                onChange={handleChange}
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
                name="name2"
                value={state.name2}
                onChange={handleChange}
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
                name="email2"
                value={state.email2}
                onChange={handleChange}
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
                name="name3"
                value={state.name3}
                onChange={handleChange}
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
                name="email3"
                value={state.email3}
                onChange={handleChange}
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

        </div>
        <div className={styles['actions']}>
          <DialogActions>
            <ThemeProvider theme={theme}>
              <Button style={{ textTransform: 'none' }} className={styles['font']} variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button style={{ textTransform: 'none' }} className={styles['font']} variant="contained" onClick={handleClose}>Send Invites</Button>
            </ThemeProvider>
          </DialogActions>
        </div>
      </Dialog >
    </div >
  );
}