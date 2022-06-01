import React, { useState, useEffect, createRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import api from "../../api/index";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Field, Form, FieldArray } from "formik";
import don from "../../assets/donne.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation, Trans } from "react-i18next";
import Rightarrow from "../../assets/rightarrow.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import {TextField } from "formik-material-ui";
import { array, boolean, number, object, string, ValidationError } from "yup";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// });

const EstablishmentLevel = ({
  setToggler,
  Toggler,
  setIcon,
  Icon,
  buttonEnability,
  setButtonEnability,
}) => {
  const { t } = useTranslation();
  const scrollDiv = createRef();
  const [dropdownValue, setdropdownValue] = useState({
    leveldropdown: "",
  });
  const [Values, setLevelData] = useState([]);
  const [description, setDescription] = useState();
  const [columnState, setColumnState] = useState({
    cellname: true,
    cellnumber: true,
  });
  const [tooltip, setTooltip] = useState({
    one: `Rappel: un site est un ensemble d’établissements isolés exploités par la même personne physique ou morale.
  Exemple: Lycée dont l’internat, l’externat, le gymnase et le restaurant scolaire sont des établissements isolés.
  Exemple de rédaction du descriptif d’un site : 
  « Le site GROUPE SCOLAIRE DE LA REPUBLIQUE comprend plusieurs établissements isolés:
  - l’établissement ECOLE PRIMAIRE, de type R de 3ecatégorie;
  - L’établissement ECOLE MATERNELLE, de type R de 3ecatégorie;
  - L’établissement RESTAURANT SCOLAIRE, de type N de 4ecatégorie.`,
    two: `Décrire en quelques mots le statut, les activités et le type de bâtiment. Le texte apparaitra dans le rapport juste avant le descriptif.
  ETABLISSEMENT SIMPLE
  Ex: Il s’agit d’un EHPAD de 80 lits dans un bâtiment du type R+4. 
  GROUPEMENT D’ETABLISSEMENT
  Ex: Il s’agit d’un groupement d’établissements comprenant xx cellules (commerces, cabinet médical, bureaux). Le bâtiment est du type R+1-1."s`,
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
    getGridData();
  }, []);

  const getGridData = ()=>{
    api("get", `/api/v1/get_description_data/${store.establishmentId}`).then(
      (res) => {
        setLevelData(res.data.levels);
        setDescription(res.data.descriptions);
      }
    );
  }

  const handleClose = (column) => {
    setColumnState((pre) => {
      return {
        ...pre,
        [column]: false,
      };
    });
  };

  const emptyDonation = { institution: "", percentage: 0, cellNumber: "" };
  const store = Store();
  const updatestore = UpdateStore();
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
        <Typography variant="h6">Description</Typography>
        {Icon?.establishmentlevel || store?.validatedSections?.establishmentlevelvalidated? <img src={don} /> : null}
      </Box>
      <Accordion
        sx={{
          margin: "10px auto !important",
          borderRadius: "10px",
          width: "97.5%",
        }}
        expanded={Toggler.establishmentlevel ? true : false}
      >
        <AccordionSummary
          sx={{ display: "none" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        ></AccordionSummary>
        <AccordionDetails>
          <Item
            className="scroll-styling"
            sx={{
              boxShadow: "none",
              margin: "auto",
              overflow: "scroll",
              maxHeight: "500px",
            }}
          >
            <Formik
              initialValues={{
                donations: Values,
                lessEightMeter: description?.lessEightMeter,
                moreEightMeter: description?.moreEightMeter,
                site: description?.siteDescription,
                establishmentdescription: description?.description,
              }}
              enableReinitialize
              // validationSchema={object({
              //   donations: array(
              //     object({
              //       levelId: string()
              //       .required("Level required")
              //       ,
              //       cellNumber: string()
              //         .required("Cell number needed")
              //         .min(12, "number length needs to be at least 12")
              //         .max(12, "number length should not be more than 12")
              //         .matches(/^[0-9]+$/, "Must be only digits"),
              //       cellName: string()
              //         .required("name required")
              //         .min(2, "name length should be 2")
              //         .max(30, "name length should not exceed 30"),
              //     })
              //   ),
              // })}
              onSubmit={(values) => {
                const obj = {
                  establishmentId: store?.establishmentId,
                  levels: values?.donations?.map((val) => {
                    return {
                      ...val,
                      cellNumber: parseInt(val.cellNumber),
                    };
                  }),
                  descriptions: {
                    lessEightMeter: values?.lessEightMeter,
                    moreEightMeter: values?.moreEightMeter,
                    siteDescription: values?.site,
                    description: values?.establishmentdescription,
                  },
                  caseFileId: store?.caseFileId,
                };
                api("put", "/api/v1/update_description_data", obj).then(
                  (res) => {
                    updatestore({
                      validatedSections:{
                      ...store?.validatedSections,
                        establishmentlevelvalidated:true
                     }
                    })
                    toast.success(t("Successfull"));
                    setButtonEnability((pre) => {
                      return {
                        ...pre,
                        stafftablebutton: false,
                      };
                    });
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
                    getGridData();
                  }
                );
              }}
            >
              {({ values, errors, isSubmitting, isValid, setFieldValue }) => (
                <Form autoComplete="off">
                  <FieldArray name="donations">
                    {({ push, remove }) => (
                      <>
                        <Box
                          className="scroll-styling"
                          sx={{ overflow: "scroll" }}
                        >
                          <Box
                            className="scroll-styling"
                            sx={{
                              display: "flex",
                              padding: "2% 1%",
                              borderBottom: "1px solid #C5D3DB",
                              width: "1550px",
                              overflow: "scroll",
                            }}
                          >
                            <Box
                              sx={{
                                borderRight: "2px solid #C5D3DB",
                                height: "12px",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px 5px",
                                width: "190px",
                                fontWeight: "600",
                              }}
                            >
                              {t("Level")}
                            </Box>
                            {columnState.cellnumber ? (
                              <Box
                                sx={{
                                  borderRight: "2px solid #C5D3DB",
                                  height: "12px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "0px 5px",
                                  width: "228px",
                                  fontWeight: "600",
                                }}
                              >
                                <span>{t("Cell number")}</span>
                                <CloseIcon
                                  onClick={() => handleClose("cellnumber")}
                                  sx={{ width: "0.5em" }}
                                />
                              </Box>
                            ) : null}
                            {columnState.cellname ? (
                              <Box
                                sx={{
                                  borderRight: "2px solid #C5D3DB",
                                  height: "12px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "0px 5px",
                                  width: "235px",
                                  fontWeight: "600",
                                }}
                              >
                                <span> {t("Cell name")}</span>
                                <CloseIcon
                                  onClick={() => handleClose("cellname")}
                                  sx={{ width: "0.5em" }}
                                />
                              </Box>
                            ) : null}
                            <Box
                              sx={{
                                borderRight: "2px solid #C5D3DB",
                                height: "12px",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px 5px",
                                width: "195px",
                                fontWeight: "600",
                              }}
                            >
                              Local
                            </Box>
                            <Box
                              sx={{
                                borderRight: "2px solid #C5D3DB",
                                height: "12px",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px 5px",
                                width: "172px",

                                fontWeight: "600",
                              }}
                            >
                              {t("Not accessible to the public")}
                            </Box>
                            <Box
                              sx={{
                                borderRight: "2px solid #C5D3DB",
                                height: "8px",
                                margin: "0px 0px",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px 5px",
                                width: "120px",
                                fontWeight: "600",
                              }}
                            >
                              {t("Local at risk")}
                            </Box>
                            <Box
                              sx={{
                                borderRight: "2px solid #C5D3DB",
                                height: "12px",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px 5px",
                                width: "310px",
                                fontWeight: "600",
                              }}
                            >
                              {t("Comments")}
                            </Box>
                          </Box>
                          {values.donations.map((_, index) => (
                            <>
                              <Box
                                className="scroll-styling"
                                sx={{
                                  display: "flex",
                                  margin: "10px 0px",
                                  padding: "25px 0px 10px 0px",
                                  background: "#FFFFFF",
                                  border: "1px solid #EBEFF2",
                                  boxSizing: "border-box",
                                  borderRadius: "5px",
                                  width: "1550px",
                                }}
                              >
                                <Box
                                  className="parent-container-level"
                                  sx={{ display: "flex" }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      fontSize: "12px",
                                      textAlign: "start",
                                    }}
                                  >
                                    <Field
                                      className="field-width-staff"
                                      as="select"
                                      name={`donations.${index}.levelId`}
                                    >
                                      <option value="">
                                        {t("Please choose")}
                                      </option>
                                      {dropdownValue?.leveldropdown?.data?.map(
                                        (item) => (
                                          <>
                                            <option
                                              value={item.value}
                                              dangerouslySetInnerHTML={{
                                                __html: `${item.text}`,
                                              }}
                                            />
                                          </>
                                        )
                                      )}
                                    </Field>
                                    <span
                                      style={{ color: "#3675B7" }}
                                      onClick={() => {
                                        push(emptyDonation);
                                        setFieldValue(
                                          `donations.${index + 1}.levelId`,
                                          values.donations[index].levelId
                                        );
                                      }}
                                    >
                                      +
                                    </span>
                                    {/* {
                          errors?.donations?.map((val)=>(
                           <span>{val?.levelId? val?.levelId :""}</span>  
                          )
                          )
                          } */}
                                  </Box>
                                  {columnState.cellnumber ? (
                                    <Field
                                      className="field-cellno"
                                      type="string"
                                      name={`donations.${index}.cellNumber`}
                                      component={TextField}
                                    />
                                  ) : null}
                                  {columnState.cellname ? (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        fontSize: "12px",
                                        textAlign: "start",
                                      }}
                                    >
                                      <Field
                                        className="field-cellno"
                                        type="string"
                                        name={`donations.${index}.cellName`}
                                        component={TextField}
                                      />
                                      <span
                                        style={{ color: "#3675B7" }}
                                        onClick={() => {
                                          push(emptyDonation);
                                          setFieldValue(
                                            `donations.${index + 1}.levelId`,
                                            values.donations[index].levelId
                                          );
                                          setFieldValue(
                                            `donations.${index + 1}.cellNumber`,
                                            values.donations[index].cellNumber
                                          );
                                          setFieldValue(
                                            `donations.${index + 1}.cellName`,
                                            values.donations[index].cellName
                                          );
                                        }}
                                      >
                                        +
                                      </span>
                                    </Box>
                                  ) : null}
                                  <Box>
                                    <Field
                                      className="field-width-staff local-inp"
                                      name={`donations.${index}.details`}
                                    />
                                  </Box>

                                  <Field
                                    className="checkbox-width-establishment-level"
                                    type="checkbox"
                                    name={`donations.${index}.isPublic`}
                                  />
                                  <Field
                                    className="checkbox-width-establishment-level"
                                    type="checkbox"
                                    name={`donations.${index}.isRisk`}
                                  />
                                  <Box>
                                    <Field
                                      className="field-width-staff comments-input"
                                      name={`donations.${index}.comments`}
                                    />
                                  </Box>
                                </Box>

                                {/* <Grid item xs={12} sm="auto">
              <Button
                disabled={isSubmitting}
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            </Grid> */}
                              </Box>
                            </>
                          ))}
                        </Box>
                        <Box sx={{ textAlign: "start", padding: "5px" }}>
                          <AddIcon
                            sx={{ color: "#3675B7" }}
                            onClick={() => {
                              push(emptyDonation);
                            }}
                          />
                        </Box>
                      </>
                    )}
                  </FieldArray>
                  <Box sx={{ margin: "2% 2%" }}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="label-textarea">
                          {t("Site (if applicable)")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Tooltip title={tooltip.one}>
                          <Field
                            type="textarea"
                            name="site"
                            className="textarea-width"
                            placeholder="Rappel: un site est un ensemble d’établissements isolés exploités par la même personne physique ou morale.
                    Exemple: Lycée dont l’internat, l’externat, le gymnase et le restaurant scolaire sont des établissements isolés.
                    Exemple de rédaction du descriptif d’un site : 
                    « Le site GROUPE SCOLAIRE DE LA REPUBLIQUE comprend plusieurs établissements isolés:
                    - l’établissement ECOLE PRIMAIRE, de type R de 3ecatégorie;
                    - L’établissement ECOLE MATERNELLE, de type R de 3ecatégorie;
                    - L’établissement RESTAURANT SCOLAIRE, de type N de 4ecatégorie. "
                          />
                        </Tooltip>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className="label-textarea">
                          {t(
                            "Description presenting the establishment and the activities"
                          )}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box>
                          <Tooltip title={tooltip.two}>
                            <Field
                              className="textarea-width"
                              placeholder="Décrire en quelques mots le statut, les activités et le type de bâtiment. Le texte apparaitra dans le rapport juste avant le descriptif.
                        ETABLISSEMENT SIMPLE
                        Ex: Il s’agit d’un EHPAD de 80 lits dans un bâtiment du type R+4. 
                        GROUPEMENT D’ETABLISSEMENT
                        Ex: Il s’agit d’un groupement d’établissements comprenant xx cellules (commerces, cabinet médical, bureaux). Le bâtiment est du type R+1-1."
                              name="establishmentdescription"
                            />
                          </Tooltip>
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className="label-textarea">
                          {t("Low floor of the last accessible level")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ textAlign: "start" }}>
                        <Box
                          sx={{
                            display: "flex",
                            paddingBottom: "10px",
                          }}
                        >
                          <label className="label-descriptif">
                            {" "}
                            {t("Less Eight Meter")}
                          </label>
                          <Field
                            className="checkbox-width-establishment-level"
                            type="checkbox"
                            name="lessEightMeter"
                          />
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <label className="label-descriptif">
                            {" "}
                            {t("More Eight Meter")}
                          </label>
                          <Field
                            className="checkbox-width-establishment-level"
                            type="checkbox"
                            name="moreEightMeter"
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Box>
                    {typeof errors.donations === "string" ? (
                      <Typography color="error">{errors.donations}</Typography>
                    ) : null}
                  </Box>
                  <Box
                    sx={{ textAlign: "right", width: "96%", margin: "auto" }}
                  >
                    <button
                      //disabled={!store?.validatedSections?.createhistoricalvalidated?true:false}
                      disabled={store.activeCase === "newcase"?!store?.validatedSections?.createhistoricalvalidated?true:store.activeCase === "currentcase"?false:false:false}
                      className={
                        !buttonEnability?.establishmentlevelbutton
                          ? "btn-validate"
                          : "btn-validate-disable"
                      }
                      type="submit"
                    >
                      {t("VALIDATE")}{" "}
                      <img className="icon-validate" src={Rightarrow} />
                    </button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default EstablishmentLevel;
