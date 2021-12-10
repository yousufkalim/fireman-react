import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EstablishmentSearchLeftBar from "./establishmentsearchleftbar/EstablishmentSearchLeftBar";
import EstablishmentSearchRightBar from "./establishmentsearchrightbar/EstablishmentSearchRightBar";
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchBody = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Grid
        style={{ backgroundColor: "gray", padding: "20px" }}
        container
        spacing={2}
      >
        <Grid item xs={2}>
          <Item sx={{height:"100%"}}>
            <EstablishmentSearchLeftBar />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{ marginTop: "5px", borderLeft: "8px solid green" }}>
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
          
            </Item>
          <Item sx={{ marginTop: "5px", borderLeft: "8px solid blue" }}>
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
                <Item>
                <Typography align="start" variant="caption" display="block" gutterBottom>
       Saisai
      </Typography>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <TextField sx={{width:"100%", marginY:"10px"}}  id="outlined-basic" label="Outlined" variant="outlined" />
        <Typography align="start" variant="caption" display="block" gutterBottom>
       Reference durbanisme
      </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Typography align="start" variant="caption" display="block" gutterBottom>
       demandeur
      </Typography>
        <TextField sx={{width:"100%", marginY:"10px"}}  id="outlined-basic" label="Outlined" variant="outlined" />
      </FormControl>
                </Item>
              </Grid>


              <Grid item md={6}>
                <Item>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <TextField sx={{width:"100%", marginY:"10px"}} id="outlined-basic" label="Outlined" variant="outlined" />
        <Box sx={{marginTop:"30px"}}>
        <TextField sx={{width:"100%", marginY:"5px"}} id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
       
        <Box sx={{marginTop:"30px"}}> 
        <TextField sx={{width:"100%", marginY:"5px"}}  id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField sx={{width:"100%", marginY:"5px"}}  id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
      </FormControl>
     
                </Item>
              </Grid>

            </Box>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <EstablishmentSearchRightBar />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default EstablishmentSearchBody;
