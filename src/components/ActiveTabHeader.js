import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { UpdateStore } from "../StoreContext";
import { Store } from "../StoreContext";
import { Grid } from "@mui/material";
import api from "../api/index";
import { useTranslation } from "react-i18next";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const EstablishmentSearchActivePanel = ({ sideBar }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [value, setValue] = React.useState(0);
  const [TabData, setTabData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const updatestore = UpdateStore();
  const store = Store();
  useEffect(() => {
    getTabData();
  }, []);

  const getTabData = () => {
    api("get", "/api/v1/categories/getall").then((res) => {
      setTabData(res?.data);
      console.log(res, "tabs");
    });
  };

  const items = [
    {
      text: "Opening",
    },
    {
      text: "Establishment",
    },
  ];
  const tabChange = (activetabindex, implantationDataId, orderno) => {
    console.log(activetabindex, implantationDataId, orderno);
    updatestore({ 
      activeNavbarTab:orderno? orderno+1 : activetabindex, 
      implantationDataid: implantationDataId,
      implantaion:orderno? true:"",
      Orderno:orderno+2,
      filterOrderno:""
    });
    setActiveTab(activetabindex);
  };
  return (
    <>
      {
        <Grid sx={{ margin: "auto" }} xs={10}>
          {/* <div className="header_selection">
            {items.map((item, index) => {
              const className =
                activeTab === index || store?.activeNavbarTab === index
                  ? "active"
                  : "";
              return (
                <div className="header_selection">
                  <a onClick={() => onClick(index)}> {t(item.text)} </a>
                </div>
              );
            })}
          </div> */}
          {/* <Divider/> */}
          <Box sx={{ 
          width: sideBar ? "80%" : "97%",
          margin: sideBar ? "" : "auto",
          bgcolor: "#E9E9E9" 
          }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {items?.map((val, index) => (
                <Tab
                  sx={{
                    color: "#9095a3",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "12px",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  // id={index}
                  label={t(val?.text)}
                  onClick={()=>tabChange(index)}
                />
              ))}
              {
              TabData?.map((val) => (
                <Tab
                sx={{
                  color: "#9095a3",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "12px",
                  display: "inline-block",
                  cursor: "pointer",
                }}
                  // id={val?.sectionCategoryId}
                  onClick={()=> tabChange(2,val?.sectionCategoryId, val?.orderNum)}
                  label={val?.name?val?.name:"...loading..."}
                />
              ))
            }
            </Tabs>
          </Box>
          <Box
            className="prog-box"
            sx={{
              position: "relative",
              width: sideBar ? "75%" : "95%",
              marginLeft: "3%",
              marginBottom: "20px",
            }}
          >
            <progress
              style={{ width: "100%", margin: "auto", background: "#e9e9e9" }}
              id="file"
              value={
                store.activeNavbarTab === "searchestablishment" ||
                store.activeNavbarTab === "currentcases" ||
                store.activeNavbarTab == 0? 1: store.activeNavbarTab == 1? store.activeNavbarTab + 1.5: store.activeNavbarTab+2
              }
              max={TabData?.length+2.5}
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
