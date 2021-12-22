import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import api from "../../../../api/index";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchStudyForm = ({
  indexdata,
  CompName,
  townplanning,
  study,
  casefileId,
  setCheckboxObj,
  postCheckboxesData,
}) => {
  const [toggleUpdateTabs, setToggleUpdateTabs] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );
  const [toggleUpdateTabstwo, setToggleUpdateTabstwo] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );

  const [formValues, setFormValues] = useState({
    originId: "",
    caseAverageId: "",
    townPlanningDate: "",
    receptionServiceDate: "",
    requestTypeId: "",
    refNum: "",
    applicant: "",
    mobile: "",
    email: "",
  });
  const [dropdownValue, setdropdownValue] = useState({
    average: "",
    origin: "",
    requesttype: "",
  });
  const onClickTownPlanning = () => {
    setToggleUpdateTabs(!toggleUpdateTabs);
  };

  const onClickdetailsObj = () => {
    setToggleUpdateTabstwo(!toggleUpdateTabstwo);
  };

  useEffect(() => {
    api("get", "/api/v1/averagetype/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          average: res,
        };
      });
    });
    api("get", "/api/v1/origin/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          origin: res,
        };
      });
    });
    api("get", "/api/v1/requesttype/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          requesttype: res,
        };
      });
    });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
      const obj = {
        caseFileCheckListId: id,
        caseFileId: casefileId,
      };
      setCheckboxObj((pre) => [...pre, obj]);
    }
    if (!checked) {
      setCheckboxObj((pre) => [
        ...pre.filter((item) => item.caseFileCheckListId !== id),
      ]);
    }
    setFormValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...formValues,
      caseFileId: casefileId,
    };
    postCheckboxesData();
    api("post", `/api/v1/casefiles/open_townplanning`, formData)
      .then((res) => {
        toast.success(res?.statusText);
      })
      .catch((err) => toast.error(err?.statusText));
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
          onClick={onClickTownPlanning}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid gray",
            padding: "10px",
          }}
        >
          <h5>Related town planning documents</h5>
          <div>
            {indexdata?.sectionindex === 1 ? <CheckIcon /> : null}

            <span className="inputs-heading-text"> Reduire</span>
          </div>
        </Box>
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Grid
            className={`${
              CompName === "currentcases" && toggleUpdateTabs
                ? "formhide"
                : "formdisplay"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <div className="establishment-form ">
                <div className="inputs-container">
                  <div class="flex-form">
                    <input type="text" placeholder="Origin" />
                    <select
                      className="dropdown"
                      type="select"
                      name="originId"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Origin</option>
                      {dropdownValue?.origin?.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Dated" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="townPlanningDate"
                      type="date"
                      required
                    />
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Name" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="applicant"
                      required
                    />
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Request type" />
                    <select
                      className="dropdown"
                      type="select"
                      name="requestTypeId"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Request Type</option>
                      {dropdownValue.requesttype.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="inputs-container">
                  <div class="flex-form">
                    <input type="text" placeholder="Average" />
                    <select
                      className="dropdown"
                      type="select"
                      name="caseAverageId"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Average</option>
                      {dropdownValue.average.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Reception Service" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="receptionServiceDate"
                      type="date"
                      required
                    />
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Ref." />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="refNum"
                      required
                    />
                  </div>

                  <div class="flex-form">
                    <input type="text" placeholder="Mobile" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="mobile"
                      required
                    />
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Mail" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="email"
                      required
                    />
                  </div>
                </div>
              </div>
              <Box>
                <Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      borderBottom: "1px solid gray",
                      padding: "10px",
                    }}
                  ></Box>
                  {townplanning?.map((item) => (
                    <>
                      <h5> {item.checkHeadingName}</h5>
                      {item?.chkList?.map((val) => (
                        <div className="checkbox-container">
                          <input
                            className="study-form-checkbox"
                            type="checkbox"
                            name="checkbox"
                            for="checkbox"
                            id={val.caseFileCheckListId}
                            onChange={handleChange}
                          />
                          <label for="checkbox"> {val.name}</label> <br />
                        </div>
                      ))}
                    </>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ textAlign: "end" }}>
                <button
                  type="submit"
                  className="establishment-search-btn-submit"
                >
                  {" "}
                  To Validate{" "}
                </button>
              </Box>
            </form>
          </Grid>
        </Box>
      </Item>
      <Item
        sx={{
          marginTop: "5px",
          borderLeft: "10px solid cadetblue",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Grid>
            <Box
              onClick={onClickdetailsObj}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid gray",
                padding: "10px",
              }}
            >
              <h5>Details of the object</h5>
              <div>
                <span className="inputs-heading-text"> Reduire</span>
              </div>
            </Box>
            <Box
              className={`${
                CompName === "currentcases" && toggleUpdateTabstwo
                  ? "formdisplay"
                  : "formdisplay"
              }`}
            >
              {study?.map((item) => (
                <>
                  <h5> {item.checkHeadingName}</h5>
                  {item?.chkList?.map((val) => (
                    <div className="checkbox-container">
                      <input className="study-form-checkbox" type="checkbox" />
                      <label for="checkbox"> {val.name}</label> <br />
                    </div>
                  ))}
                </>
              ))}
            </Box>
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchStudyForm;
