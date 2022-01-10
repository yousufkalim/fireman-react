import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Pencil from "../../assets/pencil.png"
import CreateIcon from '@mui/icons-material/Create';
import parse from 'html-react-parser';
import EditModal from "../Modals/EditCheckBox"




const CheckList = (props) => {
    const [open, setOpen] = React.useState(false);
    const [checklistdata,setChecklistdata] = React.useState({});
    const [checklists,setchecklists]=React.useState(props.accordionData.checkList && props.accordionData.checkList)
    const handleOpen = (data,i) => {
        setOpen(true)
        console.log("data",data)
        setChecklistdata({...data,id:i})
    };
    const handleClose = () => setOpen(false);
    const saveChanges=(sentence)=>{
   let a= checklists.map((data,i)=>{
       let dat={}
      if((props.accordionData.serialName+i)==checklistdata.id){
          dat={...data,sentenceText:sentence}
      }
      return data
    })
    console.log(a)

     console.log(sentence)
    }
    const [checked, setChacked] = React.useState("");
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
                                    onClick={() => setChacked(props.accordionData.serialName + i)}
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                                <p>{parse(data.sentenceText)}</p>

                                {/* <p>{props.accordionData.sentenceText}</p> */}
                            </div>
                            <div>
                                <CreateIcon onClick={()=>handleOpen(data,props.accordionData.serialName + i)} sx={{ cursor: "pointer" }} />
                            </div>
                        </div>
                    )
                })
            }
          <EditModal saveChanges={saveChanges} accordionData={checklistdata} open={open} handleClose={handleClose} />

        </>
    )
}

export default CheckList;