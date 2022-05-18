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
const CheckList = (props) => {


  const [open, setOpen] = React.useState(false);
  const [checklistdata, setChecklistdata] = React.useState({});
  const [subcheckData, setSubCheckData] = React.useState();
  const [subcheckIndex, setSubCheckIndex] = React.useState();
  const [index, setIndex] = React.useState("");
  const [checked, setChacked] = React.useState("");
  const [subCheck, setSubcheck] = React.useState("");
  const [sentenceStatus, setSentenceStatus] = React.useState({
    complete: false,
    incomplete: "",
    subcheck: "",
  });
  const [sentenceDetails, setSentenceDetails] = useState({
    sentenceNature: "",
    seriesname: "",
    text: "",
    id: "",
    sectionid:""
  });
  const [checklists, setchecklists] = React.useState(
    props.accordionData.checkList && props.accordionData.checkList
  );
  const store = Store();
  const updateStore = UpdateStore();
  const handleOpen = (data, i) => {
    setOpen(true);
    setChecklistdata({ ...data, id: i });
  };

  const handleClose = () => setOpen(false);
  const saveChanges = (sentence, sentenceId, nature, seriesname, sectiontype, serialid) => {
    const objIndex = checklists.findIndex(
      (obj) => obj?.sectionSentencesId === sentenceId
    );
    checklists[objIndex].sentenceText = sentence;
    props.getModifiedSentence(sentence, sentenceId, nature, seriesname,serialid);
  };
  let newdata = [];
  let new2=[]
  const newarray = props?.alreadyChecked && props?.alreadyChecked?.map((val)=>{
    checklists.map((valtwo)=>{
      if(valtwo.sectionSentencesId===val.sectionSentencesId){
              newdata.push({
                ...valtwo,
                sentenceText:val.modifiedSentenceText,
                alreadychecked:val.sectionSentencesId
              })
            }
    })    
  })
   newdata.map((i) => {
    new2 = checklists.findIndex(
      (s) => s.sectionSentencesId === i.sectionSentencesId
    );
    checklists[new2] = i;
  });
  console.log(store);
console.log(checked);
  console.log(store?.implantationtabdata?.implantationchecked);
 
  return (
    <>
    {
         props?.index!=0?(
          <h3 style={{ visibility: "hidden", marginBottom:"50px" }}>
          {props.accordionData.serialName} {props.accordionData.serialId}
        </h3>
         ):null
         
}
      {checklists &&
        checklists.map((data, i) => {
          return (
            <div
              className={`checklist ${
                checked == props.accordionData.serialName + i
                  ? "checklist-border"
                  : ""
              }`}
            >
               {console.log(store?.implantationtabdata?.implantationchecked,"lk")}
               {console.log(props.accordionData?.serialName + i,"bk")}
              <div className="checklist_content">
               
                <Checkbox
                  icon={<CircleUnchecked/>}
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
                    checked?
                     props.redo? setChacked(""):
                    // (checked == props.accordionData?.serialName + i): (data?.alreadychecked===data?.sectionSentencesId && !props.redo) || (props.accordionData?.serialName + i == store?.implantationtabdata?.implantationchecked && !props.redo)}
                    (checked == props.accordionData?.serialName + i): (data?.alreadychecked===data?.sectionSentencesId && !props.redo)}
                    onClick={() => {
                    props.setRedo(false)
                    if (data?.sentenceNature !== 1) {
                      props.onClick(
                        data.sectionSentencesId,
                        data.sentenceText,
                        props.accordionData.serialName,
                        data.sentenceNature,
                        props.accordionData.serialId,
                      );
                    }
                    if (data.sentenceNature === 0) {
                      setSubcheck("");
                      props.getSubCheckListData(
                        "0",
                        "",
                        "",
                        props.accordionData.serialName,
                        props.accordionData.serialId
                      );
                      updateStore({
                        implantationtabdata:{
                          ...store?.implantationtabdata,
                         implantationchecked: props.accordionData.serialName + i
                      }})
                    }
                    if (data.sentenceNature === 1) {
                      handleOpen(data, props.accordionData.serialName + i);
                      setIndex(i);
                      setChacked(props.accordionData.serialName + i);
                      updateStore({
                        implantationtabdata:{
                          ...store?.implantationtabdata,
                         implantationchecked:props.accordionData.serialName + i
                      }})
                      setSubcheck("");
                      props.getSubCheckListData(
                        "0",
                        "",
                        "",
                        props.accordionData.serialName,
                        props.accordionData.serialId
                      );
                    }
                    if (data.sentenceNature === 2) {
                      setChacked(props.accordionData.serialName + i);
                      updateStore({
                        implantationtabdata:{
                          ...store?.implantationtabdata,
                         implantationchecked:props.accordionData.serialName + i
                      }})
                      setSubCheckIndex(i);
                    }
                    setSentenceStatus(() => {
                      return {
                        complete:
                          data.sentenceNature === 0
                            ? setChacked(props.accordionData.serialName + i)
                            : false,
                        subcheck:
                          data.sentenceNature === 2 ? data.sentenceNature : "",
                      };
                    });
                    setSubCheckData(data.subchecks);
                    
                  }}
                  classes={{ root: "custom-checkbox-root" }}
                />
                <Box
                  className={`checkbox-border ${
                    checked == props.accordionData.serialName + i
                      ? "checkbox-bord"
                      : ""
                  }`}
                ></Box>
                <p
                 onClick={() => {
                  handleOpen(data, props.accordionData.serialName + i);
                  props.setSentenceText(data.sentenceText);
                  setIndex(i);
                }}
                  className={`sentence ${
                    checked == props.accordionData.serialName + i
                      ? "sentence-bold"
                      : ""
                  }`}
                >
                  {parse(data.sentenceText)}
                </p>
              </div>
              <div>
                <img
                  src={pencil}
                  onClick={() => {
                    handleOpen(data, props.accordionData.serialName + i);
                    props.setSentenceText(data.sentenceText);
                    setIndex(i);
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
          subcheckData={subcheckData}
          subCheck={subCheck}
          setSubcheck={setSubcheck}
          setSubCheckIndex={setSubCheckIndex}
          subcheckIndex={subcheckIndex}
          serialName={props.accordionData.serialName}
          getSubCheckListData={props.getSubCheckListData}
          setSentenceDetails={setSentenceDetails}
          sentenceDetails={sentenceDetails}
          alreadyChecked={props?.alreadyChecked}
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
      />
    </>
  );
};

export default CheckList;