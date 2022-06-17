import React, { useState, useEffect, useRef } from "react";
import api from "../../api/index";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Store } from "../../StoreContext";
import { useTranslation } from "react-i18next";
const TeamManagmentForm = ({
  importedData,
  prefilledData,
  creation,
  setTeamFormDisplay,
  getGridData,
}) => {
  let [sdis, setSdis] = useState([]);
  let [groups, setGroups] = useState([]);
  let [services, setServices] = useState([]);
  let [roles, setroles] = useState([]);
  let [team, setTeam] = useState({});
  let [ress, setRess] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const inputRefnew = useRef(null);
  const inputRefemail = useRef(null);
  useEffect(() => {
    if (importedData) {
      setIsDisabled(true);
    }
    setTeam(() => {
      return {
        email: creation ? "" : importedData?.email,
        cellNo: creation ? "" : importedData?.cellNo,
        postalAddress: creation ? "" : importedData?.postalAddress,
        roleId: creation ? "" : importedData?.roleId,
        groupId: creation ? "" : importedData?.groupId,
        serviceId: importedData?.serviceId
          ? importedData?.serviceId
          : prefilledData?.data?.serviceId,
        empFirstName: creation ? "" : importedData?.empFirstName,
        empLastName: creation ? "" : importedData?.empLastName,
        password: creation ? "" : importedData?.password,
        sdisId: importedData?.sdisId
          ? importedData?.sdisId
          : prefilledData?.data?.sdisId,
        groupId: importedData?.groupId
          ? importedData?.groupId
          : prefilledData?.data?.groupId,
        employeeId: creation ? "" : importedData?.employeeId,
      };
    });
  }, [importedData || prefilledData]);

  useEffect(() => {
    getSdis();
  }, []);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    let data = {
      ...team,
      employeeId: team.employeeId ? team.employeeId : 0,
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
      team.cellNo &&
      team.empFirstName &&
      team.empLastName
    ) {
      api("post", "/api/v1/register", data).then((res) => {
        if (res?.data.success == true) {
          setTeamFormDisplay(true);
          toast.success("Employé ajouté avec succès");
          getGridData();
        }
        if (res?.data?.success == false) {
          toast.error(res?.data?.errorMessage[0]);
        }
      });
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
        postalAddress: team?.postalAddress,
      };
      api("put", "/api/v1/Users/update", obj).then((res) => {
        setRess(res);
        if (res.status == 200) {
          if (res.data.success == true) {
            getGridData();
            setTeamFormDisplay(true);
            toast.success(
              "Les données des employés ont été mises à jour avec succès"
            );
          }
        }
      });
    }
  };
  const store = Store();
  return (
    <>
      <div className="team_management">
        <form type="submit" onSubmit={handleSubmit}>
          <div className="team_management_row">
            <div className="input_cont">
              <label>SDIS</label>
              <select
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("merci de remplir ce champ")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                type="select"
                disabled={
                  store?.role == "2" ||
                  (store?.role == "3" && prefilledData.length !== 0)
                }
                value={team?.sdisId}
                className="dropdown-team-managment-form"
                onChange={(e) => {
                  setTeam({ ...team, ["sdisId"]: e.target.value });
                }}
              >
                {/* <option selected disabled>
                Select SDIS
              </option> */}
                <option value="">{t("Please choose")}</option>
                {sdis &&
                  sdis.map((data) => {
                    return <option value={data.value}>{data.text}</option>;
                  })}
              </select>
            </div>

            <div className="input_cont">
              <label>Group</label>
              <select
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("merci de remplir ce champ")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                className="dropdown-team-managment-form"
                disabled={
                  store?.role == "2" ||
                  (store?.role == "3" && prefilledData.length !== 0)
                }
                value={
                  team?.groupId ? team.groupId : prefilledData?.data?.groupId
                }
                onChange={(e) => {
                  setTeam({ ...team, ["groupId"]: e.target.value });
                }}
              >
                {/* <option selected disabled>
                Select Group
              </option> */}
                <option value="">{t("Please choose")}</option>
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
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("merci de remplir ce champ")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                disabled={store?.role == "3" && prefilledData.length !== 0}
                value={
                  team?.serviceId
                    ? team?.serviceId
                    : prefilledData?.data?.serviceId
                }
                onChange={(e) => {
                  setTeam({ ...team, ["serviceId"]: e.target.value });
                }}
                className="dropdown-team-managment-form"
              >
                {/* <option selected disabled>
                Select Service
              </option> */}
                <option value="">{t("Please choose")}</option>
                {services &&
                  services.map((data) => {
                    return <option value={data.value}>{data.text}</option>;
                  })}
              </select>
            </div>
            <div className="input_cont">
              <label>Employee Designation</label>
              <select
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("merci de remplir ce champ")
                }
                onInput={(e) => e.target.setCustomValidity("")}
             
                className="dropdown-team-managment-form"
                onChange={(e) => {
                  setTeam({ ...team, ["roleId"]: e.target.value });
                }}
                value={team.roleId}
              >
                {/* <option selected disabled>
                Select Employee Designation
              </option> */}
                <option value="">{t("Please choose")}</option>
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
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("merci de remplir ce champ")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                type="search"
                onChange={(e) => {
                  setTeam({ ...team, ["empFirstName"]: e.target.value });
                }}
                value={team.empFirstName}
                placeholder="Enter First Name"
              />
            </div>
            <div className="input_cont">
              <label>Last Name</label>
              <input
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("merci de remplir ce champ")
                }
                onInput={(e) => e.target.setCustomValidity("")}
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
              style={{width:"95%"}}
              required
               ref={inputRefemail}
                autoComplete="off"
                type="email"
                disabled={isDisabled}
                onChange={(e) => {
                  setTeam({ ...team, ["email"]: e.target.value });
                  if(inputRefemail.current.validity.patternMismatch){
                    e.target.setCustomValidity(`Format d'email invalide`)
                  }
                  if(!inputRefemail.current.validity.patternMismatch){
                    e.target.setCustomValidity('')
                  }
                  if(inputRefemail.current.validity.valueMissing){
                    e.target.setCustomValidity(`'Email (requis'`)
                  }
                }}
                onInvalid={e => e.target.setCustomValidity(`Format d'email invalide`)}
                onInput={e => e.target.setCustomValidity('')}
                pattern="(.+)@(.+){2,}\.(.+){2,}"
                value={team.email}
                placeholder="Enter Email"
                name="emailone"
              />
            </div>
            <div className="input_cont">
              <label>Cell No</label>
              <input
                ref={inputRef}
                type="tel"
                minlength="10"
                maxlength="10"
                pattern="^0{1}[\d]{9}$"
                onInvalid={e => e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère, doit commencer par 0')}
                onInput={(e) => e.target.setCustomValidity("")}
               required
                onChange={(e) => {
                  setTeam({ ...team, ["cellNo"]: e.target.value });
                  if(inputRef.current.validity.patternMismatch){
                    e.target.setCustomValidity('Le numéro doit contenir 10 chiffres et aucun caractère, doit commencer par 0')
                  }
                  if(!inputRef.current.validity.patternMismatch){
                    e.target.setCustomValidity('')
                  }
                  if(inputRef.current.validity.valueMissing){
                    e.target.setCustomValidity(`'Numéro de téléphone requis'`)
                  }
                }}
                value={team.cellNo}
                placeholder="Enter Cell No"
                name="cellno"
              />
            </div>
            <div style={{ padding: "2% 0%" }} className="input_cont">
              <label>Address</label>
              <input
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("merci de remplir ce champ")
                }
                onInput={e => e.target.setCustomValidity('')}
                type="search"
                value={team?.postalAddress}
                onChange={(e) => {
                  setTeam({ ...team, ["postalAddress"]: e.target.value });
                }}
                placeholder="Enter Address"
              />
            </div>
            {
              <div style={{ padding: "2% 0%" }} className="input_cont">
                <label>Password</label>
                <input
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity("merci de remplir ce champ")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  autoComplete="off"
                  style={{ width: "95%" }}
                  type="password"
                  value={team.password}
                  onChange={(e) => {
                    setTeam({ ...team, ["password"]: e.target.value });
                  }}
                  placeholder="Enter Password"
                />
              </div>
            }
          </div>

          {/* {(() => {
            if (!importedData) {
              return <div className="field_seprator"></div>;
            }
          })()} */}

          {/* {(() => {
            if (!importedData) {
              return (
                <div className="team_management_row">
                  <div style={{ visibility: "hidden" }} className="input_cont">
                    <label>Cell No</label>
                    <input
                    ref={inputRefnew}
                     
                      value={team.cellNo}
                      onChange={(e) => {
                        setTeam({ ...team, ["cellNo"]: e.target.value });
                       
                      }}
                    />
                  </div>
                </div>
              );
            }
          })()} */}
          <div className="field_seprator"></div>
          <div style={{ textAlign: "right", padding: "10px" }}>
            <Button
             type="submit"
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
        </form>
      </div>
    </>
  );
};

export default TeamManagmentForm;
