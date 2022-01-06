import React, { useEffect, useState,useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../api/index";
import CreateHistoricalData from "./CreateHistoricalData";
import {Store} from '../../StoreContext'
import { toast } from "react-toastify"
import DialogBox from '../DialogBox'
import { display } from "@mui/system";
import EstablishmentLevel from './EstablishmentLevel'
import Description from './Description'
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HistoricalSearch = ({generalDataEstablishment}) => {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false)
  const [iconState, setIconState] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [dropdownValue, setdropdownValue] = useState({
    tracktype: "",
    status: "",
    cityId: "",
  });
  const [Values, setLevelData] = useState([]) 
  const [historicalDataEstablishment, setHistoricalDataEstablishment] = useState([])
  const [description, setDescription] = useState() 
  const store = Store()
  const [inputValues, setInputValues] = useState({
    establishmentName: generalDataEstablishment.establishmentName? generalDataEstablishment.establishmentName:"",
    statusId: generalDataEstablishment.statusId? generalDataEstablishment.statusId:"",
    cityId: generalDataEstablishment.cityId? generalDataEstablishment.cityId: "",
    trackTypeId: generalDataEstablishment.trackTypeId?generalDataEstablishment.trackTypeId: "",
    zipCode: generalDataEstablishment.zipCode? generalDataEstablishment.zipCode: "",
    channelName: generalDataEstablishment.channelName?generalDataEstablishment.channelName:"",
    estNumber: generalDataEstablishment.estNumber?generalDataEstablishment.estNumber: "",
    securityManagerName: generalDataEstablishment.securityManagerName? generalDataEstablishment.securityManagerName: "",
    securityManagerLastName: generalDataEstablishment.securityManagerLastName? generalDataEstablishment.securityManagerLastName: "",
    securityManagerMobile: generalDataEstablishment.securityManagerMobile?generalDataEstablishment.securityManagerMobile: "",
    securityManagerEmail: generalDataEstablishment.securityManagerEmail? generalDataEstablishment.securityManagerEmail:"",
  });
 
  useEffect(() => {
    setInputValues({
      establishmentName: generalDataEstablishment.establishmentName? generalDataEstablishment.establishmentName:"",
      statusId: generalDataEstablishment.statusId? generalDataEstablishment.statusId:"",
      cityId: generalDataEstablishment.cityId? generalDataEstablishment.cityId: "",
      trackTypeId: generalDataEstablishment.trackTypeId?generalDataEstablishment.trackTypeId: "",
      zipCode: generalDataEstablishment.zipCode? generalDataEstablishment.zipCode: "",
      channelName: generalDataEstablishment.channelName?generalDataEstablishment.channelName:"",
      estNumber: generalDataEstablishment.estNumber?generalDataEstablishment.estNumber: "",
      securityManagerName: generalDataEstablishment.securityManagerName? generalDataEstablishment.securityManagerName: "",
      securityManagerLastName: generalDataEstablishment.securityManagerLastName?generalDataEstablishment.securityManagerLastName: "",
      securityManagerMobile: generalDataEstablishment.securityManagerMobile?generalDataEstablishment.securityManagerMobile: "",
      securityManagerEmail: generalDataEstablishment.securityManagerEmail? generalDataEstablishment.securityManagerEmail:"",
    })
  }, [generalDataEstablishment])
  const focusPoint = useRef(null);
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
    api("get", "/api/v1/get_description_data/2").then((res)=>{
      setLevelData(res.data.levels)
      setDescription(res.data.descriptions)
     })
     api("get", `/api/v1/get_historicaldata_establishment/${store.establishmentId}`).then((res)=>{
       setHistoricalDataEstablishment(res.data)
     })
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
     if(inputValues.statusId==="2" && inputValues.statusId!=="" &&  value!=="2"){
      setOpen(true)
      setMessageText(
        "You are about to transform a group of establishments into an establishment. The history and reference of the XX group will now be linked to this new establishment."
           )
     }
     if(inputValues.statusId!=="2" && inputValues.statusId!=="" && value==="2"){
      setOpen(true)
      setMessageText(
        "You are about to transform an establishment into a consortium of establishments The history and reference of establishment XX will now be linked to this new group"
           )
     }
     if(inputValues.establishmentName!== store.establishmentname){
      setOpen(true)
      setMessageText(
        `You are about to change the name of an establishment or a group of 
        establishments. The history of establishment XX and the reference will now be 
        linked to this new name.`
           )
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
      establishmentId:store.establishmentId
    }
    api("post", `/api/v1/create_generaldata_establishment`, updatedObj).then(
      (res) => {
        if (res.status === 200) {
          setIconState(true)
          setToggle(true)
          toast.success("Successfully Saved");
          focusPoint.current.style.display = "none"
        }
        
      }
    ).catch(err=>{
      console.log(err);
    });
  };


  const toggleSection =( )=>{
    setToggle(!toggle)
    toggle? focusPoint.current.style.display = "none": focusPoint.current.style.display = "block"
  }
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid gray",
            padding: "10px",
          }}
          onClick={toggleSection}
        >
          
          <h5>Données générales</h5>
          <div> 
       { iconState? <DoneIcon sx={{ backgroundColor: "green" }}/> :null }  
          <span className="inputs-heading-text"> Reduire</span>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            
          }}
        >
          <Grid item md={12}>
            <Item ref={focusPoint} sx={{ boxShadow: "none" }}>
           < DialogBox setOpen={setOpen} messageText={messageText} open={open}/>
              <form
                className="establishment-form"
                type="submit"
                onSubmit={handleSubmit}
              >
                <div className="inputs-container">
                <div className="flex-form">
                    <input
                      type="text"
                      placeholder="Nom établissement"
                      disabled
                    />
                    

                    <input
                      type="search"
                      value={inputValues.establishmentName}
                      onChange={handleChange}
                      name="establishmentName"
                      value={inputValues.establishmentName}
                    />
                  </div>
              

                  <span> Adresse</span>
                  <div className="flex-form">
                    <input type="text" placeholder="Commune" disabled />
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
                    <input type="text" placeholder="CP" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="zipCode"
                      value={inputValues.zipCode}
                    />
                  </div>
                  <div className="establishment-nom-mobile-container"> 
                  <span>Responsable de sécurité</span>
                  <div className="flex-form">
                    <input type="text" placeholder="Nom" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerLastName"
                      value={inputValues.securityManagerLastName.toUpperCase()}
                    />
                  </div>
                  

                  <div className="flex-form">
                    <input type="text" placeholder="Mobile" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerMobile"
                      value={inputValues.securityManagerMobile}
                    />
                  </div>
                  </div>
                </div>
                <div className="inputs-container">
                <div className="flex-form">
                    <input type="text" placeholder="Statut" disabled />
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
                  <div className="flex-form">
                    <input type="text" placeholder="Type voie" disabled />
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
                    <input type="text" placeholder="Nom voie" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="channelName"
                      value={inputValues.channelName.toUpperCase()}
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Numero" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerMobile"
                      value={inputValues.securityManagerMobile}
                    />
                  </div>
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Prénom" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerName"
                      value={inputValues.securityManagerName}
                    />
                  </div>
                  <div className="flex-form">
                    <input type="text" placeholder="Mail" disabled />
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerEmail"
                      value={inputValues.securityManagerEmail}
                    />
                  </div>
                  <Box>
                    <button
                      className="establishment-search-btn-submit"
                      type="submit"
                    >
                      {" "}
                      Valider{" "}
                    </button>
                  </Box>
                </div>
              </form>
            </Item>
        <CreateHistoricalData historicalDataEstablishment={historicalDataEstablishment} establishmentid={store.establishmentId}/>
        <EstablishmentLevel  description={description} Values={Values}/>
        {/* <Description/> */}
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default HistoricalSearch;
