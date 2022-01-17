import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../api/index";
import { styled } from "@mui/material/styles";
import { generate } from "shortid";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { Store } from "../../StoreContext";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Rightarrow from "../../assets/rightarrow.png";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const StaffLevel = ({ establishmentid }) => {
  const [dropdownValue, setdropdownValue] = useState({
    leveldropdown: "",
    rules: "",
    staffdata: "",
  });
  const [levelValue, setLevelValue] = useState({
    val: "",
    textselect: "",
  });

  const [people, setpeople] = useState([
    {
      id: generate(),
      staffLevelId: "",
      cellNumber: "",
      localData: "",
      areaAccesibleToPublic: "",
      staffLevelRuleId: "",
      publicInfo: "",
      staffInfo: "",
      textselect: "",
      total: "",
    },
  ]);
  const [toggle, setToggle] = useState(false);
  const [iconState, setIconState] = useState(false);
  const store = Store();
  useEffect(() => {
    api("get", "/api/v1/stafflevel/dropdown").then((res) => {
      setdropdownValue((pre) => {
        return {
          ...pre,
          leveldropdown: res.data,
        };
      });
    });
    if (store.activeCase === "currentcases") {
      api(
        "get",
        `/api/v1/get_establishment_stafftable/${
          establishmentid ? establishmentid : store.establishmentId
        }`
      ).then((res) => {
        setpeople(
          res.data.map((val) => {
            return {
              ...val,
              id: generate(),
            };
          })
        );
      });
    }
    api("get", "/api/v1/stafflevel_rule/dropdown").then((res) => {
      setdropdownValue((pre) => {
        return {
          ...pre,
          rules: res.data,
        };
      });
    });
  }, []);
  const containerRef = useRef(null);
  const focusPoint = useRef(null);
  const handleSubmit = () => {
    const newArr = people
      .filter((val) => val.staffLevelId !== undefined)
      .map((val) => ({
        establishmentId: establishmentid,
        areaAccesibleToPublic: val.areaAccesibleToPublic,
        cellNumber: val.cellNumber,
        localData: val.localData,
        publicInfo: parseInt(val.publicInfo),
        staffInfo: parseInt(val.staffInfo),
        staffLevelId: parseInt(val.staffLevelId),
        staffLevelRuleId: parseInt(val.staffLevelRuleId),
        tableOfStaffDetailsId: val.tableOfStaffDetailsId,
      }));
    if (store.activeCase === "newcase") {
      api("post", "/api/v1/create_establishment_stafftable", newArr)
        .then((res) => {
          toast.success("Success!");
          if (res.status === 200) {
            setIconState(true);
            setToggle(true);
            focusPoint.current.style.display = "none";
          }
        })
        .catch((err) => {
          toast.error(err?.statusText);
        });
    }
    if (store.activeCase === "currentcases") {
      api("put", "/api/v1/update_establishment_stafftable", newArr).then(
        (res) => {
          if (res.data === true) {
            toast.success("success");
          }
        }
      );
    }
  };
  const toggleSection = () => {
    setToggle(!toggle);
    toggle
      ? (focusPoint.current.style.display = "none")
      : (focusPoint.current.style.display = "block");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#3675B7",
          borderRadius: "5px",
          borderBottom: "1px solid #C5D3DB",
          margin: "12px 4px",
          padding: "10px",
          color: "#ffffff",
        }}
        onClick={toggleSection}
      >
        <Typography variant="h6">Tableau des effectifs</Typography>
        <div>{iconState ? <DoneIcon /> : null}</div>
      </Box>
      <Item
        ref={focusPoint}
        sx={{ boxShadow: "none", width: "97%", margin: "auto" }}
      >
       <Box sx={{overflow:"auto"}}> 
       <table class="table">
                            <thead>
                          <Box>
                              <tr class="row">
                                <th class="header-label"> 
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"205px"
                                }}>
                                 Niveau
                                </Box>   
                                </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"212px"
                                }}>
                                 Cellule
                                </Box>
                                </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                 Local / Espace / Type de public
                                  </Box>
                                  </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                  Surface accessible au public
                                   </Box>
                                   </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"192px"
                                }}> 
                                 Règle de calcul X
                                  </Box>
                                  </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                margin:"30px 0px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                 Public
                                  </Box>
                                  </th>
                                  <th class="header-label">
                                  <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                margin:"30px 0px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                 Personnel
                                  </Box>
                                  </th>
                                  <th>
                                  <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                margin:"30px 0px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                 Total
                                  </Box>
                                  </th>
                              </tr>
                              </Box>
                              <Box>
                                 </Box>
        {people?.map((p, i) => {
          return (
            <Box
              ref={containerRef}
              sx={{
                margin:"10px 0px",
                          padding:"0px 10px 10px 10px",
                          background: "#FFFFFF",
                          border: "1px solid #EBEFF2",
                           boxSizing:"border-box",
                           borderRadius:"5px"
              }}
            >
              <tr class="tr-inputs">
              <th>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "12px",
                }}
              >
                <select
                  defaultValue={p?.tableOfStaffDetailsId}
                  className="field-width-staff"
                  key={p.id}
                  onChange={(e) => {
                    const slcttext = e.target.selectedOptions[0];
                    const selecttext = slcttext.text;
                    if (
                      people[i - 1]?.staffLevelId === e.target.value ||
                      people[i - 1]?.staffLevelId === undefined ||
                      e.target.value === ""
                    ) {
                      setpeople((curr) =>
                        curr.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                staffLevelId: e.target.value,
                                textselect: selecttext,
                              }
                            : x
                        )
                      );
                    } else if (people[i - 1]?.staffLevelId !== e.target.value) {
                      setpeople((curr) =>
                        curr.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                staffLevelId: undefined,
                                textselect: selecttext,
                              }
                            : x
                        )
                      );

                      let pblic = parseInt(
                        people.reduce(
                          (acc, obj) =>
                            acc +
                            parseInt(
                              obj.publicInfo === undefined
                                ? parseInt(0)
                                : parseInt(obj.publicInfo)
                            ),
                          0
                        )
                      );
                      let personnel = parseInt(
                        people.reduce(
                          (acc, obj) =>
                            acc +
                            parseInt(
                              obj.staffInfo === undefined
                                ? parseInt(0)
                                : parseInt(obj.staffInfo)
                            ),
                          0
                        )
                      );
                      let total = parseInt(
                        people.reduce(
                          (acc, obj) =>
                            acc +
                            parseInt(
                              obj.total === undefined
                                ? parseInt(0)
                                : parseInt(obj.total)
                            ),
                          0
                        )
                      );
                      containerRef.current.innerHTML = `
                    
                 <div class="total"> 
               <div class="sum-block">   ${people[i - 1]?.textselect}  </div>
               <div class="sum-block">  ${isNaN(pblic) ? 0 : pblic}   </div>
               <div class="sum-block">    ${isNaN(personnel) ? 0 : personnel}  </div>
               <div class="sum-block">   ${isNaN(total) ? 0 : total}   </div>
                   </div>`;
                    }
                  }}
                >
                  <option value="">Choisissez s'il vous plaît</option>
                  {dropdownValue.leveldropdown &&
                    dropdownValue.leveldropdown?.map((item) => (
                      <option value={item.value}>{item.text}</option>
                    ))}
                </select>
              </Box>
              </th>
              <th>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "10px",
                }}
              >
               
                {
                  <input
                  className="field-width-staff"
                    defaultValue={p.cellNumber}
                    onChange={(e) => {
                      setpeople((curr) =>
                        curr.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                cellNumber: e.target.value,
                              }
                            : x
                        )
                      );
                    }}
                    type="text"
                  />
                }
              </Box>
              </th>
              {
                <th>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20%",

                    fontSize: "10px",
                  }}
                >
                 
                  <input
                   className="field-width-staff"
                    defaultValue={p?.localData}
                    onChange={(e) => {
                      setpeople((curr) =>
                        curr.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                localData: e.target.value,
                              }
                            : x
                        )
                      );
                    }}
                    type="text"
                  />
                </Box>
             </th>
            }
              {
                <th> 
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "15%",

                    fontSize: "8px",
                  }}
                >
                
                  <input
                     className="field-width-staff"
                    defaultValue={p?.areaAccesibleToPublic}
                    type="text"
                    onChange={(e) => {
                      setpeople((curr) =>
                        curr.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                areaAccesibleToPublic: e.target.value,
                              }
                            : x
                        )
                      );
                    }}
                  />
                </Box>
                </th>
              }
              {
                <th>

<Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "10%",

                    fontSize: "8px",
                  }}
                >
                
                  <select
                    defaultValue={p?.staffLevelRuleId}
                    className="field-width-staff"
                    onChange={(e) => {
                      setpeople((curr) =>
                        curr.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                staffLevelRuleId: e.target.value,
                              }
                            : x
                        )
                      );
                    }}
                  >
                    {dropdownValue.rules &&
                      dropdownValue.rules?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                  </select>
                </Box>




                </th>
               
              }
              <th>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "10%",
                  fontSize: "12px",
                }}
              >
               
                <input
                   className="field-width-staff"
                  defaultValue={p?.publicInfo}
                  onChange={(e) => {
                    setpeople((curr) =>
                      curr.map((x) =>
                        x.id === p.id
                          ? {
                              ...x,
                              publicInfo: e.target.value,
                            }
                          : x
                      )
                    );
                  }}
                  type="number"
                />
              </Box>
              </th>
              <th> 
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "10%",
                  fontSize: "12px",
                }}
              >
               
                <input
                className="field-width-staff"
                 defaultValue={p?.staffInfo}
                  onChange={(e) => {
                    setpeople((curr) =>
                      curr.map((x) =>
                        x.id === p.id
                          ? {
                              ...x,
                              staffInfo: e.target.value,
                              total:
                                parseInt(x.publicInfo) +
                                parseInt(e.target.value),
                            }
                          : x
                      )
                    );
                  }}
                  type="number"
                />
              </Box>{" "}
              </th>
              <th> 
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "10%",
                  fontSize: "12px",
                }}
              >
                <input
                   className="field-width-staff"
                  value={parseInt(p?.publicInfo) + parseInt(p.staffInfo)}
                  type="number"
                />
              </Box>
              </th>
              </tr>
            </Box>
         
          );
        })}
          <Box sx={{margin:"10px 0px"}}>
                              </Box>
                              
                      </thead>
                          </table>
        </Box>
        <Box sx={{ textAlign: "start", padding: "5px" }}>
          <AddIcon
            onClick={() => {
              setpeople((curr) => [
                ...curr,
                {
                  id: generate(),
                  staffLevelId: "",
                },
              ]);
            }}
          />
        </Box>
        <Box sx={{ textAlign: "right",padding:"10px" }}>
          <Button
            type="submit"
            onClick={handleSubmit}
            endIcon={<img className="icon-validate" src={Rightarrow} />}
            sx={{
              background: "#3675B7",
              ":hover": { background: "#3675B7" },
            }}
            variant="contained"
          >
            Valider
          </Button>
        </Box>
      </Item>
    </>
  );
};

export default StaffLevel;
