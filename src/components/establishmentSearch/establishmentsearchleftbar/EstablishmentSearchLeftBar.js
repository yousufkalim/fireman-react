import React from "react";
import Box from "@mui/material/Box";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import api from '../../../api/index'
import { useEffect } from "react";
const EstablishmentSearchLeftBar = ({setActiveSearch,getResponse}) => {
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId)
     api("get",`/api/v1/casefiles/rolewise_cases/${userId?.userid}`).then((res)=>(
         getResponse(res)
     ))
  }, [])
  const getCurrentCases =(e)=>{
     const name = e.target.id;
    setActiveSearch(name)
  }
  return (
    <>
      <Box sx={{ p: 2 }}>
        <div className="leftbar-icon-text">
          <AccessibilityIcon />
          <span id="currentcases" onClick={getCurrentCases}>Current Cases</span>
        </div>
        <div className="leftbar-icon-text">
          <AccessibilityIcon />
          <span id="newcases" onClick={getCurrentCases}>New Cases</span>
        </div>
        <div className="leftbar-icon-text">
          <AccessibilityIcon />
          <span>Dossieres realises</span>
        </div>
        <div className="leftbar-icon-text">
          <AccessibilityIcon />
          <span>Annuaire</span>
        </div>
      </Box>
    </>
  );
};

export default EstablishmentSearchLeftBar;
