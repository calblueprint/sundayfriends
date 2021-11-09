import React, { useState } from "react";
import styles from "./UploadPopover.module.css";
import { Button, Popover, LinearProgress } from "@mui/material";
import Icon from "../../assets/Icon";
import { Transaction, User } from "../../types/schema";
import { addTransaction } from "../../firebase/firestore/transaction";
import Papa from '../../node_modules/papaparse';

type UploadPopoverProps = {
    uploadAnchor: Element;
    closeUpload: Function;
    popoverid: string;
};

export const UploadPopover: React.FunctionComponent<UploadPopoverProps> = ({
  uploadAnchor,
  closeUpload,
  popoverid,
}: UploadPopoverProps) => {
    const [uploadFile, setUploadFile] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleUploadClose = () => {
        closeUpload();
        sleep(1000).then(() => {
            setUploadSuccess(false);
            setUploadFile(null);
            setUploading(false);
            setUploadProgress(0);
        })
    }

    const handleUpload = (event) => {
        console.log(event.target.files[0]);
        setUploadFile(event.target.files[0]);
    }

    const cancelFile = () => {
        setUploadFile(null);
    }

    const cancelUploading = () => {
        setUploading(false);
        setUploadProgress(0);
    }

    const handleUploadConfirm = () => {
        if (uploading) {
            //handle file uploads from fileData
            for (let i = 1; i < fileData.length; i++) {
                const data = {
                    admin_name: fileData[i][3],
                    date: new Date(fileData[i][0]),
                    description: fileData[i][5],
                    family_id: fileData[i][2],
                    point_gain: parseInt(fileData[i][6]),
                    user_name: fileData[i][1],
                }
                console.log(data);
                addTransaction(data as Transaction);
            }
            setUploadSuccess(true);

            
        } else {
            setUploading(true);
            const reader = new FileReader();
            reader.onload = function(evt) {
                console.log(evt.target.result);
                setFileData(Papa.parse(evt.target.result).data);
              };
            
            reader.addEventListener('progress', (event) => {
                setUploadProgress((event.loaded / event.total)*100);
                if (event.loaded && event.total) {
                  const percent = (event.loaded / event.total) * 100;
                  console.log(`Progress: ${Math.round(percent)}`);
                }
              });
            reader.readAsText(uploadFile);
        }
    }

    const handleUploadMore = () => {
        setUploading(false);
        setUploadSuccess(false);
        setUploadFile(null);
        setUploadProgress(0);
    }

    const uploadPopoverContent = () => {
        switch(uploadSuccess) {
            case true:
                 return(
                     <div className={styles['success-div']}>
                         <p className={styles['success-title']}>Success!</p>
                         <p className={styles['success-message']}>Transactions from {uploadFile.name} have been added</p>
                         <div>
                             <Button className={styles['success-close-button']} onClick={handleUploadClose}>Close</Button>
                             <Button className={styles['add-more-button']} onClick={handleUploadMore}>Add More</Button>
                         </div>
                     </div>
                 )
            case false:
                return(
                    <div className={styles['popover-div']}>
                        <div className={styles['popover-header']}>
                             <h3 className={styles['add-title']}>Upload your file</h3>
                             <div className={styles['x-button']} onClick={handleUploadClose}>
                                 <Icon  type={"close"}></Icon>
                             </div>
                        </div>
                        <p className={styles['upload-message']}>Selected file should be .csv</p>
                        {uploadFile == null ?
                            <label htmlFor="contained-button-file">
                                <input style={{display: 'none'}} id="contained-button-file" type="file" accept=".csv"
                                onChange={handleUpload}/>
                                <div className={styles['upload-file-box']}>
                                    <div className={styles['upload-add-line']}>
                                        <Icon className={styles['add-file-icon']} type={"addGray"}></Icon>
                                        <p className={styles['upload-add-file']}>Add file</p>
                                    </div>
                                </div>
                            </label> 
                            : 
                            renderFileStatus()
                        }
                         
                         <Button className={styles['confirm-button']} onClick={handleUploadConfirm}>
                             Upload
                         </Button>
                    </div>
                )
        }
    }

    const renderFileStatus = () => {
        switch(uploading) {
            case true:
                return(
                    <div className={styles['uploaded-file-box']}>
                        <div className={styles['uploaded-file-row']}>
                            <Icon type={"fileUpload"}></Icon>
                            <div className={styles['uploaded-file-name']}>
                                {uploadFile.name}
                            </div>
                        </div>
                        <div className={styles['upload-progress-row']}>
                            <LinearProgress className={styles['upload-progress-bar']} variant="determinate" value={uploadProgress}
                            classes={{barColorPrimary: styles['colorPrimary']}}
                            sx={{
                                color: '#526DC2',
                                backgroundColor: '#EBEBEB'
                            }}/>
                            <div className={styles['cancel-file']} onClick={cancelUploading}>
                                <Icon className={styles['cancel-file-icon']} type={"close"} ></Icon>
                            </div>
                        </div>
                        <p className={styles['uploaded-message']}>{uploadProgress==100 ? 'Uploaded.' : 'Uploading...'}</p>
                    </div>
                )
            case false:
                return(
                    <div className={styles['uploaded-file-box']}>
                        <div className={styles['uploaded-file-row']}>
                            <Icon type={"fileUpload"}></Icon>
                            <div className={styles['uploaded-file-name']}>
                                {uploadFile.name}
                            </div>
                            <div className={styles['cancel-file']} onClick={cancelFile}>
                                <Icon className={styles['cancel-file-icon']} type={"close"} ></Icon>
                            </div>
                        </div>
                        <p className={styles['uploaded-message']}>Selected. Press upload to continue.</p>
                    </div>
                )
        }
    }

    const uploadOpen = Boolean(uploadAnchor);

    return (
        <Popover 
            PaperProps={{className: styles['upload-popover-container']}}
            open={uploadOpen} 
            id={popoverid}
            anchorEl={uploadAnchor}
            onClose={handleUploadClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
                
            {uploadPopoverContent()} 
        </Popover>
    )
}