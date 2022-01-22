import React from "react";
import { styled } from "@mui/material/styles";
import {  Grid, Paper } from "@mui/material"
import Fireman from "../assets/fireman.png"
import Firecart from "../assets/firecart.png"
import Commentaries from "../assets/commentaries.png"
import Technicalsupport from "../assets/technicalsupport.png"
import NotificationsIcon from '@mui/icons-material/Notifications';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useTranslation, Trans } from "react-i18next";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchRightBar = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <>
      {/* <Item
        sx={{
          backgroundColor: "#fff",
          padding: "0px 20px",
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
      </Item> */}


                        <div className="left_side" >
                            <div className="first">
                                <div className="logo_flex align">
                                    <div className="logo">
                                        <img src={Fireman} />
                                    </div>
                                    <div className="logo">
                                        <FireExtinguisherIcon sx={{ color: "#9095A3" }} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: "20px" }} className="logo_flex">
                                    <p>{t("Fireguard Training")}</p>
                                    <p>{t("Fire Extinguisher Training")}</p>
                                </div>
                                <div className="logo_flex align">
                                    <div className="logo">
                                        <LocalFireDepartmentIcon sx={{ color: "#9095A3" }} />

                                        {/* <img src={Fire} /> */}
                                    </div>
                                    <div className="logo">
                                        <NotificationsIcon sx={{ color: "#9095A3" }} />
                                    </div>
                                </div>
                                <div className="logo_flex">
                                    <p>{t("Fire Awareness Training")}</p>
                                    <p>{t("Fire alarm Drive")}</p>
                                </div>
                                <img className="firecart" src={Firecart} />
                            </div>
                            <div className="Compagnon">
                             <h4>{t("Companion")}</h4>
                             <div className="Compagnon_icons">
                             <img src={Commentaries} />
                             <p>{t("Comments")}</p>
                             </div>
                             <div className="Compagnon_icons">
                             <SlowMotionVideoIcon sx={{color:"#9095A2"}} />
                             <p>{t("Video tutorial")}</p>
                             </div>
                            </div>
                            <div style={{paddingLeft:"29px"}}  className="Compagnon">
                             <div className="notes">
                                 <DescriptionOutlinedIcon sx={{color:"#9095A2"}} />
                                 <p>{t("Notes")}</p>
                             </div>
                             <div className="notes notes_border">
                                 <ForumOutlinedIcon sx={{color:"#9095A2"}} />
                                 <p>{t("Chat")}</p>
                             </div>
                             <div className="notes">
                                 <img src={Technicalsupport}  />
                                 <p>Assistance</p>
                             </div>
                            
                            </div>
                            
                        </div>
                   
    </>
  );
};

export default EstablishmentSearchRightBar;
