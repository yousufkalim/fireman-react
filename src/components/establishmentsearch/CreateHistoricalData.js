import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../api/index";
import { styled } from "@mui/material/styles";
import { Store } from "../../StoreContext";
import { toast } from "react-toastify";
import moment from "moment";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Rightarrow from "../../assets/rightarrow.png";
import { Formik, Field, Form, FieldArray } from "formik";
import { useTranslation, Trans } from "react-i18next";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from '@mui/material/Grid';
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
}) => {
  const { t } = useTranslation();
  const [historicalDataEstablishment, setHistoricalDataEstablishment] =
    useState([]);
  const [dropdownValue, setdropdownValue] = useState({
    objectDropdown: "",
  });
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
  useEffect(() => {
    api(
      "get",
      `/api/v1/get_historicaldata_establishment/${store.establishmentId}`
    ).then((res) => {
      setHistoricalDataEstablishment(res.data);
    });
  }, []);
  const onSubmit = (values) => {
    const newarr = values.repeatable.map((object) => ({
      ...object,
      historicalEventid: object.historicalEventId,
      establishmentId: establishmentid,
      dateEvent: object.histDate,
      caseFileId: casefileId,
      filesData: object.filesData,
    }));
    //////for new cases
    if (store.activeCase === "newcase") {
      newarr.map((val) => {
        return new Promise((resolve, reject) => {
          api("post", "/api/v1/create_historicaldata_establishment", val)
            .then((res) => {
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
              {
                toast.success(t("Successfull"));
              }
              let form_data = new FormData();
              form_data.append("docFile", val.image);
              form_data.append("historicalEventid", val.historicalEventid);
              form_data.append("HistoricalEventFilesId", "0");

              if (val.image) {
                api("post", "/api/v1/upload_historicaldata_file", form_data)
                  .then((res) => {
                    console.log("success");
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        });
      });
    }
    //////for currentcases
    if (store.activeCase === "currentcases") {
      newarr.map((val) => {
        return new Promise((resolve, reject) => {
          api("put", "/api/v1/update_historicaldata_establishment", val)
            .then((res) => {
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
              {
                toast.success(t("Successfull"));
              }
              let form_data = new FormData();
              form_data.append("docFile", val.image);
              form_data.append("historicalEventid", val.historicalEventid);
              form_data.append("HistoricalEventFilesId", "0");
              if (val.image) {
                api("post", "/api/v1/upload_historicaldata_file", form_data)
                  .then((res) => {
                    {
                      toast.success(t("Successfull"));
                    }
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        });
      });
    }

    const photo = values.repeatable.map((object) => object.image);
  };
  const store = Store();
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
        <Typography variant="h6">{t("Historical")}</Typography>
        {Icon.createhistoricaldata ? <DoneIcon /> : null}
      </Box>
      <Accordion
        sx={{ margin: "10px 10px !important", borderRadius: "10px" }}
        expanded={Toggler.createhistoricaldata ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item
            sx={{
              marginTop: "10px",
              width: "97%",
              maxHeight: "16%",
              overflow: "scroll",
              margin: "auto",
              borderRadius: "5px",
              boxShadow: "none",
            }}
          >
            {store.activeCase === "newcase" ? (
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
                render={({ values, setFieldValue }) => (
                  <Form>
                    <FieldArray
                      name="repeatable"
                      render={(arrayHelpers) => (
                        <>
                          <Box sx={{ overflow: "auto" }}>
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
                                          width: "150px",
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
                                          width: "290px",
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
                                          width: "150px",
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
                                          width: "315px",
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
                                          width: "310px",
                                        }}
                                      >
                                        {t("Urban planning references")}
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
                                            className="date-field"
                                            type="date"
                                            name={`repeatable.${i}.dateEvent`}
                                            defaultValue={r && r?.histDate}
                                          />
                                        </div>
                                      </th>
                                      <th>
                                        <div>
                                          <Field
                                            className="field-width"
                                            as="select"
                                            name={`repeatable.${i}.historicalObjectId`}
                                            defaultValue={
                                              r && r?.historicalObjectId
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
                                            className="field-width avis-field-width"
                                            as="select"
                                            name={`repeatable.${i}.historicalOpinionId`}
                                            defaultValue={
                                              r && r?.historicalOpinionId
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
                                            defaultValue={r && r?.details}
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
                                            className="field-width"
                                            name={`repeatable.${i}.urbanplanningreference`}
                                            defaultValue={
                                              r && r?.urbanPlanningRef
                                            }
                                          />
                                        </div>
                                      </th>
                                      <th>
                                        <Box sx={{ display: "flex", width:"450px" }}>
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
                                          
                                           <Grid sx={{justifyContent:"center"}} container spacing={2}>
                                           {r.filesData.map((val) => (
                                            <>
                                             <Grid sx={{padding:"5px", }} xs={8}>
                                            <a href={val.fileURL}>
                                                {val.fileName}
                                              </a>
                                          
                                          </Grid>
                                             
                                            </>
                                          ))}
                                        </Grid>
                                          
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
                            <AddIcon onClick={() => arrayHelpers.push({})} />
                          </Box>
                        </>
                      )}
                    />
                    <Box sx={{ textAlign: "right", padding: "10px" }}>
                      <Button
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
                  </Form>
                )}
              />
            ) : null}

            {store.activeCase === "currentcases" ? (
              <Formik
                onSubmit={(values) => onSubmit(values)}
                enableReinitialize={true}
                initialValues={{
                  repeatable: historicalDataEstablishment?.map((val) => ({
                    histDate: moment(val.histDate, "YYYY-MM-DD").format(
                      "YYYY-MM-DD"
                    ),
                    historicalObjectId: val.historicalObjectId,
                    historicalOpinionId: val.historicalOpinionId,
                    urbanPlanningRef: val.urbanPlanningRef,
                    historicalEventId: val.historicalEventId,
                    details: val.details,
                  })),
                }}
                render={({ values, setFieldValue }) => (
                  <Form>
                    <FieldArray
                      name="repeatable"
                      enableReinitialize
                      render={(arrayHelpers) => (
                        <>
                          <Box sx={{ overflow: "auto" }}>
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
                                          width: "150px",
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
                                          width: "290px",
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
                                          width: "150px",
                                        }}
                                      >
                                        {"Opinion"}
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
                                          width: "315px",
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
                                          width: "310px",
                                        }}
                                      >
                                        {t("Urban planning references")}
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
                                          width: "308px",
                                        }}
                                      >
                                        Pièce jointe
                                      </Box>
                                    </th>
                                  </tr>
                                </Box>
                                <Box></Box>
                                {values.repeatable.map((r, i) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      textAlign: "start",
                                      paddingBottom: "15px",
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
                                        <input
                                          className="date-field"
                                          type="date"
                                          name={`repeatable.${i}.histDate`}
                                          defaultValue={r.histDate}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `repeatable.${i}.histDate`,
                                              e.target.value
                                            );
                                          }}
                                        />
                                      </th>

                                      <th>
                                        <Field
                                          as="select"
                                          name={`repeatable.${i}.historicalObjectId`}
                                          className="field-width"
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
                                      </th>

                                      <th>
                                        <Field
                                          as="select"
                                          name={`repeatable.${i}.historicalOpinionId`}
                                          className="field-width avis-field-width"
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
                                      </th>
                                      <th>
                                        <Field
                                          className="field-width"
                                          name={`repeatable.${i}.details`}
                                          defaultValue={r && r?.details}
                                          value={
                                            (values.repeatable[i]
                                              .historicalObjectId === "4" ||
                                              r?.historicalObjectId == 4) &&
                                            (values.repeatable[i]
                                              .historicalOpinionId === "0" ||
                                              r.historicalOpinionId == 0)
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.  The box in the PRECISIONS column begins with It's about ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "4" ||
                                                  r?.historicalObjectId == 4) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "4" ||
                                                  r.historicalObjectId == 4) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports.The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "5" ||
                                                  r.historicalObjectId === 5) &&
                                                  values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0") ||
                                                r.historicalOpinionId === 0
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. The box in the PRECISIONS column begins with The changes relate to...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "5" ||
                                                  r.historicalObjectId == 5) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "5" ||
                                                  r.historicalObjectId == 5) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "6" ||
                                                  r.historicalObjectId == 6) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. The box in the PRECISIONS column begins with It's about... `
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "6" ||
                                                  r.historicalObjectId == 6) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "6" ||
                                                  r.historicalObjectId == 6) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "7" ||
                                                  r.historicalObjectId == 7) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give any parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels. The box in the PRECISIONS column begins with The parts received are ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "7" ||
                                                  r.historicalObjectId == 7) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The parts received are... then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "7" ||
                                                  r.historicalObjectId == 7) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The parts received are... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "8" ||
                                                  r.historicalObjectId == 8) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[
                                                  i
                                                ].details = ``)
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "8" ||
                                                  r.historicalObjectId == 8) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "8" ||
                                                  r.historicalObjectId == 8) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the motivations for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "9" ||
                                                  r.historicalObjectId == 9) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system The box in the PRECISIONS column begins with  The work relates to...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "9" ||
                                                  r.historicalObjectId == 9) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The work relates to...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId === "9" ||
                                                  r.historicalObjectId == 9) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The work relates to...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "10" ||
                                                  r.historicalObjectId == 10) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `You may give some details on the general nature of the modifications. EX The modifications relate to the smoke extraction of the circulation of the floors »The box in the PRECISIONS column begins with  The changes relate to...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "10" ||
                                                  r.historicalObjectId == 10) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the unfavorable opinion.EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The changes relate to... then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "10" ||
                                                  r.historicalObjectId == 10) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the without opinion.EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "11" ||
                                                  r.historicalObjectId == 11) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "11" ||
                                                  r.historicalObjectId == 11) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "11" ||
                                                  r.historicalObjectId == 11) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "12" ||
                                                  r.historicalObjectId == 12) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on... `
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "12" ||
                                                  r.historicalObjectId == 12) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations; -  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "12" ||
                                                  r.historicalObjectId == 12) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "13" ||
                                                  r.historicalObjectId == 13) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "13" ||
                                                  r.historicalObjectId == 13) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "13" ||
                                                  r.historicalObjectId == 13) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "14" ||
                                                  r.historicalObjectId == 14) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "14" ||
                                                  r.historicalObjectId == 14) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "14" ||
                                                  r.historicalObjectId == 14) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "15" ||
                                                  r.historicalObjectId == 15) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system. The box in the PRECISIONS column begins with  The opinion relates to ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "15" ||
                                                  r.historicalObjectId == 15) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  The lack of automatic fire detection on the ground floor. The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "15" ||
                                                  r.historicalObjectId == 15) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of precise plans.The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "16" ||
                                                  r.historicalObjectId == 16) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the request and the compensatory measures validated by the commission. EX: The request relates to the structure's lack of fire stability. As a compensatory measure, a category A fire safety system is set up with generalized automatic detection. The box in the PRECISIONS column begins with  The request relates to...  then after a space  In compensatory measures...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "16" ||
                                                  r.historicalObjectId == 16) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  Compensatory measures that do not allow the evacuation time to be reduced;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The request relates to... ” then after a space  The unfavorable opinion is based on:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "16" ||
                                                  r.historicalObjectId == 16) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of the plans mentioned in the file .The box in the PRECISIONS column begins with  The request relates to...  then after a space  The absence of an opinion is justified by:...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "17" ||
                                                  r.historicalObjectId == 17) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "17" ||
                                                  r.historicalObjectId == 17) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire  safety system. The box in the PRECISIONS column begins with The formal notice relates to ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "17" ||
                                                  r.historicalObjectId == 17) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "18" ||
                                                  r.historicalObjectId == 18) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[
                                                  i
                                                ].details = ``)
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "18" ||
                                                  r.historicalObjectId == 18) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[
                                                  i
                                                ].details = ``)
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "18" ||
                                                  r.historicalObjectId == 18) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[
                                                  i
                                                ].details = ``)
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "19" ||
                                                  r.historicalObjectId == 19) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "0" ||
                                                    r.historicalOpinionId == 0))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "19" ||
                                                  r.historicalObjectId == 19) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "1" ||
                                                    r.historicalOpinionId == 1))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...`
                                                  ))
                                              : null ||
                                                ((values.repeatable[i]
                                                  .historicalObjectId ===
                                                  "19" ||
                                                  r.historicalObjectId == 19) &&
                                                  (values.repeatable[i]
                                                    .historicalOpinionId ===
                                                    "2" ||
                                                    r.historicalOpinionId == 2))
                                              ? (values.repeatable[i].details =
                                                  t(
                                                    `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...`
                                                  ))
                                              : null
                                          }
                                        />
                                      </th>
                                      <th>
                                        <Field
                                          className="field-width"
                                          name={`repeatable.${i}.urbanPlanningRef`}
                                        />
                                      </th>
                                      <th>
                                      <Box sx={{ display: "flex", width:"450px" }}>
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
                                          
                                           <Grid sx={{justifyContent:"center"}} container spacing={2}>
                                           {r?.filesData?.map((val) => (
                                            <>
                                             <Grid sx={{padding:"5px", }} xs={8}>
                                            <a href={val.fileURL}>
                                                {val.fileName}
                                              </a>
                                          
                                          </Grid>
                                             
                                            </>
                                          ))}
                                        </Grid>
                                          
                                        </Box>
                                      </th>
                                    </tr>
                                  </Box>
                                ))}
                                <Box sx={{ margin: "10px 0px" }}></Box>
                              </thead>
                            </table>
                          </Box>
                          <Box sx={{ textAlign: "start", padding: "5px" }}>
                            <AddIcon onClick={() => arrayHelpers.push({})} />
                          </Box>
                        </>
                      )}
                    />
                    <Box sx={{ textAlign: "right" }}>
                      <Button
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
                  </Form>
                )}
              />
            ) : null}
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CreateHistoricalData;
