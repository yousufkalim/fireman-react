import React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/styles";
import Box from "@mui/material/Box";

import api from "../api";

const useStyles = makeStyles({
  paper: {
    boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.5)",
    width: "95%",
    height: "90%",
  },
});

const Popup = ({ anchorElPopup, setAnchorElPopup, NotificationData }) => {
  const handleClose = () => {
    setAnchorElPopup(null);
  };

  const open = Boolean(anchorElPopup);
  const id = open ? "simple-popover" : undefined;
  const classes = useStyles();
  const acknowlegeNotification = (data) => {
    api("put", "/api/v1/chatting/acknowledge_desktop_notifications", data).then((res) => {
      console.log(res, "res");
      if (res?.data?.success == true) {
        setAnchorElPopup(null);
      }
    });
  };
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorElPopup={anchorElPopup}
        onClose={handleClose}
        classes={classes}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box style={{ padding: "5%" }}>
          {NotificationData?.map((_) => (
            <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "1%" }}>
              <p>{_?.notificationText}</p>
              <Button onClick={() => acknowlegeNotification(_)} sx={{ fontSize: "9px", padding: ".8%" }} variant="contained">
                Acknowledge
              </Button>
            </Box>
          ))}
          {/* <div className="view-all_btn_container">
       <Button
       onClick={(event)=>setAnchorElPopup(event.currentTarget)}
        sx={{fontSize:"9px",padding:"1.2%"}} variant="contained">
          View All
          </Button>
        </div>    */}
        </Box>
      </Popover>
    </>
  );
};

export default Popup;
