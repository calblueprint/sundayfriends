import React, { useState, useRef } from "react";
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
import emailjs from "emailjs-com";

// export const SortTriangles: React.FunctionComponent = () => {
export const InviteAdminModal: React.FunctionComponent = () => {
  // export default function InviteAdminModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const useStyles = makeStyles({
  //   iconStyle: {
  //     fontSize: 14,
  //     fontWeight: 800,
  //   },
  // });

  const removeRow = (i) => {
    unregister("invite." + i);
    unregister("invite." + i);
    setCount(count - 1);

    setInvites(invites.filter((j) => j != i));
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Avenir",
    },
    palette: {
      primary: {
        main: "#253C85",
      },
    },
  });

  const sendEmail = (templateParams) => {
    emailjs
      .send(
        "service_o683bxk",
        "template_2db4zzm",
        templateParams,
        "user_jlv6FzwqKDExG2SkcZmga"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.status, result.text);
        }
        // (error) => {
        //   console.log(error.text);
        // }
      );
  };

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

  // const onSubmit = (data) => {}
  const onSubmit = (data) => {
    // alert to display input data
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    // add user to firebase
    // (works but commented out because I don't want to spam firebase every time i test
    data["invite"].map((inv) => {
      const invite: AdminInvite = {
        email: inv.email,
        full_name: inv.name,
        valid: true,
      };
      addAdminInvite(invite);
      const templateParams = { email: inv.email, name: inv.name };
      sendEmail(templateParams);
    });
    reset();
    setCount(1);
    setInvites([0]);
  };

  const addRow = () => {
    setCount(count + 1);
    setInvites([...invites, count]);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          style={{ textTransform: "none" }}
          onClick={handleClickOpen}
        >
          Invite Admin
        </Button>

        <Dialog
          classes={{ paper: count < 3 ? styles["modal"] : styles["modal2"] }}
          maxWidth="md"
          fullWidth={true}
          open={open}
          onClose={handleClose}
        >
          <h2 className={styles["title"]}>
            <Icon className={styles["invite-icon"]} type={"invite"}></Icon>
            INVITE ADMINS
          </h2>

          <form id="inviteForm" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["box"]}>
              <div className={styles["form"]}>
                <div className={styles["row"]}>
                  <div className={styles["col"]}>
                    <p className={styles["label"]}> Full Name *</p>
                  </div>
                  <div className={styles["col"]}>
                    <p className={styles["label"]}>Email *</p>
                  </div>
                </div>

                {invites.map((i) => (
                  <div key={i} className={styles["row"]}>
                    <div className={styles["col"]}>
                      <TextField
                        inputProps={{ style: { fontSize: 14 } }}
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
                        inputProps={{ style: { fontSize: 14 } }}
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
                <div className={styles["row"]} />
                <IconButton
                  variant="contained"
                  onClick={addRow}
                  className={styles["add"]}
                >
                  <Icon type={"inviteAdd"} className={styles["addIcon"]} />
                  New Invitation
                </IconButton>
              </div>
            </div>
            <div className={styles["actions"]}>
              <DialogActions>
                <ThemeProvider theme={theme}>
                  <Button
                    style={{ textTransform: "none" }}
                    className={styles["buttons"]}
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={styles["buttons"]}
                    variant="contained"
                    onClick={handleClose}
                  >
                    Send Invites
                  </Button>
                </ThemeProvider>
              </DialogActions>
            </div>
          </form>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};
