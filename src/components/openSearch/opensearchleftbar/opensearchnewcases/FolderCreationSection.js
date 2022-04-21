import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import api from "../../../../api/index";
import { toast } from "react-toastify";
import OpenSearchStudyForm from "./OpenSearchStudyForm";
import OpenSearchVisitForm from "./OpenSearchVisitForm";
import Rightarrow from "../../../../assets/rightarrow.png";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation, Trans } from "react-i18next";
import { Store } from "../../../../StoreContext";
import { UpdateStore } from "../../../../StoreContext";
import moment from "moment";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const FolderCreationSection = ({
  compShow,
  CompName,
  indexdata,
  currentcasescaseFileId,
  currentcasescaseTypeId,
  currentcasescommisionTypeId,
  currentcasesstudyTypeId,
  currentcasesvisitTypeId,
  currentcasescommisionDate,
}) => {
  const { t } = useTranslation();
  const store = Store();
  const [loading, setloading] = useState(true);
  const [Studydata, setStudydata] = useState([]);
  const [dropdownValue, setdropdownValue] = useState({
    studytype: "",
    visittype: "",
    casetype: "",
    commission: "",
    foldercreationvalues: "",
    townplanningValues: "",
    inputsvalue: {},
  });
  const [Toggler, setToggler] = useState({
    togglermain: false,
    togglerstudy: false,
    togglerstudytwo: false,
    togglervisit: false,
  });
  const [Icon, setIcon] = useState({
    iconmain: store.activeCase === "currentcases" ? true : false,
    iconstudy:
      store.activeCase === "currentcases" &&
      (store?.sectionindex === 2 ||
        store?.sectionindex === 3 ||
        store.tabindex === 2 ||
        store.tabindex === 3)
        ? true
        : false,
    iconstudytwo:
      (store.activeCase === "currentcases" && store?.sectionindex === 3) ||
      (store.activeCase === "currentcases" && store.tabindex === 2) ||
     (store.activeCase === "currentcases" && store.tabindex === 3)
        ? true
        : false,
    iconvisit:
      (store.activeCase === "currentcases" && store?.sectionindex === 3) ||
      store.tabindex === 2 ||
      store.tabindex === 3
        ? true
        : false,
  });
  const [buttonEnability, setButtonEnability] = useState({
    townplanningbutton:
      store.activeCase === "newcase" || indexdata?.sectionindex === 0
        ? true
        : false,
    detailsobject:
      store.activeCase === "newcase" || indexdata?.sectionindex === 0
        ? true
        : false,
    visitbutton: true,
  });

  const updatestore = UpdateStore();
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api("get", `/api/v1/Users/userprofile/${userId?.userid}`).then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          inputsvalue: res,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/casefile_checklist/0/${
        store?.establishmentId
          ? store?.establishmentId
          : indexdata?.establishmentId
      }/${store.caseFileId ? store.caseFileId : 0}`
    ).then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          townObj: res.data,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/casefile_checklist/1/${
        store?.establishmentId
          ? store?.establishmentId
          : indexdata?.establishmentId
      }/${store.caseFileId ? store.caseFileId : 0}`
    ).then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          visit: res.data,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/casefile_checklist/2/${
        store?.establishmentId
          ? store?.establishmentId
          : indexdata?.establishmentId
      }/${store.caseFileId ? store.caseFileId : 0}`
    ).then((res) => {
      setstate((preVal) => {
        return {
          ...preVal,
          study: res.data,
        };
      });
    });
    api("get", "/api/v1/casetypes/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          casetype: res,
        };
      })
    );
    api("get", "/api/v1/studytype/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          studytype: res,
        };
      })
    );
    api("get", "/api/v1/visittype/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          visittype: res,
        };
      })
    );
    api("get", "/api/v1/commision/dropdown").then((res) =>
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          commission: res,
        };
      })
    );
    setloading(true);
    api(
      "get",
      `/api/v1/casefiles/get_open_foldercreation/${
        indexdata?.establishmentId
          ? indexdata?.establishmentId
          : store?.establishmentId
      }/${store.caseFileId ? store.caseFileId : 0}`
    ).then((res) => {
      setloading(false);
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          foldercreationvalues: res,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/get_open_townplanning/${
        indexdata?.establishmentId
          ? indexdata?.establishmentId
          : store?.establishmentId
      }/${store.caseFileId ? store.caseFileId : 0}`
    ).then((res) => {
      setdropdownValue((preVal) => {
        return {
          ...preVal,
          townplanningValues: res.data,
        };
      });
    });
    api(
      "get",
      `/api/v1/casefiles/get_open_townplanning/${
        indexdata?.establishmentId
          ? indexdata?.establishmentId
          : store?.establishmentId
      }/${store.caseFileId ? store.caseFileId : 0}`
    ).then((res) => {
      setStudydata(res);
    });
  }, []);

  const [checkboxObj, setCheckboxObj] = useState([]);
  const [activeLink, setActiveLink] = useState(0);
  //////
  const [state, setstate] = useState({
    townObj: [],
    study: [],
    visit: [],
    check: [],
    studycheck: [],
    visitcheck: [],
  });
  const [inputValues, setInputValues] = useState({
    caseTypeId: "",
    commisionTypeId: "",
    agent: "",
    studyTypeId: "",
    visitTypeId: "",
    group: "",
    service: "",
    caseFileId: "",
    caseid: "",
    commisionDate: currentcasescommisionDate ? currentcasescommisionDate : "",
  });

  const [inputDisableState, setInputDisableState] = useState("");

  const [checkBoxRes, setCheckBoxRes] = useState();

  useEffect(() => {
    setInputValues({
      caseTypeId: currentcasescaseTypeId
        ? currentcasescaseTypeId
        : dropdownValue?.foldercreationvalues?.data?.caseTypeId,
      commisionTypeId: currentcasescommisionTypeId
        ? currentcasescommisionTypeId
        : dropdownValue?.foldercreationvalues?.data?.commisionTypeId,
      agent: dropdownValue?.inputsvalue?.data?.firstName,
      studyTypeId: currentcasesstudyTypeId
        ? currentcasesstudyTypeId
        : dropdownValue?.foldercreationvalues?.data?.studyTypeId,
      visitTypeId: currentcasesvisitTypeId
        ? currentcasesvisitTypeId
        : dropdownValue?.foldercreationvalues?.data?.visitTypeId,
      group: dropdownValue?.inputsvalue?.data?.group,
      service: dropdownValue?.inputsvalue?.data?.service,
      caseFileId: "",
      caseid: "",
      commisionDate: moment(
        dropdownValue?.foldercreationvalues?.data?.commisionDate,
        "YYYY-MM-DD"
      ).format("YYYY-MM-DD"),
    });
    setInputDisableState(
      CompName === "currentcases"
        ? currentcasescaseTypeId?.toString()
        : dropdownValue?.foldercreationvalues.data &&
            dropdownValue?.foldercreationvalues?.data?.caseTypeId.toString()
    );
  }, [dropdownValue]);
