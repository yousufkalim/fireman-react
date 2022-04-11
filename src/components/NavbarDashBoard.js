import React,{useEffect,useRef} from 'react'
import useState from 'react-usestateref'
import Box from "@mui/material/Box";
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
import useClickOutside from 'use-click-outside';
import jwt from 'jwt-decode'
const NavbarDashBoard = () => {
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    let [profile, setProfile] = useState({})
    const ref = useRef();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [ connection, setConnection ] = useState(null);
    const [state, setState, counterRef] = useState({
      connection: "",
    })
    const [logout, setLogout] = useState(false)
    const isMenuOpen = Boolean(anchorEl);
    const update = UpdateStore()
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);  
    let user = localStorage.getItem("user");
    const store = Store();
    console.log("dash",store);
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
      
      var token = localStorage.getItem("userData");
      const userData = jwt(token);
      const bool = false;
      const logoutTime = "";
        if(store.connection){
           store.connection?.send("Disconnect", parseInt(userData.Id), bool, logoutTime).then(()=>{
            localStorage.removeItem("userData");
            window.location = "/login";
           })
        }
      else{
        alert("not connected to server")
        localStorage.removeItem("userData");
        window.location = "/login";
      }
     
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
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
    useClickOutside(ref, () => {
     setLogout(false)
    });
  
  return (
    <>
    <Box sx={{width:'89%', margin:"auto", display:"flex",height:"80px", justifyContent:"space-between"}}>
        
      <Box sx={{display:"flex", alignItems:'center'}}>
      
             <div className="dashboard_logo1">
             <img width="166px" src={Site} />
             </div>
      </Box>
       
       <Box sx={{display:"flex", justifyContent:"space-between", alignItems:'center', width:"42%"}}> 
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
              <Box ref={ref}  sx={{display:"flex", flexDirection:"column", position:"relative"}}> 
             <img  
             onClick={()=>{setLogout(true)}} 
             className="img-nav" 
             src={`http://192.168.10.15:5519${profile?.profilePicture?.substr(37)}`}
             />
             { logout?  <p className='logout-btn'  onClick={handleMenuClose} style={{position:"absolute", top:"45px", fontSize:"15px"}}>Logout</p> : null }

            </Box>
            
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