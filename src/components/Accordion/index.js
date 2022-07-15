import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Redo from "../../assets/redo.svg";
import Rightarrow from "../../assets/rightarrow.png";
import Floppy from "../../assets/floppy.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton } from "@mui/material";
import TooltipComp from "../TooltipComp";
import CheckList from "../CheckList";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import api from "../../api/index";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMoreIcon style={{ color: "#FFFFFF" }} sx={{ fontSize: "2rem" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#FFFFFF" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const AccordionComponent = (props) => {
  const { t } = useTranslation();
  const [sectionDetail, setSectiondDetail] = useState({
    sectionind: "",
    chapterindex: "",
  });
  const [sentenceText, setSentenceText] = useState("");
  const [values, setValues] = useState({
    sentenceId: "",
    sentencetext: "",
    sentencemodified: "",
    seriesName: "",
    sentenceNature: "",
  });
  const [seriesValues, setSeriesValues] = useState([]);
  const [alreadyChecked, setAlreadyChecked] = useState([]);
  const [subCheckValues, setSubCheckValues] = useState([]);
  const [redo, setRedo] = useState("");
  const store = Store();
  const updateStore = UpdateStore();
  const onClick = (sentenceid, text, seriesname, nature, serialid) => {
    setValues((pre) => {
      return {
        ...pre,
        sentenceId: sentenceid,
        sentencetext: text,
        seriesName: seriesname,
        sentenceNature: nature,
        serialId: serialid,
      };
    });

    setSeriesValues((pre) => [
      // ...pre.filter((obj) => obj.seriesName != seriesname),
      ...pre.filter((obj) => obj.serialId != serialid),
      {
        completedSentence: nature == 1 ? text : "",
        serialId: serialid,
        caseFileCheckListId: sentenceid,
        modifiedSentence: text,
        subCheck: [],
        seriesName: seriesname,
      },
    ]);
  };
  const getModifiedSentence = (
    text,
    sentenceid,
    nature,
    seriesname,
    serialid
  ) => {
    setValues((pre) => {
      return {
        ...pre,
        sentenceId: sentenceid,
        sentencetext: text,
        seriesName: seriesname,
        sentenceNature: nature,
      };
    });

    setSeriesValues((pre) => [
      // ...pre.filter((obj) => obj.seriesName != seriesname),
      ...pre.filter((obj) => obj.serialId != serialid),
      {
        completedSentence: nature == 1 ? text : "",
        caseFileCheckListId: sentenceid,
        modifiedSentence: text,
        subCheck: [],
        seriesName: seriesname,
        serialId: serialid,
      },
    ]);
  };
  const getSubCheckListData = (
    id,
    text,
    sentenceNature,
    seriesname,
    sectionid
  ) => {
    setSubCheckValues((pre) => [
      ...pre.filter((obj) => obj.serialid != sectionid),
      {
        seriesname: seriesname,
        subCheckListId: id,
        modifiedSentence: text,
        completedSentence: sentenceNature == 1 ? text : "",
        serialid: sectionid,
      },
    ]);
    //  setSubCheckValues((pre)=>[...pre.filter((obj)=>(obj.seriesname!=sentenceDetails?.seriesname)),{seriesname:sentenceDetails.seriesname, subCheckListId:sentenceDetails.id,modifiedSentence:sentenceDetails.text, completedSentence:sentenceDetails.sentenceNature==1?sentenceDetails.text:""}])
  };
  const onSubmit = (section, chapter, submittype) => {
    let newdata = [];
    let new2 = [];
    const forcechecklistObj = {
      caseFileId: store.caseFileId,
      // tabIndex: props?.TabData?.filter((val)=>(val?.orderNum===store?.Orderno))[0]?.sectionCategoryId,
      tabIndex: store?.filterOrderno ? store?.filterOrderno : store?.Orderno,
      sectionIndex: section,
      chapterIndex: chapter,
    };
    seriesValues?.map((item, index) => {
      subCheckValues?.map((sub) => {
        if (sub.seriesname === item.seriesName) {
          newdata.push({
            ...item,
            subCheck: [
              {
                completedSentence: sub.completedSentence,
                subCheckListId: sub.subCheckListId,
                modifiedSentence: sub.modifiedSentence,
              },
            ],
          });
        }
      });
    });
    newdata.map((i) => {
      new2 = seriesValues.findIndex(
        (s) => s.caseFileCheckListId === i.caseFileCheckListId
      );
      //new2.push( i)
      seriesValues[new2] = i;
    });
    const obj = {
      caseFileId: store.caseFileId,
      chapterIndex: chapter,
      // tabIndex: store.activeNavbarTab + 1,
      //  tabIndex: props?.TabData?.filter((val)=>(val?.orderNum===store?.Orderno))[0]?.sectionCategoryId,
      tabIndex: store?.filterOrderno ? store?.filterOrderno : store?.implantationDataid,
      sectionIndex: section,
      checks: seriesValues,
      caseFileSelectedAnswerId: alreadyChecked[0]?.caseFileSelectedAnswerId
        ? alreadyChecked[0]?.caseFileSelectedAnswerId
        : 0,
    };
    if (submittype) {
      api(
        "post",
        "/api/v1/checkList/save_tabs_empty_checklist",
        forcechecklistObj
      ).then((res) => {
        if (res.data === true) {
          toast.success(t("Successfull"));
        }
      });
    }
    if (!submittype) {
      api("post", "/api/v1/checkList/save_tabs_checklist", obj).then((res) => {
        if (res.data === true || obj.checks.length == 0) {
          props.setExpandchild(true);
          toast.success(t("Successfull"));
        }
      });
    }
  };
  return (
    <>
      <Accordion
        expanded={
          props.expanded != props.panelname ||
          (props.sectionindex === sectionDetail.sectionind &&
            props.chapterindex === sectionDetail.chapterindex &&
            props.expandChild)
            ? false
            : true
        }
        onChange={props.handleChange(props.panelname)}
        //onChange={onChange(props.panelname)}
        //onClick={()=>{setExpand(!expand)}}
      >
        <AccordionSummary
          onClick={() => {
            //  for tutorial video
            api(
              "get",
              `/api/v1/checkList/section_video_link/${props.accordionData?.sectionId}`
            ).then((res) => {
              updateStore({ implantationvideodata: res.data.length });
              props.setRightBarData((pre) => {
                return {
                  ...pre,
                  videoLink: res?.data,
                  sectionId: props.accordionData?.sectionId,
                };
              });
              api(
                "get",
                `/api/v1/checkList/section_comments/${props.accordionData?.sectionId}`
              ).then((res) => {
                updateStore({ implantationcommentsdata: res.data.length });
                props.setRightBarData((pre) => {
                  return {
                    ...pre,
                    comments: res?.data,
                  };
                });
              });
            });

            //

            api(
              "get",
              `/api/v1/checkList/show_section_selected_checklist/${store.caseFileId}/${props.accordionData?.sectionId}`
            ).then((res) => {
              setAlreadyChecked(res?.data);
            });
          }}
          expandIcon={
            <svg
              width="19"
              height="11"
              viewBox="0 0 19 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75862 0.298666L0.303534 8.63094C0.10782 8.82366 -8.38859e-08 9.08091 -7.18955e-08 9.35522C-5.99052e-08 9.62953 0.10782 9.88679 0.303534 10.0795L0.926049 10.6931C1.33169 11.0924 1.99097 11.0924 2.39599 10.6931L9.49606 3.6963L16.604 10.7009C16.7997 10.8936 17.0606 11 17.3388 11C17.6173 11 17.8782 10.8936 18.0741 10.7009L18.6965 10.0873C18.8922 9.8944 19 9.63729 19 9.36298C19 9.08868 18.8922 8.83142 18.6965 8.6387L10.2337 0.298666C10.0373 0.105493 9.77519 -0.00060601 9.49652 2.44592e-06C9.21678 -0.000605986 8.9548 0.105493 8.75862 0.298666Z"
                fill="white"
              />
            </svg>
          }
          sx={{
            backgroundColor: "#3675B7",
            borderRadius: "10px",
            color: "#FFFFFF",
            border: "none",
          }}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <div id={props.sectionindex} className="section_id">
            {props.accordionData.sectionId}
          </div>
          <Typography sx={{ fontSize: "20px" }}>
            {props?.accordionData.sectionName}
          </Typography>
          {
            // (props?.tabindex + 1 <= store?.tabindex &&
            //   (props.chapterindex + 1 <= store.chapterIndex ||
            //     props?.tabindex + 1 < store?.tabindex) &&
            //   (props.sectionindex + 1 <= store.sectionindex ||
            //     props?.tabindex + 1 < store?.tabindex) &&
            //   store.activeCase != "newcase") ||
            (props.sectionindex === sectionDetail.sectionind &&
              props.chapterindex === sectionDetail.chapterindex &&
              props?.tabindex === sectionDetail.tabindex) ||
            (props.sectionindex == store?.implantationtabdata.sectionind &&
              props.chapterindex == store?.implantationtabdata.chapterindex &&
              sectionDetail.tabindex == store?.activeNavbarTab) ||
            props?.accordionData?.isSelected ? (
              <svg
                className="cehck_section"
                width="32"
                height="21"
                viewBox="0 0 32 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2534 20.5954C11.9479 20.8551 11.5312 21 11.0983 21C10.6654 21 10.2486 20.8551 9.94316 20.5954L0.718025 12.7975C-0.239342 11.9884 -0.239342 10.6764 0.718025 9.86876L1.87315 8.89225C2.83082 8.08313 4.38145 8.08313 5.33882 8.89225L11.0983 13.7601L26.6612 0.606841C27.6188 -0.20228 29.171 -0.20228 30.1268 0.606841L31.282 1.58335C32.2393 2.39247 32.2393 3.70426 31.282 4.51212L12.2534 20.5954Z"
                  fill="white"
                />
              </svg>
            ) : null
          }
        </AccordionSummary>
        <AccordionDetails>
          {props.accordionData.series &&
            props.accordionData.series.map((series, i) => {
              return (
                <>
                  <CheckList
                    onClick={onClick}
                    getSubCheckListData={getSubCheckListData}
                    getModifiedSentence={getModifiedSentence}
                    setSentenceText={setSentenceText}
                    sentenceText={sentenceText}
                    chapterindex={props.chapterindex + 1}
                    sectionindex={props.sectionindex}
                    series={series.serialName}
                    index={i}
                    accordionData={series}
                    alreadyChecked={alreadyChecked}
                    setAlreadyChecked={setAlreadyChecked}
                    sectionid={props.accordionData.sectionId}
                    redo={redo}
                    setRedo={setRedo}
                  />
                </>
              );
            })}
          <div className="checklist_detail_bottom">
            <Box
              sx={{
                display: "flex",
                width: "10%",
                justifyContent: "space-between",
              }}
            >
              <TooltipComp
                title="Permet de valider la section alors qu’aucune réponse n’as été sélectionnée"
                icon={
                  <CheckCircleOutlineIcon
                    onClick={() => {
                      setSectiondDetail(() => {
                        return {
                          sectionind: props.sectionindex,
                          chapterindex: props.chapterindex,
                          tabindex: store?.activeNavbarTab,
                        };
                      });
                      props.setExpandchild(true);
                      onSubmit(
                        props.sectionindex + 1,
                        props.chapterindex + 1,
                        true
                      );
                      updateStore({
                        implantationtabdata: {
                          ...store?.implantationtabdata,
                          sectionind: props.sectionindex,
                          chapterindex: props.chapterindex,
                          tabindex: store?.activeNavbarTab,
                        },
                      });
                    }}
                    style={{ color: "#BDC6D8", fontSize: "32px" }}
                  />
                }
              />
            </Box>
            <div
              onClick={() => {
                setRedo(true);
              }}
            >
              <TooltipComp
                title="Permet de réinitialiser la section complète"
                icon={<img src={Redo} />}
              />
            </div>
          </div>

          {
            <div className="bottom_buttons">
              <div className="bottom_buttons_left">
                <TooltipComp
                  title="Permet d’enregistrer le travail en cours Permet d’enregistrer le travail en cours"
                  icon={<img src={Floppy} />}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                ></IconButton>
              </div>
              <div className="bottom_buttons_right">
                <Button
                  onClick={() => {
                    setSectiondDetail(() => {
                      return {
                        sectionind: props.sectionindex,
                        chapterindex: props.chapterindex,
                        tabindex: store?.activeNavbarTab,
                      };
                    });

                    onSubmit(
                      //props.sectionindex + 1,
                      props.sectionindex,
                      props.chapterindex + 1,
                      false
                    );
                    updateStore({
                      implantationtabdata: {
                        ...store?.implantationtabdata,
                        sectionind: props.sectionindex,
                        chapterindex: props.chapterindex,
                        tabindex: store?.activeNavbarTab,
                      },
                    });
                  }}
                  endIcon={<img className="" src={Rightarrow} />}
                  sx={{
                    background: "#3675B7",
                    ":hover": { background: "#3675B7" },
                  }}
                  variant="contained"
                >
                  SUIVANT
                </Button>
              </div>
            </div>
          }
        </AccordionDetails>
      </Accordion>
      <Divider className="divider" variant="middle" />
    </>
  );
};

export default AccordionComponent;