const getIndexData =()=>{
  api(
    "get",
    `/api/v1/casefiles/rolewise_cases/${store?.role}/${store?.userId}/1`
  ).then((res) => {
    console.log(res)
  });
}
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (
      (value === "1" && name === "caseTypeId") ||
      (value === "2" && name === "caseTypeId") ||
      (value === "3" && name === "caseTypeId")
    ) {
      setInputDisableState(value);
    }
    setInputValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ////////////for new cases//////////
    if (!currentcasescaseFileId) {
      let caseFileId = localStorage.getItem("establishmentid");
      let userdata = localStorage.getItem("userData");
      userdata = JSON.parse(userdata);
      const formdata = {
        ...inputValues,
        caseFileId: caseFileId,
        establishmentId: caseFileId,
        userid: userdata.userid,
        visitTypeId:
          inputValues.caseTypeId === "1" || inputValues.caseTypeId === "3"
            ? 0
            : inputValues.visitTypeId,
        studyTypeId:
          inputValues.caseTypeId === "2" || inputValues.caseTypeId === "3"
            ? 0
            : inputValues.studyTypeId,
      };

      if (store.activeCase === "newcase") {
        api("post", `/api/v1/casefiles/create_open_foldercreation`, formdata)
          .then((res) => {
            getIndexData();
            setInputValues((preVal) => {
              return {
                ...preVal,
                caseid: res?.data,
              };
            });
            {
              toast.success(t("Successfull"));
            }
            setButtonEnability((pre) => {
              return {
                ...pre,
                townplanningbutton: false,
                visitbutton: false,
              };
            });
            setToggler((pre) => {
              return {
                ...pre,
                togglermain: false,
              };
            });
            setIcon((pre) => {
              return {
                ...pre,
                iconmain: true,
              };
            });
            if (inputValues.caseTypeId === "3") {
              updatestore({
                caseFileId: res.data,
                activeNavbarTab: inputValues.caseTypeId === "3" ? 1 : 0,
                buttonenable: inputValues.caseTypeId === "3" ? true : false,
              });
            } else {
              updatestore({
                caseFileId: res.data,
              });
            }
          })
          .catch((err) => toast.error(err?.statusText));
      }
    }
    ////////////for current cases update//////////
    if (store.activeCase === "currentcases") {
      let userId = localStorage.getItem("userData");
      userId = JSON.parse(userId);
      const updatedObj = {
        caseFileId: store.caseFileId,
        caseTypeId: inputValues.caseTypeId,
        commisionTypeId: inputValues.commisionTypeId,
        visitTypeId:
          inputValues.visitTypeId === "" ? 0 : inputValues.visitTypeId,
        studyTypeId:
          inputValues.studyTypeId === "" ? 0 : inputValues.studyTypeId,
        commisionDate: inputValues.commisionDate
          ? inputValues.commisionDate
          : currentcasescommisionDate,
      };
      api("put", "/api/v1/casefiles/update_open_foldercreation", updatedObj)
        .then((res) => {
          setInputValues((preVal) => {
            return {
              ...preVal,
              caseid: res.data,
            };
          });
          setButtonEnability((pre) => {
            return {
              ...pre,
              townplanningbutton: false,
              visitbutton: false,
            };
          });
          setToggler((pre) => {
            return {
              ...pre,
              togglermain: false,
            };
          });
        })
        .catch((err) => {
          console.log("updateerr", err);
        });
    }
  };

  ////////////////// passed to study form visit form for getting checkedboxes id
  const postCheckboxesData = (data) => {
    api(
      "post",
      `/api/v1/casefiles/save_casefile_checklist`,
      data === "townplanning"
        ? checkboxObj.filter((item) => item.sectionType != 2)
        : checkboxObj.filter((item) => item.sectionType != 0)
    )
      .then((res) => {
        setCheckBoxRes(res.status);
        if (data === "studytwo") {
          setToggler((pre) => {
            return {
              ...pre,
              togglerstudytwo: false,
            };
          });
          setIcon((pre) => {
            return {
              ...pre,
              iconstudytwo: true,
            };
          });
          updatestore({ activeNavbarTab: 1, buttonenable: true });
        }
        {
          toast.success(t("Successfull"));
        }
      })
      .catch((err) => toast.error(err?.statusText));
    setCheckboxObj([]);
  };

  ///////////////////////////////

  return (
    <>
      {(activeLink === 0 && CompName === "currentcases") ||
      compShow === "filestructure" ||
      store.activeNavbarTab === 0 ? (
        <>
          <div>
            <Box
              onClick={() => {
                setToggler((pre) => {
                  return {
                    ...pre,
                    togglermain: !Toggler.togglermain,
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
              <Typography variant="h6">{t("Folder creation")}</Typography>
              {Icon.iconmain ? (
                <svg
                  width="32"
                  height="21"
                  viewBox="0 0 32 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2534 20.5954C11.9479 20.8551 11.5312 21 11.0983 21C10.6654 21 10.2486 20.8551 9.94316 20.5954L0.718025 12.7975C-0.239342 11.9884 -0.239342 10.6764 0.718025 9.86876L1.87315 8.89225C2.83082 8.08313 4.38145 8.08313 5.33882 8.89225L11.0983 13.7601L26.6612 0.606841C27.6188 -0.20228 29.171 -0.20228 30.1269 0.606841L31.282 1.58335C32.2393 2.39247 32.2393 3.70426 31.282 4.51212L12.2534 20.5954Z"
                    fill="white"
                  />
                </svg>
              ) : null}
            </Box>
            <Accordion
              sx={{ margin: "10px auto !important", borderRadius: "10px", width:"97.5%"}}
              expanded={Toggler.togglermain ? true : false}
            >
              <AccordionSummary
                sx={{ display: "none" }}
                aria-controls="panel1a-content"
                id="panel1a-header"
              ></AccordionSummary>
              <AccordionDetails>
                <Item sx={{ boxShadow: "none" }}>
                  <form
                    className="establishment-form"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    <Box sx={{ display: "flex" }}>
                      <div className="inputs-container">
                        <div class="flex-form">
                          <label className="label-color">Type</label>
                          <select
                            className="dropdown dropdown-folder-creation"
                            type="select"
                            name="caseTypeId"
                            onChange={handleChange}
                            value={inputValues.caseTypeId}
                            required
                          >
                            <option value="">{t("Please choose")}</option>
                            {dropdownValue.casetype.data?.map((item, i) => (
                              <option value={item.value}>{item.text}</option>
                            ))}
                          </select>
                        </div>

                        <div class="flex-form">
                          <label className="label-color">Commission</label>
                          <select
                            className="dropdown dropdown-folder-creation"
                            type="select"
                            name="commisionTypeId"
                            onChange={handleChange}
                            value={inputValues.commisionTypeId}
                            required
                          >
                            <option value="">{t("Please choose")}</option>
                            {dropdownValue.commission.data?.map((item) => (
                              <option value={item.value}>{item.text}</option>
                            ))}
                          </select>
                        </div>

                        <div class="flex-form flex-form-foldercreation">
                          <label className="label-color">Agent</label>
                          <input
                            type="search"
                            onChange={handleChange}
                            name="agent"
                            value={inputValues.agent}
                            required
                          />
                        </div>
                      </div>
                      <div className="inputs-container">
                        {inputDisableState === "1" ? (
                          <>
                            <div class="flex-form">
                              <label className="label-color"> Etude</label>
                              <select
                                className="dropdown dropdown-folder-creation"
                                type="select"
                                name="studyTypeId"
                                onChange={handleChange}
                                value={inputValues?.studyTypeId}
                                required
                              >
                                <option value="">{t("Please choose")}</option>
                                {dropdownValue.studytype.data?.map((item) => (
                                  <option value={item.value}>
                                    {item.text}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : null}
                        {inputDisableState === "2" ? (
                          <>
                            <div class="flex-form">
                              <label className="label-color">Visite </label>
                              <select
                                className="dropdown dropdown-folder-creation"
                                type="select"
                                name="visitTypeId"
                                onChange={handleChange}
                                value={inputValues?.visitTypeId}
                                required
                              >
                                <option value="">{t("Please choose")}</option>
                                {dropdownValue.visittype.data?.map((item) => (
                                  <option value={item.value}>
                                    {item.text}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : null}
                        <Box></Box>
                        <Box
                          className={`${
                            inputDisableState === "1" ||
                            inputDisableState === "2"
                              ? "more"
                              : "less"
                          }`}
                        >
                          <div class="flex-form">
                            <label className="label-color">
                              Date commission{" "}
                            </label>
                            <input
                              type="date"
                              onChange={handleChange}
                              name="commisionDate"
                              value={inputValues.commisionDate}
                              required
                            />
                          </div>
                        </Box>

                        <div class="flex-form flex-form-foldercreation">
                          <label className="label-color">Groupement</label>
                          <input
                            type="search"
                            onChange={handleChange}
                            name="group"
                            value={inputValues.group}
                            required
                          />
                        </div>

                        <div class="flex-form flex-form-foldercreation">
                          <label className="label-color">{t("Service")}</label>
                          <input
                            type="search"
                            onChange={handleChange}
                            name="service"
                            value={inputValues.service}
                          />
                        </div>
                      </div>
                    </Box>
                    <Divider sx={{margin: "2% 1.1%",  width: "96%"}} />
                    <Box sx={{ textAlign: "right", padding: "1% 2.5%" }}>
                      <Button
                        type="submit"
                        endIcon={
                          <img className="icon-validate" src={Rightarrow} />
                        }
                        sx={{
                          background: "#3675B7",
                          fontSize: "0.875rem",
                          ":hover": { background: "#3675B7" },
                          padding:"6px 16px"
                        }}
                        variant="contained"
                      >
                        {t("VALIDATE")}
                      </Button>
                    </Box>
                  </form>
                </Item>
              </AccordionDetails>
            </Accordion>
            {inputDisableState === "1" ? (
              <>
                <OpenSearchStudyForm
                  compShow={compShow}
                  CompName={CompName}
                  indexdata={indexdata}
                  townplanning={state.townObj}
                  study={state.study}
                  casefileId={inputValues.caseid}
                  setCheckboxObj={setCheckboxObj}
                  checkboxObj={checkboxObj}
                  postCheckboxesData={postCheckboxesData}
                  checkBoxRes={checkBoxRes}
                  Studydata={Studydata}
                  townplanningValues={dropdownValue.townplanningValues}
                  setstate={setstate}
                  currentcasescaseFileId={dropdownValue?.foldercreationvalues}
                  state={state}
                  Toggler={Toggler}
                  setToggler={setToggler}
                  setIcon={setIcon}
                  Icon={Icon}
                  buttonEnability={buttonEnability}
                  setButtonEnability={setButtonEnability}
                />
              </>
            ) : null}

            {inputDisableState === "2" ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "0.6px solid #C5D3DB",
                    backgroundColor: "#3675B7",
                    borderRadius: "5px",
                    width: "96%",
                    margin: "10px auto",
                    padding: "8px 10px",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    setToggler((pre) => {
                      return {
                        ...pre,
                        togglervisit: !Toggler.togglervisit,
                      };
                    });
                  }}
                >
                  <Typography variant="h6">{t("Details Of Object")}</Typography>
                  {Icon.iconvisit ? (
                    <svg
                      width="32"
                      height="21"
                      viewBox="0 0 32 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2534 20.5954C11.9479 20.8551 11.5312 21 11.0983 21C10.6654 21 10.2486 20.8551 9.94316 20.5954L0.718025 12.7975C-0.239342 11.9884 -0.239342 10.6764 0.718025 9.86876L1.87315 8.89225C2.83082 8.08313 4.38145 8.08313 5.33882 8.89225L11.0983 13.7601L26.6612 0.606841C27.6188 -0.20228 29.171 -0.20228 30.1269 0.606841L31.282 1.58335C32.2393 2.39247 32.2393 3.70426 31.282 4.51212L12.2534 20.5954Z"
                        fill="white"
                      />
                    </svg>
                  ) : null}
                </Box>
                <Accordion
                  sx={{ margin: "3px auto !important", borderRadius: "10px", width:"97.5" }}
                  expanded={Toggler.togglervisit ? true : false}
                >
                  <AccordionSummary
                    sx={{ display: "none" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Accordion 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <OpenSearchVisitForm
                      state={state}
                      setstate={setstate}
                      checkboxObj={checkboxObj}
                      compShow={compShow}
                      CompName={CompName}
                      indexdata={indexdata}
                      visit={state.visit}
                      casefileId={inputValues.caseid}
                      setCheckboxObj={setCheckboxObj}
                      postCheckboxesData={postCheckboxesData}
                      checkBoxRes={checkBoxRes}
                      currentcasescaseFileId={
                        dropdownValue?.foldercreationvalues?.data?.caseFileId
                      }
                      Toggler={Toggler}
                      setToggler={setToggler}
                      setIcon={setIcon}
                      Icon={Icon}
                      buttonEnability={buttonEnability}
                      setButtonEnability={setButtonEnability}
                    />
                  </AccordionDetails>
                </Accordion>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default FolderCreationSection;
