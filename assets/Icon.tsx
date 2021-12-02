import React from "react";
import { SvgIcon } from "@mui/material";

export type IconType =
  | "calendar"
  | "chevronLeft"
  | "chevronRight"
  | "search"
  | "add"
  | "upload"
  | "transaction"
  | "trash"
  | "popoverclose"
  | "dropTriangle"
  | "close"
  | "userAdd"
  | "settings"
  | "editpencil"
  | "nameicon"
  | "usersicon"
  | "singleperson"
  | "lastactive"
  | "datejoined"
  | "email"
  | "phone"
  | "password"
  | "squareBullet"
  | "edit"
  | "usersnavicon"
  | "adminnavicon"
  | "transactionsnavicon"
  | "inventorynavicon"
  | "hidepassword"
  | "sundayfriendslogo"
  | "family"
  | "addCircle"
  | "admin"
  | "invite"
  | "inviteTrash"
  | "inviteAdd"
  | "ex";

const IconSvgs: Record<IconType, React.ReactElement> = {
  calendar: (
    <SvgIcon viewBox="0, 0, 18, 18">
      <path
        d="M14.25 16.5H3.75C2.92157 16.5 2.25 15.8284 2.25 15V4.5C2.25 3.67157
       2.92157 3 3.75 3H5.25V1.5H6.75V3H11.25V1.5H12.75V3H14.25C15.0784 3 15.75
       3.67157 15.75 4.5V15C15.75 15.8284 15.0784 16.5 14.25 16.5ZM3.75
       7.5V15H14.25V7.5H3.75ZM3.75 4.5V6H14.25V4.5H3.75ZM12.75 13.5H11.25V12H12.75V13.5ZM9.75
       13.5H8.25V12H9.75V13.5ZM6.75 13.5H5.25V12H6.75V13.5ZM12.75 10.5H11.25V9H12.75V10.5ZM9.75
       10.5H8.25V9H9.75V10.5ZM6.75 10.5H5.25V9H6.75V10.5Z"
        fill="#253C85"
      />
    </SvgIcon>
  ),
  chevronLeft: (
    <SvgIcon viewBox="0, 0, 8, 13">
      <path
        d="M6.5 1L1 6.19444L6.5 12"
        strokeWidth="1.57143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  ),
  chevronRight: (
    <SvgIcon viewBox="0, 0, 8, 13">
      <path
        d="M1 1L6.5 6.19444L1 12"
        strokeWidth="1.57143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  ),
  search: (
    <SvgIcon viewBox="0, 0, 16, 16">
      <path
        d="M12.4512 13.0713L8.64124 9.26066C6.94635 10.4656 4.61086 10.1709 3.26849
           8.58261C1.92611 6.99433 2.02468 4.64239 3.49524 3.17199C4.96541 1.70096 7.31759
           1.60196 8.90617 2.94427C10.4947 4.28658 10.7897 6.62229 9.58457 8.31733L13.3946
           12.128L12.4519 13.0707L12.4512 13.0713ZM6.32324 3.33332C5.05904 3.33303 3.96837
           4.22044 3.71156 5.45828C3.45474 6.69612 4.10238 7.94418 5.26236 8.44682C6.42234
           8.94946 7.77584 8.56855 8.5034 7.53469C9.23096 6.50084 9.13262 5.0982 8.26791
           4.17599L8.67124 4.57599L8.21657 4.12266L8.20857 4.11466C7.70976 3.61278 7.03084
           3.33141 6.32324 3.33332Z"
        fill="#A9A9A9"
      />
    </SvgIcon>
  ),
  add: (
    <SvgIcon viewBox="0, 0, 16, 17">
      <path
        d="M8.00016 15.1666C4.31826 15.1666 1.3335 12.1819 1.3335 8.49998C1.3335
           4.81808 4.31826 1.83331 8.00016 1.83331C11.6821 1.83331 14.6668 4.81808 14.6668
           8.49998C14.6628 12.1802 11.6804 15.1626 8.00016 15.1666ZM2.66683 8.61465C2.69837
           11.5488 5.09423 13.9063 8.02852 13.8906C10.9628 13.8748 13.3332 11.4916 13.3332 8.55731C13.3332
           5.62298 10.9628 3.23983 8.02852 3.22398C5.09423 3.20828 2.69837 5.56582 2.66683 8.49998V8.61465ZM8.66683
           11.8333H7.3335V9.16665H4.66683V7.83331H7.3335V5.16665H8.66683V7.83331H11.3335V9.16665H8.66683V11.8333Z"
      />
    </SvgIcon>
  ),
  upload: (
    <SvgIcon viewBox="0, 0, 16, 17">
      <path
        d="M12.0001 15.1667H4.00008C3.2637 15.1667 2.66675 14.5697 2.66675
           13.8333V3.16668C2.66675 2.4303 3.2637 1.83334 4.00008 1.83334H8.66675C8.67272
           1.83257 8.67877 1.83257 8.68475 1.83334H8.68875C8.69504 1.83532 8.70152 1.83666
           8.70808 1.83734C8.76687 1.84111 8.82492 1.85254 8.88075
           1.87134H8.89075H8.90075H8.90875C8.92105 1.87996 8.93264 1.88955 8.94341 1.90001C9.01604
           1.93229 9.08222 1.97747 9.13875 2.03334L13.1387 6.03335C13.1946 6.08987 13.2398 6.15605
           13.2721 6.22868C13.2781 6.24334 13.2827 6.25734 13.2874 6.27268V6.28201V6.29134C13.306
           6.34694 13.317 6.4048 13.3201 6.46335C13.3207 6.46999 13.3222 6.4765 13.3247
           6.48268V6.48668C13.3281 6.49078 13.331 6.49525 13.3334 6.50001V13.8333C13.3334
           14.5697 12.7365 15.1667 12.0001 15.1667ZM4.00008 3.16668V13.8333H12.0001V7.16668H8.66675C8.29856
           7.16668 8.00008 6.8682 8.00008 6.50001V3.16668H4.00008ZM9.33341 4.10934V5.83334H11.0574L9.33341 4.10934ZM8.66675
           12.5H7.33341V11.1667H6.00008V9.83335H7.33341V8.50001H8.66675V9.83335H10.0001V11.1667H8.66675V12.5Z"
        fill="white"
      />
    </SvgIcon>
  ),
  transaction: (
    <SvgIcon viewBox="0, 0, 35, 35">
      <path
        d="M13.1251 29.1667L5.83342 23.3333L13.1251 17.5V21.875H32.0834V24.7917H13.1251V29.1667ZM21.8751
           17.5V13.125H2.91675V10.2083H21.8751V5.83334L29.1668 11.6667L21.8751 17.5Z"
        fill="#253C85"
      />
    </SvgIcon>
  ),
  trash: (
    <SvgIcon viewBox="0, 0, 12, 14">
      <path
        d="M9.33333 13.6667H2.66667C1.93029 13.6667 1.33333 13.0697 1.33333
        12.3333V3.66668H0V2.33334H2.66667V1.66668C2.66667 0.930297 3.26362 0.333344
        4 0.333344H8C8.73638 0.333344 9.33333 0.930297 9.33333 1.66668V2.33334H12V3.66668H10.6667V12.3333C10.6667
        13.0697 10.0697 13.6667 9.33333 13.6667ZM2.66667 3.66668V12.3333H9.33333V3.66668H2.66667ZM4
        1.66668V2.33334H8V1.66668H4ZM8 11H6.66667V5.00001H8V11ZM5.33333 11H4V5.00001H5.33333V11Z"
        fill="#525454"
      />
    </SvgIcon>
  ),
  popoverclose: (
    <SvgIcon viewBox="0 0 40 40">
      <path
        d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
        fill="#2E3A59"
      />
    </SvgIcon>
  ),
  close: (
    <SvgIcon
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11.5" cy="11.5" r="11.5" fill="#EBEBEB" />
      <path
        d="M9.2002 9.19983L13.8002 13.7998"
        stroke="#646464"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M9.2002 13.8003L13.8002 9.20029"
        stroke="#646464"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </SvgIcon>
  ),
  dropTriangle: (
    <SvgIcon
      width="9"
      height="4"
      viewBox="0 0 9 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 4H9L4.5 0L0 4Z" fill="#646464" />
    </SvgIcon>
  ),
  userAdd: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M4 19H2C2 15.6863 4.68629 13 8 13C11.3137 13 14 15.6863 14 19H12C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19ZM19 16H17V13H14V11H17V8H19V11H22V13H19V16ZM8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C11.9972 10.208 10.208 11.9972 8 12ZM8 6C6.9074 6.00111 6.01789 6.87885 6.00223 7.97134C5.98658 9.06383 6.85057 9.9667 7.94269 9.99912C9.03481 10.0315 9.95083 9.1815 10 8.09V8.49V8C10 6.89543 9.10457 6 8 6Z" />
    </SvgIcon>
  ),
  settings: (
    <SvgIcon viewBox="0,0,35,35">
      <path
        d="M20.1541 32.0833H14.8457C14.1605 32.0833 13.5676 31.6064 13.4209 30.937L12.8274 28.1895C12.0356 27.8426 11.2848 27.4088 10.5889 26.896L7.9099 
          27.7491C7.25657 27.9575 6.54634 27.6825 6.20365 27.0885L3.54365 22.4933C3.20472 21.899 3.32149 21.1494 3.82511 20.6864L5.90323 18.7906C5.80873 17.9318 
          5.80873 17.0652 5.90323 16.2064L3.82511 14.315C3.32074 13.8517 3.20393 13.1012 3.54365 12.5066L6.19782 7.9085C6.54051 7.31452 7.25074 7.03953 7.90407 
          7.24788L10.583 8.101C10.939 7.83727 11.3095 7.59383 11.6928 7.37183C12.0608 7.1643 12.4395 6.9764 12.8274 6.80892L13.4224 4.06433C13.5683 3.39491 14.1606 2.91735 
          14.8457 2.91663H20.1541C20.8392 2.91735 21.4315 3.39491 21.5774 4.06433L22.1782 6.81038C22.5877 6.9905 22.9865 7.19403 23.3726 7.41996C23.7327 7.62823 24.0808 
          7.85657 24.4153 8.10392L27.0957 7.25079C27.7486 7.04323 28.458 7.31811 28.8005 7.91142L31.4547 12.5095C31.7936 13.1038 31.6769 13.8534 31.1732 14.3164L29.0951 
          16.2123C29.1896 17.071 29.1896 17.9376 29.0951 18.7964L31.1732 20.6923C31.6769 21.1553 31.7936 21.9049 31.4547 22.4991L28.8005 27.0973C28.458 27.6906 27.7486
          27.9654 27.0957 27.7579L24.4153 26.9048C24.0761 27.1546 23.7237 27.3858 23.3595 27.5975C22.9771 27.819 22.5828 28.0191 22.1782 28.1968L21.5774 30.937C21.4309 
          31.6059 20.8388 32.0827 20.1541 32.0833ZM11.1124 23.6673L12.3082 24.5423C12.5778 24.7408 12.8588 24.9234 13.1497 25.0891C13.4234 25.2477 13.7053 25.3917 13.9941 
          25.5208L15.3547 26.1173L16.0212 29.1666H18.9816L19.648 26.1158L21.0087 25.5193C21.6026 25.2574 22.1664 24.9317 22.6901 24.5481L23.8874 23.6731L26.8639 
          24.621L28.3441 22.0573L26.0355 19.9529L26.1989 18.477C26.2706 17.8315 26.2706 17.1801 26.1989 16.5345L26.0355 15.0587L28.3455 12.95L26.8639 10.3848L23.8874 
          11.3327L22.6901 10.4577C22.1663 10.0722 21.6025 9.74419 21.0087 9.47913L19.648 8.88267L18.9816 5.83329H16.0212L15.3518 8.88413L13.9941 9.47913C13.705 9.60607 
          13.4232 9.74871 13.1497 9.90642C12.8606 10.0717 12.5811 10.2533 12.3126 10.4504L11.1153 11.3254L8.14032 10.3775L6.65719 12.95L8.96574 15.0514L8.8024 
          16.5287C8.73066 17.1742 8.73066 17.8257 8.8024 18.4712L8.96574 19.947L6.65719 22.0514L8.1374 24.6152L11.1124 23.6673ZM17.4941 23.3333C14.2724 23.3333 11.6607 
          20.7216 11.6607 17.5C11.6607 14.2783 14.2724 11.6666 17.4941 11.6666C20.7157 11.6666 23.3274 14.2783 23.3274 17.5C23.3234 20.72 20.7141 23.3293 17.4941 
          23.3333ZM17.4941 14.5833C15.9007 14.5849 14.6035 15.8649 14.5807 17.4582C14.5578 19.0514 15.8178 20.3681 17.4105 20.4153C19.0032 20.4626 20.339 19.223 20.4107 
          17.6312V18.2145V17.5C20.4107 15.8891 19.1049 14.5833 17.4941 14.5833Z"
        fill="#253C85"
      />
    </SvgIcon>
  ),
  editpencil: (
    <SvgIcon viewBox="0,0,20,15">
      <path
        d="M1.44666 12.2193C1.25965 12.219 1.08137 12.1401 0.955329 12.002C0.826959 11.865 0.763172 11.6797 0.779996 11.4926L0.943329 9.69664L8.48866 2.15398L10.8467 
        4.51131L3.30333 12.0533L1.50733 12.2166C1.48666 12.2186 1.466 12.2193 1.44666 12.2193ZM11.3173 4.03998L8.95999 1.68264L10.374 0.268645C10.499 0.14346 10.6687 0.0731201 
        10.8457 0.0731201C11.0226 0.0731201 11.1923 0.14346 11.3173 0.268645L12.7313 1.68264C12.8565 1.80769 12.9269 1.97737 12.9269 2.15431C12.9269 2.33125 12.8565 2.50093 
        12.7313 2.62598L11.318 4.03931L11.3173 4.03998Z"
        fill="#E6ECFE"
      />
    </SvgIcon>
  ),
  nameicon: (
    <SvgIcon viewBox="0 0 25 25">
      <path
        d="M12.5002 14.5833C14.8013 14.5833 16.6668 12.7178 16.6668 10.4166C16.6668 8.11546 14.8013 6.24998 12.5002 6.24998C10.199 6.24998 8.3335 8.11546 8.3335 10.4166C8.3335 12.7178 10.199 14.5833 12.5002 14.5833ZM12.5002 8.33331C13.6508 8.33331 14.5835 9.26605 14.5835 10.4166C14.5835 11.5672 13.6508 12.5 12.5002 12.5C11.3496 12.5 10.4168 11.5672 10.4168 10.4166C10.4168 9.26605 11.3496 8.33331 12.5002 8.33331Z"
        fill="#5A6AA2"
      />
      <path
        d="M4.16683 22.9166C3.01624 22.9166 2.0835 21.9839 2.0835 20.8333V4.16665C2.0835 3.01605 3.01624 2.08331 4.16683 2.08331H20.8335C21.9841 2.08331 22.9168 3.01605 22.9168 4.16665V20.8333C22.9168 21.9839 21.9841 22.9166 20.8335 22.9166H4.16683ZM4.16683 4.16665V20.8333H7.29183C7.29183 17.9568 9.62368 15.625 12.5002 15.625C15.3766 15.625 17.7085 17.9568 17.7085 20.8333H20.8335V4.16665H4.16683ZM15.6252 20.8333C15.6252 19.1074 14.2261 17.7083 12.5002 17.7083C10.7743 17.7083 9.37516 19.1074 9.37516 20.8333H15.6252Z"
        fill="#5A6AA2"
      />
    </SvgIcon>
  ),
  usersicon: (
    <SvgIcon
      width="29"
      height="25"
      viewBox="0 0 29 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.125 5.625C13.125 8.66257 10.6626 11.125 7.625 11.125C4.58743 11.125 2.125 8.66257 2.125 5.625C2.125 2.58743 4.58743 0.125 7.625 0.125C10.6626 0.125 13.125 2.58743 13.125 5.625ZM10.375 
            5.625C10.375 4.10622 9.14378 2.875 7.625 2.875C6.10622 2.875 4.875 4.10622 4.875 5.625C4.875 7.14378 6.10622 8.375 7.625 8.375C9.14378 8.375 10.375 7.14378 10.375 5.625Z"
        fill="white"
      />
      <path
        d="M26.875 11.8125C26.875 14.4704 24.7204 16.625 22.0625 16.625C19.4046 16.625 17.25 14.4704 17.25 11.8125C17.25 9.15463 19.4046 7 22.0625 7C24.7204 7 26.875 9.15463 26.875 11.8125ZM24.125 
            11.8125C24.125 10.6734 23.2016 9.75 22.0625 9.75C20.9234 9.75 20 10.6734 20 11.8125C20 12.9516 20.9234 13.875 22.0625 13.875C23.2016 13.875 24.125 12.9516 24.125 11.8125Z"
        fill="white"
      />
      <path
        d="M11.75 24.875V19.375C11.75 17.0968 9.90317 15.25 7.625 15.25C5.34683 15.25 3.5 17.0968 3.5 19.375V24.875H0.75V19.375C0.75 15.578 3.82804 12.5 7.625 12.5C11.422 12.5 14.5 15.578 14.5 
            19.375V24.875H11.75Z"
        fill="white"
      />
      <path
        d="M25.5 24.1875V24.875H28.25V24.1875C28.25 20.7702 25.4798 18 22.0625 18C18.6452 18 15.875 20.7702 15.875 24.1875V24.875H18.625V24.1875C18.625 22.289 20.164 20.75 22.0625 20.75C23.961 
            20.75 25.5 22.289 25.5 24.1875Z"
        fill="white"
      />
    </SvgIcon>
  ),
  singleperson: (
    <SvgIcon viewBox="0 0 25 25">
      <path
        d="M7.29175 8.33333C7.29175 5.45685 9.6236 3.125 12.5001 3.125C15.3766 3.125 17.7084 5.45685 17.7084 8.33333C17.7084 11.2098 15.3766 13.5417 12.5001 13.5417C9.6236 13.5417 7.29175 11.2098 
            7.29175 8.33333ZM12.5001 11.4583C14.226 11.4583 15.6251 10.0592 15.6251 8.33333C15.6251 6.60744 14.226 5.20833 12.5001 5.20833C10.7742 5.20833 9.37508 6.60744 9.37508 8.33333C9.37508 10.0592 
            10.7742 11.4583 12.5001 11.4583Z"
        fill="#5A6AA2"
      />
      <path
        d="M6.60752 17.0241C5.04472 18.5869 4.16675 20.7065 4.16675 22.9167H6.25008C6.25008 21.2591 6.90856 19.6694 8.08066 18.4972C9.25277 17.3251 10.8425 16.6667 12.5001 16.6667C14.1577 
            16.6667 15.7474 17.3251 16.9195 18.4972C18.0916 19.6694 18.7501 21.2591 18.7501 22.9167H20.8334C20.8334 20.7065 19.9554 18.5869 18.3926 17.0241C16.8298 15.4613 14.7102 14.5833 12.5001 14.5833C10.2899 
            14.5833 8.17033 15.4613 6.60752 17.0241Z"
        fill="#5A6AA2"
      />
    </SvgIcon>
  ),
  lastactive: (
    <SvgIcon viewBox="0 0 19 21">
      <path
        d="M16.7917 20.9167H2.20833C1.05774 20.9167 0.125 19.984 0.125 18.8334V4.25004C0.125 3.09945 1.05774 2.16671 2.20833 2.16671H4.29167V0.083374H6.375V2.16671H12.625V0.083374H14.7083V2.16671H16.7917C17.9423 
            2.16671 18.875 3.09945 18.875 4.25004V18.8334C18.875 19.984 17.9423 20.9167 16.7917 20.9167ZM2.20833 8.41671V18.8334H16.7917V8.41671H2.20833ZM2.20833 4.25004V6.33337H16.7917V4.25004H2.20833ZM14.7083 
            16.75H12.625V14.6667H14.7083V16.75ZM10.5417 16.75H8.45833V14.6667H10.5417V16.75ZM6.375 16.75H4.29167V14.6667H6.375V16.75ZM14.7083 12.5834H12.625V10.5H14.7083V12.5834ZM10.5417 12.5834H8.45833V10.5H10.5417V12.5834ZM6.375 
            12.5834H4.29167V10.5H6.375V12.5834Z"
        fill="#5A6AA2"
      />
    </SvgIcon>
  ),
  datejoined: (
    <SvgIcon viewBox="0 0 19 21">
      <path
        d="M16.7907 20.9167H2.20736C1.05676 20.9167 0.124023 19.984 0.124023 18.8334V4.25004C0.124023 3.09945 1.05676 2.16671 2.20736 2.16671H4.29069V0.083374H6.37402V2.16671H12.624V0.083374H14.7074V2.16671H16.7907C17.9413 
            2.16671 18.874 3.09945 18.874 4.25004V18.8334C18.874 19.984 17.9413 20.9167 16.7907 20.9167ZM2.20736 8.41671V18.8334H16.7907V8.41671H2.20736ZM2.20736 4.25004V6.33337H16.7907V4.25004H2.20736Z"
        fill="#5A6AA2"
      />
    </SvgIcon>
  ),
  email: (
    <SvgIcon viewBox="0 0 21 17">
      <path
        d="M18.8333 16.8333H2.16659C1.01599 16.8333 0.083252 15.9006 0.083252 14.75V2.15934C0.131802 1.04428 1.05047 0.165571 2.16659 0.166627H18.8333C19.9838 0.166627 20.9166 1.09937 20.9166 2.24996V14.75C20.9166 
            15.9006 19.9838 16.8333 18.8333 16.8333ZM2.16659 4.19579V14.75H18.8333V4.19579L10.4999 9.74996L2.16659 4.19579ZM2.99992 2.24996L10.4999 7.24996L17.9999 2.24996H2.99992Z"
        fill="#6272AA"
      />
    </SvgIcon>
  ),
  phone: (
    <SvgIcon viewBox="0 0 19 19">
      <path
        d="M6.1064 6.04364C4.98855 6.99347 4.57891 8.72574 5.54414 10.1154C6.44738 11.4159 7.58516 12.5534 8.88531 13.4563C10.2751 14.4213 12.0073 14.0115 12.957 12.8936L12.9676 12.8985C14.1807 13.4605 15.4692 
            13.8457 16.7917 14.0419V16.7916L16.7905 16.7916L16.7876 16.7917C8.48074 16.8034 2.19945 10.4491 2.20834 2.21207V2.20833H4.95768L4.95786 2.20955C5.15416 3.53193 5.53917 4.81931 6.10118 6.03237L6.1064 6.04364ZM16.7905 
            18.875H17.8333C18.4086 18.875 18.875 18.4086 18.875 17.8333V13.1435C18.875 12.6272 18.4969 12.1889 17.9863 12.1131L17.0965 11.981C15.9711 11.814 14.8756 11.4864 13.8432 11.0082L13.059 10.6449C12.6046 10.4344 12.0646 
            10.5771 11.7735 10.9846L11.4185 11.4817C11.1074 11.9173 10.5133 12.0504 10.0736 11.745C8.97745 10.9839 8.01674 10.0234 7.25523 8.92697C6.9498 8.48723 7.08287 7.8931 7.51858 7.58194L8.01539 7.22715C8.42301 6.93605 
            8.56574 6.39605 8.35517 5.94156L7.9915 5.15659C7.51327 4.12437 7.18565 3.0289 7.01861 1.90363L6.8865 1.01371C6.81069 0.503083 6.37234 0.125 5.85612 0.125H1.16668C0.591381 0.125 0.125011 0.59137 0.125011 
            1.16667V2.20982C0.114886 11.5915 7.32316 18.8884 16.7905 18.875Z"
        fill="#6272AA"
      />
    </SvgIcon>
  ),
  password: (
    <SvgIcon viewBox="0 0 21 17">
      <path
        d="M6.33325 16.8333C4.43248 16.8343 2.77199 15.5487 2.29679 13.7083H0.083252V11.625H2.29784C2.83913 9.52857 4.89587 8.19608 7.03042 8.5589C9.16497 8.92173 10.6659 10.859 10.4841 13.0165C10.3024 15.174 
            8.49842 16.8328 6.33325 16.8333ZM6.33325 10.5833C5.19512 10.5845 4.26855 11.4988 4.25224 12.6368C4.23593 13.7748 5.13592 14.7153 6.27355 14.7491C7.41118 14.7828 8.36537 13.8974 8.41659 12.7604V13.1771V12.6667C8.41659 
            11.5161 7.48385 10.5833 6.33325 10.5833ZM20.9166 13.7083H11.5416V11.625H20.9166V13.7083ZM11.5416 8.49999C9.6412 8.50047 7.98127 7.21503 7.50617 5.37499H0.083252V3.29165H7.50617C8.04746 1.19524 10.1042 -0.137256 12.2388 
            0.22557C14.3733 0.588397 15.8743 2.52563 15.6925 4.68314C15.5107 6.84066 13.7067 8.49943 11.5416 8.49999ZM11.5416 2.24998C10.4035 2.25114 9.47689 3.16545 9.46058 4.30346C9.44427 5.44148 10.3443 6.38197 11.4819 
            6.41573C12.6195 6.4495 13.5737 5.56405 13.6249 4.42707V4.84374V4.33332C13.6249 3.18272 12.6922 2.24998 11.5416 2.24998ZM20.9166 5.37499H16.7499V3.29165H20.9166V5.37499Z"
        fill="#5A6AA2"
      />
    </SvgIcon>
  ),
  squareBullet: (
    <SvgIcon viewBox="0 0 24 24">
      <rect width="12" height="12" fill="#C4C4C4" />
    </SvgIcon>
  ),
  edit: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M4.41999 20.579C4.13948 20.5785 3.87206 20.4603 3.68299 20.253C3.49044 20.0475 3.39476 19.7695 3.41999 19.489L3.66499 16.795L14.983 5.48103L18.52 9.01703L7.20499 20.33L4.51099 20.575C4.47999 20.578 4.44899 20.579 4.41999 20.579ZM19.226 8.31003L15.69 4.77403L17.811 2.65303C17.9986 2.46525 18.2531 2.35974 18.5185 2.35974C18.7839 2.35974 19.0384 2.46525 19.226 2.65303L21.347 4.77403C21.5348 4.9616 21.6403 5.21612 21.6403 5.48153C21.6403 5.74694 21.5348 6.00146 21.347 6.18903L19.227 8.30903L19.226 8.31003Z" />
    </SvgIcon>
  ),
  usersnavicon: (
    <SvgIcon viewBox="0 0 33 33">
      <path
        d="M15.125 9.625C15.125 12.6626 12.6626 15.125 9.625 15.125C6.58743 15.125 4.125 12.6626 4.125 9.625C4.125 6.58743 6.58743 4.125 9.625 4.125C12.6626 4.125 15.125 6.58743 15.125 9.625ZM12.375 9.625C12.375 
            8.10622 11.1438 6.875 9.625 6.875C8.10622 6.875 6.875 8.10622 6.875 9.625C6.875 11.1438 8.10622 12.375 9.625 12.375C11.1438 12.375 12.375 11.1438 12.375 9.625Z"
      />
      <path
        d="M28.875 15.8125C28.875 18.4704 26.7204 20.625 24.0625 20.625C21.4046 20.625 19.25 18.4704 19.25 15.8125C19.25 13.1546 21.4046 11 24.0625 11C26.7204 11 28.875 13.1546 28.875 15.8125ZM26.125 15.8125C26.125 
            14.6734 25.2016 13.75 24.0625 13.75C22.9234 13.75 22 14.6734 22 15.8125C22 16.9516 22.9234 17.875 24.0625 17.875C25.2016 17.875 26.125 16.9516 26.125 15.8125Z"
      />
      <path
        d="M13.75 28.875V23.375C13.75 21.0968 11.9032 19.25 9.625 19.25C7.34683 19.25 5.5 21.0968 5.5 23.375V28.875H2.75V23.375C2.75 19.578 5.82804 16.5 9.625 16.5C13.422 16.5 16.5 
            19.578 16.5 23.375V28.875H13.75Z"
      />
      <path
        d="M27.5 28.1875V28.875H30.25V28.1875C30.25 24.7702 27.4798 22 24.0625 22C20.6452 22 17.875 24.7702 17.875 28.1875V28.875H20.625V28.1875C20.625 26.289 22.164 24.75 24.0625 24.75C25.961 
            24.75 27.5 26.289 27.5 28.1875Z"
      />
    </SvgIcon>
  ),
  adminnavicon: (
    <SvgIcon viewBox="0 0 29 23">
      <path
        d="M25.5 22.5H3.5C2.02946 22.544 0.800073 21.3909 0.75 19.9205V3.07814C0.800068 1.608 2.02969 0.455226 3.5 0.500011H25.5C26.9703 0.455226 28.1999 1.608 28.25 3.07814V19.9219C28.1992 21.3917 26.97 22.544 25.5 
            22.5ZM3.5 3.25001V19.7349L25.5 19.75V3.26514L3.5 3.25001ZM16.4663 17H6.25C6.3511 15.8616 6.88984 14.8068 7.75287 14.0575C8.71376 13.1042 10.0049 12.5577 11.3581 12.5313C12.7114 12.5577 14.0025 13.1042 14.9634 
            14.0575C15.8262 14.807 16.3649 15.8617 16.4663 17ZM22.75 15.625H18.625V12.875H22.75V15.625ZM11.3581 11.5C10.6212 11.5256 9.90678 11.2441 9.3854 10.7227C8.86402 10.2014 8.58252 9.48691 8.60813 8.75001C8.58293 
            8.01323 8.86456 7.29902 9.38585 6.77774C9.90714 6.25645 10.6213 5.97482 11.3581 6.00001C12.0949 5.97482 12.8091 6.25645 13.3304 6.77774C13.8517 7.29902 14.1333 8.01323 14.1081 8.75001C14.1337 9.48691 13.8522 
            10.2014 13.3309 10.7227C12.8095 11.2441 12.095 11.5256 11.3581 11.5ZM22.75 10.125H17.25V7.37501H22.75V10.125Z"
        fill="white"
      />
    </SvgIcon>
  ),
  transactionsnavicon: (
    <SvgIcon viewBox="0 0 33 33">
      <path
        d="M12.375 27.5L5.5 22L12.375 16.5V20.625H30.25V23.375H12.375V27.5ZM20.625 16.5V12.375H2.75V9.625H20.625V5.5L27.5 11L20.625 16.5Z"
        fill="white"
      />
    </SvgIcon>
  ),
  inventorynavicon: (
    <SvgIcon viewBox="0 0 25 25">
      <path
        d="M13.875 9.75V15.25H22.125V9.75H13.875ZM11.125 9.75H2.875V15.25H11.125V9.75ZM13.875 22.125H22.125V18H13.875V22.125ZM11.125 22.125V18H2.875V22.125H11.125ZM13.875 2.875V7H22.125V2.875H13.875ZM11.125 
            2.875H2.875V7H11.125V2.875ZM22.125 0.125C23.6438 0.125 24.875 1.35622 24.875 2.875V22.125C24.875 23.6438 23.6438 24.875 22.125 24.875H2.875C1.35622 24.875 0.125 23.6438 0.125 22.125V2.875C0.125 1.35622 1.35622 
            0.125 2.875 0.125H22.125Z"
        fill="white"
      />
    </SvgIcon>
  ),
  hidepassword: (
    <SvgIcon viewBox="0 0 12 9">
      <path
        d="M5.92 8.28849C4.94905 8.30058 3.98813 8.09103 3.11037 7.67577C2.42998 7.34379 1.81901 6.88532 1.3101 6.32483C0.771039 5.74533 0.346597 5.069 0.0592 4.33157L0 4.14449L0.06216 3.95742C0.349763 3.22064 0.773292 2.54448 1.31069 1.96416C1.81942 1.40372 2.43018 0.945244 3.11037 0.613213C3.98813 0.197978 4.94905 -0.0115769 5.92 0.000493356C6.89095 -0.0115561 7.85186 0.197998 8.72963 0.613213C9.41004 0.945168 10.021 1.40365 10.5299 1.96416C11.07 2.54287 11.4946 3.21941 11.7808 3.95742L11.84 4.14449L11.7778 4.33157C10.8491 6.74917 8.50953 8.32955 5.92 8.28849ZM5.92 1.18449C3.90476 1.12134 2.05508 2.29455 1.25326 4.14449C2.05495 5.99455 3.90471 7.16781 5.92 7.10449C7.9352 7.16748 9.78479 5.99433 10.5867 4.14449C9.78597 2.29365 7.93561 1.12001 5.92 1.18449ZM5.92 5.92049C5.06594 5.92615 4.32715 5.32693 4.15641 4.49009C3.98568 3.65324 4.43069 2.81251 5.21871 2.48314C6.00673 2.15378 6.91766 2.42777 7.39322 3.13721C7.86878 3.84665 7.77614 4.79337 7.17208 5.39717C6.84134 5.7318 6.3905 5.92024 5.92 5.92049Z"
        fill="#A9A9A9"
      />
    </SvgIcon>
  ),
  sundayfriendslogo: (
    <SvgIcon viewBox="0 0 45 43">
      <path
        d="M9.18904 26.0345C9.19138 26.3826 9.29298 26.7227 9.48192 27.015C9.67085 27.3073 9.93928 27.5397 10.2557 27.6847C10.3925 27.7486 10.537 27.7946 10.6857 27.8215H10.7387V28.1008C10.7387 28.1008 10.7192 
            28.6425 10.7108 29.4969C10.5654 29.4838 10.4215 29.4576 10.2808 29.4187C9.66271 29.2608 9.11365 28.9042 8.71811 28.4037C8.32256 27.9033 8.10247 27.2866 8.0917 26.6488C8.08559 26.4114 7.99465 26.184 7.83536 
            26.0078C7.67607 25.8316 7.45895 25.7182 7.22332 25.6883C7.08711 25.6729 6.94919 25.6866 6.81863 25.7283C6.68806 25.77 6.5678 25.8389 6.46574 25.9304C6.36368 26.0219 6.28214 26.134 6.22647 26.2592C6.17081 
            26.3845 6.14227 26.5201 6.14274 26.6572C6.1567 28.2934 7.27917 29.5778 8.11404 30.879C8.63221 31.6899 9.07611 32.5459 9.44034 33.4367C9.71956 34.0873 9.94293 34.7518 10.1496 
            35.4275H2.6106V7.98291H10.7387V24.2196H10.6605C10.5121 24.2488 10.3678 24.2956 10.2305 24.3592C9.91538 24.5103 9.64994 24.7482 9.46543 25.045C9.28092 25.3418 9.18503 25.6851 9.18904 26.0345Z"
        fill="#098D45"
      />
      <path
        d="M42.2882 11.2358V38.6832H35.0704C35.6404 37.1587 36.3449 35.6879 37.1757 34.2883C38.1279 32.6549 39.6301 31.0996 39.6133 29.0892C39.6114 28.929 39.5757 28.771 39.5085 28.6255C39.4413 
            28.48 39.3442 28.3503 39.2236 28.2449C39.1029 28.1395 38.9613 28.0607 38.8081 28.0138C38.6549 27.9668 38.4935 27.9527 38.3345 27.9723C38.0573 28.0159 37.8052 28.1579 37.6242 28.3722C37.4432 28.5866 37.3454 
            28.859 37.3488 29.1395C37.3463 30.0047 37.0149 30.8367 36.4217 31.4666C35.8286 32.0966 35.0181 32.4774 34.1545 32.532V30.5775C34.6877 30.5302 35.1838 30.285 35.5452 29.8901C35.9065 29.4953 36.1069 28.9795 
            36.1069 28.4442C36.1069 27.909 35.9065 27.3931 35.5452 26.9983C35.1838 26.6035 34.6877 26.3583 34.1545 26.311V11.2358H42.2882Z"
        fill="#FED719"
      />
      <path
        d="M11.574 37.8511C11.5963 38.0102 11.6019 38.0856 11.574 38.0605V37.8511Z"
        fill="#253C85"
      />
      <path
        d="M19.2803 18.7357C19.2806 19.3579 19.458 19.9671 19.7918 20.4922C20.1255 21.0173 20.6018 21.4366 21.165 21.701C21.232 21.7317 21.299 21.7597 21.3688 21.7848V24.8869L21.165 24.8506C20.0604 24.5581 
            19.0826 23.9108 18.3818 23.0083C17.6811 22.1057 17.2963 20.998 17.2866 19.8554C17.2898 19.4267 17.1377 19.0113 16.8585 18.6859C16.5794 18.3605 16.1919 18.1471 15.7677 18.0851C15.5233 18.0551 15.2754 18.0773 
            15.0402 18.1501C14.8051 18.2228 14.588 18.3446 14.4033 18.5074C14.2187 18.6702 14.0706 18.8702 13.9689 19.0944C13.8671 19.3186 13.814 19.5617 13.8131 19.8079C13.8215 22.7314 15.8179 25.0461 17.3117 
            27.386C18.2251 28.8434 19.0064 30.3797 19.646 31.9764C19.8322 32.4454 20.0183 32.9192 20.2045 33.3976H12.5203C12.8905 32.5866 13.3025 31.7954 13.7545 31.027C14.5698 29.6309 15.8514 28.3046 15.8347 
            26.5846C15.8339 26.4476 15.8039 26.3123 15.7468 26.1878C15.6897 26.0633 15.6068 25.9523 15.5036 25.8622C15.4003 25.7722 15.2791 25.7051 15.148 25.6655C15.0168 25.6259 14.8788 25.6146 14.7429 25.6325C14.507 
            25.6706 14.2926 25.7922 14.1388 25.9752C13.9851 26.1582 13.9022 26.3903 13.9053 26.6293C13.9029 27.2981 13.6704 27.9458 13.2469 28.4634C12.8233 28.981 12.2345 29.3371 11.5793 29.4717V27.7657C11.9485 27.647 
            12.2704 27.4142 12.4988 27.1008C12.7272 26.7875 12.8503 26.4097 12.8503 26.022C12.8503 25.6342 12.7272 25.2565 12.4988 24.9431C12.2704 24.6297 11.9485 24.3969 11.5793 24.2782V1.78979H21.3688V15.6838L21.165 
            15.7704C20.6014 16.0343 20.1247 16.4534 19.7909 16.9786C19.4571 17.5039 19.2799 18.1134 19.2803 18.7357Z"
        fill="#253C85"
      />
      <path
        d="M31.8315 28.4442C31.8292 28.8146 31.9256 29.1789 32.1107 29.4997C32.3308 29.8846 32.6656 30.1911 33.0684 30.3764C33.1957 30.4344 33.3286 30.4793 33.4649 30.5105V32.5013C33.3359 32.4857 33.2081 
            32.4615 33.0824 32.4287C32.3596 32.2427 31.7176 31.8251 31.2547 31.2396C30.7918 30.6542 30.5334 29.9332 30.5192 29.187C30.519 28.9061 30.4171 28.6348 30.2323 28.4233C30.0475 28.2118 29.7923 28.0744 29.514 
            28.0366C29.3546 28.0188 29.1934 28.035 29.0408 28.0841C28.8882 28.1333 28.7478 28.2142 28.6288 28.3216C28.5098 28.429 28.4149 28.5604 28.3504 28.7072C28.2859 28.8539 28.2533 29.0127 28.2547 29.173C28.2547 
            31.0857 29.5838 32.5907 30.5638 34.1124C31.1664 35.0642 31.6849 36.0667 32.1135 37.1085C32.6576 38.4398 33.0982 39.8111 33.4314 41.2102H22.4329C22.4971 40.6685 22.5781 40.1296 22.6731 39.5991C23.4353 35.3633 
            25.1693 31.4487 27.3835 27.7238C28.8578 25.2388 31.1642 22.8794 31.1642 19.8079C31.1643 19.563 31.1125 19.3207 31.0122 19.0972C30.9119 18.8737 30.7654 18.674 30.5823 18.5112C30.3992 18.3484 30.1837 18.2263 
            29.95 18.1529C29.7163 18.0794 29.4696 18.0563 29.2264 18.0851C28.8019 18.1471 28.4141 18.3604 28.1344 18.6857C27.8548 19.011 27.7021 19.4264 27.7046 19.8554C27.6892 21.2271 27.134 22.5375 26.1593 
            23.5028C25.1846 24.4681 23.8689 25.0105 22.4971 25.0126C22.3827 25.0126 22.2682 25.0126 22.1565 25.0126V21.9831C22.288 22 22.4204 22.0084 22.553 22.0082C23.404 21.9833 24.2118 21.6278 24.8049 21.0171C25.3981 
            20.4063 25.7299 19.5885 25.7299 18.7371C25.7299 17.8858 25.3981 17.0679 24.8049 16.4572C24.2118 15.8465 23.404 15.4909 22.553 15.4661C22.4204 15.4645 22.2878 15.4729 22.1565 15.4912V5.04553H33.4761V26.3473C33.3295 
            26.3792 33.1871 26.428 33.0517 26.4925C32.683 26.6671 32.372 26.9437 32.1558 27.2897C31.9395 27.6356 31.827 28.0363 31.8315 28.4442Z"
        fill="#CE238F"
      />
    </SvgIcon>
  ),
  family: (
    <SvgIcon viewBox="0 0 31 27">
      <path d="M11.1244 0.375C7.09727 0.375 3.83268 3.63959 3.83268 7.66667C3.83268 11.6937 7.09727 14.9583 11.1244 14.9583C15.1514 14.9583 18.416 11.6937 18.416 7.66667C18.416 3.63959 15.1514 0.375 11.1244 0.375ZM6.74935 7.66667C6.74935 5.25042 8.7081 3.29167 11.1244 3.29167C13.5406 3.29167 15.4994 5.25042 15.4994 7.66667C15.4994 10.0829 13.5406 12.0417 11.1244 12.0417C8.7081 12.0417 6.74935 10.0829 6.74935 7.66667Z" />
      <path d="M22.6575 7.98499C22.2472 7.77581 21.7932 7.66675 21.3327 7.66675V4.75009C22.2538 4.75009 23.1617 4.96811 23.9823 5.38649C24.0727 5.43257 24.1617 5.48093 24.2494 5.53152C24.9572 5.9402 25.5723 6.49371 26.0537 7.15706C26.5948 7.90251 26.9515 8.76548 27.0949 9.67533C27.2383 10.5852 27.1642 11.516 26.8786 12.3917C26.5931 13.2674 26.1042 14.0631 25.4521 14.7135C24.7999 15.364 24.003 15.8507 23.1266 16.134C22.3467 16.386 21.5235 16.4706 20.7108 16.3834C20.6102 16.3726 20.5098 16.3592 20.4096 16.3432C19.5007 16.1975 18.6393 15.8388 17.8956 15.2965L17.8941 15.2954L19.6134 12.9394C19.9854 13.2108 20.4164 13.3903 20.8711 13.4632C21.3259 13.536 21.7914 13.5002 22.2296 13.3586C22.6678 13.217 23.0662 12.9736 23.3923 12.6484C23.7184 12.3232 23.9628 11.9253 24.1056 11.4875C24.2483 11.0497 24.2854 10.5843 24.2137 10.1293C24.142 9.67443 23.9636 9.24296 23.6931 8.87025C23.4226 8.49753 23.0677 8.19417 22.6575 7.98499Z" />
      <path d="M27.1633 26.625C27.1633 25.8593 27.0124 25.1011 26.7194 24.3937C26.4264 23.6863 25.9969 23.0436 25.4555 22.5022C24.9141 21.9607 24.2713 21.5313 23.5639 21.2383C22.8565 20.9452 22.0984 20.7944 21.3327 20.7944V17.875C22.3274 17.875 23.3137 18.0446 24.2494 18.3754C24.3946 18.4268 24.5385 18.482 24.6812 18.5411C25.7428 18.9808 26.7074 19.6253 27.5199 20.4378C28.3324 21.2503 28.9769 22.2149 29.4166 23.2765C29.4757 23.4191 29.5309 23.5631 29.5823 23.7083C29.9131 24.644 30.0827 25.6303 30.0827 26.625H27.1633Z" />
      <path d="M21.3327 26.625H18.416C18.416 22.5979 15.1514 19.3333 11.1244 19.3333C7.09727 19.3333 3.83268 22.5979 3.83268 26.625H0.916016C0.916016 20.9871 5.48644 16.4167 11.1244 16.4167C16.7623 16.4167 21.3327 20.9871 21.3327 26.625Z" />
    </SvgIcon>
  ),
  addCircle: (
    <SvgIcon viewBox="0 0 42 42">
      <path
        d="M21 38.5C11.3394 38.4894 3.51061 30.6606 3.5 21V20.65C3.69238 11.033 11.6105 3.37396 21.2287 3.50157C30.8468 3.62919 38.559 11.4956 38.4961 21.1144C38.4333 30.7332 30.619 38.4981 21 38.5ZM12.25 19.25V22.75H19.25V29.75H22.75V22.75H29.75V19.25H22.75V12.25H19.25V19.25H12.25Z"
        fill="#526DC2"
      />
    </SvgIcon>
  ),
  admin: (
    <SvgIcon viewBox="0 0 35 35">
      <path
        d="M29.1666 29.1667H5.83329C4.27363 29.2134 2.96973 27.9903 2.91663 26.4309V8.56774C2.96973 7.0085 
        4.27387 5.78587 5.83329 5.83337H29.1666C30.726 5.78587 32.0302 7.0085 32.0833 8.56774V26.4323C32.0294 27.9912 
        30.7257 29.2134 29.1666 29.1667ZM5.83329 8.75004V26.234L29.1666 26.25V8.76608L5.83329 8.75004ZM19.5854 
        23.3334H8.74996C8.85718 22.126 9.42858 21.0072 10.3439 20.2125C11.363 19.2015 12.7324 18.6218 14.1677 
        18.5938C15.6029 18.6218 16.9723 19.2015 17.9914 20.2125C18.9065 21.0074 19.4779 22.126 19.5854 23.3334ZM26.25 
        21.875H21.875V18.9584H26.25V21.875ZM14.1677 17.5C13.3861 17.5272 12.6284 17.2286 12.0754 16.6757C11.5224 16.1227
         11.2238 15.3649 11.251 14.5834C11.2243 13.8019 11.523 13.0444 12.0759 12.4916C12.6287 11.9387 13.3862 11.64 14.1677 
         11.6667C14.9491 11.64 15.7066 11.9387 16.2595 12.4916C16.8124 13.0444 17.1111 13.8019 17.0843 14.5834C17.1115 15.3649 
         16.8129 16.1227 16.26 16.6757C15.707 17.2286 14.9492 17.5272 14.1677 17.5ZM26.25 16.0417H20.4166V13.125H26.25V16.0417Z"
        fill="#253C85"
      />
    </SvgIcon>
  ),
  invite: (
    <SvgIcon
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.1667 32.0833H5.83341C4.22258 32.0833 2.91675 30.7775 2.91675 29.1667V13.1965C2.96597 12.2177 3.49611 11.3267 4.33279 10.8165L15.9995 3.81646C16.9228 3.26284 18.0759 3.26284 18.9992 3.81646L30.6659 10.8165C31.5426 11.3455 32.0799 12.2935 32.0834 13.3175V29.1667C32.0834 30.7775 30.7776 32.0833 29.1667 32.0833ZM5.83341 14.3908V29.1667H29.1667V14.3908L17.5001 22.1681L5.83341 14.3908ZM17.5001 6.3175L7.75258 12.1654L17.5001 18.6638L27.2461 12.1654L17.5001 6.3175Z"
        fill="#253C85"
      />
    </SvgIcon>
  ),
  inviteTrash: (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12.5" cy="13" r="12.5" fill="#A9A9A9" />
      <rect
        width="14.6552"
        height="14.6552"
        transform="translate(5.17236 5.67236)"
        fill="#A9A9A9"
      />
      <path
        d="M15.5532 19.1063H9.44692C8.77244 19.1063 8.22566 18.5595 8.22566 17.8851V9.94684H7.00439V8.72557H9.44692V8.11494C9.44692 7.44046 9.9937 6.89368 10.6682 6.89368H14.332C15.0065 6.89368 15.5532 7.44046 15.5532 8.11494V8.72557H17.9958V9.94684H16.7745V17.8851C16.7745 18.5595 16.2277 19.1063 15.5532 19.1063ZM9.44692 9.94684V17.8851H15.5532V9.94684H9.44692ZM10.6682 8.11494V8.72557H14.332V8.11494H10.6682ZM14.332 16.6638H13.1107V11.1681H14.332V16.6638ZM11.8895 16.6638H10.6682V11.1681H11.8895V16.6638Z"
        fill="white"
      />
    </svg>
  ),
  inviteAdd: (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14.5" cy="14.5" r="14.5" fill="#7F93D1" />
      <path
        d="M9.392 19.44H8C8 17.1337 9.86966 15.264 12.176 15.264C14.4823 15.264 16.352 17.1337 16.352 19.44H14.96C14.96 17.9024 13.7136 16.656 12.176 16.656C10.6384 16.656 9.392 17.9024 9.392 19.44ZM19.832 17.352H18.44V15.264H16.352V13.872H18.44V11.784H19.832V13.872H21.92V15.264H19.832V17.352ZM12.176 14.568C10.6384 14.568 9.392 13.3216 9.392 11.784C9.392 10.2464 10.6384 9 12.176 9C13.7136 9 14.96 10.2464 14.96 11.784C14.9581 13.3208 13.7128 14.5661 12.176 14.568ZM12.176 10.392C11.4155 10.3928 10.7965 11.0037 10.7856 11.7641C10.7747 12.5244 11.376 13.1528 12.1361 13.1754C12.8962 13.1979 13.5338 12.6063 13.568 11.8466V12.125V11.784C13.568 11.0152 12.9448 10.392 12.176 10.392Z"
        fill="white"
      />
    </svg>
  ),
  ex: (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14.5" cy="14.5" r="14.5" fill="#EBEBEB" />
      <path
        d="M11.6001 11.6001L17.4001 17.4001"
        stroke="#646464"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M11.6001 17.3999L17.4001 11.5999"
        stroke="#646464"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
    </svg>
  ),
};

type Props = {
  className?: string;
  type: IconType;
};

const Icon: React.FC<Props> = ({ className, type }: Props) => {
  return React.cloneElement(IconSvgs[type], {
    className,
  });
};

export default Icon;
