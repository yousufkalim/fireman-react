import React, { useState, useEffect } from "react";
import api from "../../api/index";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Store } from "../../StoreContext";
const TeamManagmentForm = ({ importedData, prefilledData }) => {
  let [sdis, setSdis] = useState([]);
  let [groups, setGroups] = useState([]);
  let [services, setServices] = useState([]);
  let [roles, setroles] = useState([]);
  let [team, setTeam] = useState({});
  let [ress, setRess] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    console.log(importedData);
    console.log("WWWWWWWWWWWWWW employee id", importedData?.employeeId);
    console.log(prefilledData);
    console.log(importedData);

    if (importedData) {
      setIsDisabled(true);
    }

    setTeam(() => {
      return {
        email: importedData?.email,
        cellNo: importedData?.cellNo,
        password: "",
        roleId: importedData?.roleId,
        groupId: importedData?.groupId,
        serviceId: importedData?.serviceId
          ? importedData?.serviceId
          : prefilledData?.data?.serviceId,
        empFirstName: importedData?.empFirstName,
        empLastName: importedData?.empLastName,
        password: importedData?.password,
        sdisId: importedData?.sdisId
          ? importedData?.sdisId
          : prefilledData?.data?.sdisId,
        groupId: importedData?.groupId
          ? importedData?.groupId
          : prefilledData?.data?.groupId,
        employeeId: importedData?.employeeId,
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
  console.log("ROLESSSS", roles);

  //   const getGroups = (e) => {
  //     alert("fdgh");
  //     api("get", `/api/v1/group/dropdown/${e.target.value}`).then((res) => {
  //       if (res.status == 200) {
  //         setGroups(res.data);
  //       }
  //     });
  //   };

  //   const getServices = (e) => {
  //     setTeam({ ...team, ["groupId"]: e.target.value });
  //     api("get", `/api/v1/services/dropdown/${e.target.value}`).then((res) => {
  //       if (res.status == 200) {
  //         setServices(res.data);
  //       }
  //     });
  //   };

  //   console.log("SERVICESSS", services);
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
    if (
      !team.employeeId &&
      team.email &&
      team.password &&
      team.serviceId &&
      team.groupId &&
      team.roleId &&
      team.cellNo &&
      team.empFirstName &&
      team.empLastName
    ) {
      {
        console.log(data);
        api("post", "/api/v1/register", data).then((res) => {
          console.log("res register api", res);

          if (res.status == 200) {
            if (res.data.success == true) {
              toast.success("Employé ajouté avec succès");
            }
          }
          console.log("res", res);
        });
      }
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
        //code: "string",
        empFirstName: team.empFirstName,
        empLastName: team.empLastName,
        phoneNo: team.cellNo,
        email: team.email,
        cellNo: team.cellNo,
        password: team.password,
        emailConfirmed: true,
        isActive: true,
        isValidated: true,
        // createdAt: "2022-03-14T09:22:22.429Z",
        // updatedAt: "2022-03-14T09:22:22.429Z",
        // deletedAt: "2022-03-14T09:22:22.429Z",
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
            toast.success(
              "Les données des employés ont été mises à jour avec succès"
            );
          }
        }
        console.log("updated res", res);
      });
    }
    console.log("Team", team);
    console.log("8888888888888888888888888888888", ress);
  };

  const UserRole = localStorage.getItem("roleSerial");
  console.log("USER ROLE being saved in local storage", UserRole);

  console.log("IMPORTED DATA on double click - TMform", importedData);
  console.log("prefilled DATA on double click - TMform", prefilledData);
  console.log(team);
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
            {console.log("GROUP ID", prefilledData?.data?.groupId)}

            <label>Group</label>
            {console.log("GROUP ID 2", team.groupId)}
            {/*  disabled={store?.role == "2" || store?.role == "3"} */}
            {console.log("GROUPS", groups)}
            <select
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
              {console.log("GROUPS", groups)}
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
            {console.log("HHHHHHHHHHHHH", services)}
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
              onChange={(e) => {
                setTeam({ ...team, ["cellNo"]: e.target.value });
              }}
              value={team.cellNo}
              placeholder="Enter Cell No"
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
                <div className="input_cont">
                  <label>Password</label>
                  <input
                    value={team.password}
                    onChange={(e) => {
                      setTeam({ ...team, ["password"]: e.target.value });
                    }}
                    placeholder="Enter Password"
                  />
                </div>
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

        {/* <div>
                <input required></input>
            </div> */}
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
