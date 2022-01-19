import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import api from "../../api/index";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Description from "./Description";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Store } from "../../StoreContext";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Field, Form, FieldArray } from "formik";
import DoneIcon from "@mui/icons-material/Done";
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentLevel = ({ Values, description }) => {
  const [dropdownValue, setdropdownValue] = useState({
    leveldropdown: "",
  });
  const [toggle, setToggle] = useState(false);
  const [columnState, setColumnState] = useState({
    cellname:true,
    cellnumber:true
  })
  const [iconState, setIconState] = useState(false);
  const focusPoint = useRef(null);
  useEffect(() => {
    api("get", "/api/v1/level/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          leveldropdown: res,
        };
      });
    });
  }, []);
  const store = Store();
  const onSubmit = (values, data) => {
    console.log(data);
    const newarr = values.repeatable.map((object) => ({
      ...object,
    }));
    const newdescriptions = {
      lessEightMeter: data.lessEightMeter,
      moreEightMeter: data.moreEightMeter,
      siteDescription: data.site,
      description: data.establishmentdescription,
    };
    const obj = {
      establishmentId: store.establishmentId,
      levels: newarr,
      descriptions: newdescriptions,
    };
    if (store.activeCase === "newcase") {
      api("post", "/api/v1/create_description_data", obj).then((res) => {
        toast.success("Success!");
        if ((res.status = 200)) {
          setIconState(true);
          setToggle(true);
          focusPoint.current.style.display = "none";
        }
      });
    }
    if (store.activeCase === "currentcases") {
      console.log(">>>>>>", obj);
      api("put", "/api/v1/update_description_data", obj).then((res) => {
        console.log("update:", res);
      });
    }
  };
  const toggleSection = () => {
    setToggle(!toggle);
    toggle
      ? (focusPoint.current.style.display = "none")
      : (focusPoint.current.style.display = "block");
  };
  const handleClose =(column)=>{
    setColumnState((pre)=>{
      return{
         ...pre,
         [column]:false
      }
    })
  }

  console.log(">>>>>",Values);
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
        <Typography variant="h6">Descriptif</Typography>
        <div>{iconState ? <DoneIcon /> : null}</div>
      </Box>
      <Item
        ref={focusPoint}
        sx={{ boxShadow: "none", width: "97%", margin: "auto" }}
      >
        {store.activeCase === "newcase" ? (
          <Formik
            initialValues={{ repeatable: [{}] }}
            enableReinitialize
            render={({ values, setFieldValue }) => (
              <Form>
                <FieldArray
                  name="repeatable"
                  enableReinitialize
                  render={(arrayHelpers) => (
                    <>
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
                                {
                                  columnState.cellnumber?(
                                    <th class="header-label">
                                    <Box sx={{
                                      borderRight: "2px solid #C5D3DB", 
                                    height:"12px",
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    padding:"0px 5px",
                                    width:"212px"
                                    }}>
                                     <span>Numéro cellule</span> 
                                    <CloseIcon
                                    onClick={()=>handleClose("cellnumber")}
                                    sx={{width: "0.5em"}}
                                    />
                                    </Box>
                                    </th>
                                  ):null
                                }
                                {
                                 columnState.cellname?(
                                  <th class="header-label">
                                <Box
                                
                                sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-between",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                <span> Nom cellule</span> 
                                <CloseIcon
                                onClick={()=>handleClose("cellname")}
                                sx={{width: "0.5em"}}
                                />
                                  </Box>
                                  </th>
                                 ):null 
                                }
                               

                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                  Local
                                   </Box>
                                   </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"180px"
                                }}> 
                                 Non accessible au public 
                                  </Box>
                                  </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"8px",
                                margin:"30px 0px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"120px"
                                }}> 
                                 Local à risques 
                                  </Box>
                                  </th>
                                  <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"310px"
                                }}> 
                                 Commentaires
                                  </Box>
                                  </th>
                              </tr>
                              </Box>
                              <Box>
                                 </Box>
                      {values?.repeatable?.map((row, i) => (
                        <Box sx={{
                          margin:"10px 0px",
                          padding:"0px 10px 10px 10px",
                          background: "#FFFFFF",
                          border: "1px solid #EBEFF2",
                           boxSizing:"border-box",
                           borderRadius:"5px"
                        }}> 
                         <tr class="tr-inputs"> 
                         <th>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                          >
                            <Field
                             className="field-width-staff"
                              as="select"
                              name={`repeatable.${i}.levelId`}
                            >
                              <option value="">
                                Choisissez s'il vous plaît
                              </option>
                              {dropdownValue?.leveldropdown?.data?.map(
                                (item) => (
                                  <option value={item.value}>
                                    {item.text}
                                  </option>
                                )
                              )}
                            </Field>
                            <span
                              onClick={() => {
                                arrayHelpers.push({});
                                setFieldValue(
                                  `repeatable.${i + 1}.levelId`,
                                  values.repeatable[i].levelId
                                );
                              }}
                            >
                              {" "}
                              +
                            </span>
                          </Box>
                          </th>
                         {  
                         columnState.cellnumber?(
                          <th 
                          >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                           
                          >
                            <Field
                             className="field-width-staff"
                              type="number"
                              name={`repeatable.${i}.cellNumber`}
                              value={row.cellNumber}
                            />
                          </Box>
                          </th>
                         ):null
                            }
                            {
                              columnState.cellname?(
                                <th
                                >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    fontSize: "12px",
                                  }}
                                >
                                  <Field
                                  className="field-width-staff"
                                    name={`repeatable.${i}.cellName`}
                                  />
                                  <span
                                    onClick={() => {
                                      arrayHelpers.push({});
                                      setFieldValue(
                                        `repeatable.${i + 1}.levelId`,
                                        values.repeatable[i].levelId
                                      );
                                      setFieldValue(
                                        `repeatable.${i + 1}.cellNumber`,
                                        values.repeatable[i].cellNumber
                                      );
                                      setFieldValue(
                                        `repeatable.${i + 1}.cellName`,
                                        values.repeatable[i].cellName
                                      );
                                    }}
                                  >
                                    +
                                  </span>
                                </Box>
                                </th>
                              ):null
                            }
                          
                          <th>                        
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                          >
                            <Field
                            className="field-width-staff"
                              name={`repeatable.${i}.details`}
                            />
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
                            <Box
                              sx={{ textAlign: "start", paddingTop: "10px" }}
                            >
                              <Field
                              className="checkbox-width-establishment-level"
                                type="checkbox"
                                name={`repeatable.${i}.isPublic`}
                              />
                            </Box>
                          </Box>
                          </th>
                          <th> 
                          <Box
                            sx={{
                              display: "flex",
                    
                              fontSize: "12px",
                            }}
                          >
                            <Box
                              sx={{ textAlign: "start", paddingTop: "8px" }}
                            >
                              <Field
                               className="checkbox-width-establishment-level"
                                type="checkbox"
                                name={`repeatable.${i}.isRisk`}
                              />
                            </Box>
                          </Box>
                          </th>
                          <th> 
                          <Box
                            sx={{
                              display: "flex",
                    
                              fontSize: "12px",
                            }}
                          >
                          

                            <Field
                               className="field-width"
                              style={{ padding: "10px" }}
                              name={`repeatable.${i}.comments`}
                            />
                          </Box>
                          </th>
                          </tr>
                        </Box>
                      ))}
                      <Box sx={{ textAlign: "start", padding: "5px" }}>
                        <AddIcon onClick={() => arrayHelpers.push({})} />
                      </Box>
                      </thead>
                          </table>
                          </Box>
                    </>
                  )}
                />
                <Description onSubmit={onSubmit} values={values} />
              </Form>
            )}
          />
        ) : null}

        {store.activeCase === "currentcases" ? (
          <Formik
            initialValues={{ repeatable: Values ? Values : "loading..." }}
            enableReinitialize
            render={({ values, setFieldValue }) => (
              <Form>
                <FieldArray
                  name="repeatable"
                  enableReinitialize
                  render={(arrayHelpers) => (
                    <>
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
                                {
                                 columnState.cellnumber?(
                                  <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"212px"
                                }}>
                                   <span>Numéro cellule</span> 
                                    <CloseIcon
                                    onClick={()=>handleClose("cellnumber")}
                                    sx={{width: "0.5em"}}
                                    />
                                </Box>
                                </th>
                                 ) :null
                                }
                               {
                                 columnState.cellname?(
                                  <th class="header-label">
                                  <Box sx={{
                                    borderRight: "2px solid #C5D3DB", 
                                  height:"12px",
                                  display:"flex",
                                  justifyContent:"space-between",
                                  alignItems:"center",
                                  padding:"0px 5px",
                                  width:"215px"
                                  }}> 
                                 <span> Nom cellule</span> 
                                <CloseIcon
                                onClick={()=>handleClose("cellname")}
                                sx={{width: "0.5em"}}
                                />
                                    </Box>
                                    </th>
                                 ):null
                               }
                               


                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"215px"
                                }}> 
                                  Local
                                   </Box>
                                   </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"180px"
                                }}> 
                                 Non accessible au public 
                                  </Box>
                                  </th>
                                <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"8px",
                                margin:"30px 0px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"120px"
                                }}> 
                                 Local à risques 
                                  </Box>
                                  </th>
                                  <th class="header-label">
                                <Box sx={{
                                  borderRight: "2px solid #C5D3DB", 
                                height:"12px",
                                display:"flex",
                                alignItems:"center",
                                padding:"0px 5px",
                                width:"310px"
                                }}> 
                                 Commentaires
                                  </Box>
                                  </th>
                              </tr>
                              </Box>
                              <Box>
                                 </Box>
                      {values?.repeatable?.map((row, i) => (
                         <Box sx={{
                          margin:"10px 0px",
                          padding:"0px 10px 10px 10px",
                          background: "#FFFFFF",
                          border: "1px solid #EBEFF2",
                           boxSizing:"border-box",
                           borderRadius:"5px"
                        }}> 
                         <tr class="tr-inputs">
                         <th> 
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                          >
                            <Field
                             className="field-width-staff"
                              as="select"
                              style={{ padding: "8px" }}
                              name={`repeatable.${i}.levelId`}
                            >
                              <option value="">
                                Choisissez s'il vous plaît
                              </option>
                              {dropdownValue?.leveldropdown?.data?.map(
                                (item) => (
                                  <option value={item.value}>
                                    {item.text}
                                  </option>
                                )
                              )}
                            </Field>
                            <span
                              onClick={() => {
                                arrayHelpers.push({});
                                setFieldValue(
                                  `repeatable.${i + 1}.levelId`,
                                  values.repeatable[i].levelId
                                );
                              }}
                            >
                              {" "}
                              +
                            </span>
                          </Box>
                          </th>
                          {
                            columnState.cellnumber?(
                              <th>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                          >
                            <Field
                             className="field-width-staff"
                              type="number"
                              name={`repeatable.${i}.cellNumber`}
                              style={{ padding: "10px" }}
                              value={row.cellNumber}
                            />
                          </Box>
                          </th>
                            ):null
                          }
                         {
                          columnState.cellname?(
                            <th> 
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                fontSize: "12px",
                              }}
                            >
                              <Field
                               className="field-width-staff"
                                name={`repeatable.${i}.cellName`}
                                style={{ padding: "10px" }}
                              />
                              <span
                                onClick={() => {
                                  arrayHelpers.push({});
                                  setFieldValue(
                                    `repeatable.${i + 1}.levelId`,
                                    values.repeatable[i].levelId
                                  );
                                  setFieldValue(
                                    `repeatable.${i + 1}.cellNumber`,
                                    values.repeatable[i].cellNumber
                                  );
                                  setFieldValue(
                                    `repeatable.${i + 1}.cellName`,
                                    values.repeatable[i].cellName
                                  );
                                }}
                              >
                                +
                              </span>
                            </Box>
                            </th>
                          ) :null
                         }
                        

                          <th> 
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                          >
                            <Field
                             className="field-width-staff"
                              name={`repeatable.${i}.details`}
                              style={{ padding: "10px" }}
                            />
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
                            <Box
                              sx={{ textAlign: "center", paddingTop: "10px" }}
                            >
                              <Field
                               className="checkbox-width-establishment-level"
                                type="checkbox"
                                name={`repeatable.${i}.isPublic`}
                              />
                            </Box>
                          </Box>
                          </th>
                          <th> 
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                          >
                            <Box
                              sx={{ textAlign: "center", paddingTop: "8px" }}
                            >
                              <Field
                              className="checkbox-width-establishment-level"
                                type="checkbox"
                                name={`repeatable.${i}.isRisk`}
                              />
                            </Box>
                          </Box>
                          </th>
                          <th> 
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              fontSize: "12px",
                            }}
                          >
                            <Field
                             className="field-width-staff"
                              name={`repeatable.${i}.comments`}
                            />
                          </Box>
                          </th>
                          </tr>
                        </Box>
                      ))}
                      <Box sx={{ textAlign: "start", padding: "5px" }}>
                        <AddIcon onClick={() => arrayHelpers.push({})} />
                      </Box>
                      </thead>
                          </table>
                          </Box>
                    </>
                  )}
                />

                {
                  description && <Description
                  onSubmit={onSubmit}
                  description={description}
                  values={values}
                />
                }
                
              </Form>
              
            )}
          />
        ) : null}
      </Item>
    </>
  );
};

export default EstablishmentLevel;
