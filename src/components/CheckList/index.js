import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CreateIcon from '@mui/icons-material/Create';
import parse from 'html-react-parser';
import EditModal from "../Modals/EditCheckBox"
import Subchecklist from './Subchecklist';
import Button from '@mui/material/Button';
import Rightarrow from "../../assets/rightarrow.png";
import Leftarrow from "../../assets/leftarrow.png";
import Floppy from "../../assets/floppy.png";
import { IconButton } from '@mui/material';

const CheckList = (props) => {
    const [open, setOpen] = React.useState(false);
    const [checklistdata,setChecklistdata] = React.useState({});
    const [subcheckData,setSubCheckData] = React.useState();
    const [subcheckIndex,setSubCheckIndex] = React.useState();
    const [index, setIndex] = React.useState("");
    const [checked, setChacked] = React.useState("");
    const [subCheck, setSubcheck] = React.useState("");
    const [sentenceStatus, setSentenceStatus] = React.useState({
        complete:false,
        incomplete:"",
        subcheck:""
    });
    const [checklists,setchecklists]=React.useState(props.accordionData.checkList && props.accordionData.checkList)
    const handleOpen = (data,i) => {
        setOpen(true)
        setChecklistdata({...data,id:i})
    };
    const handleClose = () => setOpen(false);
    const saveChanges=(sentence)=>{
         console.log(index);
         console.log(checklists);  
       const objIndex = checklists.findIndex((obj => obj?.sectionSentencesId === index+1));
      
       checklists[objIndex].sentenceText = sentence
       console.log(checklists[7].sentenceText);

    //    const a = parse(sentence)
    //     checklists[objIndex].sentenceText = a
       //console.log(checklists[7].sentenceText=sentence);
       //console.log(checklists[objIndex].sentenceText );
//    let a= checklists.map((data,i)=>{
//        let dat={}
//       if((props.accordionData.serialName+i)==checklistdata.id){
//           dat={...data,sentenceText:sentence}
//       }
//       return data
//     })
    }
     console.log("nm",subCheck);
    return (
        <>  
            <h3 style={{ visibility: "hidden" }}>{props.accordionData.serialName}</h3>
            {
                checklists &&
                checklists.map((data, i) => {
                    return (
                        <div className='checklist'>
                            <div className='checklist_content'>
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    style={{
                                        color: `${data.sentenceColor}`,
                                    }}
                                    checked={checked == props.accordionData.serialName + i}
                                    onClick={() => {
                                        console.log("data.subchecks",data);
                                        console.log("index", i);
                                        //setChacked(props.accordionData.serialName + i)
                                        if(data.sentenceNature===1){
                                            handleOpen(data,props.accordionData.serialName + i); 
                                            setIndex(i);
                                            setChacked(props.accordionData.serialName + i)  
                                        }
                                        if(data.sentenceNature===2){
                                            setChacked(props.accordionData.serialName + i);
                                            setSubCheckIndex(i) 
                                        }
                                        setSentenceStatus(()=>{
                                          return{
                                            complete:data.sentenceNature===0? setChacked(props.accordionData.serialName + i):false,
                                            subcheck:data.sentenceNature===2?  data.sentenceNature:""  
                                          }
                                        })
                                        setSubCheckData(data.subchecks)
                                        console.log("sentenceStatus.incomplete<>><",sentenceStatus.incomplete) 
                                    }
                                     
                                }
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                                <p>{parse(data.sentenceText)}</p>
                                  
                            </div>
                            <div>
                                <CreateIcon onClick={()=>{handleOpen(data,props.accordionData.serialName + i); setIndex(i)}} sx={{ cursor: "pointer" }} />
                            </div>
                        </div>
                    )
                })
            }
            {sentenceStatus.subcheck===2? 
                                 <Subchecklist 
                                 subcheckData={subcheckData} 
                                 sentenceStatus={sentenceStatus} 
                                 setSentenceStatus={setSentenceStatus} 
                                 subcheckData={subcheckData}
                                 subCheck={subCheck}
                                 setSubcheck={setSubcheck}
                                 setSubCheckIndex={setSubCheckIndex}
                                 subcheckIndex={subcheckIndex}
                                 />
                                 :null}
          <EditModal saveChanges={saveChanges} accordionData={checklistdata} setOpen={setOpen} open={open} handleClose={handleClose} />
           
        </>
    )
}

export default CheckList;