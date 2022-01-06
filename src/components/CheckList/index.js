import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Pencil from "../../assets/pencil.png"
import CreateIcon from '@mui/icons-material/Create';
import parse from 'html-react-parser';
import EditModal from "../Modals/EditCheckBox"




const CheckList=(props)=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checked, setChacked] = React.useState("");

    return(
        <div className='checklist'>
         <div className='checklist_content'>   
        <Checkbox
            icon={<CircleUnchecked />}
            checkedIcon={<CircleCheckedFilled />}
            style={{
                color: `${props.accordionData.sentenceColor}`,
            }}
            checked={checked}
            onClick={()=>setChacked(props.series)}
            classes={{ root: 'custom-checkbox-root' }}
        />
        <p>{parse(props.accordionData.sentenceText)}</p>

        {/* <p>{props.accordionData.sentenceText}</p> */}
        </div>
        <div>
        <CreateIcon onClick={handleOpen} sx={{cursor:"pointer"}}  />
        <EditModal accordionData={props.accordionData} open={open} handleClose={handleClose} />
            </div>
    </div>
    )
}

export default CheckList;