import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import don from "../../assets/donne.svg";
import Checkbox from '@mui/material/Checkbox';
import api from "../../api/index";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
const SectionFilterCheckBox = ({
    setToggler,
    Toggler,
    setIcon,
    Icon
}) => {
    const [filterData, setFilterData] = useState();
    const [radioValues, setRadioValues] = useState({});
    const store = Store();
    const updatestore = UpdateStore();
    useEffect(() => {
        api(
            "get",
            `/api/v1/casefiles/section_filters/${
              store?.caseFileId ? store?.caseFileId : 0
            }`
          ).then((res) => {
            console.log(res?.data)
            setFilterData(res?.data);
            // if (res?.data?.selectedSectionGroupId) {
            //   setRadioValues({ groupid: res?.data?.selectedSectionGroupId, difficultyLevel: res?.data?.difficultyLevel});
            // }
            //getTabData();
          });
    }, [])
    
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
        // if (
        //   radioValues.groupid != value &&
        //   key == "groupid" &&
        //   radioValues.groupid != undefined
        // ) {
        //   setRadioValues({
        //     sectionGroupTypeId: "",
        //     sectionClassementId: "",
        //     difficultyLevel:radioValues?.difficultyLevel,
        //     groupid: value,
        //   });
        //   setConfigurationValues({
        //     configurationOne: "",
        //     configurationTwo: "",
        //     configurationThree: "",
        //   });
        // }
      };
      console.log(radioValues,"radioValues")
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
          <form type="submit" >
          <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                {filterData?.groups?.map((val)=>(
                    <>
                     <div
                        style={{ width: "100%", padding:"2% 0%" }}
                        className="heading-establishment"
                      >
                        <span className="checklist-heading line">
                          {val?.name}
                        </span>
                        <Box sx={{ textAlign: "start", width: "5%" }}>
                        <Checkbox {...label} defaultChecked color="success" 
                         onChange={(e) => {
                            _setState("groupid", val?.sectionGroupId);
                          }}
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
                                  <Checkbox
                                  {...label} defaultChecked color="success"
                                    onChange={(e) =>
                                      _setState(
                                        "sectionGroupTypeId",
                                        grouptypes?.sectionGroupTypeId
                                      )
                                    }
                                    setState={setRadioValues}
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
                                  <Checkbox
                                  {...label} defaultChecked color="success"
                                    textAlign={true}
                                    onChange={(e) =>
                                      _setState(
                                        "sectionClassementId",
                                        groupClassements.sectionClassementId
                                      )
                                    }
                                    setState={setRadioValues}
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
                    </>
                ))
                
                }
               </div>
              
           </form>
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default SectionFilterCheckBox