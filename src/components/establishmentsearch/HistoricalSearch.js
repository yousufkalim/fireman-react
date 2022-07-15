import React, { useEffect, useState,useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../api/index";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import { toast } from "react-toastify";
import DialogBox from "../DialogBox";
import don from "../../assets/donne.svg";
import Button from "@mui/material/Button";
import Rightarrow from "../../assets/rightarrow.png";
import StaffLevel from "./StaffLevel";
import { useTranslation } from "react-i18next";
import EstablishmentLevel from './EstablishmentLevel'
import CreateHistoricalData from "./CreateHistoricalData";
import SectionFilter from './SectionFilter'
import SectionFilterCheckBox from './SectionFilterCheckBox'
import Ranking from "./Ranking";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HistoricalSearch = ({ generalDataEstablishment }) => {
  const { t, i18n } = useTranslation();
  const store = Store();
  const updatestore = UpdateStore();
  const [Toggler, setToggler] = useState({
    togglerhistoricalsearch: false,
    createhistoricaldata: false,
    establishmentlevel: false,
    togglerstafflevel: false,
    togglerranking: false,
    togglerSectionFilter:false
  });
  const [Icon, setIcon] = useState({
    iconhistoricalsearch:
      (store.activeCase === "currentcases" &&
        (store.sectionindex === 1 ||
          store.sectionindex === 2 ||
          store.sectionindex === 3 ||
          store.sectionindex === 4 ||
          store.sectionindex === 5 ||
          store.sectionindex === 6 
          ) &&
        store?.tabindex === 2)
        ||
        store.chapterIndex
        ? true
        : false,
    createhistoricaldata:
      (store.activeCase === "currentcases" &&
        (store.sectionindex === 2 ||
          store.sectionindex === 3 ||
          store.sectionindex === 4 ||
          store.sectionindex === 5
          ||
          store.sectionindex === 6 
          ) &&
        store?.tabindex === 2) ||
          store.chapterIndex
        ? true
        : false,
    establishmentlevel:
      (store.activeCase === "currentcases" &&
        (store.sectionindex === 3 ||
          store.sectionindex === 4 ||
          store.sectionindex === 5
          ||
          store.sectionindex === 6 ||
          store.chapterIndex
          ) &&
        store?.tabindex === 2) ||
          store.chapterIndex
        ? true
        : false,
    iconstafflevel:
      (store.activeCase === "currentcases" &&
        (store.sectionindex === 4 || store.sectionindex === 5 || store.sectionindex === 6 || store.chapterIndex) &&
        store?.tabindex === 2) ||
          store.chapterIndex
        ? true
        : false,
    iconranking:
      (store.activeCase === "currentcases" &&
      (store.sectionindex === 5 
      ||
        store.sectionindex === 6 ||
        store.chapterIndex ||
        store.chapterIndex) &&
        store?.tabindex === 2) ||
          store.chapterIndex
        ? true
        : false,
        iconsectionfilter:
        (store.activeCase === "currentcases" &&
        store.sectionindex === 6 || store.chapterIndex &&
        store?.tabindex === 2) ||
          store.chapterIndex
        ? true
        : false,
  });
  const [buttonEnability, setButtonEnability] = useState({
    historicalmainbutton:
      store.buttonenable || store.activeCase === "currentcases" ? false : true,
    historicalsearchbutton: store.activeCase === "currentcases" ? false : true,
    establishmentlevelbutton:
      store.activeCase === "currentcases" ? false : true,
    stafftablebutton: store.activeCase === "currentcases" ? false : true,
    Rankingbutton: store.activeCase === "currentcases" ? false : true,
    Sectionfilterbutton:store.activeCase === "currentcases" ? false : true,
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
  const [inputValues, setInputValues] = useState({});
  const inputRef = useRef(null);
  const inputRefone = useRef(null);
  const inputRefemail = useRef(null);
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
      estNumber: generalDataEstablishment.estNumber
        ? generalDataEstablishment.estNumber
        : "",
        RefNo: generalDataEstablishment.refNo
        ? generalDataEstablishment.refNo
        : "",
        Commune:generalDataEstablishment?.commune?generalDataEstablishment?.commune:""
    });

    getTabData();
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
  const setCommunedata = (text,id)=>{
    console.log(id);
    console.log(text);
    setInputValues((pre)=>{
      return{
       ...pre,
       cityId:id,
       Commune:text
      }
    })
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
    if (inputValues.statusId === "2" && value !== "2" && name === "statusId") {
      setOpen(true);
      setMessageText(
        `${t(
          `Vous êtes sur le point de transformer un groupe d'établissements en établissement. L'historique et la référence du groupe ${inputValues?.establishmentName}  seront désormais liées à ce nouvel établissement..`
        )}`
      );
    }
    if (inputValues.statusId !== "2" && value === "2" && name === "statusId") {
      setOpen(true);
      setMessageText(
        `${t(
          `Vous êtes sur le point de transformer un établissement en groupement d'établissements L'historique et la référence de l'établissement ${inputValues?.establishmentName} seront désormais liés à ce nouveau groupe.`
        )}`
      );
    }
    if (
      inputValues.establishmentName !== store.establishmentname &&
      name === "establishmentName"
    ) {
      setTimeout(() => {
        setOpen(true);
        setMessageText(
          `${t(
            `Vous êtes sur le point de changer le nom d'un établissement ou d'un groupe deétablissements. L'historique de l'établissement ${generalDataEstablishment?.establishmentName}  et la référence seront désormais lié à ce nouveau nom.`
          )}`
        );
      }, 2000);
    }
    setInputValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedObj = {
      ...inputValues,
      establishmentId: store.establishmentId,
      caseFileId: store.caseFileId,
    };
    api("put", `/api/v1/update_generaldata_establishment`, updatedObj)
      .then((res) => {
        console.log(res,"kl");
        if (res.data === true) {
          setButtonEnability((pre) => {
            return {
              ...pre,
              historicalsearchbutton: false,
            };
          });
          toast.success(t("Successfull"));
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
          updatestore({
            validatedSections: {...store?.validatedSections,
            historicalsearchvalidated:true
            }
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTabData = () => {
    api("get", "/api/v1/categories/getall").then((res) => {
      updatestore({
        implantationDataid:res?.data[0]?.orderNum
      })
    });
  };
  console.log(store,"storeest");
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
        {Icon.iconhistoricalsearch || store?.validatedSections?.historicalsearchvalidated? <img src={don} /> : null}
      </Box>
      <Accordion
        sx={{
          margin: "10px auto !important",
          borderRadius: "10px",
          width: "97.5%",
        }}
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
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <Box>
                    <div className="heading-establishment">
                      <span className="checklist-heading line">
                        {" "}
                        Nom et statut
                      </span>
                      <Box
                        sx={{
                          borderTop: "3px solid #C5D3DB",
                          width: "100%",
                          marginTop: "12px",
                        }}
                      ></Box>
                    </div>

                    <Box sx={{ display: "flex", padding: "10px 0px" }}>
                      <div className="flex-form">
                        <label className="label-color label-general">
                          {" "}
                          {t("Name")}
                        </label>
                        <input
                          required
                          autocomplete="off"
                          type="search"
                          onChange={handleChange}
                          name="establishmentName"
                          value={inputValues.establishmentName}
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        />
                      </div>
                      <div className="flex-form">
                        <label className="label-color">Ref</label>
                        <input
                          required
                          autocomplete="off"
                          type="search"
                          onChange={handleChange}
                          name="RefNo"
                          value={inputValues.RefNo}
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        />
                      </div>
                      <div className="flex-form channel-name">
                        <label
                          style={{ marginLeft: "" }}
                          className="label-color"
                        >
                          {t("Status")}
                        </label>
                        <select
                          className="dropdown statusid"
                          autocomplete="off"
                          type="select"
                          name="statusId"
                          onChange={handleChange}
                          value={inputValues.statusId}
                          required
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        >
                          <option value="">Choisissez s'il vous plaît</option>
                          {dropdownValue.status.data?.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Box>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", padding: "10px 0px" }}>
                      <div className="flex-form">
                        <label className="label-color label-general">
                          {t("Number")}
                        </label>
                        <input
                          ref={inputRefone}
                          autocomplete="off"
                          type="search"
                          onChange={(e)=>{
                            setInputValues((pre)=>{
                              return{
                                 ...pre,
                                 estNumber:e.target.value
                              }
                            })
                            if(inputRefone.current.validity.patternMismatch){
                              e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère')
                            }
                            if(!inputRefone.current.validity.patternMismatch){
                              e.target.setCustomValidity('')
                            }
                            if(inputRefone.current.validity.valueMissing){
                              e.target.setCustomValidity(`'Numéro de téléphone requis'`)
                            }
                          }}
                          name="estNumber"
                          required
                          value={inputValues.estNumber}
                          
                          minlength="10"
                          maxlength="10"
                          onInvalid={e => e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère')}
                           onInput={e => e.target.setCustomValidity('')}
                           pattern="^0{1}[\d]{9}$"
                        />
                      </div>
                      <div className="flex-form">
                        <label className="label-color">
                          {t("Channel type")}{" "}
                        </label>
                        <select
                          className="dropdown dropdown-tracktype"
                          autocomplete="off"
                          type="select"
                          name="trackTypeId"
                          onChange={handleChange}
                          value={inputValues.trackTypeId}
                          required
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        >
                          <option value="">Choisissez s'il vous plaît</option>
                          {dropdownValue.tracktype.data?.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-form channel-name">
                        <label className="label-color">
                          {t("Channel name")}
                        </label>
                        <input
                          required
                          autocomplete="off"
                          type="search"
                          onChange={handleChange}
                          name="channelName"
                          value={inputValues?.channelName?.toUpperCase()}
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        />
                      </div>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                      <div className="flex-form cp">
                        <label className="label-cp label-general">CP</label>
                        <input
                          required
                          type="search"
                          autocomplete="off"
                          onChange={handleChange}
                          name="zipCode"
                          value={inputValues.zipCode}
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        />
                      </div>
                      <div className="flex-form">
                        <label className="label-color label-commune">
                          {t("City")}{" "}
                        </label>
                        <select
                          className="dropdown commune-dropdown"
                          autocomplete="off"
                          type="select"
                          name="cityId"
                          value={inputValues.cityId}
                          onChange={(e)=>{
                            setCommunedata(e.target.selectedOptions[0].text,e.target.value);  
                          }}
                          required
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        >
                          <option value="">Choisissez s'il vous plaît</option>
                          {dropdownValue.cityId.data?.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Box>
                  </Box>
                  <Box>
                    <div className="heading-establishment">
                      <span className="checklist-heading heading-est">
                        {" "}
                        Responsable de sécurité
                      </span>
                      <Box
                        sx={{
                          borderTop: "3px solid #C5D3DB",
                          width: "100%",
                          marginTop: "11px",
                          marginLeft: "12px",
                        }}
                      ></Box>
                    </div>
                    <Box sx={{ display: "flex" }}>
                      <div className="flex-form flex-form-responsable nom-et-form">
                        <label className="label-color label-responsables">
                          {t("Name")}{" "}
                        </label>
                        <input
                          required
                          autocomplete="off"
                          type="search"
                          onChange={handleChange}
                          name="securityManagerLastName"
                          value={inputValues?.securityManagerLastName?.toUpperCase()}
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        />
                      </div>
                      <div className="flex-form nom-et-form">
                        <label className="label-color label-responsables">
                          {t("First name")}
                        </label>
                        <input
                          required
                          autocomplete="off"
                          type="search"
                          onChange={handleChange}
                          name="securityManagerName"
                          value={inputValues.securityManagerName}
                          onInvalid={e => e.target.setCustomValidity('merci de remplir ce champ')}
                          onInput={e => e.target.setCustomValidity('')}
                        />
                      </div>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <div className="flex-form flex-form-responsable">
                        <label className="label-color label-responsables">
                          Mobile{" "}
                        </label>
                        <input
                           ref={inputRef}
                           autocomplete="off"
                          required
                          type="tel"
                          minlength="10"
                          maxlength="10"
                          onChange={(e)=>{
                            setInputValues((pre)=>{
                            return{
                              ...pre,
                              securityManagerMobile:e.target.value
                            }
                            })
                            if(inputRef.current.validity.patternMismatch){
                              e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère')
                            }
                            if(!inputRef.current.validity.patternMismatch){
                              e.target.setCustomValidity('')
                            }
                            if(inputRef.current.validity.valueMissing){
                              e.target.setCustomValidity(`'Numéro de téléphone requis'`)
                            }
                          }}
                          name="securityManagerMobile"
                          value={inputValues.securityManagerMobile}
                          onInvalid={e => e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère')}
                          onInput={e => e.target.setCustomValidity('')}
                          pattern="^0{1}[\d]{9}$"
                        />
                      </div>

                      <div className="flex-form form-est-mail">
                        <label className="label-color label-responsables">
                          Mail
                        </label>
                        <input
                         ref={inputRefemail}
                         autocomplete="off"
                          required
                          type="email"
                          onChange={(e)=>{
                            setInputValues((pre)=>{
                              return{
                              ...pre,
                              securityManagerEmail:e.target.value
                              }
                            })
                            if(inputRefemail.current.validity.patternMismatch){
                              e.target.setCustomValidity(`Format d'email invalide`)
                            }
                            if(!inputRefemail.current.validity.patternMismatch){
                              e.target.setCustomValidity('')
                            }
                          }}
                          name="securityManagerEmail"
                          value={inputValues.securityManagerEmail}
                          onInvalid={e => e.target.setCustomValidity(`Format d'email invalide`)}
                          onInput={e => e.target.setCustomValidity('')}
                          pattern="(.+)@(.+){2,}\.(.+){2,}"
                        />
                      </div>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      textAlign: "right",
                      width: "100%",
                      paddingTop: "5px",
                    }}
                  >
                   
                    {
                      store.activeCase === "newcase"?(
                        <Button
                      type="submit"
                      disabled={!store?.validatedSections?.detailsobjectvalidated?true:false}
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
                        disabled={!store?.validatedSections?.detailsobjectvalidated && !store?.validatedSections?.iconstudytwo?true:false}
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
      <SectionFilter
        setToggler={setToggler}
        Toggler={Toggler}
        setIcon={setIcon}
        Icon={Icon}
        buttonEnability={buttonEnability}
        setButtonEnability={setButtonEnability}
        generalDataEstablishment={generalDataEstablishment}
      />
      {/* <SectionFilterCheckBox
      setToggler={setToggler}
      Toggler={Toggler}
      setIcon={setIcon}
      Icon={Icon}
      buttonEnability={buttonEnability}
      setButtonEnability={setButtonEnability}
      /> */}
    </>
  );
};

export default HistoricalSearch;
