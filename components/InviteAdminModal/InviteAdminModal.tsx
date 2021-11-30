import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import styles from "./InviteAdminModal.module.css";
import Icon from "../../assets/Icon";
import { addAdminInvite } from "../../firebase/firestore/invite_admin";
import { AdminInvite } from "../../types/schema";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { service_id, template_id, user_id } from "../../constants/constants";

type InviteAdminModalProps = {
  open: boolean;
  setOpen: React.Dispatch<any>;
  sent: boolean;
  setSent: React.Dispatch<any>;
};

export const InviteAdminModal: React.FunctionComponent<InviteAdminModalProps> =
  ({ open, setOpen, sent, setSent }: InviteAdminModalProps) => {
    const handleClose = () => {
      // setSent(false);
      setOpen(false);
    };

    const removeRow = (i) => {
      unregister("invite." + i);
      unregister("invite." + i);
      setCount(count - 1);

      setInvites(invites.filter((j) => j != i));
    };

    const sendEmail = async (templateParams) => {
      await emailjs.send(service_id, template_id, templateParams, user_id);
    };

    const [invites, setInvites] = useState([0]);
    const [count, setCount] = useState(1);

    const {
      register,
      unregister,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
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
      setSent(true);
    };

    const addRow = () => {
      setCount(count + 1);
      setInvites([...invites, count]);
    };

    const renderForm = () => {
      return (
        <div>
          <IconButton className={styles["close"]} onClick={() => handleClose()}>
            <Icon type={"ex"} />
          </IconButton>
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
                    <div
                      className={
                        errors.invite?.[i]?.name
                          ? styles["errorCol"]
                          : styles["col"]
                      }
                    >
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
                        })}
                      />
                      {errors.invite?.[i]?.name?.type === "required" && (
                        <div className={styles["error"]}>
                          <p className={styles["errorMessage"]}>
                            Field required
                          </p>
                        </div>
                      )}
                    </div>
                    <div
                      className={
                        errors.invite?.[i]?.email ||
                        errors.invite?.[i]?.email?.message
                          ? styles["errorCol"]
                          : styles["col"]
                      }
                    >
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
                        {...register("invite." + i + ".email", {
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                      {errors.invite?.[i]?.email?.type === "required" && (
                        <div className={styles["error"]}>
                          <p className={styles["errorMessage"]}>
                            Field required
                          </p>
                        </div>
                      )}
                      {errors.invite?.[i]?.email?.message && (
                        <div className={styles["error"]}>
                          <p className={styles["errorMessage"]}>
                            Please enter a valid email
                          </p>
                        </div>
                      )}
                    </div>

                    {i != 0 && (
                      <IconButton onClick={() => removeRow(i)}>
                        <Icon type={"inviteTrash"} />
                      </IconButton>
                    )}
                  </div>
                ))}
                <div className={styles["row"]} />
                {invites.length != 5 && (
                  <IconButton onClick={addRow} className={styles["add"]}>
                    <Icon type={"inviteAdd"} className={styles["addIcon"]} />
                    New Invitation
                  </IconButton>
                )}
              </div>
            </div>
            <div className={styles["actions"]}>
              <DialogActions>
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
                >
                  Send Invites
                </Button>
              </DialogActions>
            </div>
          </form>
        </div>
      );
    };

    const renderSuccessPage = () => {
      return (
        <div className={styles["success"]}>
          <div className={styles["content"]}>
            <h1 className={styles["header"]}>Success!</h1>
            <p className={styles["message"]}>
              All emails have been sent to their respective addresses
            </p>
            <div className={styles["actions"]}>
              <Button
                style={{ textTransform: "none" }}
                className={styles["buttons"]}
                variant="outlined"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                className={styles["invite-more"]}
                variant="contained"
                onClick={() => setSent(false)}
              >
                Invite More
              </Button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <Dialog
          classes={{
            paper: sent ? styles["successModal"] : styles["modal"],
          }}
          maxWidth="md"
          fullWidth={true}
          open={open}
          onClose={handleClose}
        >
          {sent ? renderSuccessPage() : renderForm()}
        </Dialog>
      </div>
    );
  };
