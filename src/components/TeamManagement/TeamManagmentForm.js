import React, { useState, useEffect } from "react";
import api from "../../api/index";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Store } from "../../StoreContext";
const TeamManagmentForm = ({ importedData, prefilledData, creation,  setTeamFormDisplay }) => {
  let [sdis, setSdis] = useState([]);
  let [groups, setGroups] = useState([]);
  let [services, setServices] = useState([]);
  let [roles, setroles] = useState([]);
  let [team, setTeam] = useState({});
  let [ress, setRess] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  

  console.log("prefilledData",prefilledData);
  console.log(importedData,"importedData");
  console.log(creation,"creation");
  useEffect(() => {
    if (importedData) {
      setIsDisabled(true);
    }

    setTeam(() => {
      return {
        email: creation? "": importedData?.email,
        cellNo: creation? "": importedData?.cellNo,
        postalAddress:creation? "": importedData?.postalAddress,
        roleId:creation? "": importedData?.roleId,
        groupId:creation? "": importedData?.groupId,
        serviceId: importedData?.serviceId
          ? importedData?.serviceId
          : prefilledData?.data?.serviceId,
        empFirstName:creation? "": importedData?.empFirstName,
        empLastName:creation? "": importedData?.empLastName,
        password:creation? "": importedData?.password,
        sdisId: importedData?.sdisId
          ? importedData?.sdisId
          : prefilledData?.data?.sdisId,
        groupId: importedData?.groupId
          ? importedData?.groupId
          : prefilledData?.data?.groupId,
        employeeId:creation? "":importedData?.employeeId,
      };
    });
  }, [importedData || prefilledData]);

  useEffect(() => {
    getSdis();
  }, []);

  console.log("team?.employeeId", team.employeeId);
  console.log("team?.sdisId", team);
  console.log("prefilledData?.data?.sdisId", prefilledData?.data?.sdisId);

  useEffect(() => {
    if (team?.sdisId || prefilledData?.data?.sdisId) {
      api(
        "get",
        `/api/v1/group/dropdown/${
          team?.sdisId ? team?.sdisId : prefilledData?.data?.sdisId
        }`
      ).then((res) => {
        if (res.status == 200) {
          setGroups(res.data);
        }
      });
    }
  }, [team?.sdisId]);

  console.log("GROUPS", groups);

  useEffect(() => {
    if (team?.groupId || prefilledData?.data?.groupId) {
      api(
        "get",
        `/api/v1/services/dropdown/${
          team?.groupId ? team?.groupId : prefilledData?.data?.groupId
        }`
      ).then((res) => {
        if (res.status == 200) {
          setServices(res.data);
        }
      });
    }
  }, [team?.groupId]);

  const getSdis = () => {
    api("get", "/api/v1/sdis/dropdown").then((res) => {
      if (res.status == 200) {
        setSdis(res.data);
      }
    });
    api("get", `/api/v1/roles/dropdown/${store?.role}`).then((res) => {
      if (res.status == 200) {
        setroles(res.data);
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
      isAdmin: true,
    };
    console.log(data);
    if (
      !team.employeeId &&
      team.email &&
      team.password &&
      team.groupId &&
      team.roleId &&
      team.phoneNo &&
      team.empFirstName &&
      team.empLastName
    ) {
      
        console.log(data);
        api("post", "/api/v1/register", data).then((res) => {
          console.log("res register api", res);
          setTeamFormDisplay(true)
          if (res?.status == 200) {
            if (res?.data.success == true) {
              toast.success("Employé ajouté avec succès");
             
            }
            if (res?.data?.success == false) {
              toast.error(res?.data?.errorMessage[0])
            }
          }
          console.log("res", res);
        });
      
    }
    {
      console.log("TEAM    ROLEID", team.roleId);
    }
    if (team.employeeId > 0) {
      const obj = {
        //...team,
        employeeId: importedData.employeeId,
        roleId: team.roleId,
        groupId: team.groupId,
        serviceId: team.serviceId,
        empFirstName: team.empFirstName,
        empLastName: team.empLastName,
        phoneNo: team.cellNo,
        email: team.email,
        cellNo: team.cellNo,
        password: team.password,
        emailConfirmed: true,
        isActive: true,
        isValidated: true,
        isDeletable: true,
        currentUserId: 0,
        isAdmin: true,
      };
      console.log("TEAM 186   ROLEID", team.roleId);
      console.log("obj", obj);
      api("put", "/api/v1/Users/update", obj).then((res) => {
        setRess(res);
        console.log("updated res", ress);
        if (res.status == 200) {
          if (res.data.success == true) {
            setTeamFormDisplay(true)
            toast.success(
              "Les données des employés ont été mises à jour avec succès"
            );
          }
        }
        console.log("updated res", res);
      });
    }
  };
  const UserRole = localStorage.getItem("roleSerial");
  const store = Store();
  return (
    <>
      <div className="team_management">
        <div className="team_management_row">
          <div className="input_cont">
            <label>SDIS</label>
            <select
              disabled={
                store?.role == "2" ||
                (store?.role == "3" && prefilledData.length !== 0)
              }
              value={team?.sdisId}
              name="cars"
              className="dropdown-team-managment-form"
              id="cars"
              onChange={(e) => {
                setTeam({ ...team, ["sdisId"]: e.target.value });
              }}
            >
              <option selected disabled>
                Select SDIS
              </option>
              {sdis &&
                sdis.map((data) => {
                  return <option value={data.value}>{data.text}</option>;
                })}
            </select>
          </div>

          <div className="input_cont">
            <label>Group</label>
            <select
            className="dropdown-team-managment-form"
              disabled={
                store?.role == "2" ||
                (store?.role == "3" && prefilledData.length !== 0)
              }
              value={
                team?.groupId ? team.groupId : prefilledData?.data?.groupId
              }
              //onChange={getGroups}
              onChange={(e) => {
                setTeam({ ...team, ["groupId"]: e.target.value });
              }}
              name="cars"
              id="cars"
            >
              <option selected disabled>
                Select Group
              </option>
              {groups &&
                groups.map((data) => {
                  return <option value={data.value}>{data.text}</option>;
                })}
            </select>
          </div>
        </div>
        <div className="field_seprator"></div>
        <div className="team_management_row">
          <div className="input_cont">
            <label>Service</label>
            <select
              disabled={store?.role == "3" && prefilledData.length !== 0}
              value={
                team?.serviceId
                  ? team?.serviceId
                  : prefilledData?.data?.serviceId
              }
              onChange={(e) => {
                setTeam({ ...team, ["serviceId"]: e.target.value });
              }}
              name="cars"
              id="cars"
              className="dropdown-team-managment-form"
            >
              {console.log("TEAM>SERVICEID", team.serviceId)}
              <option selected disabled>
                Select Service
              </option>
              {services &&
                services.map((data) => {
                  return <option value={data.value}>{data.text}</option>;
                })}
            </select>
          </div>
          <div className="input_cont">
            <label>Employee Designation</label>
            <select
            className="dropdown-team-managment-form"
              onChange={(e) => {
                setTeam({ ...team, ["roleId"]: e.target.value });
              }}
              value={team.roleId}
              name="cars"
              id="cars"
            >
              {console.log("TEAM>ROLEID", team.roleId)}
              <option selected disabled>
                Select Employee Designation
              </option>
              {roles &&
                roles.map((data) => {
                  return <option value={data.value}>{data.text}</option>;
                })}
            </select>
          </div>
        </div>
        <div className="field_seprator"></div>
        <div className="team_management_row">
          <div className="input_cont">
            <label>First Name</label>
            <input 
            type="search"
              onChange={(e) => {
                setTeam({ ...team, ["empFirstName"]: e.target.value });
              }}
              value={team.empFirstName}
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="input_cont">
            <label>Last Name</label>
            <input
             type="search"
              onChange={(e) => {
                setTeam({ ...team, ["empLastName"]: e.target.value });
              }}
              value={team.empLastName}
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div className="field_seprator"></div>
        <div className="team_management_row">
          <div className="input_cont">
            <label>Email</label>
            <input
            autoComplete="off"
             type="search"
              disabled={isDisabled}
              onChange={(e) => {
                setTeam({ ...team, ["email"]: e.target.value });
              }}
              value={team.email}
              placeholder="Enter Email"
            />
          </div>
          <div className="input_cont">
            <label>Cell No</label>
            <input
             type="search"
              onChange={(e) => {
                setTeam({ ...team, ["phoneNo"]: e.target.value });
              }}
              value={team.cellNo}
              placeholder="Enter Cell No"
            />
          </div>
          <div style={{padding:"2% 0%"}} className="input_cont">
                  <label>Address</label>
                  <input
                   type="search"
                    value={team?.postalAddress}
                    onChange={(e) => {
                      setTeam({ ...team, ["postalAddress"]: e.target.value });
                    }}
                    placeholder="Enter Address"
                  />
                </div>
                <div style={{padding:"2% 0%"}} className="input_cont">
                  <label>Password</label>
                  <input
                  autoComplete="off"
                  style={{width:"95%"}}
                    type="password"
                    value={team.password}
                    onChange={(e) => {
                      setTeam({ ...team, ["password"]: e.target.value });
                    }}
                    placeholder="Enter Password"
                  />
                </div>
        </div>
       
        {(() => {
          if (!importedData) {
            return <div className="field_seprator"></div>;
          }
        })()}

        {(() => {
          if (!importedData) {
            return (
              <div className="team_management_row">
               
               
                <div style={{ visibility: "hidden" }} className="input_cont">
                  <label>Cell No</label>
                  <input
                    placeholder="Enter Cell No"
                    onChange={(e) => {
                      setTeam({ ...team, ["password"]: e.target.value });
                    }}
                  />
                </div>
              </div>
            );
          }
        })()}
        <div className="field_seprator"></div>
        <div style={{ textAlign: "right", padding: "10px" }}>
          <Button
            type="submit"
            onClick={submitForm}
            endIcon={<img className="icon-validate" />}
            sx={{
              background: "#3675B7",
              textAlign: "right",
              fontSize: "12.97px",
              ":hover": { background: "#3675B7" },
            }}
            variant="contained"
          >
            {" "}
            Nouvel utilisateur{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TeamManagmentForm;
