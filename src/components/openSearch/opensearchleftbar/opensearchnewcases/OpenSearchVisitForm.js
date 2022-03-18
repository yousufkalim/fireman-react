import React, { useEffect } from "react";
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
import EditModal from '../../../Modals/EditCheckBox';
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
  setButtonEnability
}) => {
  useEffect(() => {
    console.log(":",visit);
    const ab = visit
      ?.map((val) =>
        val.chkList
          .filter((item) => item.isSelected == true)
          .map((val) => {
            return {
              caseFileCheckListId: val.caseFileCheckListId,
              sectionType: val.sectionType,
              casefileId: casefileId ? casefileId : currentcasescaseFileId,
              completedSentence:val?.name
            };
          })
      )
      .map((val) =>
        val.filter((val) => {
          return {
            caseFileCheckListId: val.caseFileCheckListId,
            sectionType: val.sectionType,
            casefileId: val.casefileId,
            completedSentence:val?.name
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
            completedSentence:val?.completedSentence
          };
        }),
      };
    });
  }, [visit]);
 
 
  const [open, setOpen] = React.useState(false);
  const [subCheck, setSubcheck] = React.useState("");
  const [text, setText] = React.useState("");
  const [checklistid, setId] = React.useState("");
  const store = Store();
  const { t, i18n } = useTranslation();
  const handleChange = (e, sectiontype) => {
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
      const obj = {
        caseFileCheckListId: parseInt(id),
        casefileId: casefileId ? casefileId : currentcasescaseFileId,
        sectionType: sectiontype,
      };
      if ((store.activeCase  === "currentcases" || store.activeNavbarTab===0) && sectiontype===1) {
        setstate((pre) => {
          return {
            ...pre,
            visitcheck: [
              ...state.visitcheck.map((val) => {
                return {
                  caseFileCheckListId: parseInt(val.caseFileCheckListId),
                  casefileId: casefileId ? casefileId : currentcasescaseFileId,
                  sectionType: sectiontype,
                  completedSentence:val?.completedSentence  
                };
              }),
              obj,
            ],
          };
        });
      }
      if (store.activeCase==="newcase") {
        setCheckboxObj((pre) => [...pre, obj]);
      }
    }
    if (!checked) {
      if ((store.activeCase  === "currentcases" || store.activeNavbarTab===0) && sectiontype===1) {
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
      if (store.activeCase==="newcase") {
        setCheckboxObj((pre) => [
          ...pre.filter((item) => item.caseFileCheckListId != id),
        ]);
      }
    }
  };
  const updatestore = UpdateStore();
  const handleClose = () => setOpen(false);
  const saveChanges = (sentence, sentenceId, nature, seriesname) => {
    console.log("sentence", sentence);
    console.log("sentence", sentenceId);
    console.log("study",visit);
    const newdata = []
     let new2 = [];
     newdata.push({completedSentence:sentence, caseFileCheckListId: sentenceId})
      newdata.map((i) => {
      new2 = checkboxObj.findIndex(
        (s) => s.caseFileCheckListId === i.caseFileCheckListId
      );
      checkboxObj[new2].completedSentence = sentence;
    }); 
    console.log("item?.chkList", visit?.map((val)=>{
     const a =    val.chkList.findIndex(
        (obj) => obj?.caseFileCheckListId === sentenceId
      )
     if(a>-1){
      val.chkList[a].name=sentence
     }
    }))
    setText("")
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("}{}{}",checkboxObj);
    if (store.activeCase==="newcase") {
      console.log("newcses");
      console.log("checkbox", checkboxObj);
      api("post", `/api/v1/casefiles/save_casefile_checklist`, checkboxObj)
        .then((res) => {
          {
            toast.success(t("Successfull"));
            setToggler((pre)=>{
              return{
               ...pre,
               togglervisit:false,
              }
            })
            setIcon((pre)=>{
              return{
                ...pre,
                iconvisit:true,
              }
            });
            updatestore({ 
              activeNavbarTab: 1,
              buttonenable:true
             });
          }
        })
        .catch((err) => toast.error(err?.statusText));
    }
    if (store.activeCase  === "currentcases") {
      console.log(state.visitcheck,"current");
      api("post", `/api/v1/casefiles/save_casefile_checklist`, state.visitcheck.length===0?([{
        caseFileId:currentcasescaseFileId,
        sectionType:1
      }]):(state.visitcheck))
        .then((res) => {
          {
            toast.success(t("Successfull"));
          }
          updatestore({ activeNavbarTab: 1 });
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
                           onClick={()=>{ 
                            if(val.name.match(/[_]/g)){
                              setOpen(true);
                              setText(val?.name);
                              setId(val?.caseFileCheckListId)
                            }
                             console.log(val.name);
                            }
                          }
                            type="checkbox"
                            defaultChecked={store.activeCase==="currentcases"? val.isSelected:""}
                            id={val.caseFileCheckListId}
                            onChange={(e) => handleChange(e, val.sectionType)}
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
      />
              <Box sx={{ textAlign: "right", padding: "10px" }}>
                <Button
                  type="submit"
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
            </form>
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchVisitForm;
