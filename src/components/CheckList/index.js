import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import parse from "html-react-parser";
import EditModal from "../Modals/EditCheckBox";
import Subchecklist from "./Subchecklist";
import pencil from "../../assets/pencilediticon.png";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";

const regexInt = /\[int\]/g;
const regexString = /\[string\]/g;
const regexDate = /\[date\]/g;
const regexeditdate = /(\d{1,4}([\/])\d{1,2}([\/])\d{4})/g;
let regexeditInt = /[,](-?[0-9]{1,})[,]/g;
//let regexeditstring=/[.]([a-z]{1,})[.]/||/[.]([a-z]{1,}\s*?[a-z]{1,}?)[.]/
//let regexeditstring = /[.]([a-z]{1,}\s*?[a-z]{1,}?)[.]/g
let regexeditstring = /\.([^\.]+)\./g;
let modifiedsentence;

const CheckList = (props) => {
  const [open, setOpen] = React.useState(false);
  const [checklistdata, setChecklistdata] = React.useState({});
  const [subcheckData, setSubCheckData] = React.useState();
  const [subcheckIndex, setSubCheckIndex] = React.useState();
  const [index, setIndex] = React.useState("");
  const [checked, setChacked] = React.useState("");
  const [subCheck, setSubcheck] = React.useState("");
  const [datetab, setdatetab] = useState(false);
  const [sentenceStatus, setSentenceStatus] = React.useState({
    complete: false,
    incomplete: "",
    subcheck: "",
  });
  const [blanksLength, setBlanksLength] = useState({});
  const [sentenceDetails, setSentenceDetails] = useState({
    sentenceNature: "",
    seriesname: "",
    text: "",
    id: "",
    sectionid: "",
  });
  const [checklists, setchecklists] = React.useState(props.accordionData.checkList && props.accordionData.checkList);
  const store = Store();
  const updateStore = UpdateStore();
  const handleOpen = (data, i) => {
    setOpen(true);
    setChecklistdata({ ...data, id: i });
  };

  const handleClose = () => setOpen(false);

  
  const saveChanges = (...data) => {
    let [
      sentence,
      sentenceId,
      nature,
      seriesname,
      serialid,
      dates,
      level,
      datelength,
      ,
      ,
      items,
      intlength,
      inputstrings,
      stringlength,
    ] = data;
    console.log(data, "data");
    console.log(dates, "dates");

    ////////////////////////////////////////////Stringreplacement////////////////////////////////////////////////////
    if (inputstrings.length > 0) {
      if (stringlength != 0) {
        let arrStrOccurence = sentence.split(regexString);
        console.log(arrStrOccurence, "arrStrOccurence");
        const sentencewithInt = arrStrOccurence?.map((val, index) => {
          modifiedsentence = modifiedsentence + val + " ";
          if (inputstrings[index]) {
            modifiedsentence = modifiedsentence + "." + inputstrings[index]?.text + ".";
          }
          if (!inputstrings[index] && index < stringlength) {
            modifiedsentence = modifiedsentence + " [string]";
          }
        });
        sentence = modifiedsentence ? modifiedsentence?.replace(undefined, "") : sentence;
        modifiedsentence = "";
      }
      if (stringlength == "") {
        const strmatch = [];
        const tobereplacedarr = [];
        const obj = {};
        let match;
        while ((match = regexeditstring.exec(sentence))) {
          strmatch.push({
            index: match.index,
            length: match[0]?.length,
          });
        }
        console.log(strmatch, "strmatch");
        let tobereplaced;
        strmatch.map((val, index) => {
          tobereplaced = sentence?.slice(val?.index, val?.index + val?.length);
          tobereplacedarr.push(tobereplaced);
          //if(inputstrings[index]?.text){
          //sentence = sentence.replace(tobereplaced, `.${inputstrings[index]?.text}.`)
          //}
        });
        tobereplacedarr.map((val, index) => {
          if (inputstrings[index]?.text) {
            sentence = sentence.replace(val, `.${inputstrings[index]?.text}.`);
          }
          return sentence;
        });

        sentence = sentence ? sentence?.replace(undefined, "") : sentence;
        modifiedsentence = "";
      }
    } else {
      sentence = sentence;
    }
    ////////////////////////////////////////////Stringreplacement////////////////////////////////////////////////////

    ////////////////////////////////////////////levelsreplacement////////////////////////////////////////////////////
    if (items?.length > 0) {
      if (intlength != 0) {
        let arrIntOccurence = sentence.split(regexInt);
        console.log(arrIntOccurence, "arrIntOccurence");
        const sentencewithInt = arrIntOccurence?.map((val, index) => {
          modifiedsentence = modifiedsentence + val + " ";
          if (items[index]) {
            modifiedsentence = modifiedsentence + "," + items[index]?.name + ",";
            console.log(modifiedsentence, "modifiedsentence");
          }
          if (!items[index] && index < intlength) {
            modifiedsentence = modifiedsentence + " [int]";
          }
        });
        sentence = modifiedsentence ? modifiedsentence?.replace(undefined, "") : sentence;
        modifiedsentence = "";
      }
      console.log("sentence", sentence);
      if (intlength == "") {
        const strmatch = [];
        let tobereplacedarr = [];
        let match;
        while ((match = regexeditInt.exec(sentence))) {
          strmatch.push({
            index: match.index,
            length: match[0]?.length,
          });
        }
        let prevExtractedInt;
        strmatch.map((val, index) => {
          prevExtractedInt = sentence?.slice(val?.index, val?.index + val?.length);
          tobereplacedarr.push(prevExtractedInt);
          // if(items[index]?.name){
          //   sentence = sentence.replace(prevExtractedInt,","+items[index]?.name+",")
          // }
        });
        tobereplacedarr?.map((val, index) => {
          if (items[index]?.name) {
            sentence = sentence.replace(val, `,${items[index]?.name},`);
          }
          return sentence;
        });

        sentence = modifiedsentence ? modifiedsentence?.replace(undefined, "") : sentence;
        modifiedsentence = "";
      }
    } else {
      sentence = sentence?.replace(undefined, "");
    }
    ////////////////////////////////////////////levels replacement////////////////////////////////////////////////////

    ////////////////////////////////////////////dates replacement////////////////////////////////////////////////////
    if (dates.length > 0) {
      /////
      if (datelength == 0) {
        const arr = sentence.split(regexeditdate);
        const strmatch = [];
        let match;
        while ((match = regexeditdate.exec(sentence))) {
          strmatch.push(match.index);
        }
        let prevExtractedDate;
        strmatch.map((val, index) => {
          prevExtractedDate = sentence.slice(val, val + 10);
          if (dates[index]) {
            sentence = sentence.replace(prevExtractedDate, dates[index]?.format());
          }
        });
        sentence = modifiedsentence ? modifiedsentence : sentence;
        modifiedsentence = "";
      }
      /////
      if (datelength != 0) {
        let arr = sentence.split(regexDate);
        const sentencewithDate = arr?.map((val, index) => {
          modifiedsentence = modifiedsentence + val + " ";
          if (dates[index]) {
            modifiedsentence = modifiedsentence + dates[index].format();
          }
          if (!dates[index] && index < datelength) {
            modifiedsentence = modifiedsentence + " [date]";
          }
        });
        sentence = modifiedsentence ? modifiedsentence : sentence;
        modifiedsentence = "";
      }
    } else {
      sentence = sentence?.replace(undefined, "");
    }
    ////////////////////////////////////////////dates replacement////////////////////////////////////////////////////
  //   const objIndex = checklists.findIndex(
  //     (obj) => obj?.sectionSentencesId === sentenceId
  //   );
  //   checklists[objIndex].sentenceText = sentence;
  //   props.getModifiedSentence(sentence, sentenceId, nature, seriesname,serialid);
  // };
  const objIndex_ = checklists.findIndex(
    (obj) => obj?.sectionSentencesId === sentenceId
  );
  checklists[objIndex_].sentenceText = sentence;
     const copyalreadyChecked= [...props?.alreadyChecked]
       const objIndex = copyalreadyChecked?.findIndex(
        (obj) => obj?.sectionSentencesId === sentenceId
      );
      copyalreadyChecked[objIndex]=sentence
      console.log(copyalreadyChecked,"copyalreadyChecked")
      props?.setAlreadyChecked(copyalreadyChecked)
    //setchecklists((prev) => {
      //props.getModifiedSentence(sentence, sentenceId, nature, seriesname,serialid);
      // const index = prev.map((_) => _.sectionSentencesId).indexOf(sentenceId);
      // delete prev[index]?.sentenceText
      // prev[index] = {   sentenceText: sentence, ...prev[index] };
       //console.log(props?.alreadyChecked,"props?.alreadyChecked");
       //const copyalreadyChecked= [...props?.alreadyChecked]
       //const objIndex = copyalreadyChecked?.findIndex(
        //(obj) => obj?.sectionSentencesId === sentenceId
      //);
      //copyalreadyChecked[objIndex]=sentence
      //console.log(copyalreadyChecked,"copyalreadyChecked")
      //props?.setAlreadyChecked(copyalreadyChecked)
       ////
      //return prev;
    //});
    props.getModifiedSentence(sentence, sentenceId, nature, seriesname, serialid);
  };
  let newdata = [];
  let new2 = [];
  const newarray =
    props?.alreadyChecked &&
    props?.alreadyChecked?.map((val) => {
      checklists.map((valtwo) => {
        if (valtwo.sectionSentencesId === val.sectionSentencesId) {
          newdata.push({
            ...valtwo,
            sentenceText: val.modifiedSentenceText,
            alreadychecked: val.sectionSentencesId,
          });
        }
      });
    });
  newdata.map((i) => {
    new2 = checklists.findIndex((s) => s.sectionSentencesId === i.sectionSentencesId);
    checklists[new2] = i;
  });
  return (
    <>
      {props?.index != 0 ? (
        <h3 style={{ visibility: "hidden", marginBottom: "50px" }}>
          {props.accordionData.serialName} {props.accordionData.serialId}
        </h3>
      ) : null}
      {checklists &&
        checklists.map((data, i) => {
          return (
            <div className={`checklist ${checked == props.accordionData.serialName + i ? "checklist-border" : ""}`}>
              <div className="checklist_content">
                <Checkbox
                  icon={<CircleUnchecked />}
                  checkedIcon={
                    <svg
                      style={{
                        background: `${data.sentenceColor}`,
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
                    color: `${data.sentenceColor}`,
                  }}
                  checked={
                    checked
                      ? props.redo
                        ? setChacked("")
                        : // (checked == props.accordionData?.serialName + i): (data?.alreadychecked===data?.sectionSentencesId && !props.redo) || (props.accordionData?.serialName + i == store?.implantationtabdata?.implantationchecked && !props.redo)}
                          checked == props.accordionData?.serialName + i
                      : data?.alreadychecked === data?.sectionSentencesId && !props.redo
                  }
                  onClick={() => {
                    props.setRedo(false);
                    if (data?.sentenceNature !== 1) {
                      props.onClick(
                        data.sectionSentencesId,
                        data.sentenceText,
                        props.accordionData.serialName,
                        data.sentenceNature,
                        props.accordionData.serialId
                      );
                    }
                    if (data.sentenceNature === 0) {
                      setSubcheck("");
                      props.getSubCheckListData("0", "", "", props.accordionData.serialName, props.accordionData.serialId);
                      updateStore({
                        implantationtabdata: {
                          ...store?.implantationtabdata,
                          implantationchecked: props.accordionData.serialName + i,
                        },
                      });
                    }
                    if (data.sentenceNature === 1) {
                      props.setSentenceText(data.sentenceText);
                      handleOpen(data, props.accordionData.serialName + i);
                      setIndex(i);
                      setChacked(props.accordionData.serialName + i);
                      updateStore({
                        implantationtabdata: {
                          ...store?.implantationtabdata,
                          implantationchecked: props.accordionData.serialName + i,
                        },
                      });
                      setSubcheck("");
                      props.getSubCheckListData("0", "", "", props.accordionData.serialName, props.accordionData.serialId);
                    }
                    if (data.sentenceNature === 2) {
                      setChacked(props.accordionData.serialName + i);
                      updateStore({
                        implantationtabdata: {
                          ...store?.implantationtabdata,
                          implantationchecked: props.accordionData.serialName + i,
                        },
                      });
                      setSubCheckIndex(i);
                    }
                    setSentenceStatus(() => {
                      return {
                        complete: data.sentenceNature === 0 ? setChacked(props.accordionData.serialName + i) : false,
                        subcheck: data.sentenceNature === 2 ? data.sentenceNature : "",
                      };
                    });
                    setSubCheckData(data.subchecks);
                  }}
                  classes={{ root: "custom-checkbox-root" }}
                />
                <Box className={`checkbox-border ${checked == props.accordionData.serialName + i ? "checkbox-bord" : ""}`}></Box>
                <p
                  onClick={() => {
                    // alert("hit")
                    handleOpen(data, props.accordionData.serialName + i);
                    props.setSentenceText(data.sentenceText);
                    setIndex(i);
                    setdatetab(true);
                    let intlength = data?.sentenceText.match(regexInt);
                    let strlength = data?.sentenceText.match(regexString);
                    let datelength = data?.sentenceText.match(regexDate);
                    let editdatelength = data?.sentenceText.match(regexeditdate);
                    let editintlength = data?.sentenceText.match(regexeditInt);
                    let regexeditString = data?.sentenceText.match(regexeditstring);
                    setBlanksLength({
                      intLength: intlength?.length,
                      strLength: strlength?.length,
                      datelength: datelength?.length,
                      editDateLength: editdatelength?.length,
                      editintLength: editintlength?.length,
                      strEditString: regexeditString?.length,
                    });
                    console.log(datelength);
                  }}
                  className={`sentence ${checked == props.accordionData.serialName + i ? "sentence-bold" : ""}`}
                >
                  {parse(data.sentenceText)}
                </p>
              </div>
              <div>
                <img
                  src={pencil}
                  onClick={() => {
                    console.log(data);
                    handleOpen(data, props.accordionData.serialName + i);
                    props.setSentenceText(data.sentenceText);
                    setIndex(i);
                    setdatetab(false);
                  }}
                  sx={{ cursor: "pointer" }}
                />
              </div>
            </div>
          );
        })}
      {sentenceStatus.subcheck === 2 ? (
        <Subchecklist
          subcheckData={subcheckData}
          sentenceStatus={sentenceStatus}
          setSentenceStatus={setSentenceStatus}
          subCheck={subCheck}
          setSubcheck={setSubcheck}
          setSubCheckIndex={setSubCheckIndex}
          subcheckIndex={subcheckIndex}
          serialName={props.accordionData.serialName}
          getSubCheckListData={props.getSubCheckListData}
          setSentenceDetails={setSentenceDetails}
          sentenceDetails={sentenceDetails}
          alreadyChecked={props?.alreadyChecked}
          setAlreadyChecked={props?.setAlreadyChecked}
          sectionid={props.accordionData.serialId}
          redo={props.redo}
          setRedo={props.setRedo}
        />
      ) : null}
      <EditModal
        saveChanges={saveChanges}
        seriesName={props.accordionData.serialName}
        sectionid={props.accordionData.serialId}
        accordionData={checklistdata}
        setOpen={setOpen}
        open={open}
        handleClose={handleClose}
        setSubcheck={setSubcheck}
        blanksLength={blanksLength}
        dateLength={blanksLength?.datelength}
        datetab={datetab}
        sentenceText={props?.sentenceText}
      />
    </>
  );
};

export default CheckList;
