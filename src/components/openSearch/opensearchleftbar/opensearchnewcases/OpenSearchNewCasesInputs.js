import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import OpenSearchFilterData from "./OpenSearchFilterData";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Rightarrow from "../../../../assets/rightarrow.png";
import { useTranslation, Trans } from "react-i18next";
import { Store, UpdateStore } from "../../../../StoreContext";
import CreateAnEstablishment from "./CreateAnEstablishment";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const EstablishmentSearchNewCasesInputs = ({ setCompShow }) => {
  const { t, i18n } = useTranslation();
  const [dropdownValue, setdropdownValue] = useState({
    city: "",
    status: "",
    ranking: "",
    classification: "",
  });
  const [establishmentSearchData, setEstablishmentSearchData] = useState([]);
  const [inputValues, setInputValues] = useState({
    refNum: "",
    commune: "",
    classification: "",
    steet: "",
    name: "",
    status: "",
    ranking: "",
  });
  const store = Store();
  const update = UpdateStore();

  useEffect(() => {
    api("get", "/api/v1/city/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          city: res,
        };
      });
    });
    api("get", "/api/v1/classification/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          classification: res,
        };
      })
    );
    api("get", "/api/v1/status/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          status: res,
        };
      })
    );
    api("get", "/api/v1/categoryranking/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          ranking: res,
        };
      })
    );
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
    const obj = {
      ...inputValues,
      // commune: inputValues.commune === "" ? 0 : inputValues.commune,
        commune: inputValues.commune,
      classification:
        inputValues.classification === "" ? 0 : inputValues.classification,
      status: inputValues.status === "" ? 0 : inputValues.status,
      ranking: inputValues.ranking === "" ? 0 : inputValues.ranking,
    };
    api("post", `/api/v1/establishment/search`, obj).then((res) => {
      setEstablishmentSearchData(res);
    });
  };
console.log(establishmentSearchData);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#3675B7",
          borderRadius: "5px",
          borderBottom: "1px solid #C5D3DB",
          margin: "3px 4px",
          padding: "10px",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">
          {store.phoneBook
            ? t("What establishment are you looking for the security manager?")
            : t("For which institution will the file be created?")}
        </Typography>
        <Typography sx={{ color: "#A2AABE" }} variant="span"></Typography>
      </Box>
      <Item
        sx={{
         margin:"1% auto",
          borderRadius: "10px",
          fontSize: "20px",
          boxShadow: "none",
          width:"98%"
        }}
      >
        {store.phoneBook ? (
          ""
        ) : (
          <Box sx={{ textAlign: "start", display: "flex", paddingLeft: "8px" }}>
            <h5>{t("New Establishment")}</h5>
            <BootstrapTooltip title="Sera mis en œuvre plus tard">
              <Button style={{textTransform:"none"}}
                onClick={() => {
                  update({ activeNavbarTab: "createanestablishment" });
                }}
                sx={{ padding: "2px 15px" }}
              >
                Créer
              </Button>
            </BootstrapTooltip>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item md={12}>
            <Item sx={{ boxShadow: "none" }}>
              <form
                className="establishment-form"
                type="submit"
                onSubmit={handleSubmit}
              >
                <Box sx={{ display: "flex" }}>
                  <div className="inputs-container">
                    {store.phoneBook ? (
                      ""
                    ) : (
                      <Box sx={{ fontSize: "20px", paddingBottom: "10px" }}>
                        <h5> {t("Existing establishment")}</h5>
                      </Box>
                    )}

                    <div className="flex-form">
                      <label className="label-color"> {t("Ref.")}</label>
                      <input
                        type="search"
                        onChange={handleChange}
                        name="refNum"
                      />
                    </div>
                    <div className="flex-form">
                      <label className="label-color"> {t("Name")}</label>
                      <input
                        type="search"
                        onChange={handleChange}
                        name="name"
                      />
                    </div>
                    <div className="flex-form">
                      <label className="label-color"> {t("City")}</label>
                      <select
                        className="dropdown"
                        type="select"
                        name="commune"
                        onChange={handleChange}
                      >
                        <option value="">{t("Please choose")}</option>
                        {dropdownValue.city.data?.map((item) => (
                          <option
                            class="option2"
                            key={item.value}
                            value={item.value}
                          >
                            {item.text}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-form">
                      <label className="label-color">
                        {" "}
                        {t("Streel/Avenue")}
                      </label>
                      <input
                        type="search"
                        onChange={handleChange}
                        name="steet"
                      />
                    </div>
                  </div>
                  <div className="inputs-container input-container-search">
                    <div className="flex-form">
                      <label className="label-color"> {t("Status")}</label>
                      <select
                        className="dropdown"
                        type="select"
                        name="statut"
                        onChange={handleChange}
                      >
                        <option value="">{t("Please choose")}</option>
                        {dropdownValue.status.data?.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-form">
                      <label className="label-color">
                        {" "}
                        {t("Type Classification")}
                      </label>
                      <select
                        className="dropdown"
                        type="select"
                        name="classification"
                        onChange={handleChange}
                      >
                        <option value="">{t("Please choose")}</option>
                        {dropdownValue.classification.data?.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.text}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Box>
                      <div className="flex-form">
                        <label className="label-color">
                          {" "}
                          {t("CAT Ranking")}
                        </label>
                        <select
                          className="dropdown"
                          type="select"
                          name="ranking"
                          onChange={handleChange}
                        >
                          <option value="">{t("Please choose")}</option>
                          {dropdownValue.ranking.data?.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Box>
                  </div>
                </Box>

                <Box sx={{ textAlign: "right", width: "97%" }}>
                  <Button
                    type="submit"
                    endIcon={<img className="icon-validate" src={Rightarrow} />}
                    sx={{
                      background: "#3675B7",
                      ":hover": { background: "#3675B7" },
                    }}
                    variant="contained"
                  >
                    {t("Search")}
                  </Button>
                </Box>
              </form>
            </Item>
          </Grid>
        </Box>
      </Item>
      {establishmentSearchData.data ? (
        <OpenSearchFilterData
          establishmentSearchData={establishmentSearchData}
          setCompShow={setCompShow}
        />
      ) : null}
    </>
  );
};

export default EstablishmentSearchNewCasesInputs;
