import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import api from "../../../../api/index";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from '@mui/material/Button';
import Rightarrow from "../../../../assets/rightarrow.png";
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
  currentcasescaseFileId,
}) => {
  const [toggleUpdateTabs, setToggleUpdateTabs] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );
  const [toggleUpdateTabstwo, setToggleUpdateTabstwo] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );
  const [classState, setClassState] = useState(true);
  const [iconState, seticonState] = useState(false);
  const [detailobjiconstate, setdetailobjiconstate] = useState(false);
  const [checkBoxesChecked, setCheckBoxesChecked] = useState([]);
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
  const focusPoint = useRef(null);
  const onClickTownPlanning = () => {
    setToggleUpdateTabs(!toggleUpdateTabs);
    if (compShow === "filestructure" || CompName === "currentcases") {
      classState
        ? (focusPoint.current.style.display = "block")
        : (focusPoint.current.style.display = "none");
    }
    setClassState(!classState);
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
        casefileId: casefileId ? casefileId : currentcasescaseFileId,
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
  const handleSubmit = (e, data) => {
    e.preventDefault();
    const formData = {
      ...formValues,
      casefileId: casefileId ? casefileId : currentcasescaseFileId,
    };
    postCheckboxesData();
    api("post", `/api/v1/casefiles/open_townplanning`, formData)
      .then((res) => {
        toast.success("Success");
        if (res?.status === 200 && compShow === "filestructure") {
          seticonState(true);
        }
        if (
          res?.status === 200 &&
          CompName === "currentcases" &&
          indexdata.sectionindex != 1
        ) {
          seticonState(true);
        }
        // if(res?.status===200 && data==="detailsobj"){
        //   setdetailobjiconstate(true);
        // }
        if (
          (compShow === "filestructure" || CompName === "currentcases") &&
          res?.status === 200
        ) {
          focusPoint.current.style.display = "none";
        }
      })
      .catch((err) => toast.error(err?.statusText));
  };

  const handleSubmitdetailsobj = (e) => {
    e.preventDefault();
    postCheckboxesData();
    setdetailobjiconstate(true);
  };
  return (
    <>
      <Box
        onClick={onClickTownPlanning}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "0.6px solid #C5D3DB",
          backgroundColor:"#3675B7", 
          borderRadius:"5px", 
          width: "96%",
          margin: "10px auto",
          padding: "10px 10px",
          color:"#ffffff"
        }}
      >
        <Typography variant="h6">
          Related town planning documents
        </Typography>
        <div>
          {indexdata?.sectionindex === 1 ? (
            <CheckIcon/>
          ) : null}
          {iconState ? <CheckIcon/> : null}
        </div>
      </Box>
      <Item
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          boxShadow: "none",
          width:"96%",
          margin:"auto"
        }}
        ref={focusPoint}
      >
        <Box
          sx={{
            marginTop: "15px",
          }}
        >
          <Grid
           
            className={`${
              CompName === "currentcases" && toggleUpdateTabs
                ? "formhide"
                : "formdisplay"
            }`}
          >
            <form
              className="establishment-form"
              onSubmit={(e) => handleSubmit(e, "townplanning")}
            >
              <Box sx={{ textAlign: "start" }}>
                <label className="label-color">Saisie</label>
              </Box>
              <Divider sx={{ margin: "15px 0px" }} />
              <Box sx={{ display: "flex" }}></Box>

              <Box>
                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form">
                    <label className="label-color"> Origine</label>
                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="originId"
                      value={formValues.originId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue?.origin?.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-form">
                    <label className="label-color"> Moyen</label>
                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="caseAverageId"
                      value={formValues.caseAverageId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.average.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </div>
                </Box>

                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form">
                    <label className="label-color">Date</label>
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
                  <label className="label-color">Références d’urbanisme</label>
                </Box>
                <Divider sx={{ margin: "15px 0px" }} />
                <Box sx={{ display: "flex", textAlign: "start" }}>
                  <div className="flex-form">
                    <label className="label-color">Type demande </label>

                    <select
                      className="dropdown dropdown-townplanning"
                      type="select"
                      name="requestTypeId"
                      onChange={handleChange}
                      value={formValues.requestTypeId}
                      required
                    >
                      <option value="">Choisissez s'il vous plaît</option>
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
                  <label className="label-color">Demandeur</label>
                </Box>
                <Divider sx={{ margin: "15px 0px" }} />
                <Box sx={{ display: "flex" }}>
                  <div class="flex-form">
                    <label className="label-color">Nom </label>
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
                    <label className="label-color"> Téléphone</label>
                    <input
                      type="search"
                      onChange={handleChange}
                      name="mobile"
                      value={formValues.mobile}
                      required
                    />
                  </div>
                </Box>
                <Box sx={{ dispaly: "flex", width: "50%" }}>
                  <div class="flex-form">
                    <label className="label-color"> E-mail</label>
                    <input
                      type="search"
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
                  {townplanning?.map((item) => (
                    <>
                      <h5> {item.checkHeadingName}</h5>
                      {item?.chkList?.map((val) => (
                        <div className="checkbox-container">
                           <div> 
                          <input
                            className="study-form-checkbox"
                            type="checkbox"
                            name="checkbox"
                            for="checkbox"
                            defaultChecked={val.isSelected}
                            id={val.caseFileCheckListId}
                            onChange={handleChange}
                          />
                          </div>
                          <label className="checkbox-label" for="checkbox"> {val.name}</label> <br />
                         
                        </div>
                      ))}
                    </>
                  ))}

                </Grid>
              </Box>
             

              <Box sx={{textAlign:"right", padding:"10px"}}> 
                    <Button   type="submit" endIcon={<img className='' src={Rightarrow} />} sx={{ background: "#3675B7", ':hover': { background: "#3675B7" } }} variant="contained">
                    Valider
                          </Button>
                    </Box>
            </form>
          </Grid>
        </Box>
      </Item>

      <Box
              onClick={onClickdetailsObj}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "0.6px solid #C5D3DB",
                padding: "10px 0px",
                backgroundColor:"#3675B7", 
                borderRadius:"5px", 
                width: "96%",
                margin: "10px auto",
                padding: "10px 10px",
                color:"#ffffff"
              }}
            >
              <Typography variant="h6">
              Details of the object
        </Typography>
              <div>
                {detailobjiconstate ? (
                  <CheckIcon/>
                ) : null}
              </div>
            </Box>
      <Item
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          boxShadow: "none",
          width:"96%",
          margin:"auto"
        }}
      >
        <Box>
          <Grid>
            <form onSubmit={(e) => handleSubmitdetailsobj(e, "detailsobj")}>
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
                          defaultChecked={val.isSelected}
                          id={val.caseFileCheckListId}
                        />
                        <label for="checkbox"> {val.name}</label> <br />
                      </div>
                    ))}
                  </>
                ))}
              </Box>
              <Box sx={{textAlign:"right", padding:"10px"}}> 
                    <Button   type="submit" endIcon={<img className='' src={Rightarrow} />} sx={{ background: "#3675B7", ':hover': { background: "#3675B7" } }} variant="contained">
                    Valider
                          </Button>
                    </Box>
            </form>
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchStudyForm;
