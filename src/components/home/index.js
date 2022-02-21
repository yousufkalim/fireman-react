import HomeLeft from "./left"
import HomeRight from "./right"
import Grid from "@mui/material/Grid";
import {  useState } from "react"
import { useEffect } from "react"
import api from "../../api/index"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Folder from "../../assets/Folder.png"
import moment from "moment";
import {UpdateStore} from '../../StoreContext'
import CloseIcon from '@mui/icons-material/Close';
import Termines from "../../assets/termines.png"
import Cours3 from "../../assets/cours3.png";
import bg from "../../assets/bg.jpg";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Home=()=>{
    const [activeBlock, setActiveBlock] = useState({
      main:true,
      itemone:false,
      itemtwo:false,
      itemthree:false
    })
    let[counts,setCount]=useState({})
    let[projects,setProjects]=useState([])
    
    const update = UpdateStore();
    
        useEffect(()=>{
          CountsData()
          getLatest()
        },[])
        const CountsData=()=>{
            let userId = localStorage.getItem("userData");
            userId = JSON.parse(userId);
              api("get", `/api/v1/dashboard/casefiles_userwise_count_frontend/${userId?.userid}`).then((res) => {
                  console.log("faisl",res);
                  if (res.status == 200) {
                      setCount(res.data)
                  }
              })
              getLatest(userId)
    
        }
    
        
        const getLatest=()=>{
            let userId = localStorage.getItem("userData");
            userId = JSON.parse(userId);
            api("get", `/api/v1/dashboard/latest_casefiles_frontend/0/${userId && userId?.userid}`).then((res) => {
                console.log("faisl",res);
                if (res.status == 200) {
                    setProjects(res.data)
                }
            })
        }
    return(
        <>
       
        {/* <Grid  xs={5}>
        <HomeLeft  box={box} setBox ={setBox}/>
      </Grid>
      <Grid  sx={{display:"flex", justifyContent:"center"}}  xs={6}>
      <HomeRight box={box} setBox ={setBox}/>
      </Grid> */}

      <Box sx={{ width:"91%", marginLeft:"auto" }}>
        {
           activeBlock.main?(
          <>
      <Grid container >
        <Grid item xs={12}>
        <HomeLeft />
        </Grid>
       
        {
         
        
          
        <Grid  sx={{border:'1px solid'}} item xs={4}>
           <div className="termines_text">
    <img onClick={()=>{setActiveBlock(()=>{
          return{
         main:false,  
      itemone:true,
      itemtwo:false,
      itemthree:false
          }
        })}} src={Termines} style={{height:"100%", width:"100%"}}/>
    {/* <div className="text">DOSSIERS TERMINÉS</div> */}
    </div>
          
        </Grid>
        
      }
        <Grid sx={{border:'1px solid'}}  onClick={()=>{setActiveBlock((pre)=>{
          return{
            main:false,  
            itemone:false,
            itemtwo:true,
            itemthree:false
          }
        })}}  item xs={4}> 
          <img onClick={()=>{setActiveBlock(()=>{
          return{
         main:true,  
      itemone:false,
      itemtwo:false,
      itemthree:false
          }
        })}} style={{ height: "100%", width: "70%" }} src={Cours3} />
       
        </Grid>
        <Grid sx={{border:'1px solid'}}   item xs={4}>
     
        <img
        style={{height:"100%", width:"100%"}}
        onClick={()=>{update({ activeNavbarTab: "searchestablishment" })}}
        src={bg}/>
        </Grid>
      </Grid>
    
  
  
    </>
           ):null
}

{
  activeBlock.itemone?( 
  <>
  <CloseIcon onClick={()=>{setActiveBlock(()=>{
    return{
   main:true,  
itemone:false,
itemtwo:false,
itemthree:false
    }
  })}} />
  <Box sx={{border:"1px solid rgba(0, 0, 0, 0.1)", padding:"10px", borderRadius:'21px'}} className="travail" >
  {projects && projects.map((data)=>{
      return(
          <Box className="recre">
          <div style={{display:"flex"}}>
          <img src={Folder} />
          <div className="text">
          <p style={{fontSize:"14px"}}>{data.communeName} - {data.caseTypeName}</p>
          <p style={{fontSize:"16px",fontWeight:"600"}}>{data.establishmentName}</p>
          </div>
          </div>
          <p className="date">Dernière modification le {moment(data.updatedDate,"YYYY-MM-DD").format("DD/MM/YY")}</p>
          </Box>
      )
  })}
  <div className="voirtout">
  <p onClick={()=>{update({activeNavbarTab:"newcases"})}}>Voir Tout</p>
  </div>
</Box> 
</>
  ):null
}

{
  activeBlock.itemtwo? ( 
  <> 
  <CloseIcon onClick={()=>{setActiveBlock(()=>{
    return{
   main:true,  
itemone:false,
itemtwo:false,
itemthree:false
    }
  })}}/>
  <HomeRight/>
  </>
  ):null
}
{
  activeBlock.itemthree?( 
    <> 
  
  <CloseIcon onClick={()=>{setActiveBlock(()=>{
    return{
   main:true,  
itemone:false,
itemtwo:false,
itemthree:false
    }
  })}}/>
  </>
  ):null
}
    </Box>

    
     
    </>
    )

}
export default Home