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
  let [commune, setCommune] = useState([]);

  const store = Store();
  const update = UpdateStore();

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
      cityId: commune,
    };
    console.log("CCCCC", data);
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
      api("post", "/api/v1/create_generaldata_establishment", data).then(
        (res) => {
          console.log("res createggg establishment api", res);
          console.log(data, "[]");
          if (res.data == "-1") {
            {
              toast.error("Establishment already created");
            }
          } else {
            toast.success("Establishment Created");
            update({ activeNavbarTab: "searchestablishment"});
          }

          console.log("res create establishment api", res);
        }
      );
      console.log("API");
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

    // api(
    //   "get",
    //   `/api/v1/get_historicaldata_establishment/${store.establishmentId}`
    // ).then((res) => {
    //   setHistoricalDataEstablishment(res.data);
    // });
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
                    required
                    type="search"
                    onChange={(e) => {
                      setEstablishmentName(e.target.value);
                    }}
                    name="establishmentName"
                    //value={inputValues.establishmentName}
                  />
                </div>
                <div className="flex-form refnum-est">
                  <label className="label-color">REF. #</label>
                  <input
                    required
                    type="search"
                    onChange={(e) => {
                      setRefNum(e.target.value);
                    }}
                    name="estSerial"
                    //value={inputValues?.estSerial}
                  />
                </div>
                <div className="flex-form channel-name">
                  <label className="label-color">{"Statut"}</label>
                  <select
                    required
                    className="dropdown statusid"
                    type="select"
                    name="statusId"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
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
                      onChange={(e) => {
                        SetNumber(e.target.value);
                      }}
                      name="estNumber"
                      //value={inputValues.estNumber}
                      //type="tel"
                      minlength="12"
                      maxlength="12"
                      title="Number should contain 12 digits and No Character"
                      pattern="^(\d{12})$"
                    />
                  </div>
                  <div className="flex-form">
                    <label className="label-color">{"Type voie"} </label>
                    <select
                      className="dropdown dropdown-tracktype"
                      type="select"
                      name="trackTypeId"
                      onChange={(e) => {
                        setChannelType(e.target.value);
                      }}
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
                      required
                      type="search"
                      onChange={(e) => {
                        setChannelName(e.target.value);
                      }}
                      name="channelName"
                      //value={inputValues?.channelName?.toUpperCase()}
                    />
                  </div>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <div className="flex-form cp">
                    <label className="label-cp label-general">CP</label>
                    <input
                      required
                      type="search"
                      onChange={(e) => {
                        setcp(e.target.value);
                      }}
                      name="zipCode"
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
                      onChange={(e) => {
                        setCommune(e.target.value);
                      }}
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
