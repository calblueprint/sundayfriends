import React, { useEffect, useState } from "react";
import styles from "./UploadPopover.module.css";
import { Button, Popover, LinearProgress, Snackbar } from "@mui/material";
import Icon from "../../assets/Icon";
import { Transaction, User, Admin } from "../../types/schema";
import {
  getAllTransactions,
  addTransaction,
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
    setUploading(false);
    setUploadProgress(0);
  };

  const checkCSV = () => {
    console.log(fileData[0]);
    if (fileData[0][0] != "User") {
      return false;
    } else if (fileData[0][1] != "FID") {
      return false;
    } else if (fileData[0][2] != "Message") {
      return false;
    } else if (fileData[0][3] != "Change") {
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
        for (let i = 1; i < fileData.length; i++) {
          const activeDate = new Date();
          const expireDate = await getExpirations().then((dates) => {
            return (
              dates[activeDate.getMonth()]
            )
          })
          const deleteDate = new Date(expireDate);
          deleteDate.setMonth(expireDate.getMonth() + 1);
          const userid = findUserByNameandFID(fileData[i][0], fileData[i][1]);
          const data = {
            expire_id: null,
            admin_name: admin.name,
            date: activeDate,
            deleteDate: deleteDate,
            description: fileData[i][2],
            family_id: fileData[i][1],
            point_gain: parseInt(fileData[i][3]),
            user_name: fileData[i][0],
            user_id: userid,
          };
          console.log(data);
          addTransaction(data as Transaction, expireDate, deleteDate);

          updateLastActive(fileData[i][1], activeDate);
        }

        let trans = await getAllTransactions();
        setTransactions(trans);

        setUploadSuccess(true);
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

  const findUserByNameandFID = (name: string, fid: number) => {
    getFamilyById(fid.toString()).then((family) => {
      family.users.map((user) => {
        if (user.full_name == name && user.family_id == fid) {
          console.log(user.user_id);
          return user.user_id;
        }
      });
    });
    return null;
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
