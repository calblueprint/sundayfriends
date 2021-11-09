import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import styles from "./InviteAdminModal.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Icon from "../../assets/Icon";
import { addAdminInvite } from "../../firebase/firestore/invite_admin";
import { AdminInvite } from "../../types/schema";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function InviteAdminModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function removeRow(i) {
    unregister("invite." + i);
    unregister("invite." + i);

    setInvites(invites.filter((j) => j != i));
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#253C85",
      },
    },
  });

  const [invites, setInvites] = useState([0]);
  const [count, setCount] = useState(1);

  const validationSchema = Yup.object().shape({
    invites: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Email is Invalid")
          .required("Email is required"),
      })
    ),
  });

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data) {
    // alert to display input data
    // reset();
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    // add user to firebase
    // (works but commented out because I don't want to spam firebase every time i test
    // data["invite"].map((inv) => {
    //   const invite: AdminInvite = {
    //     email: inv.email,
    //     full_name: inv.name,
    //     valid: true,
    //   };
    //   addAdminInvite(invite);
    // });
    reset();
    setCount(1);
    setInvites([0]);
  }

  function addRow() {
    setCount(count + 1);
    setInvites([...invites, count]);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          className={styles["text"]}
          variant="contained"
          style={{ textTransform: "none" }}
          onClick={handleClickOpen}
        >
          Invite Admin
        </Button>
      </ThemeProvider>
      <Dialog
        classes={{ paper: styles["modal"] }}
        maxWidth="md"
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <h2 className={styles["title"]}>
          <Icon className={styles["invite-icon"]} type={"invite"}></Icon>
          INVITE ADMINS
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["box"]}>
            <div className={styles["form"]}>
              <div className={styles["row"]}>
                <div className={styles["col"]}>
                  <h4 className={styles["text"]}> FULL NAME *</h4>
                </div>
                <div className={styles["col"]}>
                  <h4 className={styles["text"]}>EMAIL *</h4>
                </div>
              </div>

              {invites.map((i) => (
                <div key={i} className={styles["row"]}>
                  <div className={styles["col"]}>
                    <TextField
                      name={"invite." + i + ".name"}
                      fullWidth
                      autoFocus
                      margin="dense"
                      placeholder="Firstname Lastname"
                      type="text"
                      variant="standard"
                      className={styles["text"]}
                      {...register("invite." + i + ".name", {
                        required: true,
                        maxLength: 5,
                      })}
                    />
                  </div>
                  <div className={styles["col"]}>
                    <TextField
                      name={"invite." + i + ".email"}
                      fullWidth
                      autoFocus
                      margin="dense"
                      placeholder="thisisanemail@email.com"
                      type="text"
                      variant="standard"
                      className={styles["text"]}
                      {...register("invite." + i + ".email")}
                    />
                  </div>

                  {i != 0 && (
                    <IconButton
                      variant="contained"
                      onClick={() => removeRow(i)}
                    >
                      <Icon type={"inviteTrash"} />
                    </IconButton>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles["actions"]}>
            <DialogActions>
              <ThemeProvider theme={theme}>
                <Button
                  style={{ textTransform: "none" }}
                  className={styles["font"]}
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={styles["font"]}
                  variant="contained"
                  onClick={handleClose}
                >
                  Send Invites
                </Button>
                <Button
                  className={styles["font"]}
                  variant="contained"
                  onClick={addRow}
                >
                  Add Row
                </Button>
              </ThemeProvider>
            </DialogActions>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
