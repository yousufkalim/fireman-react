import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../api/index";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Store } from "../../StoreContext";
import { toast } from "react-toastify";
import moment from "moment";
import {
  Formik,
  Field,
  Form,
  FieldArray,
} from "formik";
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const CreateHistoricalData = ({
  establishmentid,
  historicalDataEstablishment,
}) => {
  const [dropdownValue, setdropdownValue] = useState({
    objectDropdown: "",
  });
  const newarr = historicalDataEstablishment?.map((val) => ({
    histDate: moment(val.histDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
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
  const onSubmit = (values) => {
    const newarr = values.repeatable.map((object) => ({
      ...object,
      historicalEventid: "0",
      establishmentId: establishmentid,
    }));

    console.log("newarr",newarr);
    if(store.activeCase === "newcase") 
    {
     alert("post");
    newarr.map((val) => {
      return new Promise((resolve, reject) => {
        api("post", "/api/v1/create_historicaldata_establishment", val)
          .then((res) => {
            if(res.status= 200){
              toast.success("Success!")
            }
            let form_data = new FormData();
            form_data.append("docFile", val.image);
            form_data.append("HistoricalEventId", "23");
            form_data.append("HistoricalEventFilesId", "0");
            if (val.image) {
              api("post", "/api/v1/upload_historicaldata_file", form_data)
                .then((res) => {
                  if(res.status= 200){
                    toast.success("Success!")
                  }
                  //console.log("imageres:", res);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      });
    });
  }
    if(store.activeCase === "currentcases") 
    {
      alert("put");
      newarr.map((val) => {
        return new Promise((resolve, reject) => {
          api("put", "/api/v1/update_historicaldata_establishment", val)
            .then((res) => {
              console.log("update",res);
              if(res.status= 200){
                toast.success("Success!")
              }
              let form_data = new FormData();
              form_data.append("docFile", val.image);
              form_data.append("HistoricalEventId", "23");
              form_data.append("HistoricalEventFilesId", "0");
              if (val.image) {
                api("post", "/api/v1/upload_historicaldata_file", form_data)
                  .then((res) => {
                    if(res.status= 200){
                      toast.success("Success!")
                    }
                    //console.log("imageres:", res);
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
      {store.activeCase === "newcase" ? (
        <Formik
          onSubmit={(values) => onSubmit(values)}
          initialValues={{ repeatable: [{}] }}
          render={({ values, setFieldValue }) => (
            <Form>
              <FieldArray
                name="repeatable"
                render={(arrayHelpers) => (
                  <>
                    {values.repeatable.map((r, i) => (
                      <div
                        style={{
                          display: "flex",
                          textAlign: "start",
                          paddingBottom: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>Date </label>
                          <Field
                            style={{ padding: "8px" }}
                            type="date"
                            name={`repeatable.${i}.dateEvent`}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>Objet </label>
                          <Field
                            as="select"
                            name={`repeatable.${i}.historicalObjectId`}
                            style={{ padding: "10px" }}
                          >
                            <option value="">Choisissez s'il vous plaît</option>
                            {dropdownValue.objectDropdown.data?.map(
                              (item, i) => (
                                <option value={item.value}>{item.text}</option>
                              )
                            )}
                          </Field>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>Avis </label>
                          <Field
                            as="select"
                            name={`repeatable.${i}.historicalOpinionId`}
                            style={{ padding: "10px" }}
                          >
                            <option value="">Choisissez s'il vous plaît</option>
                            <option value="0">Avis favorable</option>
                            <option value="1">Avis défavorable</option>
                            <option value="2">Sans avis</option>
                          </Field>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>
                            Précisions – Apparaitra dans le rapport{" "}
                          </label>
                          <Field
                            style={{ padding: "10px" }}
                            //value={values.repeatable[i].details}
                            value={
                              values.repeatable[i].historicalObjectId === "4" &&
                              values.repeatable[i].historicalOpinionId === "0"
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                            proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. "The box in the PRECISIONS column begins with " It's about ... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "4" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The 
                   unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "4" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ".
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "5" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `Optionally give the 
                   general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. "The box in the PRECISIONS column 
                   begins with " The changes relate to... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "5" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `Optionally give the 
                   general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the unfavorable 
                   opinion. EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The changes relate to... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "5" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Optionally give the general nature 
                   of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in 
                   the PRECISIONS column begins with " The changes relate to... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "6" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. "The box in the PRECISIONS column begins with It's about... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "6" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: 
                   The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The unfavorable opinion is based on:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "6" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "7" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give any parts of the establishment 
                   that have been received. EX: The parts accepted are the ground floor, and the first two levels. "The box in the PRECISIONS column begins with The parts received are ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "7" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `“Give the parts of the establishment 
                   that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion 
                   is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The parts received are... ” then after a space " The unfavorable opinion is based on:... ”`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "7" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the parts of the establishment that have 
                   been received. EX: The parts accepted are the ground floor, and the first two levels.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " The parts received are... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "8" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "8" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the reasons for the unfavorable 
                   opinion. EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "8" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the motivations for the without opinion. EX:
                   The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "9" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system "The box in the PRECISIONS column begins 
                   with " The work relates to... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "9" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature 
                   of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the unfavorable 
                   opinion. EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The work relates to... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "9" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the planned 
                   work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an 
                   opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with " The work relates to... ” then after a space " 
                   The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "10" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[i].details = `You may give 
                   some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors »
                   The box in the PRECISIONS column begins with " The changes relate to... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "10" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[i].details = `You may give 
                   some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the 
                   unfavorable opinion.EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The changes relate to... ” then after a space " The unfavorable opinion is based on:...  `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "10" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[i].details = `You may give 
                   some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for 
                   the without opinion.EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " The changes relate to... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "11" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the work received. EX: The reception covers the smoke extraction installations at 3e stage ".The box in the PRECISIONS column begins with " The reception is on...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "11" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature 
                   of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion 
                   is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "11" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   work received. EX: The reception covers the smoke extraction installations at 3e stage.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ".
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "12" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage ".The box in the PRECISIONS column begins with " The reception is 
                   on... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "12" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on 
                   the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The 
                   unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "12" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ".
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "13" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the new classification of the 
                   establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with " Reclassification in...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "13" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. 
                   EX: Request for reclassification in type X of 3e category.
                   Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:
                   -  the unfavorable opinion in progress;
                   -  inconsistencies relating to workforce declarations. "
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The unfavorable opinion is based on:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "13" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. EX: Request 
                   for reclassification in type X of 3e category.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce ".
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "14" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the new classification of the 
                   establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with " Reclassification in... ”`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "14" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. 
                   EX: Request for reclassification in type X of 3e category.
                   Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:
                   -  the unfavorable opinion in progress;
                   -  inconsistencies relating to workforce declarations. "
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "14" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. EX: Request 
                   for reclassification in type X of 3e category.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce ".
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "15" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   opinion requested. EX: The opinion relates to the functional specifications of the fire safety system. "The box in the PRECISIONS column begins with " The opinion relates 
                   to ... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "15" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the unfavorable opinion. 
                   EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  The lack of automatic fire detection on the ground floor. "
                   The box in the PRECISIONS column begins with " The opinion relates to ... " then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "15" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the opinion 
                   requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated 
                   by the non-presentation of precise plans".
                   The box in the PRECISIONS column begins with " The opinion relates to ... " then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "16" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the request and the compensatory measures validated by the commission. EX: The request relates to the structure's lack of fire stability. As a compensatory measure, a 
                   category A fire safety system is set up with generalized automatic detection. "
                   The box in the PRECISIONS column begins with " The request relates to... ” then after a space " In compensatory measures... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "16" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `You may give some details on the 
                   nature of the request. EX: The request relates to the structure's lack of fire stability.
                   Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:
                   -  Compensatory measures that do not allow the evacuation time to be reduced;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The request relates to... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "16" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `You may give some details on the nature 
                   of the request. EX: The request relates to the structure's lack of fire stability.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of the plans mentioned in the file ".
                   The box in the PRECISIONS column begins with " The request relates to... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "17" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire 
                   safety system. ”
                   The box in the PRECISIONS column begins with The formal notice relates to ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "17" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire 
                   safety system. ”
                   The box in the PRECISIONS column begins with The formal notice relates to ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "17" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire 
                   safety system. ”
                   The box in the PRECISIONS column begins with The formal notice relates to ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "18" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "18" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "18" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "19" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 
                   evacuated. The leak came from the shut-off valve in the kitchen. "
                   The box in the PRECISIONS column begins with Emergency response for ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "19" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 
                   evacuated. The leak came from the shut-off valve in the kitchen. "
                   The box in the PRECISIONS column begins with Emergency response for ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "19" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 
                   evacuated. The leak came from the shut-off valve in the kitchen. "
                   The box in the PRECISIONS column begins with Emergency response for ...`)
                                : null
                            }
                            name={`repeatable.${i}.details`}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {/* <label>Référence d’urbanisme </label> */}
                          <BootstrapTooltip title=" Inscrire le numéro de la demande correspondante (PC, AT, courrier...).">
                            <Button
                              sx={{
                                padding: "1px 2px",
                                fontSize: "8px",
                                color: "dimgray",
                              }}
                            >
                              Référence d’urbanisme
                            </Button>
                          </BootstrapTooltip>
                          <Field
                            style={{ padding: "10px" }}
                            name={`repeatable.${i}.urbanplanningreference`}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            fontSize: "12px",
                          }}
                        >
                          <label>Pièce jointe </label>
                          <input
                            style={{ padding: "10px" }}
                            name={`repeatable.${i}.image`}
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                `repeatable.${i}.image`,
                                event.target.files[0]
                              );
                            }}
                          />
                        </Box>
                      </div>
                    ))}
                    <Box sx={{ textAlign: "start", padding: "5px" }}>
                      <AddIcon onClick={() => arrayHelpers.push({})} />
                    </Box>
                  </>
                )}
              />
              <Box sx={{ textAlign: "end", padding: "10px" }}>
                <Button type="submit" variant="contained">
                  Valider
                </Button>
              </Box>
            </Form>
          )}
        />
      ) : null}
      {store.activeCase === "currentcases" ? (
        <Formik
          onSubmit={(values) => onSubmit(values)}
          initialValues={{
            repeatable: historicalDataEstablishment?.map((val) => ({
              histDate: moment(val.histDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
              historicalObjectId: val.historicalObjectId,
              historicalOpinionId: val.historicalOpinionId,
              urbanPlanningRef: val.urbanPlanningRef,
              details: val.details,
            })),
          }}
          enableReinitialize
          render={({ values, setFieldValue }) => (
            <Form>
              <FieldArray
                name="repeatable"
                enableReinitialize
                render={(arrayHelpers) => (
                  <>
                    {values.repeatable.map((r, i) => (
                      <div
                        style={{
                          display: "flex",
                          textAlign: "start",
                          paddingBottom: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>Date </label>
                          <input
                            style={{ padding: "8px" }}
                            type="date"
                            name={`repeatable.${i}.histDate`}
                            defaultValue={r.histDate}
                            onChange={(e)=>{setFieldValue(`repeatable.${i}.histDate`, e.target.value)}}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>Objet </label>
                          <Field
                            as="select"
                            name={`repeatable.${i}.historicalObjectId`}
                            style={{ padding: "10px" }}
                          >
                            <option value="">Choisissez s'il vous plaît</option>
                            {dropdownValue.objectDropdown.data?.map(
                              (item, i) => (
                                <option value={item.value}>{item.text}</option>
                              )
                            )}
                          </Field>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>Avis </label>
                          <Field
                            as="select"
                            name={`repeatable.${i}.historicalOpinionId`}
                            style={{ padding: "10px" }}
                          >
                            <option value="">Choisissez s'il vous plaît</option>
                            <option value="0">Avis favorable</option>
                            <option value="1">Avis défavorable</option>
                            <option value="2">Sans avis</option>
                          </Field>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <label>
                            Précisions – Apparaitra dans le rapport{" "}
                          </label>
                          <Field
                            style={{ padding: "10px" }}
                            //value={values.repeatable[i].details}
                            defaultValue={r.details}
                            value={
                              values.repeatable[i].historicalObjectId === "" &&
                              values.repeatable[i].historicalOpinionId === "" &&
                              store.activeCase === "newcase"
                                ? (values.repeatable[i].details = r.details)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "4" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                            proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. "The box in the PRECISIONS column begins with " It's about ... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "4" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The 
                   unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "4" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ".
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "5" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `Optionally give the 
                   general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. "The box in the PRECISIONS column 
                   begins with " The changes relate to... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "5" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `Optionally give the 
                   general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the unfavorable 
                   opinion. EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The changes relate to... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "5" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Optionally give the general nature 
                   of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in 
                   the PRECISIONS column begins with " The changes relate to... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "6" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. "The box in the PRECISIONS column begins with It's about... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "6" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: 
                   The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The unfavorable opinion is based on:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "6" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " It's about ... " then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "7" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give any parts of the establishment 
                   that have been received. EX: The parts accepted are the ground floor, and the first two levels. "The box in the PRECISIONS column begins with The parts received are ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "7" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `“Give the parts of the establishment 
                   that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion 
                   is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The parts received are... ” then after a space " The unfavorable opinion is based on:... ”`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "7" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the parts of the establishment that have 
                   been received. EX: The parts accepted are the ground floor, and the first two levels.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " The parts received are... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "8" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "8" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the reasons for the unfavorable 
                   opinion. EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "8" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the motivations for the without opinion. EX:
                   The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "9" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system "The box in the PRECISIONS column begins 
                   with " The work relates to... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "9" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature 
                   of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the unfavorable 
                   opinion. EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The work relates to... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "9" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the planned 
                   work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an 
                   opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with " The work relates to... ” then after a space " 
                   The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "10" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[i].details = `You may give 
                   some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors »
                   The box in the PRECISIONS column begins with " The changes relate to... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "10" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[i].details = `You may give 
                   some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the 
                   unfavorable opinion.EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The changes relate to... ” then after a space " The unfavorable opinion is based on:...  `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "10" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[i].details = `You may give 
                   some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for 
                   the without opinion.EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.
                   The box in the PRECISIONS column begins with " The changes relate to... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "11" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the work received. EX: The reception covers the smoke extraction installations at 3e stage ".The box in the PRECISIONS column begins with " The reception is on...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "11" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature 
                   of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion 
                   is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "11" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   work received. EX: The reception covers the smoke extraction installations at 3e stage.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ".
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "12" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage ".The box in the PRECISIONS column begins with " The reception is 
                   on... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "12" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on 
                   the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The 
                   unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "12" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ".
                   The box in the PRECISIONS column begins with " The reception is on... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "13" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the new classification of the 
                   establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with " Reclassification in...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "13" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. 
                   EX: Request for reclassification in type X of 3e category.
                   Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:
                   -  the unfavorable opinion in progress;
                   -  inconsistencies relating to workforce declarations. "
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The unfavorable opinion is based on:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "13" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. EX: Request 
                   for reclassification in type X of 3e category.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce ".
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The absence of an opinion is justified by:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "14" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the new classification of the 
                   establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with " Reclassification in... ”`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "14" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. 
                   EX: Request for reclassification in type X of 3e category.
                   Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:
                   -  the unfavorable opinion in progress;
                   -  inconsistencies relating to workforce declarations. "
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "14" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `Give the requested classification if necessary. EX: Request 
                   for reclassification in type X of 3e category.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce ".
                   The box in the PRECISIONS column begins with " Request for reclassification in... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "15" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the 
                   opinion requested. EX: The opinion relates to the functional specifications of the fire safety system. "The box in the PRECISIONS column begins with " The opinion relates 
                   to ... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "15" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the 
                   nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the unfavorable opinion. 
                   EX: The unfavorable opinion is motivated by:
                   -  non-compliance of circulation smoke extraction installations;
                   -  The lack of automatic fire detection on the ground floor. "
                   The box in the PRECISIONS column begins with " The opinion relates to ... " then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "15" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the opinion 
                   requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated 
                   by the non-presentation of precise plans".
                   The box in the PRECISIONS column begins with " The opinion relates to ... " then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "16" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of 
                   the request and the compensatory measures validated by the commission. EX: The request relates to the structure's lack of fire stability. As a compensatory measure, a 
                   category A fire safety system is set up with generalized automatic detection. "
                   The box in the PRECISIONS column begins with " The request relates to... ” then after a space " In compensatory measures... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "16" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `You may give some details on the 
                   nature of the request. EX: The request relates to the structure's lack of fire stability.
                   Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:
                   -  Compensatory measures that do not allow the evacuation time to be reduced;
                   -  the lack of formalization of evacuation instructions. "
                   The box in the PRECISIONS column begins with " The request relates to... ” then after a space " The unfavorable opinion is based on:... `)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "16" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `You may give some details on the nature 
                   of the request. EX: The request relates to the structure's lack of fire stability.
                   Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of the plans mentioned in the file ".
                   The box in the PRECISIONS column begins with " The request relates to... ” then after a space " The absence of an opinion is justified by:...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "17" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire 
                   safety system. ”
                   The box in the PRECISIONS column begins with The formal notice relates to ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "17" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire 
                   safety system. ”
                   The box in the PRECISIONS column begins with The formal notice relates to ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "17" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire 
                   safety system. ”
                   The box in the PRECISIONS column begins with The formal notice relates to ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "18" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "18" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "18" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[i].details = ``)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "19" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "0")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 
                   evacuated. The leak came from the shut-off valve in the kitchen. "
                   The box in the PRECISIONS column begins with Emergency response for ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "19" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "1")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 
                   evacuated. The leak came from the shut-off valve in the kitchen. "
                   The box in the PRECISIONS column begins with Emergency response for ...`)
                                : null ||
                                  (values.repeatable[i].historicalObjectId ===
                                    "19" &&
                                    values.repeatable[i].historicalOpinionId ===
                                      "2")
                                ? (values.repeatable[
                                    i
                                  ].details = `If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 
                   evacuated. The leak came from the shut-off valve in the kitchen. "
                   The box in the PRECISIONS column begins with Emergency response for ...`)
                                : null
                            }
                            name={`repeatable.${i}.details`}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            paddingRight: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {/* <label>Référence d’urbanisme </label> */}
                          <BootstrapTooltip title=" Inscrire le numéro de la demande correspondante (PC, AT, courrier...).">
                            <Button
                              sx={{
                                padding: "1px 2px",
                                fontSize: "8px",
                                color: "dimgray",
                              }}
                            >
                              Référence d’urbanisme
                            </Button>
                          </BootstrapTooltip>
                          <Field
                            style={{ padding: "10px" }}
                            name={`repeatable.${i}.urbanPlanningRef`}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "15%",
                            fontSize: "12px",
                          }}
                        >
                          <label>Pièce jointe </label>
                          <input
                            style={{ padding: "10px" }}
                            name={`repeatable.${i}.image`}
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                `repeatable.${i}.image`,
                                event.target.files[0]
                              );
                            }}
                          />
                        </Box>
                      </div>
                    ))}
                    <Box sx={{ textAlign: "start", padding: "5px" }}>
                      <AddIcon onClick={() => arrayHelpers.push({})} />
                    </Box>
                  </>
                )}
              />
              <Box sx={{ textAlign: "end", padding: "10px" }}>
                <Button type="submit" variant="contained">
                  Valider
                </Button>
              </Box>
            </Form>
          )}
        />
      ) : null}
    </>
  );
};

export default CreateHistoricalData;
