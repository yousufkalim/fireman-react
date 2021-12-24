import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LeftBarTab from "../components/LeftBarTab";
import RightBarTab from "../components/RightBarTab";
import Header from "../components/Header";
import ActiveTabHeader from "./ActiveTabHeader";
import OpenSearchNewCases from "./openSearch/opensearchleftbar/opensearchnewcases/OpenSearchNewCases";
import OpenSearchCurrentCases from "./openSearch/opensearchleftbar/opensearchcurrentcases/OpenSearchCurrentCases";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Body = () => {
  const [activeSearch, setActiveSearch] = useState("newcases");
  const [responseData, setResponseData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeLink, setActiveLink] = useState(0);
  const getResponse = (data) => {
    setResponseData(data);
  };
  const getActiveTab = (activeTab) => {
    setActiveTab(activeTab);
  };
  return (
    <>
      {/* <Header /> */}
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
          {activeSearch === "currentcases" ? (
            <OpenSearchCurrentCases currentcasesData={responseData} />
          ) : (
            <>
              <ActiveTabHeader
                getActiveTab={getActiveTab}
                setActiveLink={setActiveLink}
                setActiveSearch={setActiveSearch}
                activeSearch={activeSearch}
              />
              {activeSearch === "newcases" ? <OpenSearchNewCases /> : null}
            </>
          )}
        </Grid>
        <Grid item xs={2}>
          <RightBarTab />
        </Grid>
      </Grid>
    </>
  );
};

export default Body;
