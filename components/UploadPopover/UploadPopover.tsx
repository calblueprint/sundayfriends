import React, { useEffect, useState } from "react";
import styles from "./UploadPopover.module.css";
import { Button, Popover, LinearProgress, Snackbar } from "@mui/material";
import Icon from "../../assets/Icon";
import { Transaction, User, Admin } from "../../types/schema";
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
} from "../../firebase/firestore/transaction";
import Papa from "papaparse";
import {
  getFamilyById,
  updateLastActive,
} from "../../firebase/firestore/family";
import { getExpirations } from "../../firebase/firestore/expirationDates";

type UploadPopoverProps = {
  admin: Admin;
  uploadAnchor: Element;
  closeUpload: Function;
  popoverid: string;
  setTransactions: Function;
};

type ProcessedRow = {
  transaction: Transaction;
  activeDate: Date;
  expireDate: Date;
  deleteDate: Date;
};

export const UploadPopover: React.FunctionComponent<UploadPopoverProps> = ({
  admin,
  uploadAnchor,
  closeUpload,
  popoverid,
  setTransactions,
}: UploadPopoverProps) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (uploadAnchor) {
      setUploadSuccess(false);
      setUploadFile(null);
      setUploading(false);
      setUploadProgress(0);
    }
  }, [uploadAnchor]);

  const handleUploadClose = () => {
    closeUpload();
  };

  const handleUpload = (event) => {
    console.log(event.target.files[0]);
    setUploadFile(event.target.files[0]);
  };

  const cancelFile = () => {
    setUploadFile(null);
  };

  const cancelUploading = () => {
    setUploadFile(null);
    setUploading(false);
    setUploadProgress(0);
  };

  const parseYearString = (year: number) => {
    if (year < 100) {
      const currentYear = new Date().getFullYear();
      return Math.floor(currentYear / 100) + year;
    }
    return year;
  };

  const checkCSV = () => {
    console.log(fileData[0]);
    if (fileData[0][0] != "Date") {
      return false;
    } else if (fileData[0][1] != "User") {
      return false;
    } else if (fileData[0][2] != "FID") {
      return false;
    } else if (fileData[0][3] != "Message") {
      return false;
    } else if (fileData[0][4] != "Value") {
      return false;
    }
    return true;
  };

  const handleUploadConfirm = async () => {
    if (uploading) {
      //handle file uploads from fileData
      if (!checkCSV()) {
        setSnackbarMessage("Invalid CSV Format");
        setSnackbarOpen(true);
      } else {
        var cancellingUpload = false;
        const confirmTransactions: ProcessedRow[] = [];
        for (let i = 1; i < fileData.length; i++) {
          const dateStrings = fileData[i][0].split("/");
          console.log(dateStrings);
          const activeDate = new Date(
            parseYearString(dateStrings[2]),
            dateStrings[0] - 1,
            dateStrings[1]
          );
          console.log(activeDate);
          const expireDate = await getExpirations().then((dates) => {
            return dates[activeDate.getMonth()];
          });
          const deleteDate = new Date(expireDate);
          deleteDate.setMonth(expireDate.getMonth() + 1);
          const user = await findUserByNameandFID(
            fileData[i][1],
            fileData[i][2]
          );
          if (!user) {
            setSnackbarMessage(
              `User ${fileData[i][1]} with FID ${fileData[i][2]} not found`
            );
            setSnackbarOpen(true);
            cancellingUpload = true;
            break;
          }
          const data = {
            expire_id: null,
            admin_name: admin.name,
            date: activeDate,
            deleteDate: deleteDate,
            description: fileData[i][3],
            family_id: fileData[i][2],
            point_gain: parseInt(fileData[i][4]),
            user_name: fileData[i][1],
            user_id: user.user_id,
          };
          console.log(data);
          confirmTransactions.push({
            transaction: data as Transaction,
            activeDate: activeDate,
            expireDate: expireDate,
            deleteDate: deleteDate,
          });
          //addTransaction(data as Transaction, expireDate, deleteDate);
        }
        if (!cancellingUpload) {
          // add all transactions from confirmTransactions
          await confirmTransactions.forEach((row) => {
            addTransaction(row.transaction, row.expireDate, row.deleteDate);
            updateLastActive(row.transaction.family_id, row.activeDate);
          });

          let trans = await getAllTransactions();
          setTransactions(trans);

          setUploadSuccess(true);
        }
        cancellingUpload = false;
      }
    } else {
      if (uploadFile) {
        setUploading(true);
        const reader = new FileReader();
        reader.onload = (evt) => {
          console.log(evt.target.result);
          setFileData(Papa.parse(evt.target.result).data);
        };

        reader.addEventListener("progress", (event) => {
          setUploadProgress((event.loaded / event.total) * 100);
          if (event.loaded && event.total) {
            const percent = (event.loaded / event.total) * 100;
            console.log(`Progress: ${Math.round(percent)}`);
          }
        });
        reader.readAsText(uploadFile);
      } else {
        setSnackbarMessage("No File Added");
        setSnackbarOpen(true);
      }
    }
  };

  const handleUploadMore = () => {
    setUploading(false);
    setUploadSuccess(false);
    setUploadFile(null);
    setUploadProgress(0);
  };

  const findUserByNameandFID = async (name: string, fid: number) => {
    return getFamilyById(fid.toString()).then((family) => {
      console.log(family);
      if (!family) {
        // setSnackbarMessage(`FID ${fid} not found`);
        // setSnackbarOpen(true);
        return null;
      } else {
        console.log("family found");
        var userFound: User = null;
        family.users.forEach((user) => {
          if (user.full_name === name) {
            console.log(user);
            userFound = user;
          }
        });
        return userFound;
      }
    });
  };

  const uploadPopoverContent = () => {
    if (uploadSuccess) {
      return (
        <div className={styles["success-div"]}>
          <p className={styles["success-title"]}>Success!</p>
          <p className={styles["success-message"]}>
            Transactions from {uploadFile.name} have been added
          </p>
          <div>
            <Button
              className={styles["success-close-button"]}
              onClick={handleUploadClose}
            >
              Close
            </Button>
            <Button
              className={styles["add-more-button"]}
              onClick={handleUploadMore}
            >
              Add More
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles["popover-div"]}>
          <div className={styles["popover-header"]}>
            <h3 className={styles["add-title"]}>Upload your file</h3>
            <div className={styles["x-button"]} onClick={handleUploadClose}>
              <Icon type={"close"}></Icon>
            </div>
          </div>
          <p className={styles["upload-message"]}>
            Selected file should be .csv
          </p>
          {uploadFile == null ? (
            <label htmlFor="contained-button-file">
              <input
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                accept=".csv"
                onChange={handleUpload}
              />
              <div className={styles["upload-file-box"]}>
                <div className={styles["upload-add-line"]}>
                  <Icon
                    className={styles["add-file-icon"]}
                    type={"addGray"}
                  ></Icon>
                  <p className={styles["upload-add-file"]}>Add file</p>
                </div>
              </div>
            </label>
          ) : (
            renderFileStatus()
          )}

          <Button
            className={styles["confirm-button"]}
            onClick={handleUploadConfirm}
          >
            {uploadProgress == 100 ? "Submit" : "Upload"}
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </div>
      );
    }
  };

  const renderFileStatus = () => {
    if (uploading) {
      return (
        <div className={styles["uploaded-file-box"]}>
          <div className={styles["uploaded-file-row"]}>
            <Icon type={"fileUpload"}></Icon>
            <div className={styles["uploaded-file-name"]}>
              {uploadFile.name}
            </div>
          </div>
          <div className={styles["upload-progress-row"]}>
            <LinearProgress
              className={styles["upload-progress-bar"]}
              variant="determinate"
              value={uploadProgress}
              classes={{ barColorPrimary: styles["colorPrimary"] }}
              sx={{
                color: "#526DC2",
                backgroundColor: "#EBEBEB",
              }}
            />
            <div className={styles["cancel-file"]} onClick={cancelUploading}>
              <Icon
                className={styles["cancel-file-icon"]}
                type={"close"}
              ></Icon>
            </div>
          </div>
          <p className={styles["uploaded-message"]}>
            {uploadProgress == 100
              ? "Uploaded. Press submit to reflect changes."
              : "Uploading..."}
          </p>
        </div>
      );
    } else {
      return (
        <div className={styles["uploaded-file-box"]}>
          <div className={styles["uploaded-file-row"]}>
            <Icon type={"fileUpload"}></Icon>
            <div className={styles["uploaded-file-name"]}>
              {uploadFile.name}
            </div>
            <div className={styles["cancel-file"]} onClick={cancelFile}>
              <Icon
                className={styles["cancel-file-icon"]}
                type={"close"}
              ></Icon>
            </div>
          </div>
          <p className={styles["uploaded-message"]}>
            Selected. Press upload to continue.
          </p>
        </div>
      );
    }
  };

  const uploadOpen = Boolean(uploadAnchor);

  return (
    <Popover
      PaperProps={{ className: styles["upload-popover-container"] }}
      open={uploadOpen}
      id={popoverid}
      anchorEl={uploadAnchor}
      onClose={handleUploadClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {uploadPopoverContent()}
    </Popover>
  );
};
