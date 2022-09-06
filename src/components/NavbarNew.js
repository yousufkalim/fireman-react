import React, { useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Store } from '../StoreContext';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { HubConnectionBuilder } from '@microsoft/signalr';
import nonotification from '../assets/Nonotification.svg';
import notificationicon from '../assets/noti.png';
import MoreIcon from '@mui/icons-material/MoreVert';
import Vector from '../assets/sitelogo.png';
import Site from '../assets/siteprev.png';
import dummy from '../assets/dummy.jpeg';
import { useTranslation, Trans } from 'react-i18next';
import { UpdateStore } from '../StoreContext';
import moment from 'moment';
import api from '../api/index';
import ronaldo from '../assets/ronaldo.jpeg';
import 'moment/locale/fr';
import useState from 'react-usestateref';
import jwt from 'jwt-decode';
import useClickOutside from 'use-click-outside';

import Popup from './Popup';

export default function Navbar({ Story }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElPopup, setAnchorElPopup] = React.useState(null);
  const [connection, setConnection] = useState(null);
  let [profile, setProfile] = useState({});
  const [logout, setLogout] = useState(false);
  const ref = useRef();
  const refNotification = useRef();
  const [NotificationData, setNotificationData] = useState([]);
  const [ShowNotificationBox, setShowNotificationBox] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const store = Store();
  const isMenuOpen = Boolean(anchorEl);
  const update = UpdateStore();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  useEffect(() => {
    let userId = localStorage.getItem('userData');
    userId = JSON.parse(userId);
    api('get', `/api/v1/Users/userprofile/${userId?.userid}`)
      .then((res) => {
        console.log('res');
        if (res.status == 200) {
          setProfile(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  ////
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://fireman-chat.falconconsulting.fr/notificationsHub')
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.send('DesktopNotification', parseInt(store?.userId), parseInt(store?.role));
          connection.on('DesktopNotification', (message) => {
            console.log(message, 'message');
            setNotificationData(message);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [connection]);

  ///

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    var token = localStorage.getItem('userData');
    const userData = jwt(token);
    const bool = false;
    const logoutTime = '';
    if (store.connection) {
      store.connection.send('Disconnect', parseInt(userData.Id), bool, logoutTime).then(() => {
        localStorage.removeItem('userData');
        window.location = '/login';
      });
    } else {
      alert('not connected to server');
      localStorage.removeItem('userData');
      window.location = '/login';
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
    // anchorEl={anchorEl}
    // anchorOrigin={{
    //   vertical: "top",
    //   horizontal: "right",
    // }}
    // id={menuId}
    // keepMounted
    // transformOrigin={{
    //   vertical: "top",
    //   horizontal: "right",
    // }}
    // open={isMenuOpen}
    //onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
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
    setLogout(false);
  });
  useClickOutside(refNotification, () => {
    setShowNotificationBox(false);
  });
  return (
    <Box sx={{ flexGrow: 1, fontSize: '18px', width: '99%', height: '90px', margin: 'auto' }}>
      <Popup anchorElPopup={anchorElPopup} setAnchorElPopup={setAnchorElPopup} NotificationData={NotificationData} />
      <AppBar
        sx={{
          backgroundColor: '#e9e9e9',
          boxShadow: 'none',
          color: '#000000',
        }}
        position="static"
      >
        <Toolbar>
          {store.activeNavbarTab == 'profile' || store.catTab == true ? (
            <div className="dashboard_logo">
              <img width="40px" src={Vector} />
            </div>
          ) : (
            <div className="dashboard_logo1">
              <img width="166px" src={Site} />
            </div>
          )}
          {store.activeNavbarTab == 'profile' ? (
            ''
          ) : store.catTab === true ? (
            <div className="nav_headings">
              {store.activeCase === 'currentcases' ? <p className="casename">{store?.caseName}</p> : null}
              <p className="establishmentname">
                {store?.establishmentname.length > 20 ? store?.establishmentname.slice(0, 40) + '...' : store?.establishmentname}
              </p>
              {store.activeCase === 'currentcases' ? (
                <p className="serial-name-num">
                  {store?.cityname} / {store?.serialNum}
                </p>
              ) : null}
            </div>
          ) : (
            ''
          )}

          <Box sx={{ flexGrow: '1' }} />
          {store.activeNavbarTab == 'termine' ? (
            <Box sx={{ marginRight: '120px' }}>
              {/* {
              store.activeNavbarTab==2 ?
            //   <Button variant="outlined"  onClick={() =>
            //     changeLanguage(`${language == "en" ? "fr" : "en"}`)
            //   }>
            // {language == "fr" ? "English" : "French"}
            // </Button>
              : */}
              <Box sx={{ display: 'flex' }}>
                <p className="nav_date">{moment().format('dddd DD MMMM YYYY')}</p>
                {/* <Button variant="outlined"  onClick={() =>
                changeLanguage(`${language == "en" ? "fr" : "en"}`)
              }>
            {language == "fr" ? "English" : "French"}
            </Button> */}
              </Box>
            </Box>
          ) : null}

          <Box className="bellIcon" sx={{ display: 'flex' }}>
            <IconButton disableRipple size="small" aria-label="show 17 new notifications" color="inherit">
              <div ref={refNotification} className="icon">
                {NotificationData?.length > 0 ? (
                  <img
                    onClick={() => {
                      setShowNotificationBox(true);
                    }}
                    src={notificationicon}
                  />
                ) : (
                  <img src={nonotification} />
                )}
                <span>{NotificationData?.length}</span>
              </div>

              {ShowNotificationBox ? (
                <>
                  <div className="notification_box">
                    {NotificationData?.map((_) => (
                      <p>{_?.notificationText}</p>
                    ))}
                    <div className="view-all_btn_container">
                      <Button
                        onClick={(event) => setAnchorElPopup(event.currentTarget)}
                        sx={{ fontSize: '9px', padding: '1.2%' }}
                        variant="contained"
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                </>
              ) : null}
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Box
                ref={ref}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <img
                  onClick={() => {
                    setLogout(true);
                  }}
                  className="img-nav"
                  src={
                    profile?.profilePicture
                      ? `https://fireman-api.falconconsulting.fr${profile?.profilePicture?.substr(37)}`
                      : dummy
                  }
                />
                {logout ? (
                  <p
                    className="logout-btn"
                    onClick={handleMenuClose}
                    style={{
                      position: 'absolute',
                      top: '45px',
                      fontSize: '15px',
                    }}
                  >
                    Logout
                  </p>
                ) : null}
              </Box>
            </IconButton>
            <Box
              onClick={() => {
                update({ activeNavbarTab: 'profile', catTab: false });
              }}
              className="navbar_user"
              sx={{ padding: '25px 10px', cursor: 'pointer' }}
            >
              <p
                className={`${store.activeNavbarTab === 'termine' ? '' : 'user-text-dash'}`}
                style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {profile?.firstName} {profile?.lastName}
              </p>
              <p style={{ fontSize: '13px', color: '#A7B9CA' }}>Préventioniste</p>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
