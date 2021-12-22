import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";
import OpenSearchStudyForm from "./OpenSearchStudyForm";
import OpenSearchVisitForm from "./OpenSearchVisitForm";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const FolderCreationSection = ({
  CompName,
  indexdata,
  currentcasescaseFileId,
  currentcasescaseTypeId,
  currentcasescommisionTypeId,
  currentcasesstudyTypeId,
  currentcasesvisitTypeId,
  currentcasescommisionDate,
}) => {
  const [checkboxObj, setCheckboxObj] = useState([]);
  const [doneIconState, setdoneIconState] = useState({
    iconState: false,
    accordianState: false,
  });
  const [dropdownValue, setdropdownValue] = useState({
    studytype: "",
    visittype: "",
    casetype: "",
    commission: "",
    commissiondate: "",
    inputsvalue: {},
  });
  const [state, setstate] = useState({
    townObj: [],
    study: [],
    visit: [],
  });
  const [inputValues, setInputValues] = useState({
    caseTypeId: "",
    commisionTypeId: "",
    agent: "",
    studyTypeId: "",
    visitTypeId: "",
    group: "",
    service: "",
    caseFileId: "",
    caseid: "",
  });
  const [inputDisableState, setInputDisableState] = useState("");
  const focusPoint = useRef(null);
  useEffect(() => {
     CompName==="currentcases"? 
     (focusPoint.current.style.display = "none"):
     (focusPoint.current.style.display = "block")
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
    api("get", "/api/v1/casefiles/casefile_checklist/0").then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          townObj: res.data,
        };
      });
    });
    api("get", "/api/v1/casefiles/casefile_checklist/1").then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          visit: res.data,
        };
      });
    });
    api("get", "/api/v1/casefiles/casefile_checklist/2").then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          study: res.data,
        };
      });
    });
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
    if (
      (value === "1" && name === "caseTypeId") ||
      (value === "2" && name === "caseTypeId") ||
      (value === "3" && name === "caseTypeId")
    ) {
      setInputDisableState(value);
    }
    setInputValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  console.log(CompName,indexdata?.sectionindex);
  const handleSubmit = (e) => {
    e.preventDefault();
    ////////////for new cases//////////
    if (!currentcasescaseFileId) {
      let caseFileId = localStorage.getItem("establishmentid");
      let userdata = localStorage.getItem("userData");
      userdata = JSON.parse(userdata);
      const formdata = {
        ...inputValues,
        caseFileId: caseFileId,
        userid: userdata.userid,
        visitTypeId:
          inputValues.visitTypeId === "" ? 0 : inputValues.visitTypeId,
        studyTypeId:
          inputValues.studyTypeId === "" ? 0 : inputValues.studyTypeId,
      };
      api("post", `/api/v1/casefiles/create_open_foldercreation`, formdata)
        .then((res) => {
          setInputValues((preVal) => {
            return {
              ...preVal,
              caseid: res.data,
            };
          });
          if (res.status === 200) {
            setdoneIconState(() => {
              return {
                accordianState: !doneIconState.accordianState,
                iconState: true,
              };
            });
            console.log(CompName,indexdata.sectionindex);
              doneIconState.accordianState
              ? (focusPoint.current.style.display = "block")
              : (focusPoint.current.style.display = "none");
          }

          toast.success(res?.statusText);
        })
        .catch((err) => toast.error(err?.statusText));
    }
    ////////////for current cases update//////////

    if (currentcasescaseFileId) {
      let userId = localStorage.getItem("userData");
      userId = JSON.parse(userId);
      const updatedObj = {
        caseFileId: currentcasescaseFileId,
        caseTypeId: currentcasescaseTypeId,
        commisionTypeId: currentcasescommisionTypeId,
        visitTypeId: currentcasesvisitTypeId,
        commisionDate: currentcasescommisionDate,
      };
      console.log("updatedObj", updatedObj);
      api("put", "/api/v1/casefiles/update_open_foldercreation", updatedObj)
        .then((res) => {
          console.log("updateres", res);
          if (res.status === 200) {
            setInputValues((preVal) => {
              return {
                ...preVal,
                caseid: res.data,
              };
            });
            setdoneIconState(() => {
              return {
                accordianState: !doneIconState.accordianState,
                iconState: true,
              };
            });
            doneIconState.accordianState
              ? (focusPoint.current.style.display = "block")
              : (focusPoint.current.style.display = "none");
          }
        })
        .catch((err) => {
          console.log("updateerr", err);
        });
    }
  };

  /////////////////
  const onClickDoneIcon = () => {
    setdoneIconState((preVal) => {
      return {
        ...preVal,
        accordianState: !doneIconState.accordianState,
      };
    });
    doneIconState.accordianState ? (focusPoint.current.style.display = "block")
      : (focusPoint.current.style.display = "none");
  };
  const postCheckboxesData = () => {
    api("post", `/api/v1/casefiles/save_casefile_checklist`, checkboxObj)
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
          onClick={onClickDoneIcon}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid gray",
            padding: "10px",
          }}
        >
          <h5>Documents durbanisme rattaches</h5>
          <div>
            {doneIconState?.iconState || CompName==="currentcases"? (
              <DoneIcon sx={{ backgroundColor: "green" }} />
            ) : null}
            <span className="inputs-heading-text"> Reduire</span>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          {
          <Grid
          ref={focusPoint} item md={12}>
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
                      value={currentcasescaseTypeId}
                      required
                    >
                      <option value="">Select Type</option>
                      {dropdownValue.casetype.data?.map((item, i) => (
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
                      value={currentcasescommisionTypeId}
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
                      disabled
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
                      disabled
                      required
                    />
                  </div>
                </div>
                <div className="inputs-container">
                  {inputDisableState === "1" ? (
                    <div class="flex-form">
                      <input type="text" placeholder="Study" />
                      <select
                        className="dropdown"
                        type="select"
                        name="studyTypeId"
                        onChange={handleChange}
                        value={currentcasesstudyTypeId}
                        required
                      >
                        <option value="">Select Study</option>
                        {dropdownValue.studytype.data?.map((item) => (
                          <option value={item.value}>{item.text}</option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  {inputDisableState === "2" ? (
                    <div class="flex-form">
                      <input type="text" placeholder="Visit" />
                      <select
                        className="dropdown"
                        type="select"
                        name="visitTypeId"
                        onChange={handleChange}
                        value={currentcasesvisitTypeId}
                        required
                      >
                        {dropdownValue.visittype.data?.map((item) => (
                          <option value={item.value}>{item.text}</option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                  <div class="flex-form">
                    <input type="text" placeholder="Commission Date" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="commissiondate"
                      value={
                        currentcasescommisionDate
                          ? currentcasescommisionDate
                          : dropdownValue?.commissiondate?.data?.commisionDate
                      }
                      disabled
                      required
                    />
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Service" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="service"
                      disabled
                      value={dropdownValue?.inputsvalue?.data?.service}
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
           }
        </Box>
      </Item>

      {inputDisableState === "1" || currentcasescaseTypeId === 1 ? (
        <OpenSearchStudyForm
          CompName={CompName}
          indexdata={indexdata}
          townplanning={state.townObj}
          study={state.study}
          casefileId={inputValues.caseid}
          setCheckboxObj={setCheckboxObj}
          postCheckboxesData={postCheckboxesData}
        />
      ) : null}
      {inputDisableState === "2" || currentcasescaseTypeId === 2 ? (
        <OpenSearchVisitForm
          CompName={CompName}
          indexdata={indexdata}
          visit={state.visit}
          casefileId={inputValues.caseid}
          setCheckboxObj={setCheckboxObj}
          postCheckboxesData={postCheckboxesData}
        />
      ) : null}
    </>
  );
};

export default FolderCreationSection;
