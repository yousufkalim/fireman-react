import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";
import OpenSearchStudyForm from "./OpenSearchStudyForm";
import OpenSearchVisitForm from "./OpenSearchVisitForm";
import Rightarrow from "../../../../assets/rightarrow.png";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation, Trans } from "react-i18next";
import { Store } from "../../../../StoreContext";
import { UpdateStore } from "../../../../StoreContext";
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
  const { t, i18n } = useTranslation();
  const [dropdownValue, setdropdownValue] = useState({
    studytype: "",
    visittype: "",
    casetype: "",
    commission: "",
    commissiondate: "",
    inputsvalue: {},
  });
  const [Toggler, setToggler] = useState({
    togglermain: compShow? true:false,
    togglerstudy:compShow||indexdata?.sectionindex === 0? true:false,
    togglerstudytwo:compShow||(indexdata?.sectionindex === 0||indexdata?.sectionindex === 1)?true:false,
    togglervisit:compShow? true:false
  })
  const [Icon, setIcon] = useState({
    iconmain:CompName === "currentcases"||indexdata?.sectionindex === 1? true:false,
    iconstudy:CompName === "currentcases"&&(indexdata?.sectionindex === 1||indexdata?.sectionindex ===2)?true:false,
    iconstudytwo:CompName === "currentcases"&&indexdata?.sectionindex === 2?true:false,
    iconvisit:CompName==="currentcases"&&indexdata?.sectionindex === 1?true:false
  })
  const store = Store();
  const updatestore = UpdateStore()
  useEffect(() => {
    console.log(currentcasesstudyTypeId,currentcasesvisitTypeId);
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/Users/userprofile/${userId?.userid}`).then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          inputsvalue: res,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/casefile_checklist/0/${store.establishmentId?store.establishmentId:indexdata.establishmentId}/${
        currentcasescaseFileId ? currentcasescaseFileId : 0
      }`
    ).then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          townObj: res.data,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/casefile_checklist/1/${store.establishmentId?store.establishmentId:indexdata.establishmentId}/${
        currentcasescaseFileId ? currentcasescaseFileId : 0
      }`
    ).then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          visit: res.data,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/casefile_checklist/2/${store.establishmentId?store.establishmentId:indexdata.establishmentId}/${
        currentcasescaseFileId ? currentcasescaseFileId : 0
      }`
    ).then((res) => {
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
    api(
      "get",
      `/api/v1/casefiles/get_open_foldercreation/${indexdata?.establishmentId? indexdata?.establishmentId: store.establishmentId}/${
        currentcasescaseFileId ? currentcasescaseFileId : 0
      }`
    ).then((res) =>
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
  //////
  const [state, setstate] = useState({
    townObj: [],
    study: [],
    visit: [],
    check: [],
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
    commisionDate: currentcasescommisionDate ? currentcasescommisionDate : "",
  });
  const [inputDisableState, setInputDisableState] = useState("");
  const [checkBoxRes, setCheckBoxRes] = useState();
  useEffect(() => {
    setInputValues({
      caseTypeId: currentcasescaseTypeId,
      commisionTypeId: currentcasescommisionTypeId,
      agent: dropdownValue?.inputsvalue?.data?.firstName,
      studyTypeId: "",
      visitTypeId: "",
      group: dropdownValue?.inputsvalue?.data?.group,
      service: dropdownValue?.inputsvalue?.data?.service,
      caseFileId: "",
      caseid: "",
      commisionDate: currentcasescommisionDate
        ? moment(currentcasescommisionDate, "YYYY-MM-DD").format("YYYY-MM-DD")
        : "",
    });
  }, [dropdownValue]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
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
        establishmentId: caseFileId,
        userid: userdata.userid,
        visitTypeId:
          inputValues.visitTypeId === "" ? 0 : inputValues.visitTypeId,
        studyTypeId:
          inputValues.studyTypeId === "" ? 0 : inputValues.studyTypeId,
      };
      api("post", `/api/v1/casefiles/create_open_foldercreation`, formdata)
        .then((res) => {
          console.log(res)
            setInputValues((preVal) => {
                return {
                  ...preVal,
                  caseid: res.data,
                };
              });
              {toast.success(t("Successfull"))};
          setToggler((pre)=>{
            return{
              ...pre,
              togglermain:false,
              // togglerstudy:true,
              // togglervisit:true,
              // togglerstudytwo:true
            }
          })
          setIcon((pre)=>{
            return{
              ...pre,
              iconmain:true
            }
          });
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
        commisionDate: inputValues.commisionDate?inputValues.commisionDate: currentcasescommisionDate,
      };
      console.log(updatedObj);
      api("put", "/api/v1/casefiles/update_open_foldercreation", updatedObj)
        .then((res) => {
          console.log(res);
            setInputValues((preVal) => {
              return {
                ...preVal,
                caseid: res.data,
              };
            });
            setToggler((pre)=>{
              return{
                ...pre,
                togglermain:false,
              }
            })
        })
        .catch((err) => {
          console.log("updateerr", err);
        });
    }
  };

  ////////////////// passed to study form visit form for getting checkedboxes id
  const postCheckboxesData = (data) => {
    console.log(checkboxObj);
    api("post", `/api/v1/casefiles/save_casefile_checklist`, checkboxObj)
      .then((res) => {
         console.log(res)
        setCheckBoxRes(res.status);
        if(data==="studytwo"){
          setToggler((pre)=>{
            return{
             ...pre,
             togglerstudytwo:false,
            }
          })
          setIcon((pre)=>{
            return{
              ...pre,
              iconstudytwo:true
            }
          });
          updatestore({activeNavbarTab:1})
        }
       if(data==="visit"){
        setToggler((pre)=>{
          return{
           ...pre,
           togglervisit:false,
          }
        })
        setIcon((pre)=>{
          return{
            ...pre,
            iconvisit:true
          }
        });
        updatestore({activeNavbarTab:1})
       }
       {toast.success(t("Successfull"))};
      })
      .catch((err) => toast.error(err?.statusText));
    setCheckboxObj([]);
  };

  ///////////////////////////////

  
  return (
    <>
      {(activeLink === 0 && CompName === "currentcases") ||
      compShow === "filestructure" ? (
        <>
         <div>
         <Box
           onClick={()=>{setToggler((pre)=>{
              return{
                ...pre,
                togglermain: !Toggler.togglermain
              }
           })}}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "0.6px solid #C5D3DB",
              padding: "8px 10px",
              backgroundColor: "#3675B7",
              borderRadius: "5px",
              color: "#ffffff",
              width: "96%",
              margin: "auto",
            }}
          >
            <Typography variant="h6">{t("Folder creation")}</Typography>
           { Icon.iconmain? <DoneIcon /> : null}
          </Box>
      <Accordion sx={{margin:"10px 10px !important", borderRadius:"10px"}} expanded={ Toggler.togglermain? true: false}>
        <AccordionSummary sx={{display:"none"}}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        </AccordionSummary>
        <AccordionDetails>
        <Item sx={{ boxShadow: "none" }}>
                  <form
                    className="establishment-form"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    <Box sx={{ display: "flex" }}>
                      <div className="inputs-container">
                        <label className="label-color">Type</label>{" "}
                        <br />
                        <div class="flex-form">
                          <select
                            className="dropdown"
                            type="select"
                            name="caseTypeId"
                            onChange={handleChange}
                            value={inputValues.caseTypeId}
                            required
                          >
                            <option value="">{t("Please choose")}</option>
                            {dropdownValue.casetype.data?.map((item, i) => (
                              <option value={item.value}>{item.text}</option>
                            ))}
                          </select>
                        </div>
                        <label className="label-color">Commission</label>
                        <br />
                        <div class="flex-form">
                          <select
                            className="dropdown"
                            type="select"
                            name="commisionTypeId"
                            onChange={handleChange}
                            value={inputValues.commisionTypeId}
                            required
                          >
                            <option value="">{t("Please choose")}</option>
                            {dropdownValue.commission.data?.map((item) => (
                              <option value={item.value}>{item.text}</option>
                            ))}
                          </select>
                        </div>
                        <label className="label-color">Agent</label>
                        <div class="flex-form">
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
                        {inputDisableState === "1" || currentcasesstudyTypeId ? (
                          <>
                            <label className="label-color"> Etude</label>

                            <div class="flex-form">
                              <select
                                className="dropdown"
                                type="select"
                                name="studyTypeId"
                                onChange={handleChange}
                                value={currentcasesstudyTypeId}
                                required
                              >
                                <option value="">
                                  {t("Please choose")}
                                </option>
                                {dropdownValue.studytype.data?.map((item) => (
                                  <option value={item.value}>
                                    {item.text}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : null}
                        {inputDisableState === "2" || currentcasesvisitTypeId ? (
                          <>
                            <label className="label-color">Visite </label>
                            <div class="flex-form">
                              <select
                                className="dropdown"
                                type="select"
                                name="visitTypeId"
                                onChange={handleChange}
                                value={currentcasesvisitTypeId}
                                required
                              >
                                {dropdownValue.visittype.data?.map((item) => (
                                  <option value={item.value}>
                                    {item.text}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : null}
                        <label className="label-color">Date commission </label>
                        <div class="flex-form">
                          <input
                            type="date"
                            onChange={handleChange}
                            name="commisionDate"
                            value={inputValues.commisionDate}
                            required
                          />
                        </div>
                        <label className="label-color">Groupement</label>
                        <div class="flex-form">
                          <input
                            type="search"
                            onChange={handleChange}
                            name="group"
                            value={inputValues.group}
                            required
                          />
                        </div>
                        <label className="label-color">{t("Service")}</label>
                        <div class="flex-form">
                          <input
                            type="search"
                            onChange={handleChange}
                            name="service"
                            value={inputValues.service}
                          />
                        </div>
                      </div>
                    </Box>
                    <Divider sx={{ margin: "20px 0px" }} />
                    <Box sx={{ textAlign: "right", padding: "10px" }}>
                      <Button
                        type="submit"
                        endIcon={
                          <img className="icon-validate" src={Rightarrow} />
                        }
                        sx={{
                          background: "#3675B7",
                          fontSize: "16.97px",
                          ":hover": { background: "#3675B7" },
                        }}
                        variant="contained"
                      >
                        {t("VALIDATE")}
                      </Button>
                    </Box>
                  </form>
                </Item>
        </AccordionDetails>
      </Accordion>
      {inputDisableState === "1" || currentcasescaseTypeId === 1? (
      <> 
              <OpenSearchStudyForm
              compShow={compShow}
              CompName={CompName}
              indexdata={indexdata}
              townplanning={state.townObj}
              study={state.study}
              casefileId={inputValues.caseid}
              setCheckboxObj={setCheckboxObj}
              checkboxObj={checkboxObj}
              postCheckboxesData={postCheckboxesData}
              checkBoxRes={checkBoxRes}
              Studydata={Studydata}
              setstate={setstate}
              currentcasescaseFileId={currentcasescaseFileId}
              state={state}
              Toggler={Toggler}
              setToggler={setToggler}
              setIcon={setIcon}
              Icon={Icon}
            />
      </>
      ):null}

      {inputDisableState === "2" || currentcasescaseTypeId === 2? (
      <> 
           <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "0.6px solid #C5D3DB",
          backgroundColor: "#3675B7",
          borderRadius: "5px",
          width: "96%",
          margin: "10px auto",
          padding: "8px 10px",
          color: "#ffffff",
        }}
        onClick={()=>{setToggler((pre)=>{
          return{
            ...pre,
            togglervisit: !Toggler.togglervisit
          }
       })}}
      >
        <Typography variant="h6">{t("Details Of Object")}</Typography>
        { Icon.iconvisit? <DoneIcon /> : null}
      </Box>
      <Accordion sx={{margin:"3px 10px !important", borderRadius:"10px"}} expanded={ Toggler.togglervisit? true: false}>
        <AccordionSummary
        sx={{display:"none"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        <OpenSearchVisitForm
              compShow={compShow}
              CompName={CompName}
              indexdata={indexdata}
              visit={state.visit}
              casefileId={inputValues.caseid}
              setCheckboxObj={setCheckboxObj}
              checkboxObj={checkboxObj}
              postCheckboxesData={postCheckboxesData}
              checkBoxRes={checkBoxRes}
              currentcasescaseFileId={currentcasescaseFileId}
            />
        </AccordionDetails>
      </Accordion> 
      </>
      ):null}
    </div>
        </>
      ) : null}
    </>
  );
};

export default FolderCreationSection;
