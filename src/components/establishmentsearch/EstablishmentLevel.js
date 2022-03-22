import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import api from "../../api/index";
import Description from "./Description";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Store } from "../../StoreContext";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Field, Form, FieldArray } from "formik";
import don from '../../assets/donne.svg'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation, Trans } from "react-i18next";
import parse from "html-react-parser";
import * as Yup from 'yup';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// });

 const validationSchema = Yup.object().shape({
  repeatable: Yup.array()
    .of(
      Yup.object().shape({
        cellNumber: Yup.number()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required("Name is required"),        
      })
    )
});
const EstablishmentLevel = ({
  setToggler,
  Toggler,
  setIcon,
  Icon,
  casefileId,
  buttonEnability,
  setButtonEnability
}) => {
  const { t, i18n } = useTranslation();
  const [dropdownValue, setdropdownValue] = useState({
    leveldropdown: "",
  });
  const [error, setError] = useState("")
  const [Values, setLevelData] = useState([]);
  const [description, setDescription] = useState();
  const [columnState, setColumnState] = useState({
    cellname: true,
    cellnumber: true,
  });
  useEffect(() => {
    api("get", "/api/v1/level/dropdown").then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          leveldropdown: res,
        };
      });
    });
    api("get", `/api/v1/get_description_data/${store.establishmentId}`).then(
      (res) => {
        console.log(res,"des");
        setLevelData(res.data.levels);
        setDescription(res.data.descriptions);
      }
    );
  }, []);


  const store = Store();
  const onSubmit = (values, data) => {
    console.log(values,"hddh");

   

     
    const newarr = values?.repeatable?.map((object) => ({
      ...object,
      establishmentLevelId:object?.establishmentLevelId?object?.establishmentLevelId:0
    }));
    const newdescriptions = {
      lessEightMeter: data.lessEightMeter ? data.lessEightMeter : false,
      moreEightMeter: data.moreEightMeter ? data.moreEightMeter : false,
      siteDescription: data.site,
      description: data.establishmentdescription,
    };
    const obj = {
      establishmentId: store.establishmentId,
      levels: newarr,
      descriptions: newdescriptions,
      caseFileId:store.caseFileId
    };
    if (store.activeCase === "newcase") {
      const val =  values?.repeatable?.map((val)=>(
        val.cellNumber<5?false:true
      ))
      if(val?.includes(false)){
        setError("incorrect format")
    }
    else{
      setError("")
      api("put", "/api/v1/update_description_data", obj).then((res) => {
        setButtonEnability((pre)=>{
        return{
          ...pre,
          stafftablebutton:false
        }
        })
        {
          toast.success(t("Successfull"));
        }
        setToggler((pre) => {
          return {
            ...pre,
            establishmentlevel: false,
          };
        });
        setIcon((pre) => {
          return {
            ...pre,
            establishmentlevel: true,
          };
        });
      });
    }
     
    }
    if (store.activeCase === "currentcases") {
  
      const val =  values?.repeatable?.map((val)=>(
        val?.cellNumber<5?false:true
      ))
      if(val?.includes(false)){
          setError("incorrect format")
      }
     else{
       console.log(obj,"OOOOOOO");
       setError("")
      api("put", "/api/v1/update_description_data", obj).then((res) => {
        console.log(res, "<><><><><><>");
        {
          toast.success(t("Successfull"));
        }
        setToggler((pre) => {
          return {
            ...pre,
            establishmentlevel: false,
          };
        });
        setIcon((pre) => {
          return {
            ...pre,
            establishmentlevel: true,
          };
        });
      });
     }
     
    }
  };
 
  const handleClose = (column) => {
    setColumnState((pre) => {
      return {
        ...pre,
        [column]: false,
      };
    });
  };
  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              establishmentlevel: !Toggler.establishmentlevel,
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
        <Typography variant="h6">{t("Description")}</Typography>
        {Icon.establishmentlevel ? <img src={don}/> : null}
      </Box>
      <Accordion
        sx={{ margin: "10px 10px !important",borderRadius:"10px" }}
        expanded={Toggler.establishmentlevel ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item
            sx={{
              boxShadow: "none",
              width: "97%",
              maxHeight: "500px",
              overflow: "scroll",
              margin: "auto",
            }}
          >
            {store.activeCase === "newcase" ? (
              <Formik
                initialValues={{ repeatable: Values ? Values : "loading...",  cellNumber: '', }}
                initialValues={{
                 
                }}
                enableReinitialize
                render={({ values, setFieldValue }) => (
                  <Form>
                    <FieldArray
                      name="repeatable"
                      enableReinitialize
                      render={(arrayHelpers) => (
                        <>
                          <Box sx={{ overflow: "auto" }}>
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
                                    {columnState.cellnumber ? (
                                      <th class="header-label">
                                        <Box
                                          sx={{
                                            borderRight: "2px solid #C5D3DB",
                                            height: "12px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "0px 5px",
                                            width: "140px",
                                          }}
                                        >
                                          <span>{t("Cell number")}</span>
                                          <CloseIcon
                                            onClick={() =>
                                              handleClose("cellnumber")
                                            }
                                            sx={{ width: "0.5em" }}
                                          />
                                        </Box>
                                      </th>
                                    ) : null}
                                    {columnState.cellname ? (
                                      <th class="header-label">
                                        <Box
                                          sx={{
                                            borderRight: "2px solid #C5D3DB",
                                            height: "12px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "0px 5px",
                                            width: "215px",
                                          }}
                                        >
                                          <span> {t("Cell name")}</span>
                                          <CloseIcon
                                            onClick={() =>
                                              handleClose("cellname")
                                            }
                                            sx={{ width: "0.5em" }}
                                          />
                                        </Box>
                                      </th>
                                    ) : null}

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
                                        Local
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
                                          width: "180px",
                                        }}
                                      >
                                        {t("Not accessible to the public")}
                                      </Box>
                                    </th>
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "8px",
                                          margin: "30px 0px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "120px",
                                        }}
                                      >
                                        {t("Local at risk")}
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
                                          width: "310px",
                                        }}
                                      >
                                        {t("Comments")}
                                      </Box>
                                    </th>
                                  </tr>
                                </Box>
                                <Box></Box>
                                {values?.repeatable?.map((row, i) => (
                                  <Box
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
                                          <Field
                                            className="field-width-staff"
                                            as="select"
                                            name={`repeatable.${i}.levelId`}
                                          >
                                            {console.log("df",dropdownValue?.leveldropdown?.data)}
                                            <option value="">
                                              {t("Please choose")}
                                            </option>
                                            {dropdownValue?.leveldropdown?.data?.map(
                                              (item) => (
                                                <>
                                                  { console.log(parse(item.text)) }
                                                  <option value={item.value} 
                                                   dangerouslySetInnerHTML={{__html:`${item.text}` }}
                                                  />
                                                 {/* <option>24&#x1D57;&#x02B0;</option> */}
                                                </>
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
                                      {columnState.cellnumber ? (
                                        <th>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                              fontSize: "12px",
                                            }}
                                          >
                                            <input
                                              className="field-width-staff field-width-cellnum"
                                             name="cellNumber"
                                              title="Number should contain 12 digits and No Character"
                                              pattern="^(\d{12})$"
                                              name={`repeatable.${i}.cellNumber`}
                                              value={row.cellNumber}
                                              type="tel"
                                              minlength="12" 
                                              maxlength="12"
                                             
                                            />
                                          </Box>
                                        </th>
                                      ) : null}
                                      {columnState.cellname ? (
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
                                            />
                                            <span
                                              onClick={() => {
                                                arrayHelpers.push({});
                                                setFieldValue(
                                                  `repeatable.${i + 1}.levelId`,
                                                  values.repeatable[i].levelId
                                                );
                                                setFieldValue(
                                                  `repeatable.${
                                                    i + 1
                                                  }.cellNumber`,
                                                  values.repeatable[i]
                                                    .cellNumber
                                                );
                                                setFieldValue(
                                                  `repeatable.${
                                                    i + 1
                                                  }.cellName`,
                                                  values.repeatable[i].cellName
                                                );
                                              }}
                                            >
                                              +
                                            </span>
                                          </Box>
                                        </th>
                                      ) : null}

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
                                            sx={{
                                              textAlign: "start",
                                              paddingTop: "10px",
                                            }}
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
                                            sx={{
                                              textAlign: "start",
                                              paddingTop: "8px",
                                            }}
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
                                <Box
                                  sx={{ textAlign: "start", padding: "5px" }}
                                >
                                  <AddIcon
                                    onClick={() => arrayHelpers.push({})}
                                  />
                                </Box>
                              </thead>
                            </table>
                          </Box>
                        </>
                      )}
                    />
                    <Description onSubmit={onSubmit} buttonEnability={buttonEnability} setButtonEnability={setButtonEnability}  description={description} values={values} />
                  </Form>
                )}
              />
            ) : null}

            {store.activeCase === "currentcases" ? (
              <Formik
              validationSchema={validationSchema}
                initialValues={{ repeatable: Values ? Values : "loading...",  }}
                enableReinitialize
                render={({ values, setFieldValue, errors, touched, isValidating }) => (
                  <Form>
                    <FieldArray
                      name="repeatable"
                      enableReinitialize
                      render={(arrayHelpers) => (
                        <>
                          <Box sx={{ overflow: "auto" }}>
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
                                    {columnState.cellnumber ? (
                                      <th class="header-label">
                                        <Box
                                          sx={{
                                            borderRight: "2px solid #C5D3DB",
                                            height: "12px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "0px 5px",
                                            width: "140px",
                                          }}
                                        >
                                          <span>{t("Cell number")}</span>
                                          <CloseIcon
                                            onClick={() =>
                                              handleClose("cellnumber")
                                            }
                                            sx={{ width: "0.5em" }}
                                          />
                                        </Box>
                                      </th>
                                    ) : null}
                                    {columnState.cellname ? (
                                      <th class="header-label">
                                        <Box
                                          sx={{
                                            borderRight: "2px solid #C5D3DB",
                                            height: "12px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "0px 5px",
                                            width: "215px",
                                          }}
                                        >
                                          <span> {t("Cell name")}</span>
                                          <CloseIcon
                                            onClick={() =>
                                              handleClose("cellname")
                                            }
                                            sx={{ width: "0.5em" }}
                                          />
                                        </Box>
                                      </th>
                                    ) : null}
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
                                        Local
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
                                          width: "180px",
                                        }}
                                      >
                                        {t("Not accessible to the public")}
                                      </Box>
                                    </th>
                                    <th class="header-label">
                                      <Box
                                        sx={{
                                          borderRight: "2px solid #C5D3DB",
                                          height: "8px",
                                          margin: "30px 0px",
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "0px 5px",
                                          width: "120px",
                                        }}
                                      >
                                        {t("Local at risk")}
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
                                          width: "310px",
                                        }}
                                      >
                                        {t("Comments")}
                                      </Box>
                                    </th>
                                  </tr>
                                </Box>
                                <Box></Box>
                                {values?.repeatable?.map((row, i) => (
                                  <Box
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
                                          <Field
                                            className="field-width-staff"
                                            as="select"
                                            style={{ padding: "8px" }}
                                            name={`repeatable.${i}.levelId`}
                                          >
                                            <option value="">
                                              {t("Please choose")}
                                            </option>
                                            {dropdownValue?.leveldropdown?.data?.map(
                                              (item) => (
                                               <>
                                                <option value={item.value} 
                                                 dangerouslySetInnerHTML={{__html:`${item.text}` }}
                                                />
                                               </>
                                                
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
                                      {columnState.cellnumber ? (
                                        <th>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                              fontSize: "12px",
                                            }}
                                          >
                                            <Field
                                              className="field-width-staff field-width-cellnum"
                                              type="number"
                                              name={`repeatable.${i}.cellNumber`}
                                              style={{ padding: "10px" }}
                                              value={row.cellNumber}
                                              
                                            />
                                             <p>  {error}</p>
                                          </Box>
                                        </th>
                                      ) : null}
                                      {columnState.cellname ? (
                                        <th>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                              fontSize: "12px",
                                            }}
                                          >
                                            <Field
                                              className="field-width-staff "
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
                                                  `repeatable.${
                                                    i + 1
                                                  }.cellNumber`,
                                                  values.repeatable[i]
                                                    .cellNumber
                                                );
                                                setFieldValue(
                                                  `repeatable.${
                                                    i + 1
                                                  }.cellName`,
                                                  values.repeatable[i].cellName
                                                );
                                              }}
                                            >
                                              +
                                            </span>
                                          </Box>
                                        </th>
                                      ) : null}

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
                                            sx={{
                                              textAlign: "center",
                                              paddingTop: "10px",
                                            }}
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
                                            sx={{
                                              textAlign: "center",
                                              paddingTop: "8px",
                                            }}
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
                                <Box
                                  sx={{ textAlign: "start", padding: "5px" }}
                                >
                                  <AddIcon
                                    onClick={() => arrayHelpers.push({})}
                                  />
                                </Box>
                              </thead>
                            </table>
                          </Box>
                        </>
                      )}
                    />

                    {description && (
                      <Description
                        onSubmit={onSubmit}
                        description={description}
                        values={values}
                        buttonEnability={buttonEnability} 
                        setButtonEnability={setButtonEnability}
                      />
                    )}
                  </Form>
                )}
              />
            ) : null}
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default EstablishmentLevel;
