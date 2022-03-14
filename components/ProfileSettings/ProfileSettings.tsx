import React, { useState } from "react";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import { signOut } from "../../firebase/auth";
import Icon from "../../assets/Icon";
import { styled } from "@mui/styles";

type ProfileSettingsProps = {
  adminName: string;
  onProfile: boolean;
};

const SettingsMenuItem = styled(MenuItem)(() => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  fontFamily: "Avenir",
  "&:hover": {
    backgroundColor: "white"
  }
}));

const ProfileSettings: React.FunctionComponent<ProfileSettingsProps> = ({
  adminName,
  onProfile,
}) => {
  const name = adminName.split(" ")[0]
  const [anchorEl, setAnchorEl] = useState<Element>(null);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleSignOut = (): void => {
    signOut();
    router.push("/");
  };

  const handleRedirect = (): void => {
    router.push("/profile");
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disableRipple
        sx={{
          width: "85px",
          height: "30px",
          borderRadius: "26px",
          backgroundColor: "#5A6AA2",
          display: "flex",
          fontFamily: "Avenir",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#5A6AA2",
          },
          justifyContent: "space-around",
          color: "white",
        }}
      >
        {name}
        <Icon type="dropMenu" />
      </Button>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            width: "145px",
            borderRadius: "10px",
            border: "2px solid #E6ECFE",
            boxSizing: "border-box",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
          },
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="menu"
        transformOrigin={{
          vertical: "top",
          horizontal: 40,
        }}
      >
        <SettingsMenuItem disabled={onProfile} onClick={handleRedirect} disableRipple>
          <Icon type="settings" />
          Settings
        </SettingsMenuItem>
        <Divider
          sx={{
            display: {
              background: "#E6ECFE"
            }
          }}
        />
        <SettingsMenuItem onClick={handleSignOut} disableRipple>
          <Icon type="logout" />
          Logout
        </SettingsMenuItem>
      </Menu>
    </>
  );
};

export default ProfileSettings;
