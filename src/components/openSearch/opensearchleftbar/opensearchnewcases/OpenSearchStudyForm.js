import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import api from "../../../../api/index";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Rightarrow from "../../../../assets/rightarrow.png";
import moment from "moment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DoneIcon from "@mui/icons-material/Done";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation, Trans } from "react-i18next";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchStudyForm = ({
  compShow,
  CompName,
  townplanning,
  study,
  casefileId,
  setCheckboxObj,
  checkboxObj,
  postCheckboxesData,
  Studydata,
  currentcasescaseFileId,
  setstate,
  state,
  setToggler,
  Toggler,
  setIcon,
  Icon
}) => {
  const { t, i18n } = useTranslation();
  const [formValues, setFormValues] = useState({
    originId: Studydata?.data?.originId ? Studydata?.data?.originId : "",
    caseAverageId: Studydata?.data?.caseAverageId
      ? Studydata?.data?.caseAverageId
      : "",
    townPlanningDate: Studydata?.data?.townPlanningDate
      ? moment(Studydata?.data?.townPlanningDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        )
      : "",
    receptionServiceDate: Studydata?.data?.receptionServiceDate
      ? moment(Studydata?.data?.receptionServiceDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        )
      : "",
    requestTypeId: Studydata?.data?.requestTypeId
      ? Studydata?.data?.requestTypeId
      : "",
    refNum: Studydata?.data?.refNum ? Studydata?.data?.refNum : "",
    applicant: Studydata?.data?.applicant ? Studydata?.data?.applicant : "",
    mobile: Studydata?.data?.mobile ? Studydata?.data?.mobile : "",
    email: Studydata?.data?.email ? Studydata?.data?.email : "",
  });
  const [dropdownValue, setdropdownValue] = useState({
    average: "",
    origin: "",
    requesttype: "",
  });
  useEffect(() => {
    console.log(">>>town",townplanning);
    const ab = townplanning
      .map((val) =>
        val.chkList
          .filter((item) => item.isSelected == true)
          .map((val) => ({ caseFileCheckListId: val.caseFileCheckListId }))
      )
      .map((val) => val.filter((val) => val.caseFileCheckListId));
    let merged = [].concat.apply([], ab);
    console.log("merged", merged);
    setstate((pre) => {
      return {
        ...pre,
        check: merged.map((val) => {
          return{
            caseFileCheckListId: val.caseFileCheckListId,
          }
        }
        ),
      };
    });
     console.log(">>>av", ab);
  }, [townplanning]);
  useEffect(() => {
   
    setFormValues({
      originId: Studydata?.data?.originId ? Studydata?.data?.originId : "",
      caseAverageId: Studydata?.data?.caseAverageId
        ? Studydata?.data?.caseAverageId
        : "",
      townPlanningDate: Studydata?.data?.townPlanningDate
        ? moment(Studydata?.data?.townPlanningDate, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          )
        : "",
      receptionServiceDate: Studydata?.data?.receptionServiceDate
        ? moment(Studydata?.data?.receptionServiceDate, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          )
        : "",
      requestTypeId: Studydata?.data?.requestTypeId
        ? Studydata?.data?.requestTypeId
        : "",
      refNum: Studydata?.data?.refNum ? Studydata?.data?.refNum : "",
      applicant: Studydata?.data?.applicant ? Studydata?.data?.applicant : "",
      mobile: Studydata?.data?.mobile ? Studydata?.data?.mobile : "",
      email: Studydata?.data?.email ? Studydata?.data?.email : "",
    });
  }, [Studydata]);
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
  //////

  const handleChange = (e, sectiontype) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
    const obj = {
      caseFileCheckListId: parseInt(id),
      casefileId: casefileId ? casefileId : currentcasescaseFileId,
      sectionType:sectiontype
    };
    setstate((pre) => {
      return {
        ...pre,
        check: [...state.check.map((val) => {
          return{
            caseFileCheckListId:parseInt(val.caseFileCheckListId),
            casefileId: casefileId ? casefileId : currentcasescaseFileId,
            sectionType:sectiontype
          }
        }), 
        obj],
      };
    });
      setCheckboxObj((pre) => [...pre, obj]);
    }
    if (!checked) {
      if (compShow) {
        setCheckboxObj((pre) => [
          ...pre.filter((item) => item.caseFileCheckListId !== id),
        ]);
      }
      if (CompName) {
        setstate((pre) => {
          return {
            ...pre,
            check: [...state.check.filter((val) => val != id)],
          };
        });
      }
    }
    setFormValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  console.log(">>>><<<<", state.check);
  const handleSubmit = (e, data) => {
    e.preventDefault();
    if (CompName === "currentcases") {
      alert("current")
         console.log("state", state.check);
      api("post", `/api/v1/casefiles/save_casefile_checklist`, state.check)
        .then((res) => {
          {toast.success(t("Successfull"))};
        })
        .catch((err) => toast.error(err?.statusText));
    }
    if(compShow){
      postCheckboxesData("townplanning");
    }
    const formData = {
      ...formValues,
      casefileId: casefileId ? casefileId : currentcasescaseFileId,
    };
    api("post", `/api/v1/casefiles/open_townplanning`, formData)
      .then((res) => {
        setToggler((pre)=>{
          return{
           ...pre,
            togglerstudy:false,
            togglerstudytwo:true
          }
        })
        setIcon((pre)=>{
          return{
            ...pre,
            iconstudy:true,
            iconstudytwo:false
          }
        });
      })
      .catch((err) => toast.error(err?.statusText));
  };

  const handleSubmitdetailsobj = (e) => {
    e.preventDefault();
    postCheckboxesData("studytwo");
  };
  return (
    <>
       <Box
          onClick={()=>{setToggler((pre)=>{
            return{
              ...pre,
              togglerstudy: !Toggler.togglerstudy
            }
         })}}
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
        >
        
          <Typography variant="h6">{t("Town Planning Documents")}</Typography>
          { Icon.iconstudy? <DoneIcon /> : null}
        </Box>
        <Accordion sx={{margin:"3px 10px !important", borderRadius:"10px"}} expanded={ Toggler.togglerstudy? true: false}>
        <AccordionSummary
        sx={{display:"none"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
      <Item
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          boxShadow: "none",
          width: "96%",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            marginTop: "15px",
          }}
        >
          <Grid
          >
            <form
              className="establishment-form"
              onSubmit={(e) => handleSubmit(e, "townplanning")}
            >
              <Box sx={{ textAlign: "start" }}>
                <label className="checklist-heading">{t("Capture")}</label>
              </Box>
              <Divider sx={{ margin: "15px 0px" }} />
              <Box sx={{ display: "flex" }}></Box>

              <Box>
                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form">
                    <label className="label-color"> {t("Origin")}</label>
                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="originId"
                      value={formValues.originId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t("Please choose")}</option>
                      {dropdownValue?.origin?.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-form">
                    <label className="label-color"> {t("Average")}</label>
                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="caseAverageId"
                      value={formValues.caseAverageId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t("Please choose")}</option>
                      {dropdownValue.average.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                </Box>

                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form">
                    <label className="label-color">{t("Date")}</label>
                    <input
                      className="dropdown-townplanning"
                      onChange={handleChange}
                      name="townPlanningDate"
                      value={formValues.townPlanningDate}
                      type="date"
                      required
                    />
                  </div>
                  <div className="flex-form">
                    <label className="label-color">Réception service</label>
                    <input
                      type="search"
                      onChange={handleChange}
                      name="receptionServiceDate"
                      type="date"
                      value={
                        formValues.receptionServiceDate
                          ? formValues.receptionServiceDate
                          : moment(
                              Studydata?.data?.receptionServiceDate,
                              "YYYY-MM-DD"
                            ).format("YYYY-MM-DD")
                      }
                      required
                    />
                  </div>
                </Box>
                <Box sx={{ textAlign: "start" }}>
                  <label className="checklist-heading">{t("Urban planning references")}</label>
                </Box>
                <Divider sx={{ margin: "15px 0px" }} />
                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form">
                    <label className="label-color">{t("Request Type")} </label>

                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="requestTypeId"
                      onChange={handleChange}
                      value={formValues.requestTypeId}
                      required
                    >
                      <option value="">{t("Please choose")}</option>
                      {dropdownValue.requesttype.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>

                  <div class="flex-form ">
                    <label className="label-color">Ref. </label>
                    <input
                      type="search"
                      onChange={handleChange}
                      name="refNum"
                      value={formValues.refNum}
                      required
                    />
                  </div>
                </Box>
                <Box sx={{ textAlign: "start" }}>
                  <label className="label-color">{t("Applicant")}</label>
                </Box>
                <Divider sx={{ margin: "15px 0px" }} />
                <Box sx={{ display: "flex", textAlign:"start" }}>
                  <div class="flex-form">
                    <label className="label-color">{t("Name")} </label>
                    <input
                      className="dropdown-townplanning"
                      type="search"
                      onChange={handleChange}
                      value={formValues.applicant}
                      name="applicant"
                      required
                    />
                  </div>

                  <div class="flex-form">
                    <label className="label-color"> {t("Phone")}</label>
                    <input
                      type="number"
                      onChange={handleChange}
                      name="mobile"
                      value={formValues.mobile}
                      required
                    />
                  </div>
                </Box>
                <Box sx={{ dispaly: "flex", width: "50%",textAlign:"start" }}>
                  <div class="flex-form">
                    <label className="label-color">Mail</label>
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={formValues.email}
                      required
                    />
                  </div>
                </Box>
              </Box>

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
                  {townplanning?.map((item, i) => (
                    <>
                      <Box sx={{ textAlign: "start", padding: "20px 0px" }}>
                        <label className="checklist-heading">
                          {item.checkHeadingName}
                        </label>
                      </Box>
                      <Divider />
                      {item?.chkList?.map((val) => (
                        <div class="container">
                          <div class="group">
                            <input
                              type="checkbox"
                              defaultChecked={CompName?val.isSelected:""}
                              id={val.caseFileCheckListId}
                              onChange={(e)=>handleChange(e,val.sectionType)}
                            />
                            <label
                              className="dropdown-checkbox"
                              for={val.caseFileCheckListId}
                            ></label>
                          </div>
                          <Box
                            sx={{
                              padding: "20px",
                              border: "1px solid rgba(0, 31, 79, 0.1)",

                              boxSizing: "border-box",
                              boxShadow: "0px 6px 5px rgba(0, 0, 0, 0.03)",
                              borderRadius: "10px",
                            }}
                          >
                            <Box
                              sx={{
                                width: "90%",
                                margin: "auto",
                                fontWeight: "bold",
                                fontSize: "15px",
                                lineHeight: "22px",
                                color: "#3675B7",
                              }}
                            >
                              {val.name}
                            </Box>
                          </Box>
                        </div>
                      ))}
                    </>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ textAlign: "right", padding: "10px" }}>
                <Button
                  type="submit"
                  endIcon={<img className="icon-validate" src={Rightarrow} />}
                  sx={{
                    background: "#3675B7",
                    ":hover": { background: "#3675B7" },
                  }}
                  variant="contained"
                >
                  {t("VALIDATE")}
                </Button>
              </Box>
            </form>
          </Grid>
        </Box>
      </Item>
      </AccordionDetails>
      </Accordion> 
      <Box
          onClick={()=>{ 
          setToggler((pre)=>{
            return{
              ...pre,
              togglerstudytwo: !Toggler.togglerstudytwo
            }
         })}}
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
        >
          <Typography variant="h6">{t("Details Of Object")}</Typography>
          { Icon.iconstudytwo? <DoneIcon /> : null}
        </Box>
        <Accordion sx={{margin:"3px 10px !important", borderRadius:"10px"}} expanded={ Toggler.togglerstudytwo? true: false}>
        <AccordionSummary
        sx={{display:"none"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
      <Item
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          boxShadow: "none",
          width: "96%",
          margin: "auto",
        }}
      >
        <Box>
          <Grid>
            <form onSubmit={(e) => handleSubmitdetailsobj(e, "detailsobj")}>
              <Box
              >
                {study?.map((item) => (
                  <>
                    <Box sx={{ textAlign: "start", padding: "20px 0px" }}>
                      <label className="checklist-heading">
                        {item.checkHeadingName}
                      </label>
                    </Box>
                    <Divider />
                    {item?.chkList?.map((val) => (
                      <div class="container">
                        <div class="group">
                          <input
                            type="checkbox"
                            defaultChecked={CompName? val.isSelected:""}
                            id={val.caseFileCheckListId}
                            onChange={(e)=>handleChange(e,val.sectionType)}
                          />
                          <label
                            className="dropdown-checkbox"
                            for={val.caseFileCheckListId}
                          ></label>
                        </div>
                        <Box
                          sx={{
                            padding: "20px",
                            border: "1px solid rgba(0, 31, 79, 0.1)",
                            boxSizing: "border-box",
                            boxShadow: "0px 6px 5px rgba(0, 0, 0, 0.03)",
                            borderRadius: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "90%",
                              margin: "auto",
                              fontWeight: "bold",
                              fontSize: "15px",
                              lineHeight: "22px",
                              color: "#3675B7",
                            }}
                          >
                            {val.name}
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </>
                ))}
              </Box>
              <Box sx={{ textAlign: "right", padding: "10px" }}>
                <Button
                  type="submit"
                  endIcon={<img className="icon-validate" src={Rightarrow} />}
                  sx={{
                    background: "#3675B7",
                    ":hover": { background: "#3675B7" },
                  }}
                  variant="contained"
                >
                 {t("VALIDATE")}
                </Button>
              </Box>
            </form>
          </Grid>
        </Box>
      </Item>
      </AccordionDetails>
      </Accordion> 
    </>
  );
};

export default EstablishmentSearchStudyForm;
