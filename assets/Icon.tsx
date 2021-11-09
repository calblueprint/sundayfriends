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
    | "admin"
    | "invite";

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
                stroke="#253C85"
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
                stroke="#253C85"
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
                fill="white"
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
