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
    const [index, setIndex] = React.useState("");
    const [checked, setChacked] = React.useState("");
    const [sentenceStatus, setSentenceStatus] = React.useState({
        complete:false,
        incomplete:false,
        subcheck:false
    });
    const [checklists,setchecklists]=React.useState(props.accordionData.checkList && props.accordionData.checkList)
    const handleOpen = (data,i) => {
        setOpen(true)
        setChecklistdata({...data,id:i})
    };
    const handleClose = () => setOpen(false);
    const saveChanges=(sentence)=>{
       
       const objIndex = checklists.findIndex((obj => obj.sectionSentencesId === index+1));
        checklists[objIndex].sentenceText = sentence
//    let a= checklists.map((data,i)=>{
//        let dat={}
//       if((props.accordionData.serialName+i)==checklistdata.id){
//           dat={...data,sentenceText:sentence}
//       }
//       return data
//     })
    }

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
                                        setChacked(props.accordionData.serialName + i)
                                        setSentenceStatus(()=>{
                                          return{
                                            complete:data.sentenceNature===0? true:false,
                                            incomplete:data.sentenceNature===1? true:false,
                                            subcheck:data.sentenceNature===2? true:false
                                              
                                          }
                                        })
                                        setSubCheckData(data.subchecks)
                                    }
                                }
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                                <p>{parse(data.sentenceText)}</p>
                                 <Subchecklist 
                                 subcheckData={subcheckData} 
                                 sentenceStatus={sentenceStatus} 
                                 setSentenceStatus={setSentenceStatus} 
                                 setOpen={setOpen} 
                                 open={open} 
                                 handleClose={handleClose}  
                                 subcheckData={subcheckData}/>
                                 
                            </div>
                            <div>
                                <CreateIcon onClick={()=>{handleOpen(data,props.accordionData.serialName + i); setIndex(i)}} sx={{ cursor: "pointer" }} />
                            </div>
                        </div>
                    )
                })
            }
          <EditModal saveChanges={saveChanges} accordionData={checklistdata} setOpen={setOpen} open={open} handleClose={handleClose} />
         
        </>
    )
}

export default CheckList;