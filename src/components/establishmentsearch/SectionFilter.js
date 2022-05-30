import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import CustomRadioButton from "../CustomRadioButton";
import Button from "@mui/material/Button";
import Rightarrow from "../../assets/rightarrow.png";
import don from "../../assets/donne.svg";
import { useTranslation } from "react-i18next";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import api from "../../api/index";
import { toast } from "react-toastify";
//In checked conditions first two are for add radio options and second two are for edit radio options
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const SectionFilter = ({
  setToggler,
  Toggler,
  setIcon,
  Icon,
  buttonEnability,
}) => {
  const [radioValues, setRadioValues] = useState({});
  const [configurationValues, setConfigurationValues] = useState({
    id: "",
  });
  const [filterData, setFilterData] = useState();
  const { t } = useTranslation();
  const store = Store();
  const updatestore = UpdateStore();
  useEffect(() => {
    console.log("rendered");
    api(
      "get",
      `/api/v1/casefiles/section_filters/${
        store?.caseFileId ? store?.caseFileId : 0
      }`
    ).then((res) => {
      console.log(res);
      setFilterData(res?.data);
      if (res?.data?.selectedSectionGroupId) {
        setRadioValues({ groupid: res?.data?.selectedSectionGroupId });
      }
    });
  }, []);

  const _setState = (key, value, configid) => {
    const obj = {};
    obj[key] = value;
    setRadioValues({
      ...radioValues,
      ...obj,
    });
    //   setConfigurationValues(
    //       {
    //         ...configurationValues,
    //         ...obj,
    //         id:configid
    //       }
    //   )
    if (
      radioValues.groupid != value &&
      key == "groupid" &&
      radioValues.groupid != undefined
    ) {
      setRadioValues({
        sectionGroupTypeId: "",
        sectionClassementId: "",
        groupid: value,
      });
      setConfigurationValues({
        configurationOne: "",
        configurationTwo: "",
        configurationThree: "",
      });
    }
  };

  //////for configurationvalues
  const setState = (key, value, configid) => {
    const obj = {};
    obj[key] = value;
    setConfigurationValues({
      ...configurationValues,
      ...obj,
      id: configid,
    });
    if (
      radioValues.groupid != value &&
      key == "groupid" &&
      radioValues.groupid != undefined
    ) {
      setConfigurationValues({
        configurationOne: "",
        configurationTwo: "",
        configurationThree: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const alreadychecked = filterData?.groups?.filter((value) => {
      return value?.sectionGroupId == radioValues?.groupid;
    });
    const obj = {
      sectionGroupId: radioValues.groupid,
      sectionGroupTypeId: radioValues.sectionGroupTypeId
        ? radioValues.sectionGroupTypeId
        : alreadychecked[0]?.groupTypes
            ?.filter((val) => {
              return val?.isSelected === true;
            })
            .map((values) => values?.sectionGroupTypeId)[0],
      sectionClassementId: radioValues?.sectionClassementId
        ? radioValues?.sectionClassementId
        : alreadychecked[0]?.groupClassements
            ?.filter((val) => {
              return val?.isSelected === true;
            })
            .map((values) => values?.sectionClassementId)[0],
      configurationOne: configurationValues?.configurationOne
        ? configurationValues?.configurationOne
        : alreadychecked[0]?.groupTypes
            ?.filter((val) => {
              return val?.isSelected === true;
            })
            .map((values) => values?.sectionGroupTypeId)[0],
      configurationTwo: !configurationValues?.configurationTwo
        ? alreadychecked[0]?.configs.configurationTwo
        : configurationValues?.configurationTwo == 1
        ? true
        : false,
      configurationThree: !configurationValues?.configurationThree
        ? alreadychecked[0]?.configs.configurationThree
        : configurationValues?.configurationThree == 1
        ? true
        : false,
      caseFileId: store?.caseFileId,
    };

    if (store?.caseFileId) {
      api("post", "/api/v1/casefiles/save_section_filters", obj).then((res) => {
        if (res?.data?.success === true) {
          toast.success(t("Successfull"));
          updatestore({ Sectionfilterdatasaved: true });
          updatestore({
            activeNavbarTab: 2,
            btnenableImpantation: false,
            validatedSections: {
              ...store?.validatedSections,
              sectionfiltervalidated: true,
            },
          });
          setToggler((pre) => {
            return {
              ...pre,
              togglerSectionFilter: false,
            };
          });
          setIcon((pre) => {
            return {
              ...pre,
              iconsectionfilter: true,
            };
          });
        }
      });
    } else {
      toast.error("ID de dossier manquant");
    }
  };
  console.log(store);
  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              togglerSectionFilter: !Toggler.togglerSectionFilter,
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
        <Typography variant="h6"> reglementaions</Typography>
        {Icon.iconsectionfilter ||
        store?.validatedSections?.sectionfiltervalidated ? (
          <img src={don} />
        ) : null}
      </Box>
      <Accordion
        sx={{
          margin: "10px auto !important",
          borderRadius: "10px",
          width: "97.5%",
        }}
        expanded={Toggler.togglerSectionFilter ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item sx={{ boxShadow: "none", width: "97%", margin: "auto" }}>
            <form type="submit" onSubmit={handleSubmit}>
              {store?.activeCase === "newcase" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {filterData?.groups?.map((val) => (
                    <>
                      <div
                        style={{ width: "100%", padding:"2% 0%" }}
                        className="heading-establishment"
                      >
                        <span className="checklist-heading line">
                          {val?.name}
                        </span>
                        <Box sx={{ textAlign: "start", width: "5%" }}>
                          <CustomRadioButton
                            setState={setRadioValues}
                            id={val?.sectionGroupId}
                            defaultChecked={
                              val?.sectionGroupId ===
                                filterData?.selectedSectionGroupId &&
                              !store?.Sectionfilterdatasaved
                            }
                            For={val?.name}
                            Name="groupid"
                            onChange={(e) => {
                              _setState("groupid", val?.sectionGroupId);
                            }}
                            {...label}
                          />
                        </Box>
                        <Box
                          sx={{
                            borderTop: "3px solid #C5D3DB",
                            width: "100%",
                            marginTop: "12px",
                          }}
                        ></Box>
                      </div>
                      {
                        <>
                          <div className="radio-btn-container">
                            {val?.groupTypes.map((grouptypes) => (
                              <>
                                <div className="radion-btn-text-container">
                                  <span style={{textAlign:"start"}} className="radio-btn-name-text">
                                    {grouptypes?.name}
                                  </span>
                                  <CustomRadioButton
                                    checked={
                                      (grouptypes?.sectionGroupTypeId ===
                                        radioValues?.sectionGroupTypeId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid) ||
                                      (grouptypes?.isSelected &&
                                        !radioValues?.sectionGroupTypeId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid &&
                                        !store?.Sectionfilterdatasaved)
                                      //   ||
                                      //   (grouptypes?.isSelected && filterData?.selectedSectionGroupId===val?.sectionGroupId && val?.sectionGroupId==radioValues?.groupid)
                                    }
                                    onChange={(e) =>
                                      _setState(
                                        "sectionGroupTypeId",
                                        grouptypes?.sectionGroupTypeId
                                      )
                                    }
                                    setState={setRadioValues}
                                    Name="types"
                                    For={grouptypes?.name}
                                    btnName={grouptypes?.name}
                                    disabled={
                                      val?.sectionGroupId !=
                                      radioValues?.groupid
                                    }
                                  />
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      }
                      {
                        <>
                         <div
                         style={{
                          borderTop:
                            val?.groupClassements.length > 0
                              ? "1px solid #C5D3DB"
                              : "",
                          width: "100%",
                        }}
                        > 
                        </div>
                          <div
                           
                            className="radio-btn-container"
                          >
                            {val?.groupClassements.map((groupClassements) => (
                              <>
                                <div style={{textAlign:"start"}} className="radion-btn-text-container">
                                  <span style={{width:"80%"}}  className="radio-btn-name-text">
                                    {groupClassements?.name}
                                  </span>
                                  <CustomRadioButton
                                    checked={
                                      (groupClassements?.sectionClassementId ===
                                        radioValues?.sectionClassementId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid) ||
                                      (groupClassements?.isSelected &&
                                        !radioValues?.sectionClassementId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid &&
                                        !store?.Sectionfilterdatasaved)
                                      //    ||
                                      //    (store.activeCase === "currentcases" && groupClassements?.isSelected && !radioValues?.sectionClassementId)
                                    }
                                    textAlign={true}
                                    onChange={(e) =>
                                      _setState(
                                        "sectionClassementId",
                                        groupClassements.sectionClassementId
                                      )
                                    }
                                    setState={setRadioValues}
                                    Name="classements"
                                    For={groupClassements?.name}
                                    btnName={groupClassements?.name}
                                    disabled={
                                      val?.sectionGroupId !=
                                      radioValues?.groupid
                                    }
                                  />
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      }
                      {
                        <>
                          <div
                            className="radio-btn-container"
                            style={{
                              borderTop: "1px solid #C5D3DB",
                              width: "99%",
                              display: "flex",
                              flexDirection: "column",
                              padding:"0% 0.4%"
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <div
                                style={{ width: "25%" }}
                                className="radion-btn-text-container"
                              >
                                <span style={{textAlign:"start", width:"100%"}} className="radio-btn-name-text">
                                  Simple RDC
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                      val.configs.configurationId ==
                                        configurationValues?.id &&
                                      configurationValues?.configurationOne ==
                                        1) ||
                                    (val?.configs?.configurationOne == 1 &&
                                      !configurationValues?.configurationOne &&
                                      val?.sectionGroupId ==
                                        radioValues?.groupid &&
                                      !store?.Sectionfilterdatasaved)
                                    // ||
                                    //   (
                                    //     (filterData?.selectedSectionGroupId===val?.sectionGroupId && !configurationValues?.configurationOne && val?.configs?.configurationOne==1 && !radioValues.groupid)
                                    //   )
                                    // ||
                                    // (store.activeCase === "currentcases" && groupClassements?.isSelected && val.configs.configurationId==1)
                                  }
                                  onChange={(e) => {
                                    setState(
                                      "configurationOne",
                                      1,
                                      val?.configs?.configurationId
                                    );
                                  }}
                                  setState={setConfigurationValues}
                                  Name="configrationone"
                                  For="simplerdc"
                                  btnName="Simple RDC"
                                  disabled={
                                    val?.sectionGroupId != radioValues?.groupid
                                  }
                                />
                              </div>
                              <div
                                style={{ width: "29%" }}
                                className="radion-btn-text-container"
                              >
                                <span style={{width:"100%"}} className="radio-btn-name-text">
                                  A etages moins 8m
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                      val.configs.configurationId ==
                                        configurationValues?.id &&
                                      configurationValues?.configurationOne ==
                                        2) ||
                                    (val?.configs?.configurationOne == 2 &&
                                      !configurationValues?.configurationOne &&
                                      val?.sectionGroupId ==
                                        radioValues?.groupid &&
                                      !store?.Sectionfilterdatasaved)
                                  }
                                  onChange={(e) =>
                                    setState(
                                      "configurationOne",
                                      2,
                                      val?.configs?.configurationId
                                    )
                                  }
                                  setState={setConfigurationValues}
                                  Name="configrationone"
                                  For="moins8m"
                                  btnName="plus8m"
                                  disabled={
                                    val?.sectionGroupId != radioValues?.groupid
                                  }
                                />
                              </div>
                              <div
                                style={{ width: "40%", textAlign:"start" }}
                                className="radion-btn-text-container"
                              >
                                <span style={{width:"45%"}} className="radio-btn-name-text">
                                  A etages plus 8m
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                      val.configs.configurationId ==
                                        configurationValues?.id &&
                                      configurationValues?.configurationOne ==
                                        3) ||
                                    (val?.configs?.configurationOne == 3 &&
                                      !configurationValues?.configurationOne &&
                                      val?.sectionGroupId ==
                                        radioValues?.groupid &&
                                      !store?.Sectionfilterdatasaved)
                                  }
                                  onChange={(e) =>
                                    setState(
                                      "configurationOne",
                                      3,
                                      val?.configs?.configurationId
                                    )
                                  }
                                  setState={setConfigurationValues}
                                  Name="configrationone"
                                  For="simplerdc"
                                  btnName="Simple RDC"
                                  disabled={
                                    val?.sectionGroupId != radioValues?.groupid
                                  }
                                />
                              </div>
                            </div>

                            <div
                              style={{ width: "52.7%" }}
                              className="radion-btn-text-container"
                            >
                              <span style={{textAlign:"start", width:"94%"}} className="radio-btn-name-text">
                                Avec sous-soul
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationTwo ==
                                      1) ||
                                  (val?.configs?.configurationTwo &&
                                    !configurationValues?.configurationTwo &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                    !store?.Sectionfilterdatasaved)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationTwo",
                                    1,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationtwo"
                                For="avecsoussol"
                                btnName="Avec sous-sol"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                                value="1"
                              />
                              <span style={{textAlign:"start", width:"100%"}}  className="radio-btn-name-text">
                                Sans sous-soul
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationTwo ==
                                      2) ||
                                  (val?.configs?.configurationTwo == false &&
                                    configurationValues?.configurationTwo ==
                                      false &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                    !store?.Sectionfilterdatasaved)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationTwo",
                                    2,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationtwo"
                                For="sanssoussol"
                                btnName="Sans sous-sol"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                                value="2"
                              />
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid #C5D3DB",
                                width: "100%",
                              }}
                            >
                              {" "}
                            </div>
                            <div
                              style={{display:"flex", padding:"1% 0%", borderBottom:"1px solid #C5D3DB"}}
                             
                            >
                                <div style={{display:"flex", alignItems:"center", width:"26%"}}> 
                              <span
                               style={{textAlign:"start", width:"47%"}}
                              
                              >
                                Avec sommeil
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationThree ==
                                      1) ||
                                  (val?.configs?.configurationThree &&
                                    !configurationValues?.configurationThree &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                    !store?.Sectionfilterdatasaved)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationThree",
                                    1,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationthree"
                                For="avecsoussol"
                                btnName="Avec sous-sol"
                                width="auto"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                              />
                              </div>
                              <div style={{display:"flex", alignItems:"center", width:"60%"}}>
                              <span
                                 style={{textAlign:"start", width:"20.5%"}}
                               
                              >
                                Sans sommeil
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationThree ==
                                      2) ||
                                  (val?.configs?.configurationThree == false &&
                                    configurationValues?.configurationThree ==
                                      false &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                    !store?.Sectionfilterdatasaved)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationThree",
                                    2,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationthree"
                                For="sanssoussol"
                                btnName="Sans sous-sol"
                                width="auto"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                              />
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </>
                  ))}
                </div>
              ) : null}
              {store?.activeCase === "currentcases" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {filterData?.groups?.map((val) => (
                    <>
                      <div
                        style={{ width: "100%", padding:"2% 0%" }}
                        className="heading-establishment"
                      >
                        <span className="checklist-heading line">
                          {val?.name}
                        </span>
                        <Box sx={{ textAlign: "start", width: "5%" }}>
                          <CustomRadioButton
                            setState={setRadioValues}
                            id={val?.sectionGroupId}
                            defaultChecked={
                              val?.sectionGroupId ===
                              filterData?.selectedSectionGroupId
                            }
                            For={val?.name}
                            Name="groupid"
                            onChange={(e) => {
                              _setState("groupid", val?.sectionGroupId);
                            }}
                            {...label}
                          />
                        </Box>
                        <Box
                          sx={{
                            borderTop: "3px solid #C5D3DB",
                            width: "100%",
                            marginTop: "12px",
                          }}
                        ></Box>
                      </div>
                      {
                        <>
                          <div className="radio-btn-container">
                            {val?.groupTypes.map((grouptypes) => (
                              <>
                                <div className="radion-btn-text-container">
                                  <span style={{textAlign:"start"}} className="radio-btn-name-text">
                                    {grouptypes?.name}
                                  </span>
                                  <CustomRadioButton
                                    checked={
                                      (grouptypes?.sectionGroupTypeId ===
                                        radioValues?.sectionGroupTypeId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid) ||
                                      (grouptypes?.isSelected &&
                                        !radioValues?.sectionGroupTypeId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid) ||
                                      (grouptypes?.isSelected &&
                                        filterData?.selectedSectionGroupId ===
                                          val?.sectionGroupId &&
                                        !radioValues?.groupid)
                                      //   ||
                                      //   (grouptypes?.isSelected && filterData?.selectedSectionGroupId===val?.sectionGroupId && val?.sectionGroupId==radioValues?.groupid)
                                    }
                                    onChange={(e) =>
                                      _setState(
                                        "sectionGroupTypeId",
                                        grouptypes?.sectionGroupTypeId
                                      )
                                    }
                                    setState={setRadioValues}
                                    Name="types"
                                    For={grouptypes?.name}
                                    btnName={grouptypes?.name}
                                    disabled={
                                      val?.sectionGroupId !=
                                      radioValues?.groupid
                                    }
                                  />
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      }
                      {
                        <>
                        <div
                         style={{
                          borderTop:
                            val?.groupClassements.length > 0
                              ? "1px solid #C5D3DB"
                              : "",
                          width: "100%",
                        }}
                        > 
                        </div>
                          <div
                            className="radio-btn-container"
                          >
                            {val?.groupClassements.map((groupClassements) => (
                              <>
                                <div style={{textAlign:"start"}} className="radion-btn-text-container">
                                  <span style={{width:"80%"}} className="radio-btn-name-text">
                                    {groupClassements?.name}
                                  </span>
                                  <CustomRadioButton
                                    checked={
                                      (groupClassements?.sectionClassementId ===
                                        radioValues?.sectionClassementId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid) ||
                                      (groupClassements?.isSelected &&
                                        !radioValues?.sectionClassementId &&
                                        val?.sectionGroupId ==
                                          radioValues?.groupid) ||
                                      (groupClassements?.isSelected &&
                                        filterData?.selectedSectionGroupId ===
                                          val?.sectionGroupId &&
                                        !radioValues?.groupid)
                                      //    ||
                                      //    (store.activeCase === "currentcases" && groupClassements?.isSelected && !radioValues?.sectionClassementId)
                                    }
                                    textAlign={true}
                                    onChange={(e) =>
                                      _setState(
                                        "sectionClassementId",
                                        groupClassements.sectionClassementId
                                      )
                                    }
                                    setState={setRadioValues}
                                    Name="classements"
                                    For={groupClassements?.name}
                                    btnName={groupClassements?.name}
                                    disabled={
                                      val?.sectionGroupId !=
                                      radioValues?.groupid
                                    }
                                  />
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      }
                      {
                        <>
                          <div
                            className="radio-btn-container"
                            style={{
                              borderTop: "1px solid #C5D3DB",
                              width: "99%",
                              display: "flex",
                              flexDirection: "column",
                              padding:"0% 0.4%"
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <div
                                style={{ width: "25%" }}
                                className="radion-btn-text-container"
                              >
                                <span style={{textAlign:"start", width:"100%"}} className="radio-btn-name-text">
                                  Simple RDC
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                      val.configs.configurationId ==
                                        configurationValues?.id &&
                                      configurationValues?.configurationOne ==
                                        1) ||
                                    (val?.configs?.configurationOne == 1 &&
                                      !configurationValues?.configurationOne &&
                                      filterData?.selectedSectionGroupId ===
                                        val?.sectionGroupId &&
                                      val?.sectionGroupId ==
                                        radioValues?.groupid) ||
                                    (filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                      !configurationValues?.configurationOne &&
                                      val?.configs?.configurationOne == 1 &&
                                      !radioValues.groupid)
                                    // ||
                                    // (store.activeCase === "currentcases" && groupClassements?.isSelected && val.configs.configurationId==1)
                                  }
                                  onChange={(e) => {
                                    setState(
                                      "configurationOne",
                                      1,
                                      val?.configs?.configurationId
                                    );
                                  }}
                                  setState={setConfigurationValues}
                                  Name="configrationone"
                                  For="simplerdc"
                                  btnName="Simple RDC"
                                  disabled={
                                    val?.sectionGroupId != radioValues?.groupid
                                  }
                                />
                              </div>
                              <div
                                style={{ width: "29%" }}
                                className="radion-btn-text-container"
                              >
                                <span  style={{ width: "100%" }} className="radio-btn-name-text">
                                  A etages moins 8m
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                      val.configs.configurationId ==
                                        configurationValues?.id &&
                                      configurationValues?.configurationOne ==
                                        2) ||
                                    (val?.configs?.configurationOne == 2 &&
                                      !configurationValues?.configurationOne &&
                                      filterData?.selectedSectionGroupId ===
                                        val?.sectionGroupId &&
                                      val?.sectionGroupId ==
                                        radioValues?.groupid) ||
                                    (filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                      !configurationValues?.configurationOne &&
                                      val?.configs?.configurationOne == 2 &&
                                      !radioValues.groupid)
                                  }
                                  onChange={(e) =>
                                    setState(
                                      "configurationOne",
                                      2,
                                      val?.configs?.configurationId
                                    )
                                  }
                                  setState={setConfigurationValues}
                                  Name="configrationone"
                                  For="moins8m"
                                  btnName="plus8m"
                                  disabled={
                                    val?.sectionGroupId != radioValues?.groupid
                                  }
                                />
                              </div>
                              <div
                                style={{ width: "40%", textAlign:"start" }}
                                className="radion-btn-text-container"
                              >
                                <span style={{width:"45%"}} className="radio-btn-name-text">
                                  A etages plus 8m
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (val?.sectionGroupId ==
                                      radioValues?.groupid &&
                                      val.configs.configurationId ==
                                        configurationValues?.id &&
                                      configurationValues?.configurationOne ==
                                        3) ||
                                    (val?.configs?.configurationOne == 3 &&
                                      !configurationValues?.configurationOne &&
                                      filterData?.selectedSectionGroupId ===
                                        val?.sectionGroupId &&
                                      val?.sectionGroupId ==
                                        radioValues?.groupid) ||
                                    (filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                      !configurationValues?.configurationOne &&
                                      val?.configs?.configurationOne == 3 &&
                                      !radioValues.groupid)
                                  }
                                  onChange={(e) =>
                                    setState(
                                      "configurationOne",
                                      3,
                                      val?.configs?.configurationId
                                    )
                                  }
                                  setState={setConfigurationValues}
                                  Name="configrationone"
                                  For="simplerdc"
                                  btnName="Simple RDC"
                                  disabled={
                                    val?.sectionGroupId != radioValues?.groupid
                                  }
                                />
                              </div>
                            </div>
                            <div
                              style={{ width: "52.7%" }}
                              className="radion-btn-text-container"
                            >
                              <span style={{textAlign:"start", width:"94%"}} className="radio-btn-name-text">
                                Avec sous-soul
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationTwo ==
                                      1) ||
                                  (val?.configs?.configurationTwo &&
                                    !configurationValues?.configurationTwo &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid) ||
                                  (filterData?.selectedSectionGroupId ==
                                    radioValues.groupid &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    !configurationValues?.configurationTwo &&
                                    val?.configs?.configurationTwo == true)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationTwo",
                                    1,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationtwo"
                                For="avecsoussol"
                                btnName="Avec sous-sol"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                                value="1"
                              />
                              <span style={{width:"100%", textAlign:"start"}} className="radio-btn-name-text">
                                Sans sous-soul
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationTwo ==
                                      2) ||
                                  (val?.configs?.configurationTwo == false &&
                                    configurationValues?.configurationTwo ==
                                      false &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid) ||
                                  (filterData?.selectedSectionGroupId ==
                                    radioValues.groupid &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    !configurationValues?.configurationTwo &&
                                    val?.configs?.configurationTwo == false)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationTwo",
                                    2,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationtwo"
                                For="sanssoussol"
                                btnName="Sans sous-sol"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                                value="2"
                              />
                            </div>
                            <div
                              style={{
                                borderBottom: "1px solid #C5D3DB",
                                width: "100%",
                              }}
                            >
                              {" "}
                            </div>
                            <div
                               style={{display:"flex", padding:"1% 0%"}}
                            >
                              <div style={{display:"flex", alignItems:"center", width:"26%"}}> 
                              <span
                              style={{textAlign:"start", width:"47%"}}
                              >
                                Avec sommeil
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationThree ==
                                      1) ||
                                  (val?.configs?.configurationThree &&
                                    !configurationValues?.configurationThree &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid) ||
                                  (filterData?.selectedSectionGroupId ==
                                    radioValues.groupid &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    !configurationValues?.configurationThree &&
                                    val?.configs?.configurationThree == true)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationThree",
                                    1,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationthree"
                                For="avecsoussol"
                                btnName="Avec sous-sol"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                                width="auto"
                              />
                             </div>
                              <div style={{display:"flex", alignItems:"center", width:"60%"}}>
                              <span
                                style={{textAlign:"start", width:"20.5%"}}
                              >
                                Sans sommeil
                              </span>
                              <CustomRadioButton
                                checked={
                                  (val?.sectionGroupId ==
                                    radioValues?.groupid &&
                                    val.configs.configurationId ==
                                      configurationValues?.id &&
                                    configurationValues?.configurationThree ==
                                      2) ||
                                  (val?.configs?.configurationThree == false &&
                                    configurationValues?.configurationThree ==
                                      false &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    val?.sectionGroupId ==
                                      radioValues?.groupid) ||
                                  (filterData?.selectedSectionGroupId ==
                                    radioValues.groupid &&
                                    filterData?.selectedSectionGroupId ===
                                      val?.sectionGroupId &&
                                    !configurationValues?.configurationThree &&
                                    val?.configs?.configurationThree == false)
                                }
                                onChange={(e) =>
                                  setState(
                                    "configurationThree",
                                    2,
                                    val?.configs?.configurationId
                                  )
                                }
                                setState={setConfigurationValues}
                                Name="configrationthree"
                                For="sanssoussol"
                                btnName="Sans sous-sol"
                                disabled={
                                  val?.sectionGroupId != radioValues?.groupid
                                }
                                width="auto"
                              />
                              </div>
                            </div>
                            <div style={{borderBottom:"1px solid #C5D3DB", width:"100%"}}></div>
                          </div>
                        </>
                      }
                    </>
                  ))}
                </div>
              ) : null}
              <>
                <div
                  style={{
                    width: "99%",
                    borderBottom: "1px solid #C5D3DB",
                    textAlign:"start",
                    margin:"auto"
                  }}
                  className="radion-btn-text-container"
                >
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"83%", padding:"1% 0%"}}> 
                  <div style={{width:"41%"}} className="levels"> 
                  <span
                 style={{ width:"47%"}}
                    className="radio-btn-name-text"
                  >
                    N1
                  </span>
                  <CustomRadioButton
                    Name="difficultylevels"
                    For="none"
                    btnName="none"
                    width="auto"
                  />
                  </div>
                  <div style={{width:"45%"}} className="levels"> 
                  <span
                   style={{ width:"46%"}}
                  >
                    N2
                  </span>
                  <CustomRadioButton
                    Name="difficultylevels"
                    For="ntwo"
                    btnName="ntwo"
                    width="auto"
                  />
                  </div>
                  <div style={{width:"45%"}} className="levels"> 
                  <span
                  style={{width:"42%"}}
                    className="radio-btn-name-text"
                  >
                    N3
                  </span>
                  <CustomRadioButton
                     Name="difficultylevels"
                    For="nthree"
                    btnName="nthree"
                    width="auto"
                  />
                 </div>
                </div>
                </div>
              </>
              <Box
                sx={{
                  textAlign: "right",
                  width: "100%",
                  paddingTop: "5px",
                }}
              >
                <Button
                  type="submit"
                  //disabled={buttonEnability?.Sectionfilterbutton||store?.validatedSections?.sectionfiltervalidated!=true? true:false}
                  //disabled={store?.validatedSections?.rankingvalidated!=true? true:false}
                  disabled={
                    store.activeCase === "newcase"
                      ? !store?.validatedSections?.rankingvalidated
                        ? true
                        : store.activeCase === "currentcase"
                        ? false
                        : false
                      : false
                  }
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
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SectionFilter;
