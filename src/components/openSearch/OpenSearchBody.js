import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LeftBarTab from "../LeftBarTab";
import RightBarTab from "../RightBarTab";
import Header from "../Header";
import OpenSearchCurrentCases from "./opensearchleftbar/opensearchcurrentcases/OpenSearchCurrentCases";
import OpenSearchNewCases from "./opensearchleftbar/opensearchnewcases/OpenSearchNewCases";
import ActiveTabHeader from "../ActiveTabHeader";
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
      <Header />
      <Grid
        sx={{ backgroundColor: "aliceblue", padding: "0px 20px" }}
        container
        spacing={2}
      >
        <Grid item xs={2}>
          <Item sx={{ height: "100%" }}>
            <LeftBarTab
              setActiveSearch={setActiveSearch}
              getResponse={getResponse}
            />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <ActiveTabHeader />
          {activeSearch === "newcases" ? <OpenSearchNewCases /> : null}
          {activeSearch === "currentcases" ? (
            <OpenSearchCurrentCases currentcasesData={responseData} />
          ) : null}
        </Grid>
        <Grid item xs={2}>
          <RightBarTab />
        </Grid>
      </Grid>
    </>
  );
};

export default EstablishmentSearchBody;
