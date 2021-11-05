import React, { useState } from "react";
import Button from "@mui/material/Button";
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

  const removeRow = () => {
    unregister("invite." + (count - 1));
    unregister("invite." + (count - 1));
    setCount(count - 1);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#253C85",
      },
    },
  });

  const [count, setCount] = useState(1);

  const validationSchema = Yup.object().shape({
    invite: Yup.array().of(
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
    // display form data on success
    alert("hello");
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    // data["invite"].map((inv) => {
    //   const invite: AdminInvite = {
    //     email: inv.email,
    //     full_name: inv.name,
    //     valid: true,
    //   };
    //   addAdminInvite(invite);
    // });
  }

  function inviteNumbers() {
    return Array.from(Array(count).keys());
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
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
          <div className={styles["form"]}>
            <div className={styles["row"]}>
              <div className={styles["col"]}>
                <h4 className={styles["text"]}> FULL NAME *</h4>
              </div>
              <div className={styles["col"]}>
                <h4 className={styles["text"]}>EMAIL *</h4>
              </div>
            </div>

            {inviteNumbers().map((i) => (
              <div className={styles["row"]}>
                <div className={styles["col"]}>
                  <TextField
                    name={"invite." + i + ".name"}
                    fullWidth
                    autoFocus
                    margin="dense"
                    placeholder="Firstname Lastname"
                    type="text"
                    variant="standard"
                    className={styles["font"]}
                    // {...register("name" + i)}
                    {...register("invite." + i + ".name", {
                      required: true,
                      maxLength: 5,
                    })}
                  />
                  {/* <p>hello</p> */}
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
                    className={styles["font"]}
                    // {...register("email" + i)}
                    {...register("invite." + i + ".email")}
                  />
                </div>
              </div>
            ))}
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
                  onClick={() => setCount(count + 1)}
                >
                  Add Row
                </Button>
                <Button
                  className={styles["font"]}
                  variant="contained"
                  onClick={removeRow}
                >
                  Remove Row
                </Button>
              </ThemeProvider>
            </DialogActions>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
