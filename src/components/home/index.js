import HomeLeft from "./left"
import HomeRight from "./right"
import Grid from "@mui/material/Grid";
import {  useState } from "react"


const Home=()=>{
  const [box, setBox] = useState(false);
    return(
        <>
       
        <Grid   xs={5}>
        <HomeLeft  box={box} setBox ={setBox}/>
      </Grid>
      <Grid sx={{display:"flex", justifyContent:"center"}}  xs={6}>
      <HomeRight box={box} setBox ={setBox}/>
      </Grid>
     
    </>
    )

}
export default Home