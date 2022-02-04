import React, { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {UpdateStore} from '../StoreContext'
import {Store} from '../StoreContext'
import { dividerClasses, Grid, Paper } from "@mui/material"
import MobileStepper from '@mui/material/MobileStepper';
import { useTranslation, Trans } from "react-i18next";
import Dashboard from './home/index';


const EstablishmentSearchActivePanel = ({setActiveLink}) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const [activeTab, setActiveTab] = useState(0);
  const updatestore = UpdateStore()
  const store = Store()
  let [steps, setSteps] = useState(1)
  let [accordionData, setAccordionData] = useState([])
  const items = [
    {
      text: "Opening",
    },
    {
      text: "Establishment",
    },
    {
      text: "Location",
    },
    {
      text: "Construction",
    },
    {
      text: "Clearance",
    },
    {
      text: "Category",
    },
  ];
  const onClick = (activetabindex) => {
    updatestore({activeNavbarTab:activetabindex})
    setSteps(activetabindex+1)
    setActiveTab(activetabindex)
    
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
      {
      
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
                    <a onClick={() => onClick(index)}> {t(item.text)} </a>
                  </div>
                );
              })}

                        </div>
                     
                        <MobileStepper
                            variant="progress"
                            steps={8}
                            position="static"
                            activeStep={store.activeNavbarTab}
                            sx={{flexGrow: 1, margin:"8px", padding:"0", width:"100%" }}
                        />
                
                    </Grid>
       
      }
       
    </>
  );
};

export default EstablishmentSearchActivePanel;