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
const Body = () => {
  const [responseData, setResponseData] = useState([]);
  const getResponse = (data) => {
    setResponseData(data);
  };
  const updatestore = UpdateStore()
 useEffect(() => {
  updatestore({
    activeCase:"newcase"
  })
 }, [])

 const store = Store()
  return (
    <>
      <NavbarNew/>
      <Grid item xs={12} sx={{background:"aliceblue"}}>
      <ActiveTabHeader/>
      </Grid>
      <Grid
        sx={{ backgroundColor: "aliceblue" }}
        container
        spacing={2}
      >
        <Grid item xs={1}>
            <LeftBarTab
              getResponse={getResponse}
            />
        </Grid>
        <Grid item xs={8}>
          {store.activeNavbarTab===1? <EstablishmentSearchContainer/>:null }
          {store.activeNavbarTab==="currentcases"?  <OpenSearchCurrentCases currentcasesData={responseData} />:null}
          {store.activeNavbarTab===2?  <Implantation/>:null}
          {store.activeNavbarTab==="newcases" || store.activeNavbarTab===0? <OpenSearchNewCases/>:null}

        </Grid>
        <Grid item xs={3}>
          <RightBarTab />
        </Grid>
      </Grid>
    </>
  );
};

export default Body;