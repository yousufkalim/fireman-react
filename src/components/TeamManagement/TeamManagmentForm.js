import React,{useState, useEffect} from 'react'
import api from "../../api/index";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
const TeamManagmentForm = ({importedData}) => {
    let [sdis, setSdis] = useState([]);
   const [loading, setloading] = useState(true)
  let [groups, setGroups] = useState([]);
  let [services, setServices] = useState([]);
  let [roles, setroles] = useState([]);
  let [team, setTeam] = useState({
  });
  useEffect(() => {
   if(importedData){
     setloading(false);
   }
   setTeam(()=>{
     return{
         email:  importedData?.email,
    cellNo:  importedData?.cellNo,
    password: "",
    roleId: importedData?.roleId,
    groupId: importedData?.groupId,
    serviceId: importedData?.serviceId,
    empFirstName: importedData?.empFirstName,
    empLastName: importedData?.empLastName,
    password:importedData?.password,
    sdisId:importedData?.sdisId,
    groupId:importedData?.groupId

     }
   })
  }, [importedData])
  console.log(importedData,"<><<>");
    useEffect(() => {
      
        getSdis()
      }, []);
    const getSdis = () => {
        api("get", "/api/v1/sdis/dropdown").then((res) => {
          if (res.status == 200) {
            setSdis(res.data);
          }
        });
        api("get", "/api/v1/roles/dropdown").then((res) => {
          if (res.status == 200) {
            setroles(res.data);
          }
        });
      };
      const getGroups = (e) => {
        api("get", `/api/v1/group/dropdown/${e.target.value}`).then((res) => {
          console.log("resgroup", res);
          if (res.status == 200) {
            setGroups(res.data);
          }
        });
      };
      const getServices = (e) => {
        setTeam({ ...team, ["groupId"]: e.target.value });
        api("get", `/api/v1/services/dropdown/${e.target.value}`).then((res) => {
          console.log("ser", res);
          if (res.status == 200) {
            setServices(res.data);
          }
        });
      };
    const submitForm = (e) => {
        e.preventDefault();
        let userId = localStorage.getItem("userData");
        userId = JSON.parse(userId);
        let data = {
          ...team,
          emailConfirmed: true,
          isActive: true,
          isValidated: true,
          currentUserId: userId?.userid,
          isAdmin: false,
        };
        if (
          team.email &&
          team.password &&
          team.serviceId &&
          team.groupId &&
          team.roleId &&
          team.cellNo &&
          team.empFirstName &&
          team.empLastName
        ) {
          api("post", "/api/v1/register", data).then((res) => {
            if (res.status == 200) {
              if (res.data.success == true) {
                toast.success("Employee Added Successfully");
              }
            }
          });
        }
      };
  return (
   <>
    {
      console.log(importedData)
    }
   {
     
     loading?<></>:
 
   <div className='team_management'>
            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>SDIS</label>
                    <select value={importedData?.sdisId} onChange={getGroups} >
                        <option selected disabled>Select SDIS</option>
                        {
                            sdis && sdis.map((data) => {
                                return (
                                    <option value={data.value}>{data.text}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='input_cont'>
                    <label>Group</label>
                    <select value={team?.groupId} onChange={getServices}>
                        <option selected disabled>Select Group</option>
                        {
                            groups && groups.map((data) => {
                                return (
                                    <option value={data.value}>{data.text}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='field_seprator' ></div>
            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>Service</label>
                    <select onChange={(e) => { setTeam({ ...team, ["serviceId"]: e.target.value }) }}>
                        <option selected disabled>Select Service</option>
                        {
                            services && services.map((data) => {
                                return (
                                    <option value={data.value}>{data.text}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='input_cont'>
                    <label>Employee Designation</label>
                    <select value={importedData?.data?.roleId} onChange={(e) => { setTeam({ ...team, ["roleId"]: e.target.value }) }}>
                        <option selected disabled>Select Employee Designation</option>
                        {
                            roles && roles.map((data) => {
                                return (
                                    <option value={data.value}>{data.text}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='field_seprator' ></div>
            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>First Name</label>
                    <input onChange={(e) => { setTeam({ ...team, ["empFirstName"]: e.target.value
                 }) }}  value={team?.empFirstName} placeholder='Enter First Name' required />
                </div>
                <div className='input_cont'>
                    <label>Last Name</label>
                    <input onChange={(e) => { setTeam({ ...team, ["empLastName"]: e.target.value }) }} value={team?.empLastName} placeholder='Enter Last Name' />
                </div>
            </div>
            <div className='field_seprator' ></div>
            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>Email</label>
                    <input
                      onChange={(e) => { setTeam({ ...team, ["email"]: e.target.value }) }}
                      value={team.email}
                      placeholder='Enter Email'
                    />
                </div>
                <div className='input_cont'>
                    <label>Cell No</label>
                    <input onChange={(e) => { setTeam({ ...team, ["cellNo"]: e.target.value }) }} value={team.cellNo} placeholder='Enter Cell No' />
                </div>
            </div>
            <div className='field_seprator' ></div>
            <div className='team_management_row'>
                <div className='input_cont'>
                    <label>Password</label>
                    <input value={team?.password} onChange={(e) => { setTeam({ ...team, ["password"]: e.target.value }) }}  placeholder='Enter Password'/>
                </div>
                <div style={{ visibility: "hidden" }} className='input_cont'>
                    <label>Cell No</label>
                    <input placeholder='Enter Cell No' />
                </div>
            </div>
            {/* <div>
                <input required></input>
            </div> */}
            <div className='field_seprator' ></div>
            <div style={{ textAlign: "right", padding: "10px" }}>
                <Button type="submit"
                        onClick={submitForm}
                        endIcon={
                          <img className="icon-validate" />
                        }
                        sx={{
                            background: "#3675B7" ,
                            textAlign: "right",
                            fontSize: "12.97px",
                            ":hover": { background: "#3675B7" },
                          }}
                          variant="contained"
                        > Nouvel utilisateur </Button>
            </div>
        </div>
  
                        } 
   </>
  )
}

export default TeamManagmentForm