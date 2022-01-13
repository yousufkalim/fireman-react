import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import OpenSearchFilterData from "./OpenSearchFilterData";
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Rightarrow from "../../../../assets/rightarrow.png";
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
    const obj = {
      ...inputValues,
      commune: inputValues.commune === "" ? 0 : inputValues.commune,
      classification:
        inputValues.classification === "" ? 0 : inputValues.classification,
      status: inputValues.status === "" ? 0 : inputValues.status,
      ranking: inputValues.ranking === "" ? 0 : inputValues.ranking,
    };
    api("post", `/api/v1/establishment/search`, obj).then((res) => {
      setEstablishmentSearchData(res);
    });
  };

  return (
    <>
     <Box sx={{
       display:"flex", 
       justifyContent:"space-between", 
       backgroundColor:"#3675B7", 
       borderRadius:"5px", 
      borderBottom:"1px solid #C5D3DB",
       margin:"12px 4px",
       padding:"10px",
       color:"#ffffff"
       }}> 
     <Typography variant="h6">
     Creation de dossier
</Typography>
<Typography sx={{color:"#A2AABE"}} variant="span">
</Typography>

        </Box>
      <Item
        sx={{
          marginTop: "5px",
          borderRadius: "10px",
          fontSize:"20px",
          boxShadow:"none"
        }}
      >

       
        <Box
        sx={{textAlign:"start", display:"flex", paddingLeft:"16px"}}
        >
          <h5>Establissement nouveau</h5>
          <BootstrapTooltip title="Sera mis en œuvre plus tard">
        <Button sx={{padding:"2px 2px"}}>Creer</Button>
      </BootstrapTooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Grid item md={12}>
            <Item sx={{ boxShadow: "none" }}>
              <form
                className="establishment-form"
                type="submit"
                onSubmit={handleSubmit}
              >
                <Box sx={{display:"flex"}}> 
                <div className="inputs-container">
                <label> Etablissement existant</label>
                  <div className="flex-form">
                    <label className="label-color"> Ref.</label>
                    <input
                      type="search"
                      onChange={handleChange}
                      name="refNum"
                    />
                  </div>
                  <div className="flex-form">
                    <label className="label-color"> Nom</label>
                    <input type="search" onChange={handleChange} name="name" />
                  </div>
                  <div className="flex-form">
                  
                    <label className="label-color"> Commune</label>
                    <select
                      className="dropdown"
                      type="select"
                      name="commune"
                      onChange={handleChange}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.city.data?.map((item) => (
                        <option class="option2" key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-form">
                    <label className="label-color"> Rue/Avenue</label>
                    <input type="search" onChange={handleChange} name="steet" />
                  </div>
                </div>
                <div className="inputs-container input-container-search">
                  <div className="flex-form">
                    <label className="label-color"> Statut</label>
                    <select
                      className="dropdown"
                      type="select"
                      name="statut"
                      onChange={handleChange}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.status.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-form">
                    <label className="label-color"> Classement Type</label>
                    <select
                      className="dropdown"
                      type="select"
                      name="classification"
                      onChange={handleChange}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.classification.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Box>
                    <div className="flex-form">
                   
                      <label className="label-color"> Classement CAT</label>
                      <select
                        className="dropdown"
                        type="select"
                        name="ranking"
                        onChange={handleChange}
                      >
                        <option value="">Choisissez s'il vous plaît</option>
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
                <Divider sx={{margin:"20px 0px"}}/>
                <Box sx={{textAlign:"right"}}> 
                    <Button   type="submit" endIcon={<img className='' src={Rightarrow} />} sx={{ background: "#3675B7", ':hover': { background: "#3675B7" } }} variant="contained">
                    RECHERCHER
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
