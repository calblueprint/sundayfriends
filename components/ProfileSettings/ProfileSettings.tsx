import React from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styles from "../ProfileSettings/ProfileSettings.module.css";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import { signOut } from "../../firebase/auth";
import Icon from "../../assets/Icon";

const ProfileSettings: React.FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <div>
      <Button
        variant="contained"
        className={styles.button}
        onClick={handleClick}
        sx={{
          display: {
            fontFamily: "Avenir",
            height: "31px",
            textTransform: "capitalize",
          },
        }}
      >
        Cindy ▼
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSignOut} disableRipple>
          Logout{" "}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileSettings;
