import HomeLeft from "./left"
import HomeRight from "./right"
import Grid from "@mui/material/Grid";
import {  useState } from "react"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
 
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Home=()=>{
 
    return(
        <>
       
        {/* <Grid  xs={5}>
        <HomeLeft  box={box} setBox ={setBox}/>
      </Grid>
      <Grid  sx={{display:"flex", justifyContent:"center"}}  xs={6}>
      <HomeRight box={box} setBox ={setBox}/>
      </Grid> */}

      <Box sx={{ width:"91%", marginLeft:"auto" }}>
      <Grid container >
        <Grid item xs={5}>
        <HomeLeft />
        </Grid>
        <Grid item xs={7}>
        <HomeRight />
        </Grid>
        
      </Grid>
    </Box>
     
    </>
    )

}
export default Home