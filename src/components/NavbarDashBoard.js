import React,{useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Vector from "../assets/Vector.png"
import Site from "../assets/site.png"
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import AccountCircle from "@mui/icons-material/AccountCircle";
import notificationicon from '../assets/noti.png'
import ronaldo from '../assets/ronaldo.jpeg'
import {UpdateStore} from '../StoreContext'
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import moment from "moment";
import MoreIcon from "@mui/icons-material/MoreVert";
import api from '../api/index';
import { Store } from "../StoreContext";
const NavbarDashBoard = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let [profile, setProfile] = useState({})
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   
   
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
    <>
    <Box sx={{width:'89%', margin:"auto", display:"flex", justifyContent:"space-between"}}>
        
      <Box sx={{display:"flex", alignItems:'center'}}>
      
             <div className="dashboard_logo1">
             <img width="166px" src={Site} />
             </div>
      </Box>
       
       <Box sx={{display:"flex", justifyContent:"space-between", alignItems:'center', width:"44%"}}> 
      <Box sx={{display:"flex"}}>
                <p className="nav_date">{moment().format('dddd DD MMMM YYYY')}</p>
              </Box>
      
      <Box className="bellIcon" sx={{display:"flex",}}>
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
             <img  className="img-nav" src={ronaldo}/>
            </IconButton>
            <Box onClick={()=>{update({activeNavbarTab:"profile",catTab:false})}}  className="navbar_user" sx={{ padding: "25px 20px" ,cursor:"pointer"}}>
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
          </Box>
          
      {renderMenu}
    </Box>
    
    </>
  )
}

export default NavbarDashBoard