import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../api/index";
import CreateHistoricalData from "./CreateHistoricalData";
import { Store } from "../../StoreContext";
import { toast } from "react-toastify";
import DialogBox from "../DialogBox";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Rightarrow from "../../assets/rightarrow.png";
import EstablishmentLevel from "./EstablishmentLevel";
import StaffLevel from "./StaffLevel";
import { useTranslation, Trans } from "react-i18next";
import Ranking from "./Ranking";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HistoricalSearch = ({ generalDataEstablishment }) => {
  const { t, i18n } = useTranslation();
  const store = Store();
  const [Toggler, setToggler] = useState({
    togglerhistoricalsearch: store.activeCase==="newcase"  || (store?.sectionindex === 0 && store?.tabindex===2) || store?.tabindex===1  ? true: false,
    createhistoricaldata: store.activeCase==="newcase" || (store?.sectionindex === 1 && (store?.tabindex===2 || store?.tabindex===1)) || store?.tabindex===1? true: false,
    establishmentlevel: store.activeCase==="newcase" || ((store?.sectionindex === 1 || store?.sectionindex === 2) && store?.tabindex===2) || store?.tabindex===1? true: false,
    togglerstafflevel: store.activeCase==="newcase" || ((store?.sectionindex === 1 || store?.sectionindex === 2|| store?.sectionindex === 3) && store?.tabindex===2) || store?.tabindex===1? true: false,
    togglerranking: store.activeCase==="newcase"|| ((store?.sectionindex === 1 || store?.sectionindex === 2|| store?.sectionindex === 3 || store?.sectionindex === 4) && store?.tabindex===2) || store?.tabindex===1? true: false,
  });
  const [Icon, setIcon] = useState({
    iconhistoricalsearch:  store.activeCase === "currentcases" &&  ((store.sectionindex===1|| store.sectionindex===2|| store.sectionindex===3 || store.sectionindex===4|| store.sectionindex===5) && store?.tabindex===2)? true: false,
    createhistoricaldata: store.activeCase === "currentcases" && ((store.sectionindex===2 || store.sectionindex===3|| store.sectionindex===4 || store.sectionindex===5)&&store?.tabindex===2) ? true: false,
    establishmentlevel: store.activeCase === "currentcases" && (( store.sectionindex===3|| store.sectionindex===4 || store.sectionindex===5)&&store?.tabindex===2) ? true:false,
    iconstafflevel: store.activeCase === "currentcases" && (( store.sectionindex===4 || store.sectionindex===5) && store?.tabindex===2) ? true:false,
    iconranking: store.activeCase === "currentcases" &&  store.sectionindex===5 && store?.tabindex===2 ? true:false,
  });
  const [buttonEnability, setButtonEnability] = useState({
    historicalmainbutton:store.buttonenable? false:true,
   historicalsearchbutton:true,
   establishmentlevelbutton:true,
   stafftablebutton:true,
   Rankingbutton:true,
});
  const [open, setOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [dropdownValue, setdropdownValue] = useState({
    tracktype: "",
    status: "",
    cityId: "",
  });
  
  const [historicalDataEstablishment, setHistoricalDataEstablishment] =
    useState([]);
  
  
  const [inputValues, setInputValues] = useState({
    establishmentName: generalDataEstablishment.establishmentName
      ? generalDataEstablishment.establishmentName
      : "",
    statusId: generalDataEstablishment.statusId
      ? generalDataEstablishment.statusId
      : "",
    cityId: generalDataEstablishment.cityId
      ? generalDataEstablishment.cityId
      : "",
    trackTypeId: generalDataEstablishment.trackTypeId
      ? generalDataEstablishment.trackTypeId
      : "",
    zipCode: generalDataEstablishment.zipCode
      ? generalDataEstablishment.zipCode
      : "",
    channelName: generalDataEstablishment.channelName
      ? generalDataEstablishment.channelName
      : "",
    estNumber: generalDataEstablishment.estNumber
      ? generalDataEstablishment.estNumber
      : "",
    securityManagerName: generalDataEstablishment.securityManagerName
      ? generalDataEstablishment.securityManagerName
      : "",
    securityManagerLastName: generalDataEstablishment.securityManagerLastName
      ? generalDataEstablishment.securityManagerLastName
      : "",
    securityManagerMobile: generalDataEstablishment.securityManagerMobile
      ? generalDataEstablishment.securityManagerMobile
      : "",
    securityManagerEmail: generalDataEstablishment.securityManagerEmail
      ? generalDataEstablishment.securityManagerEmail
      : "",
      estNumber: generalDataEstablishment.estNumber? generalDataEstablishment.estNumber:""
  });
  useEffect(() => {
    setInputValues({
      establishmentName: generalDataEstablishment.establishmentName
        ? generalDataEstablishment.establishmentName
        : "",
      statusId: generalDataEstablishment.statusId
        ? generalDataEstablishment.statusId
        : "",
      cityId: generalDataEstablishment.cityId
        ? generalDataEstablishment.cityId
        : "",
      trackTypeId: generalDataEstablishment.trackTypeId
        ? generalDataEstablishment.trackTypeId
        : "",
      zipCode: generalDataEstablishment.zipCode
        ? generalDataEstablishment.zipCode
        : "",
      channelName: generalDataEstablishment.channelName
        ? generalDataEstablishment.channelName
        : "",
      estNumber: generalDataEstablishment.estNumber
        ? generalDataEstablishment.estNumber
        : "",
      securityManagerName: generalDataEstablishment.securityManagerName
        ? generalDataEstablishment.securityManagerName
        : "",
      securityManagerLastName: generalDataEstablishment.securityManagerLastName
        ? generalDataEstablishment.securityManagerLastName
        : "",
      securityManagerMobile: generalDataEstablishment.securityManagerMobile
        ? generalDataEstablishment.securityManagerMobile
        : "",
      securityManagerEmail: generalDataEstablishment.securityManagerEmail
        ? generalDataEstablishment.securityManagerEmail
        : "",
        estNumber: generalDataEstablishment.estNumber? generalDataEstablishment.estNumber:""
    });
  }, [generalDataEstablishment]);
  useEffect(() => {
    api("get", "/api/v1/status/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          status: res,
        };
      });
    });
    api("get", "/api/v1/tracktype/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          tracktype: res,
        };
      })
    );
    api("get", "/api/v1/city/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          cityId: res,
        };
      })
    );
    
    api(
      "get",
      `/api/v1/get_historicaldata_establishment/${store.establishmentId}`
    ).then((res) => {
      setHistoricalDataEstablishment(res.data);
    });
  }, []);
  console.log(generalDataEstablishment,"170");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (inputValues.statusId === "2" && value !== "2" && name === "statusId") {
      setOpen(true);
      setMessageText(
        `${t(
          "You are about to transform a group of establishments into an establishment. The history and reference of the XX group will now be linked to this new establishment."
        )}`
      );
    }
    if (inputValues.statusId !== "2" && value === "2" && name === "statusId") {
      setOpen(true);
      setMessageText(
        `${t(
          "You are about to transform an establishment into a consortium of establishments The history and reference of establishment XX will now be linked to this new group"
        )}`
      );
    }
    if (
      inputValues.establishmentName !== store.establishmentname &&
      name === "establishmentName"
    ) {
      setOpen(true);
      setMessageText(
        `${t(
          "You are about to change the name of an establishment or a group of establishments. The history of establishment XX and the reference will now be linked to this new name."
        )}`
      );
    }
      setInputValues((preVal) => {
        return {
          ...preVal,
          [name]: value,
        };
      });
    
    
  };
  console.log(store);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedObj = {
      ...inputValues,
      establishmentId: store.establishmentId,
      caseFileId:store.caseFileId
    };
    if (store.activeCase === "newcase") {
      api("put", `/api/v1/update_generaldata_establishment`, updatedObj)
        .then((res) => {
          setButtonEnability((pre)=>{
            return{
              ...pre,
              historicalsearchbutton:false
            }
          })
          {
            toast.success(t("Successfull"));
          }
          setToggler((pre) => {
            return {
              ...pre,
              togglerhistoricalsearch: false,
            };
          });
          setIcon((pre) => {
            return {
              ...pre,
              iconhistoricalsearch: true,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (store.activeCase === "currentcases") {
      api("put", "/api/v1/update_generaldata_establishment", updatedObj)
        .then((res) => {
          {
            toast.success(t("Successfull"));
          }
          setToggler((pre) => {
            return {
              ...pre,
              togglerhistoricalsearch: false,
            };
          });
          // setToggler((pre) => {
          //   return {
          //     togglerhistoricalsearch: false,
          //     createhistoricaldata: true,
          //     togglervisit: true,
          //     togglerstudytwo: true,
          //   };
          // });
          setIcon((pre) => {
            return {
              ...pre,
              iconhistoricalsearch: true,
            };
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              togglerhistoricalsearch: !Toggler.togglerhistoricalsearch,
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
        <Typography variant="h6">{t("General data")}</Typography>
        {Icon.iconhistoricalsearch ? <DoneIcon /> : null}
      </Box>
      <Accordion
        sx={{ margin: "10px 10px !important",borderRadius:"10px" }}
        expanded={Toggler.togglerhistoricalsearch ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item
            sx={{
              borderRadius: "10px",
              width: "97%",
              margin: "auto",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Grid item md={12}>
                <DialogBox
                  setOpen={setOpen}
                  messageText={messageText}
                  open={open}
                />
                <form
                  className="establishment-form"
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  <Box sx={{ display: "flex" }}>
                    <div className="inputs-container">
                      <label className="label-color">
                        {t("Name Establishment")}
                      </label>
                      <div className="flex-form">
                        <input
                          type="search"
                          value={inputValues.establishmentName}
                          onChange={handleChange}
                          name="establishmentName"
                          value={inputValues.establishmentName}
                        />
                      </div>
                      <label className="checklist-heading"> Adresse</label>
                      <br />
                      <label className="label-color">{t("City")} </label>
                      <div className="flex-form">
                        <select
                          className="dropdown"
                          type="select"
                          name="cityId"
                          value={inputValues.cityId}
                          onChange={handleChange}
                        >
                          <option value="">Choisissez s'il vous plaît</option>
                          {dropdownValue.cityId.data?.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-form">
                        <label className="label-color">CP</label>
                        <input
                          type="search"
                          onChange={handleChange}
                          name="zipCode"
                          value={inputValues.zipCode}
                        />
                      </div>
                      <div className="establishment-nom-mobile-container">
                        <label className="checklist-heading">
                          Responsable de sécurité
                        </label>
                        <div className="flex-form">
                          <label className="label-color">{t("Name")} </label>
                          <input
                            type="search"
                            onChange={handleChange}
                            name="securityManagerLastName"
                            value={inputValues.securityManagerLastName.toUpperCase()}
                          />
                        </div>

                        <label className="label-color">Mobile </label>
                        <div className="flex-form">
                          <input
                            type="tel"
                            minlength="9" 
                            maxlength="12"
                            onChange={handleChange}
                            name="securityManagerMobile"
                            value={inputValues.securityManagerMobile}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="inputs-container">
                      <label className="label-color">{t("Status")} </label>
                      <div className="flex-form">
                        <select
                          className="dropdown"
                          type="select"
                          name="statusId"
                          onChange={handleChange}
                          value={inputValues.statusId}
                        >
                          <option value="">Choisissez s'il vous plaît</option>
                          {dropdownValue.status.data?.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="establishment-typenom-container">
                        <label className="label-color">
                          {t("Channel type")}{" "}
                        </label>
                        <div className="flex-form">
                          <select
                            className="dropdown"
                            type="select"
                            name="trackTypeId"
                            onChange={handleChange}
                            value={inputValues.trackTypeId}
                          >
                            <option value="">Choisissez s'il vous plaît</option>
                            {dropdownValue.tracktype.data?.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.text}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex-form">
                          <label className="label-color">
                            {t("Channel name")}
                          </label>
                          <input
                            type="search"
                            onChange={handleChange}
                            name="channelName"
                            value={inputValues.channelName.toUpperCase()}
                          />
                        </div>
                        <label className="label-color">{t("Number")}</label>
                        <div className="flex-form">
                          <input
                             type="search"
                            onChange={handleChange}
                            name="estNumber"
                            value={inputValues.estNumber}
                          />
                        </div>
                      </div>
                      <label className="label-color">{t("First name")}</label>
                      <div className="flex-form">
                        <input
                          type="search"
                          onChange={handleChange}
                          name="securityManagerName"
                          value={inputValues.securityManagerName}
                        />
                      </div>
                      <label className="label-color">Mail</label>
                      <div className="flex-form">
                        <input
                          type="email"
                          onChange={handleChange}
                          name="securityManagerEmail"
                          value={inputValues.securityManagerEmail}
                        />
                      </div>
                    </div>
                  </Box>
                  <Divider sx={{ margin: "20px 0px" }} />
                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      type="submit"
                      disabled={buttonEnability?.historicalmainbutton}
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
      <CreateHistoricalData
        historicalDataEstablishment={historicalDataEstablishment}
        establishmentid={store.establishmentId}
        casefileId={store.caseFileId}
        setToggler={setToggler}
        Toggler={Toggler}
        setIcon={setIcon}
        Icon={Icon}
        buttonEnability={buttonEnability} 
        setButtonEnability={setButtonEnability}
      />

      <EstablishmentLevel
        // description={description}
        // Values={Values}
        setToggler={setToggler}
        Toggler={Toggler}
        setIcon={setIcon}
        Icon={Icon}
        casefileId={store.caseFileId}
        buttonEnability={buttonEnability} 
        setButtonEnability={setButtonEnability}
      />
      <StaffLevel
        establishmentid={store.establishmentId}
        setToggler={setToggler}
        Toggler={Toggler}
        setIcon={setIcon}
        Icon={Icon}
        casefileId={store.caseFileId}
        buttonEnability={buttonEnability} 
        setButtonEnability={setButtonEnability}
      />
      <Ranking
        establishmentid={store.establishmentId}
        setToggler={setToggler}
        Toggler={Toggler}
        setIcon={setIcon}
        Icon={Icon}
        casefileId={store.caseFileId}
        buttonEnability={buttonEnability} 
        setButtonEnability={setButtonEnability}
      />
    </>
  );
};

export default HistoricalSearch;
