import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../api/index";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import { toast } from "react-toastify";
import moment from "moment";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import don from '../../assets/donne.svg'
import Rightarrow from "../../assets/rightarrow.png";
import { Formik, Field, Form, FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import { saveAs } from 'file-saver';
import { generate } from "shortid";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateHistoricalData = ({
  establishmentid,
  setToggler,
  Toggler,
  setIcon,
  Icon,
  casefileId,
  buttonEnability,
  setButtonEnability,
}) => {
  const { t } = useTranslation();
  const [historicalDataEstablishment, setHistoricalDataEstablishment] =
    useState([]);
    const messagesEndRef = useRef(null);
  const [dropdownValue, setdropdownValue] = useState({
    objectDropdown: "",
  });
  const [Open, setOpen] = useState(false)
  const newarr = historicalDataEstablishment?.map((val) => ({
    dateEvent: moment(val.histDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
    historicalObjectId: val.historicalObjectId,
    historicalOpinionId: val.historicalOpinionId,
    urbanPlanningRef: val.urbanPlanningRef,
    details: val.details,
  }));

  useEffect(() => {
    api("get", "/api/v1/historicalobjects/dropdown").then((res) => {
      setdropdownValue((pre) => {
        return {
          ...pre,
          objectDropdown: res,
        };
      });
    });
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    get_historicaldata_establishment();
  }, []);
  const get_historicaldata_establishment =()=>{
    api(
      "get",
      `/api/v1/get_historicaldata_establishment/${store.establishmentId}`
    ).then((res) => {
      setHistoricalDataEstablishment(res.data);
    });
  }
  const store = Store();
  const updatestore = UpdateStore();
   const onChange =()=>{
    scrollToBottom();
   }
  const onSubmit = (values) => {
    console.log(values,"val");
    if(values?.repeatable.length>0){
    const newarr = values.repeatable.map(({id, ...object}) => ({
      ...object,
      historicalEventid: object.historicalEventId
        ? object.historicalEventId
        : 0,
      establishmentId: establishmentid,
      dateEvent: object.histDate,
      caseFileId: casefileId,
      filesData: object.filesData,
    }));
      let toastShown = false;
      newarr.map((val) => {
        console.log(val,"val");
        return new Promise((resolve, reject) => {
          api("post", "/api/v1/create_historicaldata_establishment", val)
            .then((res) => {
              updatestore({
                validatedSections: {...store?.validatedSections,
                createhistoricalvalidated:true
                }
              })
              setButtonEnability((pre) => {
                return {
                  ...pre,
                  establishmentlevelbutton: false,
                };
              });
              setToggler((pre) => {
                return {
                  ...pre,
                  createhistoricaldata: false,
                };
              });
              setIcon((pre) => {
                return {
                  ...pre,
                  createhistoricaldata: true,
                };
              });
              if(!toastShown){
                toast.success(t("Successfull"));
                toastShown = true;
              }
              let form_data = new FormData();
              form_data.append("docFile", val.image);
              form_data.append("historicalEventid", res.data);
              form_data.append("HistoricalEventFilesId", "0");
              if (val.image) {
                api("post", "/api/v1/upload_historicaldata_file", form_data)
                  .then((res) => {
                    console.log("success", res);
                  })
                  .catch((err) => console.log(err));
              }
              get_historicaldata_establishment();
            })
            .catch((err) => console.log(err));
        });
      });
    }
    else{
      toast.error("Veuillez ajouter des données");
    }
  };
  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              createhistoricaldata: !Toggler.createhistoricaldata,
            };
          });
        }}
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
        <Typography  variant="h6">{t("Historical")}</Typography>
        {Icon.createhistoricaldata || store?.validatedSections?.createhistoricalvalidated? <img src={don}/> : null}
      </Box>
      <Accordion
        sx={{ margin: "10px auto !important", borderRadius: "10px", width:"97.5%" }}
        expanded={Toggler.createhistoricaldata ? true : false}
        onChange={onChange}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item
          className="scroll-styling"
            sx={{
              marginTop: "10px",
              width: "97%",
             
              margin: "auto",
              borderRadius: "5px",
              boxShadow: "none",
            }}
          >
              <> 
              <Formik
                onSubmit={(values) => onSubmit(values)}
                enableReinitialize={true}
                initialValues={{
                  repeatable:
                    historicalDataEstablishment &&
                    historicalDataEstablishment?.map((val) => ({
                      histDate: moment(val.histDate, "YYYY-MM-DD").format(
                        "YYYY-MM-DD"
                      ),
                      historicalObjectId: val.historicalObjectId,
                      historicalOpinionId: val.historicalOpinionId,
                      urbanPlanningRef: val.urbanPlanningRef,
                      historicalEventId: val.historicalEventId,
                      details: val.details,
                      filesData: val.filesData,
                    })),
                }}
                render={({ values, setFieldValue, setValues }) => (
                  <Form>
                    <FieldArray
                      name="repeatable"
                      render={(arrayHelpers) => (
                        <>
                          <Box className="scroll-styling" sx={{ overflowY: "auto", maxHeight:"500px"}}>
                            <table class="table">
                              <thead>
                                <Box>
                                  <tr class="row">
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "12px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "158px",
                                        }}
                                      >
                                        Date
                                      </Box>
                                    </th>
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "12px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "295px",
                                        }}
                                      >
                                        {t("Object")}
                                      </Box>
                                    </th>
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "12px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "157px",
                                        }}
                                      >
                                        {t("Opinion")}
                                      </Box>
                                    </th>
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "12px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "320px",
                                        }}
                                      >
                                        {t(
                                          "Clarifications – Will appear in the report"
                                        )}
                                      </Box>
                                    </th>
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "12px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "325px",
                                        }}
                                      >
                                        <Tooltip  sx={{
                                              color: "#314A6C",
                                              fontWeight: "600",
                                              fontSize: "12px",
                                            }} title="Inscrire le numéro de la demande correspondante (PC, AT, courrier…)">
                                          <Button
                                           
                                          >
                                            {" "}
                                            {t(
                                              "Urban planning references"
                                            )}{" "}
                                          </Button>
                                        </Tooltip>
                                      </Box>
                                    </th>
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "8px",
                                          margin: "30px 0px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "450px",
                                        }}
                                      >
                                        {t("Attachment")}
                                      </Box>
                                    </th>
                                  </tr>
                                </Box>
                                <Box></Box>

                                {values?.repeatable?.map((r, i) => (
                                  <Box
                                    sx={{
                                      margin: "10px 0px",
                                      padding: "0px 10px 10px 10px",
                                      background: "#FFFFFF",
                                      border: "1px solid #EBEFF2",
                                      boxSizing: "border-box",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <tr class="tr-inputs">
                                      <th>
                                        <div>
                                          {" "}
                                          <Field
                                            required
                                            className="date-field"
                                            type="date"
                                            name={`repeatable.${i}.histDate`}
                                            defaultValue={r?.histDate}
                                            onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                                            onInput={e => e.target.setCustomValidity('')}
                                          />
                                        </div>
                                      </th>
                                      <th>
                                        <div>
                                          <Field
                                           required
                                           onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                                           onInput={e => e.target.setCustomValidity('')}
                                            className="field-width"
                                            as="select"
                                            name={`repeatable.${i}.historicalObjectId`}
                                            defaultValue={
                                              r?.historicalObjectId
                                            }
                                          >
                                            <option value="">
                                              {t("Please choose")}
                                            </option>
                                            {dropdownValue.objectDropdown.data?.map(
                                              (item, i) => (
                                                <option value={item.value}>
                                                  {item.text}
                                                </option>
                                              )
                                            )}
                                          </Field>
                                        </div>
                                      </th>
                                      <th>
                                        <div>
                                          <Field
                                           required
                                           onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                                           onInput={e => e.target.setCustomValidity('')}
                                            className="field-width avis-field-width"
                                            as="select"
                                            name={`repeatable.${i}.historicalOpinionId`}
                                            defaultValue={
                                              r?.historicalOpinionId
                                            }
                                          >
                                            <option value="">
                                              {t("Please choose")}
                                            </option>
                                            <option value="0">
                                              Avis favorable
                                            </option>
                                            <option value="1">
                                              Avis défavorable
                                            </option>
                                            <option value="2">Sans avis</option>
                                          </Field>
                                        </div>
                                      </th>
                                      <th>
                                        <div>
                                          <Field
                                            className="field-width"
                                            name={`repeatable.${i}.details`}
                                            defaultValue={r?.details}
                                            value={
                                              (values.repeatable[i]
                                                .historicalObjectId === "4" ||
                                                r?.historicalObjectId == 4) &&
                                              (values.repeatable[i]
                                                .historicalOpinionId === "0" ||
                                                r.historicalOpinionId == 0)
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.  The box in the PRECISIONS column begins with It's about ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "4" ||
                                                    r?.historicalObjectId ==
                                                      4) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "4" ||
                                                    r.historicalObjectId ==
                                                      4) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports.The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "5" ||
                                                    r.historicalObjectId ===
                                                      5) &&
                                                    values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0") ||
                                                  r.historicalOpinionId === 0
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. The box in the PRECISIONS column begins with The changes relate to...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "5" ||
                                                    r.historicalObjectId ==
                                                      5) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "5" ||
                                                    r.historicalObjectId ==
                                                      5) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "6" ||
                                                    r.historicalObjectId ==
                                                      6) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. The box in the PRECISIONS column begins with It's about... `
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "6" ||
                                                    r.historicalObjectId ==
                                                      6) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "6" ||
                                                    r.historicalObjectId ==
                                                      6) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "7" ||
                                                    r.historicalObjectId ==
                                                      7) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give any parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels. The box in the PRECISIONS column begins with The parts received are ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "7" ||
                                                    r.historicalObjectId ==
                                                      7) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The parts received are... then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "7" ||
                                                    r.historicalObjectId ==
                                                      7) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The parts received are... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "8" ||
                                                    r.historicalObjectId ==
                                                      8) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = ``)
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "8" ||
                                                    r.historicalObjectId ==
                                                      8) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "8" ||
                                                    r.historicalObjectId ==
                                                      8) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the motivations for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "9" ||
                                                    r.historicalObjectId ==
                                                      9) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system The box in the PRECISIONS column begins with  The work relates to...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "9" ||
                                                    r.historicalObjectId ==
                                                      9) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The work relates to...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "9" ||
                                                    r.historicalObjectId ==
                                                      9) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The work relates to...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "10" ||
                                                    r.historicalObjectId ==
                                                      10) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `You may give some details on the general nature of the modifications. EX The modifications relate to the smoke extraction of the circulation of the floors »The box in the PRECISIONS column begins with  The changes relate to...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "10" ||
                                                    r.historicalObjectId ==
                                                      10) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the unfavorable opinion.EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The changes relate to... then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "10" ||
                                                    r.historicalObjectId ==
                                                      10) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the without opinion.EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "11" ||
                                                    r.historicalObjectId ==
                                                      11) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "11" ||
                                                    r.historicalObjectId ==
                                                      11) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "11" ||
                                                    r.historicalObjectId ==
                                                      11) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "12" ||
                                                    r.historicalObjectId ==
                                                      12) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on... `
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "12" ||
                                                    r.historicalObjectId ==
                                                      12) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations; -  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "12" ||
                                                    r.historicalObjectId ==
                                                      12) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "13" ||
                                                    r.historicalObjectId ==
                                                      13) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "13" ||
                                                    r.historicalObjectId ==
                                                      13) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "13" ||
                                                    r.historicalObjectId ==
                                                      13) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "14" ||
                                                    r.historicalObjectId ==
                                                      14) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "14" ||
                                                    r.historicalObjectId ==
                                                      14) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "14" ||
                                                    r.historicalObjectId ==
                                                      14) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "15" ||
                                                    r.historicalObjectId ==
                                                      15) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system. The box in the PRECISIONS column begins with  The opinion relates to ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "15" ||
                                                    r.historicalObjectId ==
                                                      15) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  The lack of automatic fire detection on the ground floor. The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "15" ||
                                                    r.historicalObjectId ==
                                                      15) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of precise plans.The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "16" ||
                                                    r.historicalObjectId ==
                                                      16) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the request and the compensatory measures validated by the commission. EX: The request relates to the structure's lack of fire stability. As a compensatory measure, a category A fire safety system is set up with generalized automatic detection. The box in the PRECISIONS column begins with  The request relates to...  then after a space  In compensatory measures...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "16" ||
                                                    r.historicalObjectId ==
                                                      16) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  Compensatory measures that do not allow the evacuation time to be reduced;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The request relates to... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "16" ||
                                                    r.historicalObjectId ==
                                                      16) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of the plans mentioned in the file .The box in the PRECISIONS column begins with  The request relates to...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "17" ||
                                                    r.historicalObjectId ==
                                                      17) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "17" ||
                                                    r.historicalObjectId ==
                                                      17) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire  safety system. The box in the PRECISIONS column begins with The formal notice relates to ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "17" ||
                                                    r.historicalObjectId ==
                                                      17) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "18" ||
                                                    r.historicalObjectId ==
                                                      18) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = ``)
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "18" ||
                                                    r.historicalObjectId ==
                                                      18) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = ``)
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "18" ||
                                                    r.historicalObjectId ==
                                                      18) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = ``)
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "19" ||
                                                    r.historicalObjectId ==
                                                      19) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "0" ||
                                                      r.historicalOpinionId ==
                                                        0))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "19" ||
                                                    r.historicalObjectId ==
                                                      19) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "1" ||
                                                      r.historicalOpinionId ==
                                                        1))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...`
                                                  ))
                                                : null ||
                                                  ((values.repeatable[i]
                                                    .historicalObjectId ===
                                                    "19" ||
                                                    r.historicalObjectId ==
                                                      19) &&
                                                    (values.repeatable[i]
                                                      .historicalOpinionId ===
                                                      "2" ||
                                                      r.historicalOpinionId ==
                                                        2))
                                                ? (values.repeatable[
                                                    i
                                                  ].details = t(
                                                    `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...`
                                                  ))
                                                : null
                                            }
                                          />
                                        </div>
                                      </th>

                                      <th>
                                        <div>
                                            <Field
                                          autocomplete="off"
                                            className="field-width"
                                            name={`repeatable.${i}.urbanPlanningRef`}
                                            defaultValue={
                                              r?.urbanPlanningRef
                                            }
                                          />
                                         
                                        </div>
                                      </th>
                                      <th>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            width: "450px",
                                          }}
                                        >
                                          <input
                                            className="field-width img-field"
                                            name={`repeatable.${i}.image`}
                                            type="file"
                                            onChange={(event) => {
                                              setFieldValue(
                                                `repeatable.${i}.image`,
                                                event.target.files[0]
                                              );
                                            }}
                                          />

                                          <Grid
                                            sx={{ justifyContent: "center" }}
                                            container
                                            spacing={2}
                                          >
                                            {r?.filesData?.map((val) => (
                                              <>
                                                <Grid
                                                  sx={{ padding: "5px", alignItems:"end", display:"flex" }}
                                                  xs={8}
                                                >
                                                  <a
                                                    onClick={() => {   
                                                      saveAs(
                                                        `http://192.168.10.15:5519/Files/EventFiles/${val?.fileURL.slice(55)}`,
                                                        "example.pdf"
                                                      );
                                                      api(
                                                        "get",
                                                        `/api/v1/download_historicaldata_file/http://192.168.10.15:5519/Files/EventFiles/${val.fileURL.slice(55)}`
                                                         ).then((res) => {
                                                        console.log(res);
                                                      });
                                                    }}
                                                    // href={`http://192.168.10.15:5519/Files/EventFiles/${val.fileURL.slice(55)}`}
                                                    // target="_blank"
                                                  
                                                  >
                                                    {val?.fileName}
                                                  </a>
                                                </Grid>
                                              </>
                                            ))}
                                          </Grid>
                                        </Box>
                                      </th>
                                      <th style={{width:"100%"}}>
                                      <Box sx={{ textAlign: "center" }}>
                                      {/* <RemoveCircleIcon
                                      sx={{color:"#3675B7"}}
                                      onClick={() => {
                                        console.log("onclick",values.repeatable);
                                        console.log("onclick",r?.historicalEventId);
                                        if(r?.id){
                                          console.log("r.id");
                                          setValues({
                                            repeatable: values.repeatable.filter((val) => val?.id !== r?.id)
                                          })
                                        }
                                        if(r?.historicalEventId){
                                          console.log("r?.historicalEventId");
                                          console.log(r?.historicalEventId);
                                          console.log(values.repeatable);
                                          setValues({
                                            repeatable: values.repeatable.filter((val) => val?.historicalEventId!==r?.historicalEventId)
                                          })
                                        }
                                       
                                      
                                      }}
                                      /> */}
                                      </Box>
                                      </th>
                                    </tr>
                                  </Box>
                                ))}

                                <Box sx={{ margin: "10px 0px" }}></Box>
                              </thead>
                            </table>
                          </Box>
                          
                          <Box sx={{ textAlign: "start" }}>
                            <AddIcon sx={{color:"#3675B7"}} onClick={() => {
                              // const obj={
                              //   id:generate(),
                              //   histDate:""
                              // }
                              arrayHelpers.push({})
                              }}/>
                          </Box>

                        </>
                      )}
                    />
                    <Box sx={{ textAlign: "right", padding: "10px" }}>
                    {
                      store.activeCase === "newcase"?(
                        <Button
                        type="submit"
                        disabled={!store?.validatedSections?.historicalsearchvalidated?true:false}
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
                      ):null
                    }

                    {
                      store.activeCase === "currentcases"?(
                        <Button
                        type="submit"
                        disabled={!store?.validatedSections?.historicalsearchvalidated && !Icon?.iconhistoricalsearch?true:false}
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
                      ):null
                    }
                     
                     
                    </Box>
                   
                  </Form>
                 
                  
                 
                  
                )}
               
              />
            
            <div ref={messagesEndRef} /> 
              </>
              <div ref={messagesEndRef} />
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CreateHistoricalData;