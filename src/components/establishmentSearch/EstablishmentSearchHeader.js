import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';
const EstablishmentSearchHeader = () => { 
  const items=[
    {
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },
    {
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },
    {
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },{
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },
    {
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },
    {
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },
    {
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },
    {
      icon:  <NotificationsIcon/>,
      text: "visite periodique"
    },
  ]
  return (
    <>
     <Box sx={{ flexGrow: 1,backgroundColor:"aliceblue", padding:'20px 0px' }}>
      <AppBar sx={{backgroundColor:"#fff", borderRadius:'10px', width:'97%', margin:'auto', boxShadow:'none', color:'lightgray'}} position="static">
        <Toolbar>
          <Box sx={{display:'flex'}}>
            {
              items.map((item)=>(
                <Box sx={{display:'flex', fontSize:'15px', borderRight:'1px solid lightgray', padding:'0px 20px'}}>
                  {item.icon}
              <span> {item.text} </span>
              </Box>
              ))
            } 
           <NotificationsIcon/>
           </Box>
        </Toolbar>
       
      </AppBar>
     
    </Box>
    </>
  )
}

export default EstablishmentSearchHeader
