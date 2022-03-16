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
import { Divider } from '@mui/material';

const EstablishmentSearchActivePanel = ({sideBar}) => {
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
                     {/* <Divider/> */}
                    <Box className="prog-box" sx={{position:"relative", width:sideBar?"75%":"95%", marginLeft:"3%", marginBottom:"20px"}}> 
                      {/* <Box sx={{width:"100%", marginLeft:"8px", position:"absolute", border:"0.6px solid #C5D3DB"}}/> 
                       */}
                        {/* <MobileStepper
                            variant="progress"
                            steps={7}
                            position="static"
                            activeStep={store.activeNavbarTab ==="searchestablishment"? 1: store.activeNavbarTab+1}
                            sx={{flexGrow: 1, margin:"8px", padding:"0", width:"100%", background:"aliceblue"}}

                        /> */}
                        <progress style={{width:"100%", margin:"auto", background:"aliceblue"}} id="file" 
                        value={store.activeNavbarTab ==="searchestablishment" ||  
                        store.activeNavbarTab ==="currentcases" ||
                        store.activeNavbarTab==0  ? 0.7: store.activeNavbarTab==1?store.activeNavbarTab+0.3:store.activeNavbarTab } 
                        max="5"
                        > 
                        32% 
                        </progress>
                      
                </Box>
                    </Grid>
       
      }
       
    </>
  );
};

export default EstablishmentSearchActivePanel;