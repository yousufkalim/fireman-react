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
import { Store } from "../../../../StoreContext";
import { UpdateStore } from "../../../../StoreContext";
import { useTranslation, Trans } from "react-i18next";
import EditModal from '../../../Modals/EditCheckBox'
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
  Icon,
  buttonEnability,
  setButtonEnability,
  townplanningValues
}) => {
  const { t } = useTranslation();
  const store = Store();
  console.log(Studydata);
  const updatestore = UpdateStore();
  const [open, setOpen] = React.useState(false);
  const [subCheck, setSubcheck] = React.useState("");
  const [text, setText] = React.useState("");
  const [checklistid, setId] = React.useState("");
  const [sectionType, setSectionType] = useState("")
  const [formValues, setFormValues] = useState({
    originId: Studydata?.data?.originId ? Studydata?.data?.originId : townplanningValues?.originId,
    caseAverageId: Studydata?.data?.caseAverageId
      ? Studydata?.data?.caseAverageId
      : townplanningValues?.caseAverageId,
    townPlanningDate: Studydata?.data?.townPlanningDate
      ? moment(Studydata?.data?.townPlanningDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        )
      : moment(townplanningValues?.townPlanningDate, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      ),
    receptionServiceDate: Studydata?.data?.receptionServiceDate
      ? moment(Studydata?.data?.receptionServiceDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        )
      : moment(townplanningValues?.receptionServiceDate, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      ),
    requestTypeId: Studydata?.data?.requestTypeId
      ? Studydata?.data?.requestTypeId
      : townplanningValues.requestTypeId,
    refNum: Studydata?.data?.refNum ? Studydata?.data?.refNum : townplanningValues.refNum,
    applicant: Studydata?.data?.applicant ? Studydata?.data?.applicant : townplanningValues.applicant,
    mobile: Studydata?.data?.mobile ? Studydata?.data?.mobile : townplanningValues.mobile,
    email: Studydata?.data?.email ? Studydata?.data?.email : townplanningValues.email,
  });
  const [dropdownValue, setdropdownValue] = useState({
    average: "",
    origin: "",
    requesttype: "",
  });
  useEffect(() => {
    ///////for townplanning checkboxes
    const ab = townplanning
      .map((val) =>
        val.chkList
          .filter((item) => item.isSelected == true)
          .map((val) => {
            return{ 
            caseFileCheckListId: val.caseFileCheckListId, 
            sectionType:val.sectionType, 
            casefileId: casefileId ? casefileId : currentcasescaseFileId?.data?.caseFileId,
          }})
      ).map((val) => val.filter((val) =>{ 
        return{
          caseFileCheckListId: val.caseFileCheckListId,
          sectionType: val.sectionType, 
          casefileId: val.casefileId 
        }
      }));
    let merged = [].concat.apply([], ab);
    setstate((pre) => {
      return {
        ...pre,
        check: merged.map((val) => {
          return{
            caseFileCheckListId: val.caseFileCheckListId,
            sectionType: val.sectionType, 
            casefileId: val.casefileId 
          }
        }
        ),
      };
    });
 ///////for townplanning checkboxes

  }, [townplanning]);
  console.log(CompName);
  useEffect(() => {
    const studycheckboxes = study?.map((val) =>
    val.chkList
      .filter((item) => item.isSelected == true)
      .map((val) => {
        return{ 
        caseFileCheckListId: val.caseFileCheckListId, 
        sectionType:val.sectionType, 
        casefileId: casefileId ? casefileId : currentcasescaseFileId?.data?.caseFileId,
      }})
  ).map((val) => val.filter((val) =>{ 
    return{
      caseFileCheckListId: val.caseFileCheckListId,
      sectionType: val.sectionType, 
      casefileId: val.casefileId 
    }
  }));
let mergedstudy = [].concat.apply([], studycheckboxes);
setstate((pre) => {
  return {
    ...pre,
    studycheck: mergedstudy.map((val) => {
      return{
        caseFileCheckListId: val.caseFileCheckListId,
        sectionType: val.sectionType, 
        casefileId: val.casefileId 
      }
    }
    ),
  };
});
  }, [study]);
  useEffect(() => {
    setFormValues({
      originId: Studydata?.data?.originId ? Studydata?.data?.originId : townplanningValues?.originId,
      caseAverageId: Studydata?.data?.caseAverageId
        ? Studydata?.data?.caseAverageId
        : townplanningValues?.caseAverageId,
      townPlanningDate: Studydata?.data?.townPlanningDate
        ? moment(Studydata?.data?.townPlanningDate, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          )
        : moment(townplanningValues?.townPlanningDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        ),
      receptionServiceDate: Studydata?.data?.receptionServiceDate
        ? moment(Studydata?.data?.receptionServiceDate, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          )
        : moment(townplanningValues?.receptionServiceDate, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        ),
      requestTypeId: Studydata?.data?.requestTypeId
        ? Studydata?.data?.requestTypeId
        : townplanningValues.requestTypeId,
      refNum: Studydata?.data?.refNum ? Studydata?.data?.refNum : townplanningValues.refNum,
      applicant: Studydata?.data?.applicant ? Studydata?.data?.applicant : townplanningValues.applicant,
      mobile: Studydata?.data?.mobile ? Studydata?.data?.mobile : townplanningValues.mobile,
      email: Studydata?.data?.email ? Studydata?.data?.email : townplanningValues.email,
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
  const handleClose = () => setOpen(false);
 

  const handleChange = (e, sectiontype) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
    const obj = {
      caseFileCheckListId: parseInt(id),
      casefileId: casefileId ? casefileId : currentcasescaseFileId?.data?.caseFileId,
      sectionType:sectiontype
    };
     //////for current cases add checkboxes
    if ((CompName || store.activeNavbarTab===0) && sectiontype===0) {
      setstate((pre) => {
        return {
          ...pre,
          check: [...state.check.map((val) => {
            return{
              caseFileCheckListId:parseInt(val.caseFileCheckListId),
              casefileId: casefileId ? casefileId : currentcasescaseFileId?.data?.caseFileId,
              sectionType:sectiontype
            }
          }), 
          obj],
        };
      });
    }
    /////
    if ((CompName || store.activeNavbarTab===0) && sectiontype===2) {
      setstate((pre) => {
        return {
          ...pre,
          studycheck: [...state.studycheck.map((val) => {
            return{
              caseFileCheckListId:parseInt(val.caseFileCheckListId),
              casefileId: casefileId ? casefileId : currentcasescaseFileId?.data?.caseFileId,
              sectionType:sectiontype
            }
          }), 
          obj],
        };
      });
    }


    //////for new cases add checkboxes
    if (store.activeCase==="newcase") {

      console.log("called compshow");
      setCheckboxObj((pre) => [...pre, obj]);
    }

    }
    if (!checked) {
      if (store.activeCase==="newcase") {
        console.log("called compshow");
        setCheckboxObj((pre) => [
          ...pre.filter((item) => item.caseFileCheckListId != id),
        ]);
      }
      if ((CompName || store.activeNavbarTab===0) && sectiontype===0 ) {
        setstate((pre) => {
          return {
            ...pre,
            check: [...state.check.filter((val) => val.caseFileCheckListId != id)],
          };
        });
      }
      if ((CompName || store.activeNavbarTab===0) && sectiontype===2) {
        setstate((pre) => {
          return {
            ...pre,
            studycheck: [...state.studycheck.filter((val) => val.caseFileCheckListId != id)],
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
  const saveChanges = (sentence, sentenceId, nature, seriesname, sectiontype) => {
    console.log("sectiontype",sectiontype);
    const newdata = []
    let new2 = [];
    newdata.push({completedSentence:sentence, caseFileCheckListId: sentenceId})
    if(store.activeCase==="newcase"){
      newdata.map((i) => {
        new2 = checkboxObj.findIndex(
          (s) => s.caseFileCheckListId === i.caseFileCheckListId
        );
   
        console.log("new2",sectiontype );
        console.log("checkboxObj",checkboxObj);
        console.log("state.check",state.check);
        checkboxObj[new2].completedSentence = sentence;
      }); 
    }
      

   if (store.activeCase  === "currentcases"){
    if(sectiontype!==2){
    newdata.map((i) => {
      new2 = state.check.findIndex(
        (s) => s.caseFileCheckListId === i.caseFileCheckListId
      );
      console.log("new2", new2);
      console.log("state.check",state.check);
      console.log("state.studycheck",state.studycheck);
      state.check[new2].completedSentence = sentence;
    }); 
  }

  if(sectiontype===2){
    newdata.map((i) => {
      new2 = state.studycheck.findIndex(
        (s) => s.caseFileCheckListId === i.caseFileCheckListId
      );
      console.log("new2", new2);
      console.log("state.check",state.check);
      console.log("state.studycheck",state.studycheck);
      state.studycheck[new2].completedSentence = sentence;
    }); 
  }

   }
   console.log("item?.chkList", townplanning?.map((val)=>{
    const a =    val.chkList.findIndex(
       (obj) => obj?.caseFileCheckListId === sentenceId
     )
     console.log(a,"index");
    if(a>-1){
     val.chkList[a].name=sentence
    }
   }));
   console.log("item?.chkList", study?.map((val)=>{
     const a =    val.chkList.findIndex(
        (obj) => obj?.caseFileCheckListId === sentenceId
      )
      console.log(a,"index");
     if(a>-1){
      val.chkList[a].name=sentence
     }
    }));
   setText("")
 };

 console.log("sectionType",sectionType);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...formValues,
      casefileId: casefileId ? casefileId : currentcasescaseFileId?.data?.caseFileId,
    };
    console.log(currentcasescaseFileId);
    api("post", `/api/v1/casefiles/create_open_townplanning`, formData)
      .then((res) => {
        setButtonEnability((pre)=>{
          return{
           ...pre,
           detailsobject:false
          }
        })
        if(store.activeCase==="newcase"){
          console.log("called compshow");
          postCheckboxesData("townplanning");
        }
        if (store.activeCase === "currentcases") {
          console.log(state.check);
          console.log("called courrent");
          api("post", `/api/v1/casefiles/save_casefile_checklist`,  state.check.length===0? ([{
            caseFileId:currentcasescaseFileId?.data?.caseFileId,
             sectionType:0
          }]):(state.check))
            .then((res) => {
              {toast.success(t("Successfull"))};
            })
            .catch((err) => toast.error(err?.statusText));
        }
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
          }
        });
      })
      .catch((err) => toast.error(err?.statusText));

  };

  const handleSubmitdetailsobj = (e) => {
    console.log(">?",state.studycheck);
    e.preventDefault();
    if (store.activeCase  === "currentcases") {
      api("post", `/api/v1/casefiles/save_casefile_checklist`,  state.studycheck.length===0?([{
        caseFileId:currentcasescaseFileId?.data?.caseFileId,
        sectionType:2
      }]):(state.studycheck))
        .then((res) => {
          {toast.success(t("Successfull"))};
          updatestore({
            activeNavbarTab: 1,
          });

        })
        .catch((err) => toast.error(err?.statusText));
    }
    if(store.activeCase==="newcase"){
      postCheckboxesData("studytwo");
    }
   
  };


  console.log("|||||||",townplanning);
  console.log("|||||||study",study);
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
          { Icon.iconstudy? <svg width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2534 20.5954C11.9479 20.8551 11.5312 21 11.0983 21C10.6654 21 10.2486 20.8551 9.94316 20.5954L0.718025 12.7975C-0.239342 11.9884 -0.239342 10.6764 0.718025 9.86876L1.87315 8.89225C2.83082 8.08313 4.38145 8.08313 5.33882 8.89225L11.0983 13.7601L26.6612 0.606841C27.6188 -0.20228 29.171 -0.20228 30.1269 0.606841L31.282 1.58335C32.2393 2.39247 32.2393 3.70426 31.282 4.51212L12.2534 20.5954Z" fill="white"/>
</svg> : null}
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
              <Box className="townplanning-heading">

                <label className="checklist-heading">{t("Capture")}</label>
                <Box sx={{borderTop:"3px solid #C5D3DB", width:"92%", marginTop:"12px", marginLeft:"14px"}}></Box>
              </Box>
             
              <Box sx={{ display: "flex" }}></Box>

              <Box>
                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form townplanning-flex">
                    <label className="label-color"> {t("Origin")}</label>
                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="originId"
                      value={formValues?.originId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t("Please choose")}</option>
                      {dropdownValue?.origin?.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-form townplanning-flex">
                    <label className="label-color"> {t("Average")}</label>
                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="caseAverageId"
                      value={formValues?.caseAverageId}
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
                  <div className="flex-form townplanning-flex">
                    <label className="label-color">{t("Date")}</label>
                    <input
                      className=" townplanning-date-input"
                      onChange={handleChange}
                      name="townPlanningDate"
                      value={formValues?.townPlanningDate}
                      type="date"
                      required
                    />
                  </div>
                  <div className="flex-form townplanning-flex">
                    <label className="label-color">Réception service</label>
                    <input
                    className="townplanning-date-input"
                      type="search"
                      onChange={handleChange}
                      name="receptionServiceDate"
                      type="date"
                      value={
                        formValues?.receptionServiceDate
                          ? formValues?.receptionServiceDate
                          : moment(
                              Studydata?.data?.receptionServiceDate,
                              "YYYY-MM-DD"
                            ).format("YYYY-MM-DD")
                      }
                      required
                    />
                  </div>
                </Box>
                <Box className="townplanning-heading">
                  <label className="checklist-heading">{t("Urban planning references")}</label>
                  <Box sx={{borderTop:"3px solid #C5D3DB", width:"76%", marginTop:"12px", marginLeft:"14px"}}></Box>
                </Box>
                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form townplanning-flex">
                    <label className="label-color label-demande">{t("Request Type")} </label>

                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="requestTypeId"
                      onChange={handleChange}
                      value={formValues?.requestTypeId}
                      required
                    >
                      <option value="">{t("Please choose")}</option>
                      {dropdownValue.requesttype.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>

                  <div class="flex-form townplanning-flex">
                    <label className="label-color">Ref. </label>
                    <input
                      type="search"
                      onChange={handleChange}
                      name="refNum"
                      value={formValues?.refNum}
                      required
                    />
                  </div>
                </Box>
                <Box className="townplanning-heading">
                  <label className="checklist-heading">{t("Applicant")}</label>
                  <Box sx={{borderTop:"3px solid #C5D3DB", width:"87%", marginTop:"12px", marginLeft:"14px"}}></Box>
                </Box>
               
                <Box sx={{ display: "flex", textAlign:"start" }}>
                  <div class="flex-form townplanning-flex">
                    <label className="label-color">{t("Name")} </label>
                    <input
                      className="dropdown-townplanning"
                      type="search"
                      onChange={handleChange}
                      value={formValues?.applicant}
                      name="applicant"
                      required
                    />
                  </div>

                  <div class="flex-form townplanning-flex">
                    <label className="label-color"> {t("Phone")}</label>
                    <input
                      type="tel"
                      minlength="12" 
                      maxlength="12"
                      title="Number should contain 12 digits and No Character"
                      onChange={handleChange}
                      pattern="^(\d{12})$"
                      name="mobile"
                      value={formValues?.mobile}
                      required
                    />
                  </div>
                </Box>
                <Box sx={{ dispaly: "flex", width: "51.5%",textAlign:"start" }}>
                  <div class="flex-form townplanning-flex">
                    <label className="label-color">Mail</label>
                    <input
                      type="email"
                      onChange={handleChange}
                      name="email"
                      value={formValues?.email}
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
                             onClick={()=>{ 
                              if(val.name.match(/[_]/g)){
                                setOpen(true);
                                setText(val?.name);
                                setId(val?.caseFileCheckListId)
                                setSectionType(val?.sectionType)
                              }
                              }}
                              type="checkbox"
                              defaultChecked={store.activeCase==="currentcases"? val.isSelected:""}
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
                              {val.modifiedSentence?val.modifiedSentence:val.name}
                            </Box>
                          </Box>
                        </div>
                      ))}
                    </>
                  ))}
                </Grid>
              </Box>
              <EditModal
        setOpen={setOpen}
        open={open}
        handleClose={handleClose}
        text={text}
        saveChanges={saveChanges}
        setSubcheck={setSubcheck}
        checklistid={checklistid}
        sectionType={sectionType}
      />
              <Box sx={{ textAlign: "right", padding: "10px" }}>
                <Button
                  type="submit"
                  
                 disabled={buttonEnability.townplanningbutton}
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
          { Icon.iconstudytwo? <svg width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2534 20.5954C11.9479 20.8551 11.5312 21 11.0983 21C10.6654 21 10.2486 20.8551 9.94316 20.5954L0.718025 12.7975C-0.239342 11.9884 -0.239342 10.6764 0.718025 9.86876L1.87315 8.89225C2.83082 8.08313 4.38145 8.08313 5.33882 8.89225L11.0983 13.7601L26.6612 0.606841C27.6188 -0.20228 29.171 -0.20228 30.1269 0.606841L31.282 1.58335C32.2393 2.39247 32.2393 3.70426 31.282 4.51212L12.2534 20.5954Z" fill="white"/>
</svg>: null}
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
                {study && study?.map((item) => (
                  <>
                    <Box sx={{ textAlign: "start", padding: "20px 0px" }}>
                      <label className="checklist-heading">
                        {item.checkHeadingName}
                      </label>
                    </Box>
                    <Divider />
                    {console.log("716",item?.chkList)}
                    {item?.chkList?.map((val) => (
                    
                      <div class="container">
                        <div class="group">
                          <input
                           onClick={()=>{ 
                            if(val.name.match(/[_]/g)){
                              setOpen(true);
                              setText(val?.name);
                              setId(val?.caseFileCheckListId)
                              setSectionType(val?.sectionType)
                            }
                            }}
                            type="checkbox"
                            defaultChecked={store.activeCase==="currentcases"?val.isSelected:""}
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
                            {val.modifiedSentence?val?.modifiedSentence:val?.name}
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </>
                ))}
              </Box>
              <EditModal
        setOpen={setOpen}
        open={open}
        handleClose={handleClose}
        text={text}
        saveChanges={saveChanges}
        setSubcheck={setSubcheck}
        checklistid={checklistid}
        sectionType={sectionType}
      />
              <Box sx={{ textAlign: "right", padding: "10px" }}>
                <Button
                disabled={buttonEnability.detailsobject}
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
