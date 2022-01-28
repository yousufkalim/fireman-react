import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import LeftBarTab from "../components/LeftBarTab";
import RightBarTab from "../components/RightBarTab";
import ActiveTabHeader from "./ActiveTabHeader";
import OpenSearchNewCases from "./openSearch/opensearchleftbar/opensearchnewcases/OpenSearchNewCases";
import OpenSearchCurrentCases from "./openSearch/opensearchleftbar/opensearchcurrentcases/OpenSearchCurrentCases";
import EstablishmentSearchContainer from './establishmentsearch/EstablishmentSearchContainer'
import Implantation from './Implantation/index'
import NavbarNew from './NavbarNew'
import {Store} from '../StoreContext'
import {UpdateStore} from '../StoreContext'
import Dashboard from './dashboard/Dashboard';
import Home from "./home"
import Profile from "./profile";





const Accuceil = () => {
  const [responseData, setResponseData] = useState([]);
  const getResponse = (data) => {
    setResponseData(data);
  };
  const updatestore = UpdateStore()
 useEffect(() => {
  updatestore({
    activeCase:"1"
  })
 }, [])

 const store = Store()
  return (
    <>
      <NavbarNew/>
      <Grid item xs={12} sx={{background:"aliceblue"}}>
      </Grid>
      <Grid
        sx={{ backgroundColor: "aliceblue",marginTop:"70px" }}
        container
        spacing={2}
      >
        <Grid item xs={1}>
            <LeftBarTab
              getResponse={getResponse}
            />
        </Grid>
        {
          store.activeNavbarTab==="newcases"?
          <>
          <Grid item xs={8}>
          {store.activeNavbarTab==="newcases"? <OpenSearchNewCases/>:null}          
          </Grid>
          <Grid item xs={3}>
            <RightBarTab />
          </Grid>
          </>
          :
          ''
        }
         {store.activeNavbarTab==="termine"|| store.activeNavbarTab===0? <Home /> :null}
      {store.activeNavbarTab=="profile"? <Profile /> :null}          
      </Grid>
    </>
  );
};

export default Accuceil;