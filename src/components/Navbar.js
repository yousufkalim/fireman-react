import  React,{ useEffect} from "react";
import useState from 'react-usestateref'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import jwt from 'jwt-decode'
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
export default function Navbar() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [state, setState, counterRef] = useState({
    connection: "",
  })
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
  
    //window.addEventListener("offline", triggeroffline())
    //window.addEventListener("online", sendConnectionId())
    //window.addEventListener("unload", triggeroffline())
    const {connection} =state;

    const newConnection = new HubConnectionBuilder()
  .withUrl("http://192.168.10.15:9090/chatHub")
      .withAutomaticReconnect()
      .build();
     console.log("started");
     setState((pre)=>{
      return{
       ...pre,
       connection: newConnection 
      }
    })
    //setConnect(newConnection)
    counterRef.current.connection
    .start()
    .then((res) =>{console.log("hit") })
    .catch((err) =>
      console.log("Error while establishing connection :(", err.message)
    )
  }, [])
  let user = localStorage.getItem("user");
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
    // this.disconnectChat();
    const logoutTime = ""
    if(counterRef.current.connection){
      counterRef.current.connection.send("Disconnect", parseInt(userData.Id), bool, logoutTime);
    }
    else{
      alert("not connected to server")
    }
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
            <NotificationsIcon />
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <span>visite periodique</span>
            <span>La Grande Recre</span>
            <span>sevegre/202174-41</span>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography
              variant="span"
              noWrap
              component="div"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  md: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              17,November 2021
            </Typography>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                
              <Badge badgeContent={17} color="error">

           
                <NotificationsIcon />
              </Badge>

            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Box sx={{ padding: "25px 10px" }}>
              <h5>{user}</h5>
              <span>Inspecteur</span>
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
    </>
  );
}
