import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import parse from "html-react-parser";
import Checkbox from "@mui/material/Checkbox";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import EditTextComp from "./EditTextComp";
import pencil from "../../assets/pencilediticon.png";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";

const regexInt = /\[int\]/g
const regexString = /\[string\]/g
const regexDate = /\[date\]/g
const regexeditdate = /(\d{1,4}([\/])\d{1,2}([\/])\d{4})/g
let regexeditInt=/[,](-?[0-9]{1,})[,]/g 
//let regexeditstring=/[.]([a-z]{1,})[.]/||/[.]([a-z]{1,}\s*?[a-z]{1,}?)[.]/
//let regexeditstring = /[.]([a-z]{1,}\s*?[a-z]{1,}?)[.]/g
 let regexeditstring =  /\.([^\.]+)\./g
 let modifiedsentence;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const Subchecklist = ({
  sentenceStatus,
  subcheckData,
  subCheck,
  setSubcheck,
  subcheckIndex,
  setSubCheckIndex,
  serialName,
  getSubCheckListData,
  setSentenceDetails,
  sentenceDetails,
  alreadyChecked,
  setAlreadyChecked,
  sectionid, 
  redo,
  setRedo
}) => {
  useEffect(() => {
    setOpen(true);
  }, [sentenceStatus]);

  const [open, setOpen] = useState(
    sentenceStatus.subcheck === 2 ? true : false
  );
  const [closeSatate, setCloseSatate] = useState("");
  const [snack, setSnack] = useState(false);
  const [opensubCheck, setOpenSubcheck] = useState(false);
  const [subSentenceText, setSubSentenceText] = useState("");
  const [subSentenceId, setsubSentenceId] = useState("");
  const [blanksLength, setBlanksLength] = useState({})
  const [editSentenceTab, setEditSentenceTab] = useState(false)
  const handleClose = () => {
    setSnack(false);
  };
  const store = Store();
  const updateStore = UpdateStore();
  const saveChanges = (
    sentence,
    sentenceid,
    serialName,
    SentenceNature,
    sectionId,
    datelength,
    dates,
    intlength,
    items,
    inputstrings,
    stringlength
  ) => {
   
    ////////////////////////////////////////////dates replacement////////////////////////////////////////////////////
    if(dates.length>0){
      /////
      if(datelength==0 || !datelength){
       const arr = sentence.split(regexeditdate);
       const strmatch=[];
       let match;
       while (match = regexeditdate.exec(sentence)) {
         strmatch.push(match.index)
       }
        let prevExtractedDate;
       strmatch.map((val,index)=>{
          prevExtractedDate = sentence.slice(val,val+10)
         if(dates[index]){
           sentence = sentence.replace(prevExtractedDate,dates[index]?.format())
         }
      })
      sentence = modifiedsentence? modifiedsentence:sentence;
      modifiedsentence=""
      }
      /////
      if(datelength!=0 && datelength){
       let arr=sentence.split(regexDate)
       const sentencewithDate = arr?.map((val, index)=>{
         modifiedsentence = modifiedsentence + val + " ";
          if(dates[index]){
           modifiedsentence = modifiedsentence + dates[index].format();
          }
          if(!dates[index] && index<datelength){
           modifiedsentence = modifiedsentence + " [date]"
          }
           }
          )
          sentence = modifiedsentence? modifiedsentence:sentence
       modifiedsentence=""
      }
     }
    else{
      sentence =  sentence?.replace(undefined,"")
    }
    ////////////////////////////////////////////dates replacement////////////////////////////////////////////////////
    ////////////////////////////////////////////levelsreplacement////////////////////////////////////////////////////
if(items?.length>0){
if(intlength!=0){
  let arrIntOccurence=sentence.split(regexInt)
  const sentencewithInt = arrIntOccurence?.map((val, index)=>{
    modifiedsentence = modifiedsentence + val + " ";
     if(items[index]){
      modifiedsentence = modifiedsentence + "," + items[index]?.name + ",";
     }
     if(!items[index] && index<intlength){
      modifiedsentence = modifiedsentence + " [int]"
     }
      }
     )
     sentence = modifiedsentence? modifiedsentence?.replace(undefined,""):sentence
     modifiedsentence=""
}
if(intlength==""){
const strmatch=[];
let tobereplacedarr =[];
      let match;
      while (match = regexeditInt.exec(sentence)) {
        strmatch.push({
          "index" : match.index,
          "length" : match[0]?.length 
        })
      }
      let prevExtractedInt;
      strmatch.map((val,index)=>{
         prevExtractedInt = sentence?.slice(val?.index,val?.index+val?.length)
         tobereplacedarr.push(prevExtractedInt)
        // if(items[index]?.name){
        //   sentence = sentence.replace(prevExtractedInt,","+items[index]?.name+",")
        // }
     })
     tobereplacedarr?.map((val,index)=>{
      if(items[index]?.name){
      sentence = sentence.replace(val, `,${items[index]?.name},`)
    }
    return sentence;
  })

     sentence = modifiedsentence? modifiedsentence?.replace(undefined,""):sentence;
     modifiedsentence=""
     
}
}
else{
  sentence =  sentence?.replace(undefined,"")
}
////////////////////////////////////////////levels replacement////////////////////////////////////////////////////
////////////////////////////////////////////Stringreplacement////////////////////////////////////////////////////     
if(inputstrings.length>0){
  if(stringlength!=0){
    let arrStrOccurence=sentence.split(regexString)
    const sentencewithInt = arrStrOccurence?.map((val, index)=>{
      modifiedsentence = modifiedsentence + val + " ";
       if(inputstrings[index]){
        modifiedsentence = modifiedsentence + "." + inputstrings[index]?.text + ".";
       }
       if(!inputstrings[index] && index<stringlength){
        modifiedsentence = modifiedsentence + " [string]"
       }
        }
       )
       sentence = modifiedsentence? modifiedsentence?.replace(undefined,""):sentence
       modifiedsentence=""
  }
  if(stringlength==""){
    const strmatch=[];
    const tobereplacedarr=[];
    const obj={}
    let match;
    while (match = regexeditstring.exec(sentence)) {
      strmatch.push({
        "index" : match.index,
        "length" : match[0]?.length 
      })
    }
    let tobereplaced;
    strmatch.map((val,index)=>{
       tobereplaced = sentence?.slice(val?.index,val?.index+val?.length)
       tobereplacedarr.push(tobereplaced)
   })
   tobereplacedarr.map((val,index)=>{
        if(inputstrings[index]?.text){
        sentence = sentence.replace(val, `.${inputstrings[index]?.text}.`)
      }
      return sentence;
    })
  
   sentence = sentence? sentence?.replace(undefined,""):sentence;
   modifiedsentence=""
  }
  
}
else{
  sentence = sentence
}
////////////////////////////////////////////Stringreplacement////////////////////////////////////////////////////
    sentence =  sentence?.replace(undefined,"")
    let index;
    const objIndex_ = alreadyChecked?.map((val)=>{
       index = val?.subchecks?.findIndex((subcheck)=>(
        subcheck?.sectionSubSentenceId==sentenceid
      ))
      if(index>=0){
        val.subchecks[index].modifiedSentenceText=sentence
      }
       })
    setSentenceDetails((pre) => {
      return {
        seriesname: serialName,
        sentenceNature: SentenceNature,
        text: sentence,
        id: sentenceid,
        sectionid: sectionId,
      };
    });
    setCloseSatate(sentenceid);
    const objIndex = subcheckData?.findIndex(
      (obj) => obj?.sectionSubSentencesId === sentenceid
    );
    subcheckData[objIndex].subSentenceText = sentence;
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  let newdata = [];
  let new2 = [];
  const a = alreadyChecked?.map((val) => val.subchecks);
  var merged = [].concat.apply([], a);
  const newarray = merged?.map((val) => {
    subcheckData?.map((valtwo) => {
      if (valtwo?.sectionSubSentencesId === val?.sectionSubSentenceId) {
        newdata?.push({
          ...valtwo,
          subSentenceText: val.modifiedSentenceText,
          alreadychecked: val.sectionSubSentenceId,
        });
      }
    });
  });
  newdata?.map((i) => {
    new2 = subcheckData.findIndex(
      (s) => s.sectionSubSentencesId === i.sectionSubSentencesId
    );
    subcheckData[new2] = i;
  });

  return (
    <>
      {
        <BootstrapDialog
          fullWidth={true}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="lg"
        >
          <BootstrapDialogTitle id="customized-dialog-title">
            Edit
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {subcheckData?.map((val) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      icon={<CircleUnchecked />}
                      checkedIcon={
                        <svg
                          style={{
                            background: `${val.sentenceColor}`,
                            padding: "9px 8px",
                            borderRadius: "100%",
                          }}
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.93143 9.80735C4.8085 9.93101 4.64077 10 4.46655 10C4.29232 10 4.1246 9.93101 4.00166 9.80735L0.288972 6.09406C-0.096324 5.70876 -0.096324 5.08398 0.288972 4.69941L0.753856 4.2344C1.13927 3.84911 1.76333 3.84911 2.14863 4.2344L4.46655 6.55244L10.7299 0.288972C11.1153 -0.096324 11.74 -0.096324 12.1247 0.288972L12.5896 0.753976C12.9748 1.13927 12.9748 1.76393 12.5896 2.14863L4.93143 9.80735Z"
                            fill="white"
                          />
                        </svg>
                      }
                      style={{
                        color: `${val?.sentenceColor}`,
                      }}
                      
                      //checked={subCheck? redo? setSubcheck(""): subCheck == val?.sectionSubSentencesId : (store?.implantationtabdata?.implantationsubchecked == val?.sectionSubSentencesId) || val?.sectionSubSentencesId === val?.alreadychecked}
                      checked={subCheck? redo? setSubcheck(""): subCheck == val?.sectionSubSentencesId : val?.sectionSubSentencesId === val?.alreadychecked}
                      onClick={() => {
                        setRedo(false)
                        setSentenceDetails((pre) => {
                          return {
                            sectionid: sectionid,
                            seriesname: serialName,
                            sentenceNature: val?.sentenceNature,
                            text: val?.subSentenceText,
                            id: val?.sectionSubSentencesId,
                          };
                        });

                        if (val?.sentenceNature === 1) {
                          setSubSentenceText(val?.subSentenceText);
                          setsubSentenceId(val?.sectionSubSentencesId);
                          setSubcheck(val?.sectionSubSentencesId);
                          updateStore({
                            implantationtabdata:{
                              ...store?.implantationtabdata,
                             implantationsubchecked: val?.sectionSubSentencesId
                          }})
                          setOpenSubcheck(true);
                        } else {
                          setCloseSatate(val?.sectionSubSentencesId);
                          setSubcheck(val?.sectionSubSentencesId);
                          updateStore({
                            implantationtabdata:{
                              ...store?.implantationtabdata,
                             implantationsubchecked: val?.sectionSubSentencesId
                          }})
                          setSubCheckIndex(subcheckIndex);
                        }
                      }}
                      classes={{ root: "custom-checkbox-root" }}
                    />
                    <p  onClick={() => {
                      setSentenceDetails((pre) => {
                        return {
                          ...pre,
                          sentenceNature: val?.sentenceNature,
                        };
                      });
                      setOpenSubcheck(true);
                      setEditSentenceTab(true)
                      setsubSentenceId(val?.sectionSubSentencesId);
                      setSubSentenceText(val?.subSentenceText);
                       let intlength =val?.subSentenceText.match(regexInt)
                       let strlength =val?.subSentenceText.match(regexString)
                       let datelength =val?.subSentenceText.match(regexDate)
                       let editdatelength =val?.subSentenceText.match(regexeditdate)
                       let editintlength =val?.subSentenceText.match(regexeditInt)
                       let regexeditString =val?.subSentenceText.match(regexeditstring)
                      setBlanksLength({
                        intLength:intlength?.length, 
                        strLength:strlength?.length,
                        datelength:datelength?.length,
                        editDateLength:editdatelength?.length,
                        editintLength:editintlength?.length,
                        strEditString:regexeditString?.length
                      })
                      console.log(datelength);
                    }} 
                    className="sentence"
                    >
                      {parse(val?.subSentenceText)}
                      </p>
                  </Box>
                  <img
                    src={pencil}
                    onClick={() => {
                      setSentenceDetails((pre) => {
                        return {
                          ...pre,
                          sentenceNature: val?.sentenceNature,
                        };
                      });
                      setOpenSubcheck(true);
                      setsubSentenceId(val?.sectionSubSentencesId);
                      setSubSentenceText(val?.subSentenceText);
                      setEditSentenceTab(false)
                    }}
                  />
                </Box>
              </>
            ))}
            <Snackbar
              severity="error"
              open={snack}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Veuillez sélectionner une option pour continuer"
              action={action}
              style={{ height: "100%" }}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                const arr = alreadyChecked?.map((val) => val?.subchecks);
                var merged = [].concat.apply([], arr);
                const b = merged.map((val) => val?.sectionSubSentenceId);
                getSubCheckListData(
                  sentenceDetails.id,
                  sentenceDetails.text,
                  sentenceDetails.sentenceNature,
                  sentenceDetails.seriesname,
                  sentenceDetails.sectionid
                );
                if (
                  (closeSatate == subCheck &&
                    closeSatate !== "" &&
                    subCheck !== "") ||
                  subCheck === sentenceDetails?.id ||
                  b.length > 0
                ) {
                  setOpen(false);
                  setCloseSatate("");
                } else {
                  setSnack(true);
                }
              }}
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      }
      <EditTextComp
        saveChanges={saveChanges}
        subSentenceId={subSentenceId}
        subSentenceText={subSentenceText}
        setSubSentenceText={setSubSentenceText}
        openSubcheck={opensubCheck}
        setOpenSubcheck={setOpenSubcheck}
        setSubcheck={setSubcheck}
        serialName={serialName}
        SentenceNature={sentenceDetails.sentenceNature}
        sectionid={sectionid}
        blanksLength={blanksLength}
        editSentenceTab={editSentenceTab}
        setEditSentenceTab={setEditSentenceTab}
      />
    </>
  );
};

export default Subchecklist;
