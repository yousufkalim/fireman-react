import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import api from "../../../../api";
import { Store, UpdateStore } from "../../../../StoreContext";
import Button from "@mui/material/Button";
import Rightarrow from "../../../../assets/rightarrow.png";
import { toast } from "react-toastify";

import { ArrowRightAltRounded } from "@material-ui/icons";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateAnEstablishment = () => {
  const [dropdownValue, setdropdownValue] = useState({
    tracktype: "",
    status: "",
    cityId: "",
  });
  //   const [historicalDataEstablishment, setHistoricalDataEstablishment] =
  //     useState([]);
  let [establishmentName, setEstablishmentName] = useState("");
  let [refnum, setRefNum] = useState("");
  let [status, setStatus] = useState([]);
  let [number, SetNumber] = useState("");
  let [channelType, setChannelType] = useState([]);
  let [channelName, setChannelName] = useState("");
  let [cp, setcp] = useState("");
  let [commune, setCommune] = useState("");
  let [cityid, setcityid] = useState("")
  const inputRef = useRef(null);
  const store = Store();
  const update = UpdateStore();
 
 
   const setCommunedata = (id,text)=>{
     console.log(id);
     console.log(text);
    setCommune(text);
    setcityid(id)
   }
  const handleSubmit = (e) => {
    //alert("hit");
    e.preventDefault();

    let data = {
      establishmentName: establishmentName,
      refNo: refnum,
      statusId: status,
      estNumber: number,
      trackTypeId: channelType,
      channelName: channelName,
      zipCode: cp,
      commune: commune,
      cityId:cityid
    };
    if (
      establishmentName &&
      refnum &&
      status &&
      number &&
      channelType &&
      channelName &&
      cp &&
      commune
    ) {
      console.log(data,"dat");
      api("post", "/api/v1/create_generaldata_establishment", data).then(
        (res) => {
          if (res.data == "-1") {
            {
              toast.error("Etablissement déjà créé");
            }
          } else {
            toast.success("Établissement créé");
            update({ activeNavbarTab: "searchestablishment"});
          }
        }
      );
    }
  };

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
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderBottom: "0.6px solid #C5D3DB",
          padding: "15px 20px",
          backgroundColor: "#ffffff",
          borderRadius: "5px",
          color: "rgba(0, 0, 0, 0.6);",
          width: "96%",
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
          }}
        >
          {"Création d’établissement ou de groupement"}
        </Typography>

        <Box></Box>
        <Grid item md={12}>
          <form
            className="establishment-form"
            type="submit"
            onSubmit={handleSubmit}
          >
            <Box>
              <div className="heading-establishment">
                <span className="checklist-heading line"> Nom et statut</span>
                <Box
                  sx={{
                    borderTop: "3px solid #C5D3DB",
                    width: "88%",
                    marginTop: "12px",
                  }}
                ></Box>
              </div>

              <Box sx={{ display: "flex", padding: "10px 0px" }}>
                <div className="flex-form">
                  <label className="label-color label-general"> {"Nom"}</label>
                  <input
                    type="search"
                    required
                    onChange={(e) => {
                      setEstablishmentName(e.target.value);
                    }}
                    name="establishmentName"
                    onInvalid={e => e.target.setCustomValidity('Veuillez remplir ce champ')}
                    onInput={e => e.target.setCustomValidity('')}
                    //value={inputValues.establishmentName}
                  />
                </div>
                <div className="flex-form">
                  <label className="label-color">Ref</label>
                  <input
                   required
                  style={{width:"70% !important"}}
                    type="search"
                    onChange={(e) => {
                      setRefNum(e.target.value);
                    }}
                    name="estSerial"
                    onInvalid={e => e.target.setCustomValidity('Veuillez remplir ce champ')}
                    onInput={e => e.target.setCustomValidity('')}
                    //value={inputValues?.estSerial}
                  />
                </div>
                <div className="flex-form channel-name">
                  <label className="label-color">{"Statut"}</label>
                  <select
                    className="dropdown statusid"
                    type="select"
                    name="statusId"
                    required
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    onInvalid={e => e.target.setCustomValidity('Veuillez remplir ce champ')}
                    onInput={e => e.target.setCustomValidity('')}
                    //value={inputValues.statusId}
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
              <Box>
                <div className="heading-establishment">
                  <span className="checklist-heading"> Adresse</span>
                  <Box
                    sx={{
                      borderTop: "3px solid #C5D3DB",
                      width: "91.5%",
                      marginTop: "12px",
                      marginLeft: "14px",
                    }}
                  ></Box>
                </div>
                <Box sx={{ display: "flex", padding: "10px 0px" }}>
                  <div className="flex-form">
                    <label className="label-color label-general">
                      {"Numéro"}
                    </label>
                    <input
                      type="search"
                      ref={inputRef}
                      onChange={(e) => {
                        SetNumber(e.target.value);
                        if(inputRef.current.validity.patternMismatch){
                          e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère')
                        }
                        if(!inputRef.current.validity.patternMismatch){
                          e.target.setCustomValidity('')
                        }
                      }}
                      required
                      name="estNumber"
                      minlength="10"
                      maxlength="10"
                      onInvalid={e => {
                        e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère')
                         }}
                         pattern="^0{1}[\d]{9}$"
                      onInput={e => e.target.setCustomValidity('')}
                    />
                  </div>
                  <div className="flex-form">
                    <label className="label-color">{"Type voie"} </label>
                    <select
                      className="dropdown dropdown-tracktype"
                      type="select"
                      name="trackTypeId"
                      required
                      onChange={(e) => {
                        setChannelType(e.target.value);
                      }}
                      onInvalid={e => e.target.setCustomValidity('Veuillez remplir ce champ')}
                      onInput={e => e.target.setCustomValidity('')}
                      //value={inputValues.trackTypeId}
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
                    <label className="label-color">{"Nom voie"}</label>
                    <input
                      type="search"
                      required
                      onChange={(e) => {
                        setChannelName(e.target.value);
                      }}
                      name="channelName"
                      onInvalid={e => e.target.setCustomValidity('Veuillez remplir ce champ')}
                      onInput={e => e.target.setCustomValidity('')}
                      //value={inputValues?.channelName?.toUpperCase()}
                    />
                  </div>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <div className="flex-form cp">
                    <label className="label-cp label-general">CP</label>
                    <input
                      type="search"
                      required
                      onChange={(e) => {
                        setcp(e.target.value);
                      }}
                      name="zipCode"
                      onInvalid={e => e.target.setCustomValidity('Veuillez remplir ce champ')}
                      onInput={e => e.target.setCustomValidity('')}
                      //value={inputValues.zipCode}
                    />
                  </div>
                  <div className="flex-form">
                    <label className="label-color label-commune">
                      {"Commune"}{" "}
                    </label>
                    <select
                      required
                      className="dropdown commune-dropdown"
                      type="select"
                      name="cityId"
                      //value={inputValues.cityId}
                      // onChange={(e) => {
                      //   setCommune(e.target.value);
                      // }}
                      onChange={(e)=>setCommunedata(e.target.text,e.target.value)}
                      onInvalid={e => e.target.setCustomValidity('Veuillez remplir ce champ')}
                      onInput={e => e.target.setCustomValidity('')}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.cityId.data?.map((item) => (
                        <option key={item.value} value={item?.text}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "right",
                width: "100%",
                paddingTop: "10px",
              }}
            >
              <Button
                type="submit"
                endIcon={<img className="icon-validate" src={Rightarrow} />}
                sx={{
                  background: "#3675B7",
                  ":hover": { background: "#3675B7" },
                }}
                variant="contained"
              >
                {"CREER"}
              </Button>
            </Box>
          </form>
        </Grid>
      </Box>
    </>
  );
};

export default CreateAnEstablishment;
