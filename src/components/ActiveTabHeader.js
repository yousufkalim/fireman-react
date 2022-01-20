import React, { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import OpenSearchInputHeader from "./openSearch/OpenSearchInputHeader";
import {UpdateStore} from '../StoreContext'
import {Store} from '../StoreContext'

import { dividerClasses, Grid, Paper } from "@mui/material"
import MobileStepper from '@mui/material/MobileStepper';
import NotificationsIcon from '@mui/icons-material/Notifications';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
const EstablishmentSearchActivePanel = ({setActiveLink}) => {
  const [activeTab, setActiveTab] = useState(0);
  const updatestore = UpdateStore()
  const store = Store()
  let [steps, setSteps] = useState(1)
  let [accordionData, setAccordionData] = useState([])
  console.log(store.activeNavbarTab);
  const items = [
    {
      text: "Ouverture",
    },
    {
      text: "Etablissement",
    },
    {
      text: "Implantation",
    },
    {
      text: "Construction",
    },
    {
      text: "Construction",
    },
    {
      text: "Dégagement",
    },
    {
      text: "Categorie",
    },
  ];
  const onClick = (activetabindex) => {
    setSteps(activetabindex+1)
    setActiveTab(activetabindex)
    updatestore({activeNavbarTab:activetabindex})
  };
  
  return (
    <>
      {/* <Box
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
      </Box> */}
       <Grid sx={{ margin:"auto"}}  xs={10}>
                        <div className="header_selection" >
                            {/* <a onClick={() => { setSteps(1) }} className="active">Ouverture</a>
                            <a onClick={() => { setSteps(2) }}>Etablissement</a>
                            <a onClick={() => { setSteps(3) }}>Implantation</a>
                            <a onClick={() => { setSteps(4) }}>Construction</a>
                            <a onClick={() => { setSteps(5) }}>Dégagement</a>
                            <a onClick={() => { setSteps(6) }}>Categorie</a> */}
                           {items.map((item, index) => {
                const className = activeTab === index || store.activeNavbarTab===index? "active" : "";
                return (
                  <div className="header_selection" 
                    //className={`unactive ${className}`}
                    
                    
                  >
                    <a onClick={() => onClick(index)}> {item.text} </a>
                  </div>
                );
              })}

                        </div>
                     
                        <MobileStepper
                            variant="progress"
                            steps={8}
                            position="static"
                            activeStep={steps}
                            sx={{flexGrow: 1, margin:"8px", padding:"0", width:"100%" }}
                        />
                
                    </Grid>
      <OpenSearchInputHeader />
    </>
  );
};

export default EstablishmentSearchActivePanel;