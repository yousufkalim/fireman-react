import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import OpenSearchInputHeader from "./openSearch/OpenSearchInputHeader";
import EstablishmentSearchContainer from "./establishmentsearch/EstablishmentSearchContainer";
const EstablishmentSearchActivePanel = ({getActiveTab}) => {
  const [activeTab, setActiveTab] = useState(0);
  const items = [
    {
      text: "Open",
    },
    {
      text: "Establishment",
    },
    {
      text: "Implatation",
    },
    {
      text: "Construction",
    },
    {
      text: "Clearances",
    },
    {
      text: "Facilities electric",
    },
    {
      text: "Facilities gas",
    },
  ];
  const onClick = (e) => {
    setActiveTab(e);
    getActiveTab(e)
  };
  return (
    <>
      <Box
        sx={{ flexGrow: 1, backgroundColor: "aliceblue", padding: "5px 0px" }}
      >
        <AppBar
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "100%",
            margin: "auto",
            boxShadow: "none",
            color: "#000000",
          }}
          position="static"
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {items.map((item, i) => {
                const className = activeTab === i ? "active" : "";
                return (
                  <Box
                    className={`unactive ${className}`}
                    onClick={() => onClick(i)}
                    sx={{
                      display: "flex",
                      fontSize: "13px",
                      borderRight: "1px solid lightgray",
                      padding: "20px",
                    }}
                  >
                    <span> {item.text} </span>
                  </Box>
                );
              })}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <OpenSearchInputHeader />
      {/* {activeTab === 0 ? <OpenSearchNewCases /> : null} */}
      {activeTab === 1 ? <EstablishmentSearchContainer /> : null}
    </>
  );
};

export default EstablishmentSearchActivePanel;
