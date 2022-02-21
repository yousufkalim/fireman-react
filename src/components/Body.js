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
import FolderCreationContainer from './openSearch/opensearchleftbar/opensearchnewcases/FolderCreationContainer';
import EndedCases from './openSearch/opensearchleftbar/opensearchendedcases/EndedCases';
import Home from "./home";
import Profile from "./profile";
import SideBar from "./SideBar";
import TeamManagement from "../components/TeamManagement"
import NavbarDashBoard from '../components/NavbarDashBoard'
const Body = () => {
  const [responseData, setResponseData] = useState([]);
  const [sideBar, setSideBar] = useState(false)
  const getResponse = (data) => {
    setResponseData(data);
  };
  const updatestore = UpdateStore()
  useEffect(() => {
    updatestore({
      activeCase: "newcase",
      activeNavbarTab: "termine"
    })
  }, [])

   
  const store = Store()
  console.log(store);
  return (
    <>
   {store.activeNavbarTab === "termine"?  <NavbarDashBoard />:null }  
   {store.activeNavbarTab === "termine"? "":    <NavbarNew/> }
      <>
        <div className={store.activeNavbarTab === "termine" || store.activeNavbarTab === 10 || store.activeNavbarTab == "profile" ? "mainhome" : ""}>

          <Grid item xs={12} sx={{ background: "aliceblue" }}>

            {
              store.catTab
              ?
              <ActiveTabHeader />
                :
                <>
                <br />
                <br />
               
              </>
            }
          </Grid>
          <Grid
            sx={{ backgroundColor: "aliceblue" }}
            container
            spacing={2}
          >
            <Grid item xs={1}>
              {/* <SideBar /> */}
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
          // {store.activeNavbarTab==="multimedia"? <OpenSearchNewCases/>:null}
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
                    <Grid item xs={sideBar? 8 : 10}>
                      {/* {store.activeNavbarTab===0? <FolderCreationSection/>:null} */}
                      {store.activeNavbarTab === 1 ? <EstablishmentSearchContainer /> : null}
                      {store.activeNavbarTab === "currentcases" ? <OpenSearchCurrentCases currentcasesData={responseData} /> : null}
                      {store.activeNavbarTab === 2 ? <Implantation /> : null}
                      {store.activeNavbarTab === 0 || store.activeNavbarTab === "termine" ? <FolderCreationContainer /> : null}
                      {store.activeNavbarTab === "searchestablishment" ? <OpenSearchNewCases /> : null}
                      {store.activeNavbarTab === "multimedia" ? "En cours de développement" : null}
                      {store.activeNavbarTab === "newcases" ? <EndedCases endedcases={responseData} /> : null}
                      {store.activeNavbarTab === "annuaire" ? <OpenSearchNewCases /> : null}
                      {store.activeNavbarTab === "team" ? <TeamManagement /> : null}

                    </Grid>
                    <Grid item xs={sideBar? 3: 1}>
                      <RightBarTab sideBar={sideBar} setSideBar={setSideBar}/>
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