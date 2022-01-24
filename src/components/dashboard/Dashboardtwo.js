import Navbar from "../NavbarNew"
import { useState, useEffect } from "react";
import { dividerClasses, Grid, Paper } from "@mui/material"
import MobileStepper from '@mui/material/MobileStepper';
import Fireman from "../../assets/fireman.png"
import Firecart from "../../assets/firecart.png"
import Commentaries from "../../assets/commentaries.png"
import Technicalsupport from "../../assets/technicalsupport.png"
import Fire from "../../assets/fire.png"
import NotificationsIcon from '@mui/icons-material/Notifications';
import Implantation from "../Implantation/Implantation";
import SideBar from "../SideBar";
import api from "../../api";
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

const Dashboard = () => {
    let [steps, setSteps] = useState(1)
    let [accordionData, setAccordionData] = useState([])


    useEffect(() => {
        TabClick()
    }, [])
    const TabClick = () => {
        api("get", `/api/v1/checkList/tabs_checklist/${1}`).then((res) => {
            if (res.status == 200) {
                setAccordionData(res.data)
            }
        })
    }
    return (
        <>
            <div style={{ background: "#F5F9FD",paddingBottom:"30px" }}>
                <Navbar />
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={2}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={10}>
                        <div className="header_selection" >
                            <a onClick={() => { setSteps(1) }} className="active">Ouverture</a>
                            <a onClick={() => { setSteps(2) }}>Etablissement</a>
                            <a onClick={() => { setSteps(3) }}>Implantation</a>
                            <a onClick={() => { setSteps(4) }}>Construction</a>
                            <a onClick={() => { setSteps(5) }}>Dégagement</a>
                            <a onClick={() => { setSteps(6) }}>Categorie</a>
                        </div>
                        <MobileStepper
                            variant="progress"
                            steps={7}
                            position="static"
                            activeStep={steps}
                            sx={{ maxWidth: 100, flexGrow: 1 }}
                        />
                        <div>
                            <Implantation accordionData={accordionData} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
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
                                    <p>Garde-feu Entraînement</p>
                                    <p>Extincteur d'incendie Entraînement</p>
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
                                    <p>Sensibilisation au feu Entraînement</p>
                                    <p>Alarme incendie Entraînement</p>
                                </div>
                                <img className="firecart" src={Firecart} />
                            </div>
                            <div className="Compagnon">
                             <h4>Compagnon</h4>
                             <div className="Compagnon_icons">
                             <img src={Commentaries} />
                             <p>Commentaires</p>
                             </div>
                             <div className="Compagnon_icons">
                             <SlowMotionVideoIcon sx={{color:"#9095A2"}} />
                             <p>Tutoriel vidéo</p>
                             </div>
                            </div>
                            <div style={{paddingLeft:"29px"}}  className="Compagnon">
                             <div className="notes">
                                 <DescriptionOutlinedIcon sx={{color:"#9095A2"}} />
                                 <p>Notes</p>
                             </div>
                             <div className="notes notes_border">
                                 <ForumOutlinedIcon sx={{color:"#9095A2"}} />
                                 <p>Chat</p>
                             </div>
                             <div className="notes">
                                 <img src={Technicalsupport}  />
                                 <p>Assistance</p>
                             </div>
                            
                            </div>
                            
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Dashboard
