import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const FolderCreationSection = () => {
  const [dropdownValue, setdropdownValue] = useState({
    studytype: "",
    visittype: "",
    casetype: "",
    commission: "",
    commissiondate:"",
    inputsvalue:{}
  });
  const [inputValues, setInputValues] = useState({
    caseTypeId: "",
    commisionTypeId: "",
    agent: "",
    studyTypeId: "",
    visitTypeId: "",
    commissiondate: dropdownValue.commissiondate,
    group: "",
    service: "",
    caseFileId:""
  });

  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/Users/userprofile/${userId?.userid}`).then((res) =>
    setdropdownValue((preVal) => {
      return {
        ...preVal,
        inputsvalue: res,
      };
    })
    );
    api("get", "/api/v1/casetypes/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          casetype: res,
        };
      })
    );
    api("get", "/api/v1/studytype/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          studytype: res,
        };
      })
    );
    api("get", "/api/v1/visittype/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          visittype: res,
        };
      })
    );
    api("get", "/api/v1/commision/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          commission: res,
        };
      })
    );
    api("get", `/api/v1/casefiles/get_open_foldercreation/${3}`).then((res) =>
    setdropdownValue((preVal) => {
      return {
        ...preVal,
        commissiondate: res,
      };
    })
  );
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
    const handleSubmit = (e) => {
      e.preventDefault();
       
       var caseFileId = localStorage.getItem("establishmentid");
       const formdata = {...inputValues, caseFileId:caseFileId}
      api(
        "post",
        `/api/v1/casefiles/create_open_foldercreation`,formdata
      ).then((res) => console.log(res))
    };
  
  return (
    <> 
     <Item
            sx={{
              marginTop: "5px",
              borderLeft: "10px solid cadetblue",
              borderRadius: "10px",
            }}
          >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <h5>Documents durbanisme rattaches</h5>
        <span className="inputs-heading-text"> Reduire</span>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Grid item md={12}>
          <Item sx={{ boxShadow: "none" }}>
            <Typography
              align="start"
              variant="caption"
              display="block"
              gutterBottom
            >
              Saisai
            </Typography>
            <form
              className="establishment-form"
              type="submit"
              onSubmit={handleSubmit}
            >
              <div className="inputs-container">
                <div class="flex-form">
                  <input type="text" placeholder="Type" />
                  <select
                    className="dropdown"
                    type="select"
                    name="caseTypeId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    {dropdownValue.casetype.data?.map((item) => (
                      <option value={item.value}>{item.text}</option>
                    ))}
                  </select>
                </div>
                <div class="flex-form">
                  <input type="text" placeholder="Commission" />
                  <select
                    className="dropdown"
                    type="select"
                    name="commisionTypeId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Commission</option>
                    {dropdownValue.commission.data?.map((item) => (
                      <option value={item.value}>{item.text}</option>
                    ))}
                  </select>
                </div>
                <div class="flex-form">
                  <input type="text" placeholder="Agent" />
                  <input
                    type="search"
                    onChange={handleChange}
                    name="agent"
                    value={dropdownValue?.inputsvalue?.data?.firstName}
                    required
                  />
                </div>
              </div>
              <div className="inputs-container">
                <div class="flex-form">
                  <input type="text" placeholder="Study" />
                  <select
                    className="dropdown"
                    type="select"
                    name="studyTypeId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Study</option>
                    {dropdownValue.studytype.data?.map((item) => (
                      <option value={item.value}>{item.text}</option>
                    ))}
                  </select>
                </div>
                <div class="flex-form">
                  <input type="text" placeholder="Visit" />
                  <select
                    className="dropdown"
                    type="select"
                    name="visitTypeId"
                    onChange={handleChange}
                    required
                  >
                    {dropdownValue.visittype.data?.map((item) => (
                      <option value={item.value}>{item.text}</option>
                    ))}
                  </select>
                </div>
                <div class="flex-form">
                  <input type="text" placeholder="Commission Date" />
                  <input
                    type="search"
                    onChange={handleChange}
                    name="commissiondate"
                    value={dropdownValue?.commissiondate?.data?.commisionDate}
                    required
                  />
                </div>
                <div class="flex-form">
                  <input type="text" placeholder="Group" />
                  <input
                    type="search"
                    onChange={handleChange}
                    name="group"
                    value={dropdownValue?.inputsvalue?.data?.group}
                    required
                  />
                </div>
                <div class="flex-form">
                  <input type="text" placeholder="Service" />
                  <input
                    type="search"
                    onChange={handleChange}
                    name="service"
                    value={dropdownValue?.inputsvalue?.data?.service}
                    required
                  />
                </div>

                <Box>
                  <button
                    className="establishment-search-btn-submit"
                    type="submit"
                  >
                    {" "}
                    To Validate{" "}
                  </button>
                </Box>
              </div>
            </form>
          </Item>
        </Grid>
      </Box>
      </Item>
    </>
  );
};

export default FolderCreationSection;
