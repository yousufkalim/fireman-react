import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import api from "../../api/index";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EstablishmentSearchInputs = () => {
  const [dropdownValue, setdropdownValue] = useState([]);
  const [inputValues, setInputValues] = useState({
    ref:"",
    commune:"",
    Classification:"",
    streetavenue:"",
    getname:"",
    status:"",
    ranking:""
  })
  useEffect(() => {
    api("get", "/api/v1/sectionhead/dropdown").then((res) =>
      setdropdownValue(res.data)
    );
  }, []);
  const handleChange = (e)=>{
   const name = e.target.name;
   const value = e.target.value;
   setInputValues((preVal)=>{
     return{
           ...preVal,
           [name]:value
     }
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
      api("get", `/api/v1/establishment/search/${inputValues.ref}/${inputValues.getname}/${inputValues.commune}/${inputValues.streetavenue}/${inputValues.status}/${inputValues.Classification}/${inputValues.ranking}`).then((res)=>(
        console.log(res)
      ))
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid gray",
          padding: "10px",
        }}
      >
        <h5>Documents durbanisme rattaches</h5>
        <span className="inputs-heading-text"> Reduire</span>
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
            <Typography
              align="start"
              variant="caption"
              display="block"
              gutterBottom
            >
              Saisai
            </Typography>
            <form className="establishment-form" type="submit" onSubmit={handleSubmit}> 
            <div> 
            <div class="flex-form">
                <input type="text"  placeholder="Ref." />
                <input type="search" onChange={handleChange} name="ref" required/>
              </div>
              <div class="flex-form">
                <input type="text"  placeholder="Commune"/>
                <select
                  className="dropdown"
                  type="select"
                  name="commune"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select communue</option>
                  {dropdownValue?.map((item) => (
                    <option key={item.value} value={item.value}>{item.text}</option>
                  ))}
                </select>
              </div>
             
              <div class="flex-form">
                <input type="text" placeholder="Classification"/>
                <select
                  className="dropdown"
                  type="select"
                  name="Classification"
                  onChange={handleChange}
                >
                   <option value="">Select Classification</option>
                  {dropdownValue?.map((item) => (
                    <option key={item.value} value={item.value}>{item.text}</option>
                  ))}
                </select>
              </div>
              </div>
              <div> 
              <div class="flex-form">
                <input type="text" placeholder="Street/Avenue"/>
                <input type="search" onChange={handleChange} name="streetavenue" required/>
              </div>
            <div class="flex-form">
                <input type="text" placeholder="name"/>
                <input type="search" onChange={handleChange} name="getname" required/>
              </div>
              <div class="flex-form">
                <input type="text" placeholder="Status" name="status"/>
                <select
                  className="dropdown"
                  type="select"
                  name="status"
                  required
                  onChange={handleChange}
                >
                   <option value="">Select status</option>
                  {dropdownValue?.map((item) => (
                    <option key={item.value} value={item.value}>{item.text}</option>
                  ))}
                </select>
              </div>
              
              <Box>
                <div class="flex-form">
                  <input type="text" placeholder="Ranking"/>
                  <select
                  className="dropdown"
                  type="select"
                  name="ranking"
                  required
                  onChange={handleChange}
                > 
                   <option value="">Select Ranking</option>
                  {dropdownValue?.map((item) => (
                    <option key={item.value} value={item.value}>{item.text}</option>
                  ))}
                </select>
                </div>
                <button className="establishment-search-btn-submit" type="submit"> Submit </button>
              </Box>
              </div>
            </form>
           
          </Item>
        </Grid>
       
      </Box>
    </>
  );
};

export default EstablishmentSearchInputs;
