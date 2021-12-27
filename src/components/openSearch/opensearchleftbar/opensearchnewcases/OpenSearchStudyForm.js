import React, { useState, useEffect,useRef } from "react";
import Box from "@mui/material/Box";
import api from "../../../../api/index";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import moment from "moment";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchStudyForm = ({
  indexdata,
  compShow,
  CompName,
  townplanning,
  study,
  casefileId,
  setCheckboxObj,
  postCheckboxesData,
  Studydata,
  currentcasescaseFileId
}) => {
  const [toggleUpdateTabs, setToggleUpdateTabs] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );
  const [toggleUpdateTabstwo, setToggleUpdateTabstwo] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );
const [classState,  setClassState] = useState(true)
const [iconState, seticonState] = useState(false)
const [checkBoxesChecked, setCheckBoxesChecked] = useState([])
  const [formValues, setFormValues] = useState({
    originId: "",
    caseAverageId: "",
    townPlanningDate: "",
    receptionServiceDate: "",
    requestTypeId: "",
    refNum: "",
    applicant: "",
    mobile: "",
    email: "",
  });
  const [dropdownValue, setdropdownValue] = useState({
    average: "",
    origin: "",
    requesttype: "",
  });
  
  console.log("caseid",townplanning);
  

  const focusPoint = useRef(null);
  const onClickTownPlanning = () => {
    setToggleUpdateTabs(!toggleUpdateTabs);
    if(compShow==="filestructure"){
      classState? focusPoint.current.style.display = "block":focusPoint.current.style.display = "none"
    }
    setClassState(!classState)
  };

  const onClickdetailsObj = () => {
    setToggleUpdateTabstwo(!toggleUpdateTabstwo);
    
  };

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
 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
      const obj = {
        caseFileCheckListId: id,
        caseFileId: casefileId,
      };
      setCheckboxObj((pre) => [...pre, obj]);
    }
    if (!checked) {
      setCheckboxObj((pre) => [
        ...pre.filter((item) => item.caseFileCheckListId !== id),
      ]);
    }
    setFormValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...formValues,
      caseFileId: casefileId,
    };
    postCheckboxesData();
    api("post", `/api/v1/casefiles/open_townplanning`, formData)
      .then((res) => {
        toast.success(res?.statusText);
        if(res?.status===200){
          seticonState(true);
        }
        if(compShow==="filestructure" && res?.status===200){
          focusPoint.current.style.display = "none"
        }
      })
      .catch((err) => toast.error(err?.statusText));
  };
  return (
    <>
      <Item
        sx={{
          marginTop: "5px",
          borderLeft: "10px solid cadetblue",
          borderRadius: "10px",
        }}
      >
        <Box
          onClick={onClickTownPlanning}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid gray",
            padding: "10px",
          }}
        >
          <h5>Related town planning documents</h5>
          <div>
            {indexdata?.sectionindex === 1 ? <CheckIcon sx={{backgroundColor:"green"}}/> : null}
            {iconState? <CheckIcon sx={{backgroundColor:"green"}}/> : null}
            <span className="inputs-heading-text"> Reduire</span>
          </div>
        </Box>
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Grid
             ref={focusPoint}
             className={`${
             CompName === "currentcases" && toggleUpdateTabs?
               "formhide"
                : "formdisplay"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <div className="establishment-form ">
                
                <div className="inputs-container">
                <label>Saisie</label>
                  <div class="flex-form">
                    <input type="text" placeholder="Origine" />
                    <select
                      className="dropdown"
                      type="select"
                      name="originId"
                     value={Studydata?.data?.originId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue?.origin?.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Date" />
                    <input
                      onChange={handleChange}
                      name="townPlanningDate"
                      value={formValues.townPlanningDate? formValues.townPlanningDate: moment(Studydata?.data?.townPlanningDate, "YYYY-MM-DD").format("YYYY-MM-DD")}
                      type="date"
                      required
                    />
                  </div>
                 <label> Références d’urbanisme</label>
                  <div class="flex-form">
                    <input type="text" placeholder="Type demande" />
                    <select
                      className="dropdown"
                      type="select"
                      name="requestTypeId"
                      onChange={handleChange}
                      value={Studydata?.data?.requestTypeId}
                      required
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.requesttype.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                  <label>Demandeur</label>
                  <div class="flex-form">
                    <input type="text" placeholder="Nom" />
                    <input
                      type="search"
                      onChange={handleChange}
                      value={Studydata?.data?.applicant}
                      name="applicant"
                      required
                    />
                  </div>
                  
                </div>
                <div className="inputs-container inputs-container-study">
                  <div class="flex-form">
                    <input type="text" placeholder="Moyen" />
                    <select
                      className="dropdown"
                      type="select"
                      name="caseAverageId"
                      value={Studydata?.data?.caseAverageId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.average.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Réception service" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="receptionServiceDate"
                      type="date"
                      value={formValues.receptionServiceDate? formValues.receptionServiceDate: moment(Studydata?.data?.receptionServiceDate, "YYYY-MM-DD").format("YYYY-MM-DD")}
                      required
                    />
                  </div>
                  <div class="flex-form flex-form-space">
                    <input type="text" placeholder="Ref." />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="refNum"
                      value={Studydata?.data?.refNum}
                      required
                    />
                  </div>

                  <div class="flex-form flex-form-space">
                    <input type="text" placeholder="Mobile" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="mobile"
                      value={Studydata?.data?.mobile}
                      required
                    />
                  </div>
                  <div class="flex-form">
                    <input type="text" placeholder="Mail" />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="email"
                      value={Studydata?.data?.email}
                      required
                    />
                  </div>
                </div>
              </div>
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
                  {townplanning?.map((item) => (
                    <>
                      <h5> {item.checkHeadingName}</h5>
                      {item?.chkList?.map((val) => (
                        <div className="checkbox-container">
                          <input
                            className="study-form-checkbox"
                            type="checkbox"
                            name="checkbox"
                            for="checkbox"
                            checked={val.isSelected? true: false}
                            id={val.caseFileCheckListId}
                            onChange={handleChange}
                          />
                          <label for="checkbox"> {val.name}</label> <br />
                        </div>
                      ))}
                    </>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ textAlign: "end" }}>
                <button
                  type="submit"
                  className="establishment-search-btn-submit"
                >
                  {" "}
                  VALIDER{" "}
                </button>
              </Box>
            </form>
          </Grid>
        </Box>
      </Item>
      <Item
        sx={{
          marginTop: "5px",
          borderLeft: "10px solid cadetblue",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Grid>
            <Box
              onClick={onClickdetailsObj}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid gray",
                padding: "10px",
              }}
            >
              <h5>Details of the object</h5>
              <div>
                <span className="inputs-heading-text"> Reduire</span>
              </div>
            </Box>
            <form onSubmit={handleSubmit}>
            <Box
              className={`${
                CompName === "currentcases" && toggleUpdateTabstwo
                  ? "formdisplay"
                  : "formdisplay"
              }`}
            >
              {study?.map((item) => (
                <>
                  <h5> {item.checkHeadingName}</h5>
                  {item?.chkList?.map((val) => (
                    <div className="checkbox-container">
                      <input  
                      onChange={handleChange} 
                      className="study-form-checkbox" 
                      name="checkbox"
                      type="checkbox" 
                      id={val.caseFileCheckListId}
                      />
                      <label for="checkbox"> {val.name}</label> <br />
                    </div>
                  ))}
                </>
              ))}
            </Box>
            <Box sx={{ textAlign: "end" }}>
                <button
                  type="submit"
                  className="establishment-search-btn-submit"
                >
                  {" "}
                  VALIDER{" "}
                </button>
              </Box>
              </form>
          </Grid>
        </Box>
        
      </Item>
    </>
  );
};

export default EstablishmentSearchStudyForm;
