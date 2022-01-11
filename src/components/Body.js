import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LeftBarTab from "../components/LeftBarTab";
import RightBarTab from "../components/RightBarTab";
import ActiveTabHeader from "./ActiveTabHeader";
import OpenSearchNewCases from "./openSearch/opensearchleftbar/opensearchnewcases/OpenSearchNewCases";
import OpenSearchCurrentCases from "./openSearch/opensearchleftbar/opensearchcurrentcases/OpenSearchCurrentCases";
import EstablishmentSearchContainer from './establishmentsearch/EstablishmentSearchContainer'
import Navbar from './Navbar'
import { styled } from "@mui/material/styles";
import {Store} from '../StoreContext'
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Body = () => {
  const [responseData, setResponseData] = useState([]);
  const getResponse = (data) => {
    setResponseData(data);
  };
 const store = Store()
  return (
    <>
      <Navbar/>
      <ActiveTabHeader/>
      <Grid
        sx={{ backgroundColor: "aliceblue", padding: "0px 20px" }}
        container
        spacing={2}
      >
        <Grid item xs={2}>
          <Item sx={{ height: "100%" }}>
            <LeftBarTab
              getResponse={getResponse}
            />
          </Item>
        </Grid>
        <Grid item xs={8}>
          {store.activeNavbarTab===1? <EstablishmentSearchContainer/>:null }
          {store.activeNavbarTab==="currentcases"?  <OpenSearchCurrentCases currentcasesData={responseData} />:null}
          {/* {store.activeNavbarTab==="currentcases" && store.activeNavbarTab===1?  <OpenSearchCurrentCases currentcasesData={responseData} />:null} */}
          {store.activeNavbarTab==="newcases" || store.activeNavbarTab===0? <OpenSearchNewCases/>:null}
        </Grid>
        <Grid item xs={2}>
          <RightBarTab />
        </Grid>
      </Grid>
    </>
  );
};

export default Body;