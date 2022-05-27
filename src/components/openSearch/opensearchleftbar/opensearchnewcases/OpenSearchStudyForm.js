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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Store } from "../../../../StoreContext";
import { UpdateStore } from "../../../../StoreContext";
import { useTranslation, Trans } from "react-i18next";
import EditModal from "../../../Modals/EditCheckBox";
import parse from "html-react-parser";

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
  townplanningValues,
}) => {
  const { t } = useTranslation();
  const store = Store();
  const updatestore = UpdateStore();
  const [open, setOpen] = React.useState(false);
  const [subCheck, setSubcheck] = React.useState("");
  const [text, setText] = React.useState("");
  const [checklistid, setId] = React.useState("");
  const [sectionType, setSectionType] = useState("");
  const [sent, setsent] = useState("")
  const [dateLength, setDateLength] = useState(0)
  const [editDateLength, setEditDateLength] = useState(0)
  const [leveladd, setLeveladd] = useState(0)
  const [leveladdedit, setLeveladdedit] = useState(0)
  const [levelSub, setlevelSub] = useState(0)
  const [levelsubedit, setLevelsubedit] = useState(0)
  const [stringLength, setStringLength] = useState(0)
  const [EmptyStringBlankLength, setEmptyStringBlankLength] = useState(0)
  const [formValues, setFormValues] = useState({
    originId: Studydata?.data?.originId
      ? Studydata?.data?.originId
      : townplanningValues?.originId,
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
    refNum: Studydata?.data?.refNum
      ? Studydata?.data?.refNum
      : townplanningValues.refNum,
    applicant: Studydata?.data?.applicant
      ? Studydata?.data?.applicant
      : townplanningValues.applicant,
    mobile: Studydata?.data?.mobile
      ? Studydata?.data?.mobile
      : townplanningValues.mobile,
    email: Studydata?.data?.email
      ? Studydata?.data?.email
      : townplanningValues.email,
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
            return {
              caseFileCheckListId: val.caseFileCheckListId,
              sectionType: val.sectionType,
              casefileId: casefileId
                ? casefileId
                : currentcasescaseFileId?.data?.caseFileId,
              completedSentence: val?.name,
            };
          })
      )
      .map((val) =>
        val.filter((val) => {
          return {
            caseFileCheckListId: val?.caseFileCheckListId,
            sectionType: val?.sectionType,
            casefileId: val?.casefileId,
            completedSentence: val?.name,
          };
        })
      );
    let merged = [].concat.apply([], ab);
    setstate((pre) => {
      return {
        ...pre,
        check: merged.map((val) => {
          return {
            caseFileCheckListId: val?.caseFileCheckListId,
            sectionType: val?.sectionType,
            casefileId: val?.casefileId,
            completedSentence: val?.completedSentence,
          };
        }),
      };
    });
    ///////for townplanning checkboxes
  }, [townplanning]);
  useEffect(() => {
    const studycheckboxes = study
      ?.map((val) =>
        val.chkList
          .filter((item) => item.isSelected == true)
          .map((val) => {
            return {
              caseFileCheckListId: val.caseFileCheckListId,
              sectionType: val.sectionType,
              casefileId: casefileId
                ? casefileId
                : currentcasescaseFileId?.data?.caseFileId,
              completedSentence: val?.name,
            };
          })
      )
      .map((val) =>
        val.filter((val) => {
          return {
            caseFileCheckListId: val.caseFileCheckListId,
            sectionType: val.sectionType,
            casefileId: val.casefileId,
            completedSentence: val?.name,
          };
        })
      );
    let mergedstudy = [].concat.apply([], studycheckboxes);
    setstate((pre) => {
      return {
        ...pre,
        studycheck: mergedstudy.map((val) => {
          return {
            caseFileCheckListId: val.caseFileCheckListId,
            sectionType: val.sectionType,
            casefileId: val.casefileId,
            completedSentence: val?.completedSentence,
          };
        }),
      };
    });
  }, [study]);
  useEffect(() => {
    setFormValues({
      originId: Studydata?.data?.originId
        ? Studydata?.data?.originId
        : townplanningValues?.originId,
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
      refNum: Studydata?.data?.refNum
        ? Studydata?.data?.refNum
        : townplanningValues.refNum,
      applicant: Studydata?.data?.applicant
        ? Studydata?.data?.applicant
        : townplanningValues.applicant,
      mobile: Studydata?.data?.mobile
        ? Studydata?.data?.mobile
        : townplanningValues.mobile,
      email: Studydata?.data?.email
        ? Studydata?.data?.email
        : townplanningValues.email,
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
        casefileId: casefileId
          ? casefileId
          : currentcasescaseFileId?.data?.caseFileId,
        sectionType: sectiontype,
      };
      //////for current cases add checkboxes
      if ((CompName || store.activeNavbarTab === 0) && sectiontype === 0) {
        setstate((pre) => {
          return {
            ...pre,
            check: [
              ...state.check.map((val) => {
                return {
                  caseFileCheckListId: parseInt(val.caseFileCheckListId),
                  casefileId: casefileId
                    ? casefileId
                    : currentcasescaseFileId?.data?.caseFileId,
                  sectionType: sectiontype,
                  completedSentence: val?.completedSentence,
                };
              }),
              obj,
            ],
          };
        });
      }
      /////
      if ((CompName || store.activeNavbarTab === 0) && sectiontype === 2) {
        setstate((pre) => {
          return {
            ...pre,
            studycheck: [
              ...state.studycheck.map((val) => {
                return {
                  caseFileCheckListId: parseInt(val.caseFileCheckListId),
                  casefileId: casefileId
                    ? casefileId
                    : currentcasescaseFileId?.data?.caseFileId,
                  sectionType: sectiontype,
                  completedSentence: val?.completedSentence,
                };
              }),
              obj,
            ],
          };
        });
      }

      //////for new cases add checkboxes
      if (store.activeCase === "newcase") {
        setCheckboxObj((pre) => [...pre, obj]);
      }
    }
    if (!checked) {
      setOpen(false);
      if (store.activeCase === "newcase") {
        setCheckboxObj((pre) => [
          ...pre.filter((item) => item.caseFileCheckListId != id),
        ]);
      }
      if ((CompName || store.activeNavbarTab === 0) && sectiontype === 0) {
        setstate((pre) => {
          return {
            ...pre,
            check: [
              ...state.check.filter((val) => val.caseFileCheckListId != id),
            ],
          };
        });
      }
      if ((CompName || store.activeNavbarTab === 0) && sectiontype === 2) {
        setstate((pre) => {
          return {
            ...pre,
            studycheck: [
              ...state.studycheck.filter(
                (val) => val.caseFileCheckListId != id
              ),
            ],
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
  const saveChanges = (...data) => {
    let Sentence
    let reg4=/r[+]\d+/g
    let reg5=/r[-]\d+/g
    let reg6=/([_______________.]+)/g;
    let reg7=/[.]([a-z]{1,})[.]/g 
    let reg8 = /[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}/g
    let match
    let modifiedsentence;
   let[sentence, sentenceId,,,,dates,level,datelength,sectiontype,String] = data;
   if(String){
     const editstrlength =  reg7.exec(sentence)
      if(editstrlength?.length>0){
        sentence = sentence.replace(reg7,"."+String +".")
      }
     if(!reg7.exec(sentence)){
      sentence = sentence.replace(reg6,"."+String+".")
     }
  }
   if(level){
    sentence = sentence.replace("r+ ___","r+"+level)
    sentence = sentence.replace("r - ___","r-"+level)
    sentence = sentence.replace(reg4, "r+"+level)
    sentence = sentence.replace(reg5, "r-"+level)
   }
   console.log(dates,"stype");

   if(dates.length>0){
   if(datelength==0){
    const arr = sentence.split(/[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}/).filter((val)=>(val.toString() && val!=";" && val!="\r" && val!="/"));
    // const sentencewithDate = arr?.map((val, index)=>{
    //   modifiedsentence = modifiedsentence + val + " ";
    //  if(dates[index]){
    //   modifiedsentence = modifiedsentence + dates[index].format();
    //  }
    //   }
    //   )
    // modifiedsentence=sentence;
    // dates.map((val)=>{
    //   modifiedsentence = modifiedsentence.replace(/[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}/,val?.format())
    //   console.log(modifiedsentence)
    // })
    const strmatch=[];
    while (match = reg8.exec(sentence)) {
      strmatch.push(match.index)
    }
     let prevExtractedDate;
    strmatch.map((val,index)=>{
       prevExtractedDate = sentence.slice(val,val+10)
      if(dates[index]){
        sentence = sentence.replace(prevExtractedDate,dates[index]?.format())
      }
   })
      Sentence = modifiedsentence? modifiedsentence:sentence
   }
   if(datelength!=0){
    console.log(datelength)
    let arr=sentence.split(" ___/___/___"||" ___/___/___;").filter((val)=>(val.toString() && val!=";" && val!="\r"))
     //const sentencewithDate = dates?.map((val, index)=>{
      //modifiedsentence = modifiedsentence + arr[index] + " " + val.format();
      //}
      
   const sentencewithDate = arr?.map((val, index)=>{
    modifiedsentence = modifiedsentence + val + " ";
     if(dates[index]){
      modifiedsentence = modifiedsentence + dates[index].format();
     }
     if(!dates[index] && index<datelength){
      modifiedsentence = modifiedsentence + " ___/___/___"
     }
      }
     )
    Sentence = modifiedsentence? modifiedsentence?.slice(9):sentence
   }
  }
  else{
    Sentence=sentence
  }
    const newdata = [];
    let new2 = [];
    newdata.push({
      completedSentence: Sentence,
      caseFileCheckListId: sentenceId,
    });

    if (store.activeCase === "newcase") {
      newdata.map((i) => {
        new2 = checkboxObj.findIndex(
          (s) => s.caseFileCheckListId === i.caseFileCheckListId
        );
        if (new2 > -1) {
          checkboxObj[new2].completedSentence = Sentence;
        }
      });
    }
    if (store.activeCase === "currentcases") {
      if (sectiontype !== 2) {
        newdata.map((i) => {
          new2 = state.check.findIndex(
            (s) => s.caseFileCheckListId === i.caseFileCheckListId
          );
          if (new2 > -1) {
            state.check[new2].completedSentence = Sentence;
          }
        });
      }

      if (sectiontype === 2) {
        newdata.map((i) => {
          new2 = state.studycheck.findIndex(
            (s) => s.caseFileCheckListId === i.caseFileCheckListId
          );
          if (new2 > -1) {
            state.studycheck[new2].completedSentence = Sentence;
          }
        });
      }
    }
    console.log(
      "item?.chkList",
      townplanning?.map((val) => {
        const a = val.chkList.findIndex(
          (obj) => obj?.caseFileCheckListId === sentenceId
        );
        if (a > -1) {
          val.chkList[a].name = Sentence;
        }
      })
    );
    console.log(
      "item?.chkList",
      study?.map((val) => {
        const a = val.chkList.findIndex(
          (obj) => obj?.caseFileCheckListId === sentenceId
        );
        if (a > -1) {
          val.chkList[a].name = Sentence;
        }
      })
    );
    setText("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...formValues,
      casefileId: casefileId
        ? casefileId
        : currentcasescaseFileId?.data?.caseFileId,
    };
    api("post", `/api/v1/casefiles/create_open_townplanning`, formData)
      .then((res) => {
        setButtonEnability((pre) => {
          return {
            ...pre,
            detailsobject: false,
          };
        });
        if (store.activeCase === "newcase") {
          postCheckboxesData("townplanning");
        }
        if (store.activeCase === "currentcases") {
          console.log(state.check);
          api(
            "post",
            `/api/v1/casefiles/save_casefile_checklist`,
            state.check.length === 0
              ? [
                  {
                    caseFileId: currentcasescaseFileId?.data?.caseFileId,
                    sectionType: 0,
                  },
                ]
              : state.check
          )
            .then((res) => {
              {
                toast.success(t("Successfull"));
              }
            })
            .catch((err) => toast.error(err?.statusText));
        }
        setToggler((pre) => {
          return {
            ...pre,
            togglerstudy: false,
            togglerstudytwo: true,
          };
        });
        setIcon((pre) => {
          return {
            ...pre,
            iconstudy: true,
          };
        });
      })
      .catch((err) => toast.error(err?.statusText));
  };

  const handleSubmitdetailsobj = (e) => {
    e.preventDefault();
    if (store.activeCase === "currentcases") {
      api(
        "post",
        `/api/v1/casefiles/save_casefile_checklist`,
        state.studycheck.length === 0
          ? [
              {
                caseFileId: currentcasescaseFileId?.data?.caseFileId,
                sectionType: 2,
              },
            ]
          : state.studycheck
      )
        .then((res) => {
          {
            toast.success(t("Successfull"));
          }
          updatestore({
            activeNavbarTab: 1,
          });
        })
        .catch((err) => toast.error(err?.statusText));
    }
    if (store.activeCase === "newcase") {
      postCheckboxesData("studytwo");
    }
  };
  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              togglerstudy: !Toggler.togglerstudy,
            };
          });
        }}
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
        {Icon.iconstudy || store?.validatedSections?.townplanningvalidated ? (
          <svg
            width="32"
            height="21"
            viewBox="0 0 32 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2534 20.5954C11.9479 20.8551 11.5312 21 11.0983 21C10.6654 21 10.2486 20.8551 9.94316 20.5954L0.718025 12.7975C-0.239342 11.9884 -0.239342 10.6764 0.718025 9.86876L1.87315 8.89225C2.83082 8.08313 4.38145 8.08313 5.33882 8.89225L11.0983 13.7601L26.6612 0.606841C27.6188 -0.20228 29.171 -0.20228 30.1269 0.606841L31.282 1.58335C32.2393 2.39247 32.2393 3.70426 31.282 4.51212L12.2534 20.5954Z"
              fill="white"
            />
          </svg>
        ) : null}
      </Box>
      <Accordion
        sx={{
          margin: "3px auto !important",
          borderRadius: "10px",
          width: "97.5%",
        }}
        expanded={Toggler.togglerstudy ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
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
              <Grid>
                <form
                  className="establishment-form"
                  onSubmit={(e) => handleSubmit(e, "townplanning")}
                >
                  <Box className="townplanning-heading">
                    <label className="checklist-heading">{t("Capture")}</label>
                    <Box
                      sx={{
                        borderTop: "3px solid #C5D3DB",
                        width: "92%",
                        marginTop: "12px",
                        marginLeft: "14px",
                      }}
                    ></Box>
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
                      <label className="checklist-heading">
                        {t("Urban planning references")}
                      </label>
                      <Box
                        sx={{
                          borderTop: "3px solid #C5D3DB",
                          width: "76%",
                          marginTop: "12px",
                          marginLeft: "14px",
                        }}
                      ></Box>
                    </Box>
                    <Box sx={{ display: "flex", textAlign: "start" }}>
                      <div className="flex-form townplanning-flex">
                        <label className="label-color label-demande">
                          {t("Request Type")}{" "}
                        </label>

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
                      <label className="checklist-heading">
                        {t("Applicant")}
                      </label>
                      <Box
                        sx={{
                          borderTop: "3px solid #C5D3DB",
                          width: "87%",
                          marginTop: "12px",
                          marginLeft: "14px",
                        }}
                      ></Box>
                    </Box>

                    <Box sx={{ display: "flex", textAlign: "start" }}>
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
                    <Box
                      sx={{
                        dispaly: "flex",
                        width: "51.5%",
                        textAlign: "start",
                      }}
                    >
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
                              {item?.checkHeadingName}
                            </label>
                          </Box>
                          <Divider />
                          {item?.chkList?.map((val) => (
                            <div class="container">
                              <div class="group">
                                <input
                                  onClick={() => {
                                    let str = val?.name;
                                    let reg = /([__/__/__/]+)/g;/////for date pattern
                                    //let regeditdate = /([\[d][/]\[d][/]\[d][/]]+)/g;
                                    //let regeditdate = /([\d/\d/\d/]+)/g;
                                    let regeditdate = /(\d{1,4}([\/])\d{1,2}([\/])\d{4})/g
                                    let reg2 = /([r+\s___]+)/g;//////for r+ level
                                    let reg3 = (/\s[`\-=]\s[___]/g)/////for r_ level
                                    let reg4=/r[+]\d+/g
                                    let reg5=/r[-]\d+/g
                                    let reg6=/([_______________.]+)/g; 
                                    let reg7=/[.]([a-z]{1,})[.]/ 
                                    let match; 
                                    let datematch;
                                    let date = [];
                                    let dateedit = []
                                    let levelmatchadd;
                                    let levelsadd = []
                                    let levelsaddedit = []
                                    let levelmatchsub;
                                    let levelssub = []
                                    let levelssubedit = []
                                    let stringlength = str.match(reg7)
                                    let emptyBlanksLength = reg6.exec(str)?.filter((val)=>(val!="___"))
                                    console.log(reg6.exec(str));
                                    while ((match = reg.exec(str))) {
                                      date.push(match[1] || match[0]);
                                    }
                                    while ((datematch = regeditdate.exec(str))) {
                                      dateedit.push(datematch[1] || datematch[0]);
                                    }
                                    while ((levelmatchadd = reg2.exec(str))) {
                                     levelsadd.push(levelmatchadd[1] || levelmatchadd[0]);
                                   }
                                    
                                    while ((levelmatchadd = reg4.exec(val?.name))) {
                                      levelsaddedit.push(levelmatchadd[1] || levelmatchadd[0]);
                                    }
                                    ///
                                    while ((levelmatchsub = reg3.exec(str))) {
                                      levelssub.push(levelmatchsub[1] || levelmatchsub[0]);
                                    }
                                   ////
                                   while ((levelmatchsub = reg5.exec(str))) {
                                    levelssubedit.push(levelmatchsub[1] || levelmatchsub[0]);
                                  }
                                  setStringLength(stringlength?.length)
                                  setEmptyStringBlankLength(emptyBlanksLength?.length)
                                    if (date.length>0||levelsadd>0||levelssub>0) {
                                      setOpen(true);
                                      setText(val?.name);
                                      setId(val?.caseFileCheckListId);
                                      setSectionType(val?.sectionType);
                                      setDateLength(date.filter((val)=>(val=="___/___/___")).length)
                                      setEditDateLength(dateedit.length)
                                      setLeveladd(levelsadd.filter((val)=>(val==" r+ ___ ")).length)
                                      setLeveladdedit(levelsaddedit.length)
                                      setlevelSub(levelssub.length)
                                      setLevelsubedit(levelssubedit.length)
                                    }
                                  }}
                                  type="checkbox"
                                  defaultChecked={
                                    store.activeCase === "currentcases"
                                      ? val?.isSelected
                                      : ""
                                  }
                                  id={val?.caseFileCheckListId}
                                  onChange={(e) =>
                                    handleChange(e, val?.sectionType)
                                  }
                                />
                                <label
                                  className="dropdown-checkbox"
                                  for={val?.caseFileCheckListId}
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
                                  {parse(val?.name)}
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
                    dateLength={dateLength}
                    leveladdlength={leveladd}
                    levelSublength={levelSub}
                    leveladdeditlength={leveladdedit}
                    levelsubeditlength={levelsubedit}
                    editDateLength={editDateLength}
                    stringLength={stringLength}
                    EmptyStringBlankLength={EmptyStringBlankLength}
                  />
                  <Box sx={{ textAlign: "right", padding: "10px" }}>
                    <Button
                      type="submit"
                      disabled={store.activeCase === "newcase"?!store?.validatedSections?.foldercreation?true:store.activeCase === "currentcase"?false:false:false}
                      //disabled={!store?.validatedSections?.foldercreation?true:false}
                      endIcon={
                        <img className="icon-validate" src={Rightarrow} />
                      }
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
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              togglerstudytwo: !Toggler.togglerstudytwo,
            };
          });
        }}
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
        {Icon.iconstudytwo ||
        store?.validatedSections.detailsobjectvalidated ? (
          <svg
            width="32"
            height="21"
            viewBox="0 0 32 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2534 20.5954C11.9479 20.8551 11.5312 21 11.0983 21C10.6654 21 10.2486 20.8551 9.94316 20.5954L0.718025 12.7975C-0.239342 11.9884 -0.239342 10.6764 0.718025 9.86876L1.87315 8.89225C2.83082 8.08313 4.38145 8.08313 5.33882 8.89225L11.0983 13.7601L26.6612 0.606841C27.6188 -0.20228 29.171 -0.20228 30.1269 0.606841L31.282 1.58335C32.2393 2.39247 32.2393 3.70426 31.282 4.51212L12.2534 20.5954Z"
              fill="white"
            />
          </svg>
        ) : null}
      </Box>
      <Accordion
        sx={{
          margin: "3px auto !important",
          borderRadius: "10px",
          width: "97.5%",
        }}
        expanded={Toggler.togglerstudytwo ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
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
                  <Box>
                    {study &&
                      study?.map((item) => (
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
                                  onClick={() => {
                                    let str = val?.name;
                                    let reg = /([__/__/__/]+)/g;
                                    let regeditdate = /([\d/\d/\d/]+)/g;
                                    let reg2 = /([r+\s___]+)/g;
                                    let reg3 = (/\s[`\-=]\s[___]/g)
                                    let reg4=/r[+]\d+/g
                                    let reg5=/r[-]\d+/g
                                    let reg6=/([_______________.]+)/g; 
                                    let reg7=/[.]([a-z]{1,})[.]/g 
                                    let match;
                                    let date = [];
                                    let dateedit = []
                                    let levelmatchadd;
                                    let levelsadd = []
                                    let levelsaddedit = []
                                    let levelmatchsub;
                                    let levelssub = []
                                    let levelssubedit = []
                                    let stringlength = str.match(reg7)
                                    let emptyBlanksLength = reg6.exec(str)?.filter((val)=>(val!="___" && val!="."))
                                    console.log(reg6.exec(str));
                                    console.log(emptyBlanksLength);
                                    while ((match = reg.exec(str))) {
                                      date.push(match[1] || match[0]);
                                    }
                                    while ((match = regeditdate.exec(str))) {
                                      dateedit.push(match[1] || match[0]);
                                    }
                                    while ((levelmatchadd = reg2.exec(str))) {
                                      levelsadd.push(levelmatchadd[1] || levelmatchadd[0]);
                                    }
                                    while ((levelmatchadd = reg4.exec(val?.name))) {
                                      levelsaddedit.push(levelmatchadd[1] || levelmatchadd[0]);
                                    }
                                    while ((levelmatchsub = reg3.exec(str))) {
                                      levelssub.push(levelmatchsub[1] || levelmatchsub[0]);
                                    }
                                    while ((levelmatchsub = reg5.exec(str))) {
                                      levelssubedit.push(levelmatchsub[1] || levelmatchsub[0]);
                                    }
                                    setStringLength(stringlength?.length)
                                    setEmptyStringBlankLength(emptyBlanksLength?.length)
                                    if (date.length>0||levelsadd>0||levelssub>0||stringlength?.length>0) {
                                      setOpen(true);
                                      setText(val?.name);
                                      setId(val?.caseFileCheckListId);
                                      setSectionType(val?.sectionType);
                                      setDateLength(date.filter((val)=>(val=="___/___/___")).length)
                                      setEditDateLength(dateedit.length)
                                      setLeveladd(levelsadd.filter((val)=>(val==" r+ ___ ")).length)
                                      setLeveladdedit(levelsaddedit.length)
                                      setlevelSub(levelssub.length)
                                      setLevelsubedit(levelssubedit.length)
                                    }
                                  }}
                                  type="checkbox"
                                  defaultChecked={
                                    store.activeCase === "currentcases"
                                      ? val.isSelected
                                      : ""
                                  }
                                  id={val.caseFileCheckListId}
                                  onChange={(e) =>
                                    handleChange(e, val.sectionType)
                                  }
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
                                  <span
                                    onClick={(e) => {
                                      console.log(e.target);
                                    }}
                                  >
                                    {parse(val?.name)}
                                  </span>
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
                    dateLength={dateLength}
                    leveladdlength={leveladd}
                    levelSublength={levelSub}
                    leveladdeditlength={leveladdedit}
                    levelsubeditlength={levelsubedit}
                    editDateLength={editDateLength}
                    stringLength={stringLength}
                    EmptyStringBlankLength={EmptyStringBlankLength}
                  />
                  <Box sx={{ textAlign: "right", padding: "2% 0.3%" }}>
                    <Button
                      //disabled={!store?.validatedSections?.townplanningvalidated?true:false}
                      disabled={store.activeCase === "newcase"?!store?.validatedSections?.townplanningvalidated?true:store.activeCase === "currentcase"?false:false:false}
                      type="submit"
                      endIcon={
                        <img className="icon-validate" src={Rightarrow} />
                      }
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
