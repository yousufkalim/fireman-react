import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import OpenSearchFilterData from "./OpenSearchFilterData";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchNewCasesInputs = ({ setCompShow }) => {
  const [dropdownValue, setdropdownValue] = useState({
    city: "",
    status: "",
    ranking: "",
    classification: "",
  });
  const [establishmentSearchData, setEstablishmentSearchData] = useState([]);
  const [inputValues, setInputValues] = useState({
    refNum: "",
    commune: "",
    classification: "",
    steet: "",
    name: "",
    status: "",
    ranking: "",
  });
  useEffect(() => {
    api("get", "/api/v1/city/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          city: res,
        };
      });
    });
    api("get", "/api/v1/classification/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          classification: res,
        };
      })
    );
    api("get", "/api/v1/status/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          status: res,
        };
      })
    );
    api("get", "/api/v1/categoryranking/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          ranking: res,
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
    const obj = {
      ...inputValues,
      commune: inputValues.commune === "" ? 0 : inputValues.commune,
      classification:
        inputValues.classification === "" ? 0 : inputValues.classification,
      status: inputValues.status === "" ? 0 : inputValues.status,
      ranking: inputValues.ranking === "" ? 0 : inputValues.ranking,
    };
    api("post", `/api/v1/establishment/search`, obj).then((res) => {
      setEstablishmentSearchData(res);
    });
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
                  <div className="flex-form">
                    <input type="text" placeholder="Ref." disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="refNum"
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="name" disabled />
                    <input type="search" onChange={handleChange} name="name" />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Commune" disabled />
                    <select
                      className="dropdown"
                      type="select"
                      name="commune"
                      onChange={handleChange}
                    >
                      <option value="">Select communue</option>
                      {dropdownValue.city.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Street/Avenue" disabled />
                    <input type="search" onChange={handleChange} name="steet" />
                  </div>
                </div>
                <div className="inputs-container">
                  <div className="flex-form">
                    <input
                      type="text"
                      placeholder="Status"
                      name="status"
                      disabled
                    />
                    <select
                      className="dropdown"
                      type="select"
                      name="status"
                      onChange={handleChange}
                    >
                      <option value="">Select status</option>
                      {dropdownValue.status.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Classification" />
                    <select
                      className="dropdown"
                      type="select"
                      name="classification"
                      onChange={handleChange}
                    >
                      <option value="">Select Classification</option>
                      {dropdownValue.classification.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Box>
                    <div className="flex-form">
                      <input type="text" placeholder="Ranking" />
                      <select
                        className="dropdown"
                        type="select"
                        name="ranking"
                        onChange={handleChange}
                      >
                        <option value="">Select Ranking</option>
                        {dropdownValue.ranking.data?.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="establishment-search-btn-submit"
                      type="submit"
                    >
                      {" "}
                      Search{" "}
                    </button>
                  </Box>
                </div>
              </form>
              {establishmentSearchData.data ? (
                <OpenSearchFilterData
                  establishmentSearchData={establishmentSearchData}
                  setCompShow={setCompShow}
                />
              ) : null}
            </Item>
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchNewCasesInputs;
