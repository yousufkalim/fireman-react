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
import Ranking from "./Ranking";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HistoricalSearch = ({ generalDataEstablishment }) => {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [iconState, setIconState] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [dropdownValue, setdropdownValue] = useState({
    tracktype: "",
    status: "",
    cityId: "",
  });
  const [Values, setLevelData] = useState([]);
  const [historicalDataEstablishment, setHistoricalDataEstablishment] =
    useState([]);
  const [description, setDescription] = useState();
  const store = Store();
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
    });
  }, [generalDataEstablishment]);
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
    api("get", `/api/v1/get_description_data/${store.establishmentId}`).then((res) => {
      setLevelData(res.data.levels);
      setDescription(res.data.descriptions);
     console.log(res);
    });
    api(
      "get",
      `/api/v1/get_historicaldata_establishment/${store.establishmentId}`
    ).then((res) => {
      setHistoricalDataEstablishment(res.data);
    });
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (inputValues.statusId === "2" && value !== "2" && name === "statusId") {
      setOpen(true);
      setMessageText(
        "You are about to transform a group of establishments into an establishment. The history and reference of the XX group will now be linked to this new establishment."
      );
    }
    if (inputValues.statusId !== "2" && value === "2" && name === "statusId") {
      setOpen(true);
      setMessageText(
        "You are about to transform an establishment into a consortium of establishments The history and reference of establishment XX will now be linked to this new group"
      );
    }
    if (
      inputValues.establishmentName !== store.establishmentname &&
      name === "establishmentName"
    ) {
      setOpen(true);
      setMessageText(
        `You are about to change the name of an establishment or a group of 
        establishments. The history of establishment XX and the reference will now be 
        linked to this new name.`
      );
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
    };
    if (store.activeCase === "newcase") {
      api("post", `/api/v1/create_generaldata_establishment`, updatedObj)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Successfully Saved");
            setIconState(true);
            setToggle(true);
            focusPoint.current.style.display = "none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (store.activeCase === "currentcases") {
      api("put", "/api/v1/update_generaldata_establishment", updatedObj).then(
        (res) => {
          console.log("update", res);
        }
      );
    }
  };

  const toggleSection = () => {
    setToggle(!toggle);
    toggle
      ? (focusPoint.current.style.display = "none")
      : (focusPoint.current.style.display = "block");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#3675B7",
          borderRadius: "5px",
          borderBottom: "1px solid #C5D3DB",
          margin: "12px 4px",
          padding: "10px",
          color: "#ffffff",
        }}
        onClick={toggleSection}
      >
        <Typography variant="h6">Données générales</Typography>
        <div>{iconState ? <DoneIcon /> : null}</div>
      </Box>
      <Item
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          width: "97%",
          margin: "auto",
        }}
        ref={focusPoint}
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
                  <label>Nom établissement </label>
                  <div className="flex-form">
                    <input
                      type="search"
                      value={inputValues.establishmentName}
                      onChange={handleChange}
                      name="establishmentName"
                      value={inputValues.establishmentName}
                    />
                  </div>

                  <span> Adresse</span>
                  <br />
                  <label>Commune </label>
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
                    <label>CP</label>
                    <input
                      type="search"
                      onChange={handleChange}
                      name="zipCode"
                      value={inputValues.zipCode}
                    />
                  </div>
                  <div className="establishment-nom-mobile-container">
                    <div className="flex-form">
                      <span>Responsable de sécurité</span>
                      <label>Nom </label>
                      <input
                        type="search"
                        onChange={handleChange}
                        name="securityManagerLastName"
                        value={inputValues.securityManagerLastName.toUpperCase()}
                      />
                    </div>

                    <label>Mobile </label>
                    <div className="flex-form">
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
                  <label>Statut </label>
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
                    <label>Type voie </label>
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
                      <label>Nom voie</label>
                      <input
                        type="search"
                        onChange={handleChange}
                        name="channelName"
                        value={inputValues.channelName.toUpperCase()}
                      />
                    </div>
                    <label>Numero</label>
                    <div className="flex-form">
                      <input
                        type="search"
                        onChange={handleChange}
                        name="securityManagerMobile"
                        value={inputValues.securityManagerMobile}
                      />
                    </div>
                  </div>
                  <label>Prénom</label>
                  <div className="flex-form">
                    <input
                      type="search"
                      onChange={handleChange}
                      name="securityManagerName"
                      value={inputValues.securityManagerName}
                    />
                  </div>
                  <label>Mail</label>
                  <div className="flex-form">
                    <input
                      type="search"
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
                  endIcon={<img className="icon-validate" src={Rightarrow} />}
                  sx={{
                    background: "#3675B7",
                    ":hover": { background: "#3675B7" },
                  }}
                  variant="contained"
                >
                  Valider
                </Button>
              </Box>
            </form>

            {/* <Description/> */}
          </Grid>
        </Box>
      </Item>
      <CreateHistoricalData
        historicalDataEstablishment={historicalDataEstablishment}
        establishmentid={store.establishmentId}
      />

      <EstablishmentLevel description={description} Values={Values} />
      <StaffLevel establishmentid={store.establishmentId} />
      <Ranking establishmentid={store.establishmentId} />
    </>
  );
};

export default HistoricalSearch;
