import React, { useEffect,useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Rightarrow from "../../../../assets/rightarrow.png";
import api from "../../../../api/index";
import { toast } from "react-toastify";
import { Store } from "../../../../StoreContext";
import { UpdateStore } from "../../../../StoreContext";
import { useTranslation, Trans } from "react-i18next";
import EditModal from "../../../Modals/EditCheckBox";
import parse from "html-react-parser";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchVisitForm = ({
  compShow,
  CompName,
  visit,
  casefileId,
  setCheckboxObj,
  checkboxObj,
  currentcasescaseFileId,
  state,
  setstate,
  Toggler,
  setToggler,
  setIcon,
  Icon,
  buttonEnability,
  setButtonEnability,
}) => {
  useEffect(() => {
    const ab = visit
      ?.map((val) =>
        val.chkList
          .filter((item) => item.isSelected == true)
          .map((val) => {
            return {
              caseFileCheckListId: val.caseFileCheckListId,
              sectionType: val.sectionType,
              casefileId: casefileId ? casefileId : currentcasescaseFileId,
              completedSentence: val?.name,
            };
          })
      )
      .map((val) =>
        val.filter((val) => {
          return {
            caseFileCheckListId: val.caseFileCheckListId,
            sectionType: val.sectionType,
            casefileId: val.casefileId,
            completedSentence: val?.name,
          };
        })
      );
    let merged = [].concat.apply([], ab);
    setstate((pre) => {
      return {
        ...pre,
        visitcheck: merged.map((val) => {
          return {
            caseFileCheckListId: val.caseFileCheckListId,
            sectionType: val.sectionType,
            casefileId: val.casefileId,
            completedSentence: val?.completedSentence,
          };
        }),
      };
    });
  }, [visit]);

  const [open, setOpen] = React.useState(false);
  const [subCheck, setSubcheck] = React.useState("");
  const [text, setText] = React.useState("");
  const [checklistid, setId] = React.useState("");

  const [dateLength, setDateLength] = useState(0)
  const [editDateLength, setEditDateLength] = useState(0)
  const [leveladd, setLeveladd] = useState(0)
  const [leveladdedit, setLeveladdedit] = useState(0)
  const [levelSub, setlevelSub] = useState(0)
  const [levelsubedit, setLevelsubedit] = useState(0)
  const [stringLength, setStringLength] = useState(0)
  const [EmptyStringBlankLength, setEmptyStringBlankLength] = useState(0)

  const store = Store();
  const { t, i18n } = useTranslation();
  const handleChange = (e, sectiontype, sentence) => {
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
      const obj = {
        caseFileCheckListId: parseInt(id),
        casefileId: casefileId ? casefileId : currentcasescaseFileId,
        sectionType: sectiontype,
        completedSentence: sentence,
      };
      if (
        (store.activeCase === "currentcases" || store.activeNavbarTab === 0) &&
        sectiontype === 1
      ) {
        setstate((pre) => {
          return {
            ...pre,
            visitcheck: [
              ...state.visitcheck.map((val) => {
                return {
                  caseFileCheckListId: parseInt(val.caseFileCheckListId),
                  casefileId: casefileId ? casefileId : currentcasescaseFileId,
                  sectionType: sectiontype,
                  completedSentence: val?.completedSentence,
                };
              }),
              obj,
            ],
          };
        });
      }
      if (store.activeCase === "newcase") {
        setCheckboxObj((pre) => [...pre, obj]);
      }
    }
    if (!checked) {
      setOpen(false);
      if (
        (store.activeCase === "currentcases" || store.activeNavbarTab === 0) &&
        sectiontype === 1
      ) {
        setstate((pre) => {
          return {
            ...pre,
            visitcheck: [
              ...state.visitcheck.filter(
                (val) => val.caseFileCheckListId != id
              ),
            ],
          };
        });
      }
      if (store.activeCase === "newcase") {
        setCheckboxObj((pre) => [
          ...pre.filter((item) => item.caseFileCheckListId != id),
        ]);
      }
    }
  };
  const updatestore = UpdateStore();
  const handleClose = () => setOpen(false);
  const saveChanges = (...data) => {
    let Sentence
    let reg4=/r[+]\d+/g
    let reg5=/r[-]\d+/g
    let reg6=/([_______________.]+)/g;
    let reg7=/[.]([a-z]{1,})[.]/g 
    let modifiedsentence;
  let[sentence, sentenceId,,,,dates,level,datelength,sectiontype,String] = data;
  if(String){
    const editstrlength =  reg7.exec(sentence)
    console.log("one", editstrlength?.length);
    console.log(reg6.exec(sentence));
     if(editstrlength?.length>0){
       sentence = sentence.replace(reg7,"."+String +".")
     }
    if(!reg7.exec(sentence)){
     sentence = sentence.replace(reg6,"."+String+".")
    }
   // console.log(sentence.split(reg7));
 }
  if(level){
    console.log("two");
   sentence = sentence.replace("r+ ___","r+"+level)
   sentence = sentence.replace("r - ___","r-"+level)
   sentence = sentence.replace(reg4, "r+"+level)
   sentence = sentence.replace(reg5, "r-"+level)
  }
   if(datelength!=0){
    let arr=sentence.split(" ___/___/___"||" ___/___/___;").filter((val)=>(val.toString() && val!=";" && val!="\r"))
    console.log(arr);
    const sentencewithDate = dates?.map((val, index)=>{
     modifiedsentence = modifiedsentence + arr[index] + " " + val.format();
     }
     )
    Sentence = modifiedsentence? modifiedsentence?.slice(9):sentence
   }

    const newdata = [];
    let new2 = [];
    newdata.push({
      completedSentence: sentence,
      caseFileCheckListId: sentenceId,
    });
    if (store.activeCase === "newcase") {
      newdata.map((i) => {
        new2 = checkboxObj.findIndex(
          (s) => s.caseFileCheckListId === i.caseFileCheckListId
        );
        checkboxObj[new2].completedSentence = sentence;
      });
    }
    console.log(
      "item?.chkList",
      visit?.map((val) => {
        const a = val.chkList.findIndex(
          (obj) => obj?.caseFileCheckListId === sentenceId
        );
        if (a > -1) {
          val.chkList[a].name = sentence;
        }
      })
    );
    if (store.activeCase === "currentcases") {
      newdata.map((i) => {
        new2 = state.visitcheck.findIndex(
          (s) => s.caseFileCheckListId === i.caseFileCheckListId
        );
        if (new2 > -1) {
          state.visitcheck[new2].completedSentence = sentence;
        }
      });
    }
    setText("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (store.activeCase === "newcase") {
      api("post", `/api/v1/casefiles/save_casefile_checklist`, checkboxObj)
        .then((res) => {
          {
            toast.success(t("Successfull"));
            setToggler((pre) => {
              return {
                ...pre,
                togglervisit: false,
              };
            });
            setIcon((pre) => {
              return {
                ...pre,
                iconvisit: true,
              };
            });
            updatestore({
              activeNavbarTab: 1,
              buttonenable: true,
              validatedSections:{
                ...store?.validatedSections,
                detailsobjectvalidated:true
              }
            });
          }
        })
        .catch((err) => toast.error(err?.statusText));
    }
    if (store.activeCase === "currentcases") {
      api(
        "post",
        `/api/v1/casefiles/save_casefile_checklist`,
        state.visitcheck.length === 0
          ? [
              {
                caseFileId: currentcasescaseFileId,
                sectionType: 1,
              },
            ]
          : state.visitcheck
      )
        .then((res) => {
          {
            toast.success(t("Successfull"));
          }
          updatestore({ 
            activeNavbarTab: 1,
            validatedSections: {
              ...store?.validatedSections,
              iconstudytwo:true
              }
          });
        })
        .catch((err) => toast.error(err?.statusText));
    }
  };
  return (
    <>
      <Item
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          boxShadow: "none",
          width: "96%",
          margin: "auto",
        }}
      >
        <Box>
          <Grid>
            <form onSubmit={handleSubmit}>
              <Box>
                {visit?.map((item) => (
                  <>
                    <Box sx={{ textAlign: "start", padding: "20px 0px" }}>
                      <label className="checklist-heading">
                        {item.checkHeadingName}
                      </label>
                    </Box>
                    <Divider />
                    {item?.chkList?.map((val) => (
                      <div class="container">
                        <div class="group">
                          <input
                            onClick={() => {
                              let str = val?.name;
                              let reg = /([__/__/__/]+)/g; /////for date pattern
                              //let regeditdate = /([\[d][/]\[d][/]\[d][/]]+)/g;
                              let regeditdate = /([\d/\d/\d/]+)/g;
                              let reg2 = /([r+\s___]+)/g; //////for r+ level
                              let reg3 = /\s[`\-=]\s[___]/g; /////for r_ level
                              let reg4 = /r[+]\d+/g;
                              let reg5 = /r[-]\d+/g;
                              let reg6=/([_______________.]+)/g; 
                              let reg7=/[.]([a-z]{1,})[.]/ 
                              let match;
                              let datematch;
                              let date = [];
                              let dateedit = [];
                              let levelmatchadd;
                              let levelsadd = [];
                              let levelsaddedit = [];
                              let levelmatchsub;
                              let levelssub = [];
                              let levelssubedit = [];
                              let stringlength = str.match(reg7)
                              let emptyBlanksLength = reg6.exec(str)?.filter((val)=>(val!="___"))
                              while ((match = reg.exec(str))) {
                                date.push(match[1] || match[0]);
                              }
                              while ((datematch = regeditdate.exec(str))) {
                                dateedit.push(datematch[1] || datematch[0]);
                              }
                              while ((levelmatchadd = reg2.exec(str))) {
                                levelsadd.push(
                                  levelmatchadd[1] || levelmatchadd[0]
                                );
                              }

                              while ((levelmatchadd = reg4.exec(val?.name))) {
                                levelsaddedit.push(
                                  levelmatchadd[1] || levelmatchadd[0]
                                );
                              }
                              ///
                              while ((levelmatchsub = reg3.exec(str))) {
                                levelssub.push(
                                  levelmatchsub[1] || levelmatchsub[0]
                                );
                              }
                              ////
                              while ((levelmatchsub = reg5.exec(str))) {
                                levelssubedit.push(
                                  levelmatchsub[1] || levelmatchsub[0]
                                );
                              }
                              setStringLength(stringlength?.length)
                              setEmptyStringBlankLength(emptyBlanksLength?.length)
                              if (
                                date.length > 0 ||
                                levelsadd > 0 ||
                                levelssub > 0 ||
                                stringlength?.length>0
                              ) {
                                setOpen(true);
                                setText(val?.name);
                                setId(val?.caseFileCheckListId);

                                setDateLength(
                                  date.filter((val) => val == "___/___/___")
                                    .length
                                );
                                setEditDateLength(dateedit.length);
                                setLeveladd(
                                  levelsadd.filter((val) => val == " r+ ___ ")
                                    .length
                                );
                                setLeveladdedit(levelsaddedit.length);
                                setlevelSub(levelssub.length);
                                setLevelsubedit(levelssubedit.length);
                              }
                            }}
                            type="checkbox"
                            defaultChecked={
                              store.activeCase === "currentcases"
                                ? val.isSelected
                                : ""
                            }
                            id={val.caseFileCheckListId}
                            onChange={(e) =>
                              handleChange(e, val?.sectionType, val?.name)
                            }
                          />
                          <label
                            className="dropdown-checkbox"
                            for={val.caseFileCheckListId}
                          ></label>
                        </div>
                        <Box
                          sx={{
                            padding: "20px",
                            border: "1px solid rgba(0, 31, 79, 0.1)",
                            boxSizing: "border-box",
                            boxShadow: "0px 6px 5px rgba(0, 0, 0, 0.03)",
                            borderRadius: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "90%",
                              margin: "auto",
                              fontWeight: "bold",
                              fontSize: "15px",
                              lineHeight: "22px",
                              color: "#3675B7",
                            }}
                          >
                            {parse(val?.name)}
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </>
                ))}
              </Box>
              <EditModal
                setOpen={setOpen}
                open={open}
                handleClose={handleClose}
                text={text}
                saveChanges={saveChanges}
                setSubcheck={setSubcheck}
                checklistid={checklistid}
                datetab={true}
                dateLength={dateLength}
                leveladdlength={leveladd}
                levelSublength={levelSub}
                leveladdeditlength={leveladdedit}
                levelsubeditlength={levelsubedit}
                editDateLength={editDateLength}
                stringLength={stringLength}
                EmptyStringBlankLength={EmptyStringBlankLength}
              />
              <Box sx={{ textAlign: "right", padding: "10px" }}>
               
                {
                      store.activeCase === "newcase"?(
                        <Button
                  type="submit"
                  disabled={!store?.validatedSections?.foldercreation?true:false}
                  endIcon={<img className="icon-validate" src={Rightarrow} />}
                  sx={{
                    background: "#3675B7",
                    ":hover": { background: "#3675B7" },
                  }}
                  variant="contained"
                >
                  {t("VALIDATE")}
                </Button>
                      ):null
                    }
                    {
                      store.activeCase === "currentcases"?(
                        <Button
                  type="submit"
                  disabled={!store?.validatedSections?.foldercreation && !Icon.iconmain?true:false}
                  endIcon={<img className="icon-validate" src={Rightarrow} />}
                  sx={{
                    background: "#3675B7",
                    ":hover": { background: "#3675B7" },
                  }}
                  variant="contained"
                >
                  {t("VALIDATE")}
                </Button>
                      ):null
                    }
              </Box>
            </form>
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchVisitForm;
