import React, { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import OpenSearchInputHeader from "./openSearch/OpenSearchInputHeader";
import {UpdateStore} from '../StoreContext'
import {Store} from '../StoreContext'
const EstablishmentSearchActivePanel = ({setActiveLink}) => {
  const [activeTab, setActiveTab] = useState(0);
  const updatestore = UpdateStore()
  const store = Store()

  console.log(store.activeNavbarTab);
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
  const onClick = (activetabindex) => {
    setActiveTab(activetabindex)
    updatestore({activeNavbarTab:activetabindex})
  };
  
  return (
    <>
      <Box
        sx={{ flexGrow: 1, backgroundColor: "aliceblue" }}
      >
        <AppBar
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "100%",
            margin: "auto",
            boxShadow: "none",
            color: "#000000",
            paddingBottom:"20px"
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
              {items.map((item, index) => {
                const className = activeTab === index || store.activeNavbarTab===index? "active" : "";
                return (
                  <Box
                    className={`unactive ${className}`}
                    onClick={() => onClick(index)}
                    sx={{
                      display: "flex",
                      fontSize: "20px",
                      borderRight: "1px solid lightgray",
                       padding:"10px 20px"
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
    </>
  );
};

export default EstablishmentSearchActivePanel;