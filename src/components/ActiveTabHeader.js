import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import {UpdateStore} from '../StoreContext'
import {Store} from '../StoreContext'
import { Grid } from "@mui/material"
import api from '../api/index'
import { useTranslation } from "react-i18next";

const EstablishmentSearchActivePanel = ({sideBar}) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const [activeTab, setActiveTab] = useState(0);
  const updatestore = UpdateStore()
  const store = Store()
  let [steps, setSteps] = useState(1)
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
    setActiveTab(activetabindex)
  };
  
  return (
    <>
      {
       
        <Grid sx={{ margin:"auto"}}  xs={10}>
          
                        <div className="header_selection" >
                           {items.map((item, index) => {
                const className = activeTab === index || store?.activeNavbarTab===index? "active" : "";
                return (
                  <div className="header_selection" 
                  >
                    <a onClick={() => onClick(index)}> {t(item.text)} </a>
                  </div>
                );
              })}
                        </div>
                     {/* <Divider/> */}
                    <Box className="prog-box" sx={{position:"relative", width:sideBar?"75%":"95%", marginLeft:"3%", marginBottom:"20px"}}>       
                        <progress style={{width:"100%", margin:"auto", background:"#e9e9e9"}} id="file" 
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