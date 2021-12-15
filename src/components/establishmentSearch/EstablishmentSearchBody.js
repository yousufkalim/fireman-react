import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EstablishmentSearchInputHeader from "./EstablishmentSearchInputHeader";
import EstablishmentSearchLeftBar from "./establishmentsearchleftbar/EstablishmentSearchLeftBar";
import EstablishmentSearchRightBar from "./establishmentsearchrightbar/EstablishmentSearchRightBar";
import EstablishmentSearchHeader from "./EstablishmentSearchHeader";
import EstablishmentSearchCurrentCases from "../establishmentSearch/establishmentsearchleftbar/establishmentsearchcurrentcases/EstablishmentSearchCurrentCases";
import EstablishmentSearchNewCases from "../establishmentSearch/establishmentsearchleftbar/establishmentsearchnewcases/EstablishmentSearchNewCases";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchBody = () => {
  const [activeSearch, setActiveSearch] = useState("newcases");
  const [responseData, setResponseData] = useState([]);
  const getResponse = (data) => {
    setResponseData(data);
  };
  return (
    <>
      <EstablishmentSearchHeader />
      <Grid
        sx={{ backgroundColor: "aliceblue", padding: "0px 20px" }}
        container
        spacing={2}
      >
        <Grid item md={12}></Grid>
        <Grid item xs={2}>
          <Item sx={{ height: "100%" }}>
            <EstablishmentSearchLeftBar
              setActiveSearch={setActiveSearch}
              getResponse={getResponse}
            />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <EstablishmentSearchInputHeader />
          {activeSearch === "newcases" ? <EstablishmentSearchNewCases /> : null}
          {activeSearch === "currentcases" ? (
            <EstablishmentSearchCurrentCases currentcasesData={responseData} />
          ) : null}
        </Grid>
        <Grid item xs={2}>
          <EstablishmentSearchRightBar />
        </Grid>
      </Grid>
    </>
  );
};

export default EstablishmentSearchBody;
