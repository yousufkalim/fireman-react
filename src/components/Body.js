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
import { Store } from '../StoreContext'
import { UpdateStore } from '../StoreContext'
import Dashboard from './dashboard/Dashboard';
import FolderCreationSection from './openSearch/opensearchleftbar/opensearchnewcases/FolderCreationSection';
import EndedCases from './openSearch/opensearchleftbar/opensearchendedcases/EndedCases';
import Home from "./home";
import Profile from "./profile";
const Body = () => {
  const [responseData, setResponseData] = useState([]);
  const getResponse = (data) => {
    setResponseData(data);
  };
  const updatestore = UpdateStore()
  useEffect(() => {
    updatestore({
      activeCase: "newcase"
    })
  }, [])


  const store = Store()
  return (
    <> 
    <NavbarNew />
    <>     
    <div className={store.activeNavbarTab === "termine" || store.activeNavbarTab === 10 || store.activeNavbarTab == "profile" ? "mainhome":""}>
     
      <Grid item xs={12} sx={{ background: "aliceblue" }}>
     
      {
        store.activeNavbarTab === "termine" || store.activeNavbarTab === 10 || store.activeNavbarTab == "profile" ?
        <>
        <br />
        <br />
        <br />
        <br />
      </>
          :
            <ActiveTabHeader />
      }
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
       
{/* <<<<<<< HEAD
            <LeftBarTab
              getResponse={getResponse}
            />
        </Grid>
        <Grid item xs={8}>
          {store.activeNavbarTab===1? <EstablishmentSearchContainer/>:null }
          {store.activeNavbarTab==="currentcases"?  <OpenSearchCurrentCases currentcasesData={responseData} />:null}
          {store.activeNavbarTab===2?  <Implantation/>:null}
          {store.activeNavbarTab===10?  <Dashboard/>:null}
          {store.activeNavbarTab==="multimedia"? <OpenSearchNewCases/>:null}
          {store.activeNavbarTab==="termine"|| store.activeNavbarTab===0? <FolderCreationSection/>:null}
          {store.activeNavbarTab==="newcases"? <EndedCases endedcases={responseData} />:null}
        </Grid>
        <Grid item xs={3}>
          <RightBarTab />
=======
          <LeftBarTab
            getResponse={getResponse}
          />
>>>>>>> 749d00fb403c9a9bbb61731639dd124743650690
        </Grid> */}
        {
          store.activeNavbarTab === "termine" || store.activeNavbarTab === 10 ? <Home />
            :
            store.activeNavbarTab == "profile" ? <Profile />
              :
              <>
                <Grid item xs={8}>
                {store.activeNavbarTab===1? <EstablishmentSearchContainer/>:null }
                {store.activeNavbarTab==="currentcases"?  <OpenSearchCurrentCases currentcasesData={responseData} />:null}
                {store.activeNavbarTab===2?  <Implantation/>:null}
          {store.activeNavbarTab==="multimedia"? <OpenSearchNewCases/>:null}
          {store.activeNavbarTab==="newcases"? <EndedCases endedcases={responseData} />:null}
                </Grid>
                <Grid item xs={3}>
                  <RightBarTab />
                </Grid>
              </>
        }
      
      </Grid>
      </div>
      </>
      </>

  
  );
};

export default Body;