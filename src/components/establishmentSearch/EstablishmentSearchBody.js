import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EstablishmentSearchInputHeader from "./EstablishmentSearchInputHeader";
import EstablishmentSearchInputs from "./EstablishmentSearchInputs";
import EstablishmentSearchLeftBar from "./establishmentsearchleftbar/EstablishmentSearchLeftBar";
import EstablishmentSearchRightBar from "./establishmentsearchrightbar/EstablishmentSearchRightBar";
import EstablishmentSearchHeader from "./EstablishmentSearchHeader";
import EstablishmentSearchCurrentCases from "./establishmentsearchleftbar/EstablishmentSearchCurrentCases";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchBody = () => {
  const [activeSearch, setActiveSearch] = useState(true);
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
          <Item
            sx={{
              marginTop: "5px",
              borderLeft: "10px solid green",
              borderRadius: "10px",
            }}
          >
            <EstablishmentSearchInputHeader />
          </Item>
          {activeSearch ? (
            <Item
              sx={{
                marginTop: "5px",
                borderLeft: "10px solid cadetblue",
                borderRadius: "10px",
              }}
            >
              <EstablishmentSearchInputs />
            </Item>
          ) : (
            <EstablishmentSearchCurrentCases currentcasesData={responseData} />
          )}
        </Grid>
        <Grid item xs={2}>
          <EstablishmentSearchRightBar />
        </Grid>
      </Grid>
    </>
  );
};

export default EstablishmentSearchBody;
