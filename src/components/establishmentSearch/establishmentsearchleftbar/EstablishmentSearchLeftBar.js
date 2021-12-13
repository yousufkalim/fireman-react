import React from "react";
import Box from "@mui/material/Box";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
const EstablishmentSearchLeftBar = () => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <div className="leftbar-icon-text">
          <AccessibilityIcon />
          <span>dossieres en course</span>
        </div>
        <div className="leftbar-icon-text">
          <AccessibilityIcon />
          <span>Nouveuaux dossieres</span>
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
