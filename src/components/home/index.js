import HomeLeft from "./left"
import HomeRight from "./right"
import Grid from "@mui/material/Grid";



const Home=()=>{

    return(
        <>
        <Grid item xs={5}>
        <HomeLeft />
      </Grid>
      <Grid item xs={6}>
      <HomeRight />
      </Grid>
    </>
    )

}
export default Home