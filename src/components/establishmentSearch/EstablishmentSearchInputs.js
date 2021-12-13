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
  useEffect(() => {
    api("get", "/api/v1/sectionhead/dropdown").then((res) =>
      setdropdownValue(res.data)
    );
  }, []);
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
        <Grid item md={6}>
          <Item sx={{ boxShadow: "none" }}>
            <Typography
              align="start"
              variant="caption"
              display="block"
              gutterBottom
            >
              Saisai
            </Typography>
            <FormControl fullWidth>
            <div class="flex-form">
                <input type="submit" value="Ref." />
                <input type="search" />
              </div>
              <div class="flex-form">
                <input type="submit" value="Commune" />
                <select
                  className="dropdown"
                  type="select"
                  name="cars"
                  id="cars"
                >
                  {dropdownValue?.map((item) => (
                    <option>{item.text}</option>
                  ))}
                </select>
              </div>
             
              <div class="flex-form">
                <input type="submit" value="Classification" />
                <select
                  className="dropdown"
                  type="select"
                  name="cars"
                  id="cars"
                >
                  {dropdownValue?.map((item) => (
                    <option>{item.text}</option>
                  ))}
                </select>
              </div>
              <div class="flex-form">
                <input type="submit" value="Street/Avenue" />
                <input type="search" />
              </div>
            </FormControl>
          </Item>
        </Grid>

        <Grid sx={{}} item md={6}>
          <Item sx={{ boxShadow: "none", marginTop: "20px" }}>
            <FormControl fullWidth>
            <div class="flex-form">
                <input type="submit" value="Name" />
                <input type="search" />
              </div>
              <div class="flex-form">
                <input type="submit" value="Status" />
                <select
                  className="dropdown"
                  type="select"
                  name="cars"
                  id="cars"
                >
                  {dropdownValue?.map((item) => (
                    <option>{item.text}</option>
                  ))}
                </select>
              </div>
             
              <Box>
                <div class="flex-form">
                  <input type="submit" value="Ranking" />
                  <select
                  className="dropdown"
                  type="select"
                  name="cars"
                  id="cars"
                >
                  {dropdownValue?.map((item) => (
                    <option>{item.text}</option>
                  ))}
                </select>
                </div>
                <div class="flex-form">
                <input type="submit" value="Name" />
                <input type="search" />
              </div>
              </Box>
             
            </FormControl>
           
          </Item>
        </Grid>
       
      </Box>
    </>
  );
};

export default EstablishmentSearchInputs;
