import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchRightBar = () => {
  return (
    <>
      <Item
        sx={{
          backgroundColor: "#fff",
          padding: "0px 20px",
          margin: "10px 0px",
        }}
      >
        <Box sx={{ p: 2, backgroundColor: "#fff" }}>
          <div className="leftbar-icon-text">
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
        </Box>
      </Item>
      <Item
        sx={{
          backgroundColor: "#fff",
          padding: "0px 20px",
          margin: "10px 0px",
        }}
      >
        <Box sx={{ p: 2, backgroundColor: "#fff" }}>
          <div className="leftbar-icon-text">
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
        </Box>
      </Item>
      <Item sx={{ backgroundColor: "#fff", padding: "0px 20px" }}>
        <Box sx={{ p: 2, backgroundColor: "#fff" }}>
          <div className="leftbar-icon-text">
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
          <div className="leftbar-icon-text">
            <AccessibilityIcon />
            <span>dossieres en course</span>
          </div>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchRightBar;
