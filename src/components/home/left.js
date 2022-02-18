
import Termines from "../../assets/termines.png"
import Travail1 from "../../assets/travail1.png"
import Travail2 from "../../assets/travail2.png"
import Folder from "../../assets/Folder.png"
import api from "../../api/index"
import { useEffect, useState } from "react"
import {UpdateStore} from '../../StoreContext'
import moment from "moment";
import Box from "@mui/material/Box";

const HomeLeft = ({setBox, box})=>{
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
        <Box  className="parent-left-box">
        <Box className="heading1">  <p >Bonjour Ludovic, vous avez : </p> </Box>   
        <Box className="countData">
               <Box sx={{ width:"38%"}}>
                   <p className="count">{counts.completed}</p>
                   <p className="count_des">projets terminés</p>
                    </Box>
                    <Box sx={{ width:"38%"}}>
                       <p className="count">{counts.inProgress}</p>
                       <p className="count_des">projets en cours</p>
                       </Box>
        </Box>
        <div class="flip-box-left">
  <div class="flip-box-inner-left">
    <div class="flip-box-front-left">
    <Box sx={{padding:"40px 0px 15px 0px"}}>
        <p className="heading2">TRAVAIL ACCOMPLIS <div></div></p>   
        </Box>
        <div className="termines_text">
    <img src={Termines} style={{height:"200px", width:"92%"}}/>
    <div className="text">DOSSIERS TERMINÉS</div>
    </div>
    <Box sx={{display:"flex", wdith:"80%", marginTop:"10px"}}> 
                <img  style={{height:"150px", width:"220px", marginRight:"17px"}} src={Travail1} />
                <img style={{height:"150px", width:"220px"}} src={Travail2} />
                </Box>   
    </div>
    <div class="flip-box-back-left">
    <Box sx={{padding:"40px 0px 15px 0px"}}>
    <p className="heading2">PROJETS TERMINÉS <div></div></p>
    </Box>
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
    </div>
  </div>
</div>
        </Box>
        </>
    )
}

export default HomeLeft