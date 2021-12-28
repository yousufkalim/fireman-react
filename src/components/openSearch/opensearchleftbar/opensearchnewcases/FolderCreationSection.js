import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";
import OpenSearchStudyForm from "./OpenSearchStudyForm";
import OpenSearchVisitForm from "./OpenSearchVisitForm";
import moment from "moment";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const FolderCreationSection = ({
  compShow,
  CompName,
  indexdata,
  currentcasescaseFileId,
  currentcasescaseTypeId,
  currentcasescommisionTypeId,
  currentcasesstudyTypeId,
  currentcasesvisitTypeId,
  currentcasescommisionDate,
  Studydata,
}) => {
  const [dropdownValue, setdropdownValue] = useState({
    studytype: "",
    visittype: "",
    casetype: "",
    commission: "",
    commissiondate: "",
    inputsvalue: {},
  });
  useEffect(() => {
  console.log("",currentcasescaseFileId)
    doneIconState.accordianState &&
    CompName === "currentcases" &&
    (indexdata.sectionindex === 0 || indexdata.sectionindex === 1) &&
    activeLink === 0 ///////////set display none when user in current cases
      ? (focusPoint.current.style.display = "none")
      : (focusPoint.current.style.display = "block");
    /////
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
    api("get", `/api/v1/casefiles/casefile_checklist/0/${currentcasescaseFileId?currentcasescaseFileId:0}`).then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          townObj: res.data,
        };
      });
    });
    api("get", `/api/v1/casefiles/casefile_checklist/1/${currentcasescaseFileId?currentcasescaseFileId:0}`).then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          visit: res.data,
        };
      });
    });
    api("get", `/api/v1/casefiles/casefile_checklist/2/${currentcasescaseFileId?currentcasescaseFileId:0}`).then((res) => {
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
  const [checkboxObj, setCheckboxObj] = useState([]);
  const [activeLink, setActiveLink] = useState(0);
  const [doneIconState, setdoneIconState] = useState({
    iconState: false,
    accordianState:
      CompName === "currentcases" &&
      (indexdata.sectionindex === 0 || indexdata.sectionindex === 1) &&
      activeLink === 0
        ? true
        : false,
  });
  //////
  
  const [state, setstate] = useState({
    townObj: [],
    study: [],
    visit: [],
  });
  const [inputValues, setInputValues] = useState({
    caseTypeId: "",
    commisionTypeId: "",
    agent:"",
    studyTypeId: "",
    visitTypeId: "",
    group: "",
    service:"",
    caseFileId: "",
    caseid: "",
    commisionDate: currentcasescommisionDate? currentcasescommisionDate:""
  });
  const [inputDisableState, setInputDisableState] = useState("");
  const [checkBoxRes, setCheckBoxRes] = useState();
  const focusPoint = useRef(null);

  console.log("",currentcasescommisionDate);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("value", name , value);
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
      console.log("comissiondate",formdata);
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
      api("put", "/api/v1/casefiles/update_open_foldercreation", updatedObj)
        .then((res) => {
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
    doneIconState.accordianState
      ? (focusPoint.current.style.display = "block")
      : (focusPoint.current.style.display = "none");
  };
  ////////////////// passed to study form visit form for getting checkedboxes id
  const postCheckboxesData = () => {
    api("post", `/api/v1/casefiles/save_casefile_checklist`, checkboxObj)
      .then((res) => {
        setCheckBoxRes(res.status);
        toast.success(res?.statusText);
      })
      .catch((err) => toast.error(err?.statusText));
  };
  ///////////////////////////////
  useEffect(() => {
   setInputValues({
    caseTypeId: currentcasescaseTypeId ,
    commisionTypeId: currentcasescommisionTypeId,
    agent: dropdownValue?.inputsvalue?.data?.firstName,
    studyTypeId: "",
    visitTypeId: "",
    group: dropdownValue?.inputsvalue?.data?.group,
    service: dropdownValue?.inputsvalue?.data?.service,
    caseFileId: "",
    caseid: "",
    commisionDate: currentcasescommisionDate? moment(currentcasescommisionDate,"YYYY-MM-DD").format("YYYY-MM-DD"):""
  })
  }, [dropdownValue])
  console.log(dropdownValue?.inputsvalue,"inputValues")
  return (
    <>
      {(activeLink === 0 && CompName === "currentcases") ||
      compShow === "filestructure" ? (
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
              <h5>Création de dossier</h5>
              <div>
                {doneIconState?.iconState || CompName === "currentcases" ? (
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
                //
                <Grid ref={focusPoint} item md={12}>
                  <Item sx={{ boxShadow: "none" }}>
                    <form
                      className="establishment-form"
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      <div className="inputs-container">
                        <label>Nauture dossier</label> <br />
                        <div class="flex-form">
                          <input type="text" placeholder="Type" />
                          <select
                            className="dropdown"
                            type="select"
                            name="caseTypeId"
                            onChange={handleChange}
                            value={inputValues.caseTypeId}
                            required
                          >
                            <option value="">Choisissez s'il vous plaît</option>
                            {dropdownValue.casetype.data?.map((item, i) => (
                              <option value={item.value}>{item.text}</option>
                            ))}
                          </select>
                        </div>
                        <label>Commission</label>
                        <br />
                        <div class="flex-form">
                          <input type="text" placeholder="Commission" />
                          <select
                            className="dropdown"
                            type="select"
                            name="commisionTypeId"
                            onChange={handleChange}
                            value={inputValues.commisionTypeId}
                            required
                          >
                            <option value="">Choisissez s'il vous plaît</option>
                            {dropdownValue.commission.data?.map((item) => (
                              <option value={item.value}>{item.text}</option>
                            ))}
                          </select>
                        </div>
                        <label>Agent</label>
                        <div class="flex-form">
                          <input type="text" placeholder="Agent" />
                          <input
                            type="search"
                            onChange={handleChange}
                            name="agent"
                            value={inputValues.agent}
                            required
                          />
                        </div>
                      </div>
                      <div className="inputs-container">
                        {inputDisableState === "1" ? (
                          <div class="flex-form flex-form-space">
                            <input type="text" placeholder="Etude" />
                            <select
                              className="dropdown"
                              type="select"
                              name="studyTypeId"
                              onChange={handleChange}
                              value={currentcasesstudyTypeId}
                              required
                            >
                              <option value="">
                                Choisissez s'il vous plaît
                              </option>
                              {dropdownValue.studytype.data?.map((item) => (
                                <option value={item.value}>{item.text}</option>
                              ))}
                            </select>
                          </div>
                        ) : null}
                        {inputDisableState === "2" ? (
                          <div class="flex-form">
                            <input type="text" placeholder="Visite" />
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
                          <input type="text" placeholder="Date commission" />
                          <input
                            type="date"
                            onChange={handleChange}
                            name="commisionDate"
                            value={
                                 inputValues.commisionDate}
                            required
                          />
                        </div>
                        <div class="flex-form flex-form-space">
                          <input type="text" placeholder="Groupement" />
                          <input
                            type="search"
                            onChange={handleChange}
                            name="group"
                            value={inputValues.group}
                            required
                          />
                        </div>
                        <div class="flex-form">
                          <input type="text" placeholder="Service" />
                          <input
                            type="search"
                            onChange={handleChange}
                            name="service"
                            value={inputValues.service}
                          />
                        </div>

                        <Box sx={{ textAlign: "end" }}>
                          <button
                            className="establishment-search-btn-submit"
                            type="submit"
                          >
                            {" "}
                            VALIDER{" "}
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
              compShow={compShow}
              CompName={CompName}
              indexdata={indexdata}
              townplanning={state.townObj}
              study={state.study}
              casefileId={inputValues.caseid}
              setCheckboxObj={setCheckboxObj}
              postCheckboxesData={postCheckboxesData}
              checkBoxRes={checkBoxRes}
              Studydata={Studydata}
              currentcasescaseFileId={currentcasescaseFileId}
            />
          ) : null}
          {inputDisableState === "2" || currentcasescaseTypeId === 2 ? (
            <OpenSearchVisitForm
              compShow={compShow}
              CompName={CompName}
              indexdata={indexdata}
              visit={state.visit}
              casefileId={inputValues.caseid}
              setCheckboxObj={setCheckboxObj}
              postCheckboxesData={postCheckboxesData}
              checkBoxRes={checkBoxRes}
              currentcasescaseFileId={currentcasescaseFileId}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default FolderCreationSection;
