import  React,{useState, useEffect} from "react";
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
import MoreIcon from "@mui/icons-material/MoreVert";
import Vector from "../assets/Vector.png"
import Site from "../assets/site.png"
import { useTranslation, Trans } from "react-i18next";
import {UpdateStore} from '../StoreContext'
import { Store } from "../StoreContext";
import moment from "moment";
import api from '../api/index';
import notificationicon from '../assets/noti.png'
import ronaldo from '../assets/ronaldo.jpeg'
import 'moment/locale/fr'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let [profile, setProfile] = useState({})
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const isMenuOpen = Boolean(anchorEl);
  const update = UpdateStore()
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let user = localStorage.getItem("user");
  const store = Store();
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/Users/userprofile/${userId?.userid}`)
        .then((res) => {
            console.log(res);
            // localStorage.setItem('profileuser', res.firstName+ res.lastName);
            if (res.status == 200) {
                setProfile(res.data)
            }
        })
        .catch((err) => console.log(err));
}, [])
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

  return (
    <Box sx={{ flexGrow: 1, fontSize: "18px", width:"90%", margin:"auto" }}>
      <AppBar
        sx={{
          backgroundColor: "aliceblue",
          boxShadow: "none",
          color: "#000000",
        }}
        position="static"
      >
        <Toolbar>
        {
             store.activeNavbarTab=="profile" || store.catTab==true?
             <div className="dashboard_logo">
             <img width="40px" src={Vector} />
             </div>
             :
             <div className="dashboard_logo1">
             <img width="166px" src={Site} />
             </div>


          }    
        {
           store.activeNavbarTab == "profile"  ?
           ""
           :
           store.catTab===true?
           <div className="nav_headings">
          { store.activeCase==="currentcases"?  <p className="casename">{store?.caseName}</p> : null }
           <p className="establishmentname" >{store?.establishmentname}</p>
          {store.activeCase==="currentcases"?  <p className="serial-name-num">{store?.cityname} / {store?.serialNum}</p>:null  }
         </div>
           :
           ""
         

        }
           
          <Box sx={{flexGrow:'1'}} />
          {
            store.activeNavbarTab == "termine"? ( 
            <Box sx={{marginRight:"120px"}}>
            {/* {
              store.activeNavbarTab==2 ?
            //   <Button variant="outlined"  onClick={() =>
            //     changeLanguage(`${language == "en" ? "fr" : "en"}`)
            //   }>
            // {language == "fr" ? "English" : "French"}
            // </Button>
              : */}
              <Box sx={{display:"flex"}}>
                <p className="nav_date">{moment().format('dddd DD MMMM YYYY')}</p>
               {/* <Button variant="outlined"  onClick={() =>
                changeLanguage(`${language == "en" ? "fr" : "en"}`)
              }>
            {language == "fr" ? "English" : "French"}
            </Button> */}
              </Box>
             

            
        
          </Box>):null
          }
         
          <Box className="bellIcon" sx={{display:"flex"}}>
            <IconButton
            disableRipple
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                <div className="icon">
               <img src={notificationicon}/>
              </div>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             <img className="img-nav" src={ronaldo}/>
            </IconButton>
            <Box onClick={()=>{update({activeNavbarTab:"profile",catTab:false})}}  className="navbar_user" sx={{ padding: "25px 10px" ,cursor:"pointer"}}>
              <p className={`${store.activeNavbarTab==="termine"? "":"user-text-dash"}`} style={{cursor:"pointer"}}>{profile?.firstName} {profile?.lastName}</p>
              <p  style={{fontSize:"13px", color:"#A7B9CA"}}>Préventioniste</p>
            </Box>
          </Box>
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
