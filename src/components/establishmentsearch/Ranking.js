import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import api from "../../api";
import { toast } from "react-toastify";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import Rightarrow from "../../assets/rightarrow.png";
import don from '../../assets/donne.svg'
import { useTranslation, Trans } from "react-i18next";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Ranking = ({ establishmentid, setToggler, Toggler, setIcon, Icon, casefileId,buttonEnability}) => {
  const { t, i18n } = useTranslation();
  const [dropdownValue, setdropdownValue] = useState({
    rankingorder: "",
    status: "",
    ranking: "",
    classification: "",
    apidropdowndata: "",
  });
  const [inputValues, setInputValues] = useState({
    categoryRankingId: dropdownValue.apidropdowndata.categoryRankingId
      ? dropdownValue.apidropdowndata.categoryRankingId
      : "",
    rankingStatusId: dropdownValue.apidropdowndata.rankingStatusId
      ? dropdownValue.apidropdowndata.rankingStatusId
      : "",
    rankingOrderId: dropdownValue.apidropdowndata.rankingOrderId
      ? dropdownValue.apidropdowndata.rankingOrderId
      : "",
    rankingClassificationId: dropdownValue.apidropdowndata
      .rankingClassificationId
      ? dropdownValue.apidropdowndata.rankingClassificationId
      : "",
  });
  const store = Store();
  const updatestore = UpdateStore();
  useEffect(() => {
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
    api("get", "/api/v1/rankingorder/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          rankingorder: res,
        };
      });
    });

    
      api("get", `/api/v1/get_establishment_ranking/${establishmentid}`).then(
        (res) => {
          setdropdownValue((pre) => {
            return {
              ...pre,
              apidropdowndata: res.data,
            };
          });
        }
      );
    
  }, []);

  useEffect(() => {
    setInputValues(() => {
      return {
        categoryRankingId: dropdownValue.apidropdowndata.categoryRankingId
          ? dropdownValue.apidropdowndata.categoryRankingId
          : "",
        rankingStatusId: dropdownValue.apidropdowndata.rankingStatusId
          ? dropdownValue.apidropdowndata.rankingStatusId
          : "",
        rankingOrderId: dropdownValue.apidropdowndata.rankingOrderId
          ? dropdownValue.apidropdowndata.rankingOrderId
          : "",
        rankingClassificationId: dropdownValue.apidropdowndata
          .rankingClassificationId
          ? dropdownValue.apidropdowndata.rankingClassificationId
          : "",
      };
    });
  }, [dropdownValue.apidropdowndata]);
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
    const newObj = {
      ...inputValues,
      establishmentId: establishmentid,
      caseFileId:casefileId
    };
    console.log(newObj, "newObj");
    api("put", "/api/v1/establishment_ranking_details", newObj).then((res) => {
      console.log(res, "resranking");
      if(res.data===true){
      updatestore({
        activeNavbarTab: 2,
        btnenableImpantation:false
      });
      {
        toast.success(t("Successfull"));
      }
      setToggler((pre) => {
        return {
          ...pre,
          togglerranking: false,
        };
      });
      setIcon((pre) => {
        return {
          ...pre,
          iconranking: true,
        };
      });
    }
    }).catch((err)=>{
       console.log(err);
    });
  };

  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              togglerranking: !Toggler.togglerranking,
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
        <Typography variant="h6"> {t("Ranking")}</Typography>
        {Icon.iconranking ? <img src={don}/> : null}
      </Box>

      <Accordion
       sx={{ margin: "10px auto !important",borderRadius:"10px", width:"97.5%"}}
        expanded={Toggler.togglerranking ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item sx={{ boxShadow: "none", width: "97%", margin: "auto" }}>
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #C5D3DB",
                padding: "10px 0px",
              }}
            >
              <Box
                sx={{
                  borderRight: "2px solid #C5D3DB",
                  height: "12px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 5px",
                  fontWeight:"600",
                  width: "255px",
                }}
              >
                {t("Status")}
              </Box>
              <Box
                sx={{
                  borderRight: "2px solid #C5D3DB",
                  height: "12px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 5px",
                  fontWeight:"600",
                  width: "240px",
                }}
              >
                {t("Applicable order(s)")}
              </Box>
              <Box
                sx={{
                  borderRight: "2px solid #C5D3DB",
                  height: "12px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 5px",
                  fontWeight:"600",
                  width: "240px",
                }}
              >
                {t("Classification ERP TYPE")}
              </Box>
              <Box
                sx={{
                  borderRight: "2px solid #C5D3DB",
                  height: "12px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 5px",
                  fontWeight:"600",
                  width: "240px",
                }}
              >
                {t("ERP CAT ranking")}
              </Box>
            </Box>
            <form
              className="establishment-form"
              type="submit"
              onSubmit={handleSubmit}
            >
              <Box sx={{ textAlign: "start", padding: "10px" }}>
              <select
                  className="field-width-ranking"
                  type="select"
                  name="rankingStatusId"
                  onChange={handleChange}
                  value={inputValues.rankingStatusId}
                  style={{with:"24%"}}
                >
                  <option value="">{t("Please choose")}</option>
                  {dropdownValue.status.data?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <select
                  className="field-width-ranking"
                  type="select"
                  name="rankingOrderId"
                  onChange={handleChange}
                  value={inputValues.rankingOrderId}
                >
                  <option value="">{t("Please choose")}</option>
                  {dropdownValue.rankingorder.data?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <select
                  className="field-width-ranking"
                  type="select"
                  name="rankingClassificationId"
                  value={inputValues.rankingClassificationId}
                  onChange={handleChange}
                >
                  <option value="">{t("Please choose")}</option>
                  {dropdownValue.classification.data?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                <select
                  className="field-width-ranking"
                  type="select"
                  name="categoryRankingId"
                  value={inputValues.categoryRankingId}
                  onChange={handleChange}
                >
                  <option value="">{t("Please choose")}</option>
                  {dropdownValue.ranking.data?.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
              
              </Box>
              <Box sx={{ textAlign: "right", padding: "10px" }}>
                <Button
                disabled={buttonEnability?.Rankingbutton}
                  type="submit"
                  endIcon={<img className="icon-validate" src={Rightarrow} />}
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
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Ranking;
