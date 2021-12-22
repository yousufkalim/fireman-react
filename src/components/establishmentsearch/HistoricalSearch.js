import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../api/index";
import CreateHistoricalData from "./CreateHistoricalData";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HistoricalSearch = () => {
  const [HistoricalCompState, setHistoricalCompState] = useState(false);
  const [dropdownValue, setdropdownValue] = useState({
    tracktype: "",
    status: "",
    cityId: "",
  });
  const [inputValues, setInputValues] = useState({
    establishmentId: 0,
    establishmentName: "",
    statusId: "",
    cityId: "",
    trackTypeId: "",
    zipCode: "",
    channelName: "",
    estNumber: "hf",
    securityManagerName: "",
    securityManagerLastName: "",
    securityManagerMobile: "",
    securityManagerEmail: "",
  });
  useEffect(() => {
    api("get", "/api/v1/status/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          status: res,
        };
      });
    });
    api("get", "/api/v1/tracktype/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          tracktype: res,
        };
      })
    );
    api("get", "/api/v1/city/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          cityId: res,
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
    console.log("inputValues", inputValues);
    api("post", `/api/v1/create_generaldata_establishment`, inputValues).then(
      (res) => {
        console.log("res", res.status);
        if (res.status === 200) {
          setHistoricalCompState(true);
        }
      }
    );
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
                    <input type="text" placeholder="Status" disabled />
                    <select
                      className="dropdown"
                      type="select"
                      name="statusId"
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
                    <input type="text" placeholder="tracktype" disabled />
                    <select
                      className="dropdown"
                      type="select"
                      name="trackTypeId"
                      onChange={handleChange}
                    >
                      <option value="">Select track type</option>
                      {dropdownValue.tracktype.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-form">
                    <input
                      type="text"
                      placeholder="Name Establishment"
                      disabled
                    />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="establishmentName"
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Commune" disabled />
                    <select
                      className="dropdown"
                      type="select"
                      name="cityId"
                      onChange={handleChange}
                    >
                      <option value="">Select track type</option>
                      {dropdownValue.cityId.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="CP" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="zipCode"
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="name" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerLastName"
                    />
                  </div>

                  <div className="flex-form">
                    <input type="text" placeholder="Mobile" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="mobile"
                    />
                  </div>
                </div>
                <div className="inputs-container">
                  <div className="flex-form">
                    <input type="text" placeholder="Channel Name" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="channelName"
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Number" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerMobile"
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="First Name" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerName"
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Mail" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerEmail"
                    />
                  </div>
                  <Box>
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
            </Item>
            {HistoricalCompState ? <CreateHistoricalData /> : null}
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default HistoricalSearch;
