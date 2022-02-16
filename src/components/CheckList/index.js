import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CreateIcon from "@mui/icons-material/Create";
import parse from "html-react-parser";
import EditModal from "../Modals/EditCheckBox";
import Subchecklist from "./Subchecklist";
import Button from "@mui/material/Button";
import Rightarrow from "../../assets/rightarrow.png";
import Leftarrow from "../../assets/leftarrow.png";
import Floppy from "../../assets/floppy.png";
import pencil from "../../assets/pencilediticon.png";
import { IconButton } from "@mui/material";
import don from "../../assets/don.png";
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
  });
  const [checklists, setchecklists] = React.useState(
    props.accordionData.checkList && props.accordionData.checkList
  );
  const handleOpen = (data, i) => {
    setOpen(true);
    setChecklistdata({ ...data, id: i });
  };

  const handleClose = () => setOpen(false);
  const saveChanges = (sentence, sentenceId, nature, seriesname) => {
    console.log("sentence", sentence);
    const objIndex = checklists.findIndex(
      (obj) => obj?.sectionSentencesId === sentenceId
    );
    checklists[objIndex].sentenceText = sentence;
    props.getModifiedSentence(sentence, sentenceId, nature, seriesname);
    //    let a= checklists.map((data,i)=>{
    //        let dat={}
    //       if((props.accordionData.serialName+i)==checklistdata.id){
    //           dat={...data,sentenceText:sentence}
    //       }
    //       return data
    //     })
  };

 
  let newdata = [];
  let new2=[]
  const newarray = props?.alreadyChecked.map((val)=>{
    checklists.map((valtwo)=>{
      if(valtwo.sectionSentencesId===val.sectionSentencesId){
              newdata.push({
                ...valtwo,
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
  console.log("checklistparent", checklists);
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
                  checked={checked? checked == props.accordionData.serialName + i : data?.alreadychecked===data?.sectionSentencesId}
                  onClick={() => {
                    if (data.sentenceNature !== 1) {
                      props.onClick(
                        data.sectionSentencesId,
                        data.sentenceText,
                        props.accordionData.serialName,
                        data.sentenceNature,
                        props.accordionData.serialId
                      );
                    }
                    console.log("data.subchecks", data);
                    console.log("index", i);
                    //setChacked(props.accordionData.serialName + i)
                    if (data.sentenceNature === 0) {
                      setSubcheck("");
                      // setSentenceDetails(()=>{
                      //     return{
                      //         seriesname:props.accordionData.serialName,
                      //         sentenceNature:data.sentenceNature,
                      //         text:data.sentenceText,
                      //         id:data.sectionSentencesId
                      //     }

                      // })
                      props.getSubCheckListData(
                        "0",
                        "",
                        "",
                        props.accordionData.serialName
                      );
                    }
                    if (data.sentenceNature === 1) {
                      console.log(data.sectionSentencesId);
                      handleOpen(data, props.accordionData.serialName + i);
                      setIndex(i);
                      setChacked(props.accordionData.serialName + i);
                      setSubcheck("");
                      //    setSentenceDetails(()=>{
                      //         return{
                      //             seriesname:props.accordionData.serialName,
                      //             sentenceNature:data.sentenceNature,
                      //             text:data.sentenceText,
                      //             id:data.sectionSentencesId
                      //         }

                      //     })
                      props.getSubCheckListData(
                        "0",
                        "",
                        "",
                        props.accordionData.serialName
                      );
                    }
                    if (data.sentenceNature === 2) {
                      setChacked(props.accordionData.serialName + i);
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
                    console.log(
                      "sentenceStatus.incomplete<>><",
                      sentenceStatus.incomplete
                    );
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
        />
      ) : null}
      <EditModal
        saveChanges={saveChanges}
        seriesName={props.accordionData.serialName}
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
