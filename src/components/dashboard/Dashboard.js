import Navbar from "../NavbarNew"
import { useState } from "react";
import { dividerClasses, Grid, Paper } from "@mui/material"
import FileIcon from '../../assets/fileicon.svg';
import SvgIcon from "@material-ui/core/SvgIcon";
import MobileStepper from '@mui/material/MobileStepper';
import { styled } from "@mui/material/styles";
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Etablissement from "../Etablissement";


const Dashboard = () => {
    let [steps, setSteps] = useState(1)
    return (
        <>
            <div style={{ background: "#F5F9FD",height:"100vh" }}>
                <Navbar />
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={2}>
                        <div className="side_bar">
                            <HomeIcon />
                            <p>ACCUEIL</p>
                            <div className="sidebarIcons">
                                <div className="logo"></div>
                                <p>EN COURS</p>
                            </div>
                            <div className="sidebarIcons">
                                <div className="termine"></div>
                                <p>TERMINÉ</p>
                            </div>
                            <div className="sidebarIcons">
                                <div className="annuaire"></div>
                                <p>ANNUAIRE</p>
                            </div>
                            <SubscriptionsIcon />
                            <p>MULTIMÉDIA</p>
                        </div>
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
                         <Etablissement />
                            </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ border: "1px solid black" }}>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Dashboard
