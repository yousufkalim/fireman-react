import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
;import MoreIcon from "@mui/icons-material/MoreVert";
import Vector from "../assets/Vector.png"
import { useTranslation, Trans } from "react-i18next";
import {UpdateStore} from '../StoreContext'
import { Store } from "../StoreContext";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const isMenuOpen = Boolean(anchorEl);
  const update = UpdateStore()
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let user = localStorage.getItem("user");
  const store = Store();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.removeItem("userData");
    window.location = "/login";
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
console.log(store);
  return (
    <Box sx={{ flexGrow: 1, fontSize: "18px" }}>
      <AppBar
        sx={{
          backgroundColor: "aliceblue",
          boxShadow: "none",
          color: "#000000",
        }}
        position="static"
      >
        <Toolbar>
        <div className="dashboard_logo">    
        <img width="40px" src={Vector} />
        </div>
            <div className="nav_headings">
            <p>Visite périodique</p>
            <p style={{fontWeight:"500"}} >La Grande Recre</p>
            <p style={{fontSize:"12px"}}>Savigny-le-Temple / 202174-41</p>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
          <Button variant="outlined"  onClick={() =>
                changeLanguage(`${language == "en" ? "fr" : "en"}`)
              }>
            {language == "fr" ? "English" : "French"}
            </Button>
          </Box>
          <div className="bellIcon" style={{display:"flex"}}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                <div className="icon">
              <Badge badgeContent={17} color="error">
                <NotificationsNoneOutlinedIcon />
              </Badge>
              </div>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Box onClick={()=>{update({activeNavbarTab:"profile"})}}  className="navbar_user" sx={{ padding: "25px 10px" ,cursor:"pointer"}}>
              <p style={{cursor:"pointer"}}>{user}</p>
              <p style={{fontSize:"13px"}}>Préventioniste</p>
            </Box>
          </div>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
