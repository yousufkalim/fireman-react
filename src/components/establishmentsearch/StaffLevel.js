import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
// import useState from 'react-usestateref'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../api/index";
import { styled } from "@mui/material/styles";
import { generate } from "shortid";
import { toast } from "react-toastify";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import don from "../../assets/donne.svg";
import DoneIcon from "@mui/icons-material/Done";
import Rightarrow from "../../assets/rightarrow.png";
import { useTranslation, Trans } from "react-i18next";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const StaffLevel = ({
  establishmentid,
  setToggler,
  Toggler,
  setIcon,
  Icon,
  casefileId,
  buttonEnability,
  setButtonEnability,
}) => {
  const { t, i18n } = useTranslation();
  const [dropdownValue, setdropdownValue] = useState({
    leveldropdown: "",
    rules: "",
    staffdata: "",
  });
  const [state, setstate] = useState(false);
  var [txt, setText] = useState(0);
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
  const store = Store();
  const updatestore = UpdateStore();
  useEffect(() => {
    api("get", "/api/v1/stafflevel/dropdown").then((res) => {
      setdropdownValue((pre) => {
        return {
          ...pre,
          leveldropdown: res.data,
        };
      });
    });
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
        tableOfStaffDetailsId: val.tableOfStaffDetailsId
          ? val.tableOfStaffDetailsId
          : 0,
        caseFileId: casefileId ? casefileId : 0,
      }));
    if (store.activeCase === "newcase") {
      let toastShown = false;
      api(
        "put",
        "/api/v1/update_establishment_stafftable",
        newArr.filter((val) => val.areaAccesibleToPublic != undefined)
      )
        .then((res) => {
          updatestore({
            validatedSections: {...store?.validatedSections,
            stafflevel:true
            }
          })
          setButtonEnability((pre) => {
            return {
              ...pre,
              Rankingbutton: false,
            };
          });
          if (!toastShown) {
            toast.success(t("Successfull"));
            toastShown = true;
          }
          setToggler((pre) => {
            return {
              ...pre,
              togglerstafflevel: false,
            };
          });
          setIcon((pre) => {
            return {
              ...pre,
              iconstafflevel: true,
            };
          });
        })
        .catch((err) => {
          toast.error(err?.statusText);
        });
    }
    if (store.activeCase === "currentcases") {
      api("put", "/api/v1/update_establishment_stafftable", newArr).then(
        (res) => {
          if (res.data === true) {
            {
              toast.success(t("Successfull"));
            }
            setToggler((pre) => {
              return {
                ...pre,
                togglerstafflevel: false,
              };
            });
            setIcon((pre) => {
              return {
                ...pre,
                iconstafflevel: true,
              };
            });
          }
        }
      );
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              togglerstafflevel: !Toggler.togglerstafflevel,
            };
          });
        }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "0.6px solid #C5D3DB",
          padding: "8px 10px",
          backgroundColor: "#3675B7",
          borderRadius: "5px",
          color: "#ffffff",
          width: "96%",
          margin: "auto",
        }}
      >
        <Typography variant="h6">{t("Staff table")}</Typography>
        {Icon.iconstafflevel || store?.validatedSections?.stafflevel? <img src={don} /> : null}
      </Box> 
      <Accordion
        sx={{
          margin: "10px auto !important",
          borderRadius: "10px",
          width: "97.5%",
        }}
        expanded={Toggler.togglerstafflevel ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item
            className="scroll-styling"
            ref={focusPoint}
            sx={{
              boxShadow: "none",
              width: "97%",
              maxHeight: "500px",
              overflow: "scroll",
              margin: "auto",
            }}
          >
            <Box className="scroll-styling" sx={{ overflow: "scroll" }}>
              <table class="table">
                <thead>
                  <Box>
                    <tr class="row">
                      <th class="header-label">
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "205px",
                          }}
                        >
                          {t("Level")}
                        </Box>
                      </th>
                      <th class="header-label">
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "140px",
                          }}
                        >
                          {t("Cell")}
                        </Box>
                      </th>
                      <th class="header-label">
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "224px",
                          }}
                        >
                          {t("Local / Space / Type of audience")}
                        </Box>
                      </th>
                      <th class="header-label">
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "215px",
                          }}
                        >
                          {t("Surface accessible to the public")}
                        </Box>
                      </th>
                      <th class="header-label">
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "192px",
                          }}
                        >
                          {t("Calculation rule X")}
                        </Box>
                      </th>
                      <th class="header-label">
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            margin: "30px 0px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "100px",
                          }}
                        >
                          Public
                        </Box>
                      </th>
                      <th class="header-label">
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            margin: "30px 0px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "110px",
                          }}
                        >
                          {t("Staff")}
                        </Box>
                      </th>
                      <th>
                        <Box
                          sx={{
                            borderRight: "2px solid #C5D3DB",
                            height: "12px",
                            margin: "30px 0px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0px 5px",
                            width: "100px",
                          }}
                        >
                          Total
                        </Box>
                      </th>
                    </tr>
                  </Box>
                  <Box></Box>
                  {people &&
                    people?.map((p, i) => {
                      return (
                        <Box
                          id="row"
                          ref={containerRef}
                          sx={{
                            margin: "10px 0px",
                            padding: "0px 10px 10px 10px",
                            background: "#FFFFFF",
                            border: "1px solid #EBEFF2",
                            boxSizing: "border-box",
                            borderRadius: "5px",
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
                                  defaultValue={people && p?.staffLevelId}
                                  className="field-width-staff"
                                  key={p.id}
                                  onChange={(e) => {
                                    const a = people
                                      .map((val) => {
                                        return {
                                          id: val.staffLevelId,
                                        };
                                      })
                                      .filter((val) => val.id != "")
                                      .map((value) => {
                                        return value.id;
                                      })
                                      .at(-1);
                                    const b = dropdownValue.leveldropdown
                                      .filter((val) => val.value == a)
                                      .map((val) => val.text);
                                    const slcttext =
                                      e.target.selectedOptions[0];
                                    const selecttext = slcttext.text;
                                    if (
                                      selecttext != "Choisissez s'il vous plaît"
                                    ) {
                                      setText(selecttext);
                                    }
                                    if (
                                      people[i - 1]?.staffLevelId ===
                                        parseInt(e.target.value) ||
                                      people[i - 1]?.staffLevelId ===
                                        undefined ||
                                      people[i - 1]?.staffLevelId === "" ||
                                      parseInt(e.target.value) === "" ||
                                      e.target.value === ""
                                    ) {
                                      setpeople((curr) =>
                                        curr.map((x) =>
                                          x.id === p.id
                                            ? {
                                                ...x,
                                                staffLevelId: parseInt(
                                                  e.target.value
                                                ),
                                                textselect: selecttext,
                                              }
                                            : x
                                        )
                                      );
                                    } else if (
                                      people[i - 1]?.staffLevelId !==
                                      parseInt(e.target.value)
                                    ) {
                                      setpeople((curr) =>
                                        curr.map((x) =>
                                          x.id === p.id
                                            ? {
                                                ...x,
                                                staffLevelId: undefined || "",
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
                                              obj.publicInfo === undefined ||
                                                obj.publicInfo === ""
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
                                              obj.staffInfo === undefined ||
                                                obj.staffInfo === ""
                                                ? parseInt(0)
                                                : parseInt(obj.staffInfo)
                                            ),
                                          0
                                        )
                                      );
                                      let total = pblic + personnel;
                                      setstate(true);
                                      containerRef.current.innerHTML = `
                 <div class="total"> 
               <div class="sum-block">   ${
                 people.length != 0
                   ? b[0] === undefined
                     ? txt
                     : b[0]
                   : people[i - 1]?.textselect
               }  </div>
               <div class="sum-block">  ${isNaN(pblic) ? 0 : pblic}   </div>
               <div class="sum-block">    ${
                 isNaN(personnel) ? 0 : personnel
               }  </div>
               <div class="sum-block">   ${isNaN(total) ? 0 : total}   </div>
                   </div>`;
                                    }
                                  }}
                                >
                                  <option value="">{t("Please choose")}</option>
                                  {dropdownValue.leveldropdown &&
                                    dropdownValue.leveldropdown?.map((item) => (
                                      <option value={item.value}>
                                        {item.text}
                                      </option>
                                    ))}
                                </select>
                              </Box>
                            </th>
                            <th>
                              <Box
                                className="input-container"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  fontSize: "10px",
                                }}
                              >
                                {
                                  <input
                                    className="field-width-staff field-width-cellnum"
                                    type="number"
                                    defaultValue={Math.abs(p.cellNumber)}
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
                                  />
                                }
                              </Box>
                            </th>
                            {
                              <th>
                                <Box
                                  className="input-container"
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
                                  className="input-container"
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
                                                areaAccesibleToPublic:
                                                  e.target.value,
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
                                  className="input-container"
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "10%",

                                    fontSize: "8px",
                                  }}
                                >
                                  <select
                                    defaultValue={people && p?.staffLevelRuleId}
                                    className="field-width-staff"
                                    onChange={(e) => {
                                      setpeople((curr) =>
                                        curr.map((x) =>
                                          x.id === p.id
                                            ? {
                                                ...x,
                                                staffLevelRuleId:
                                                  e.target.value,
                                              }
                                            : x
                                        )
                                      );
                                    }}
                                  >
                                    {dropdownValue.rules &&
                                      dropdownValue.rules?.map((item) => (
                                        <option value={item.value}>
                                          {item.text}
                                        </option>
                                      ))}
                                  </select>
                                </Box>
                              </th>
                            }
                            <th>
                              <Box
                                className="input-container"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "10%",
                                  fontSize: "12px",
                                }}
                              >
                                <input
                                  className="field-width-staff staff-feild-width"
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
                                className="input-container"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "10%",
                                  fontSize: "12px",
                                }}
                              >
                                <input
                                  className="field-width-staff staff-feild-width"
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
                                className="input-container"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "10%",
                                  fontSize: "12px",
                                }}
                              >
                                <input
                                  className="field-width-staff staff-feild-width"
                                  value={Math.abs(
                                    parseInt(p?.publicInfo) +
                                      parseInt(p.staffInfo)
                                  )}
                                  type="number"
                                />
                              </Box>
                            </th>
                          </tr>
                        </Box>
                      );
                    })}
                  <Box sx={{ margin: "10px 0px" }}></Box>
                </thead>
              </table>
            </Box>
            <Box sx={{ textAlign: "start", padding: "5px" }}>
              <AddIcon
                sx={{ color: "#3675B7" }}
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
            <Box sx={{ textAlign: "right", padding: "10px" }}>
              <Button
                //disabled={!store?.validatedSections?.establishmentlevelvalidated? true:false}
                disabled={store.activeCase === "newcase"?!store?.validatedSections?.establishmentlevelvalidated?true:store.activeCase === "currentcase"?false:false:false}
                type="submit"
                onClick={handleSubmit}
                endIcon={<img className="icon-validate" src={Rightarrow} />}
                sx={{
                  background: "#3675B7",
                  ":hover": { background: "#3675B7" },
                }}
                variant="contained"
              >
                {t("VALIDATE")}
              </Button>
            </Box>
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default StaffLevel;
