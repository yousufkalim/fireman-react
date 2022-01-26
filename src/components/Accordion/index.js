import * as React from 'react';
import { styled } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Pencil from "../../assets/pencil.png"
import Redo from "../../assets/redo.svg"
import Rightarrow from "../../assets/rightarrow.png";
import Leftarrow from "../../assets/leftarrow.png";
import Floppy from "../../assets/floppy.png";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IconButton } from '@mui/material';
import CheckList from '../CheckList';


const Accordion = styled((props) => (

    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: '#FFFFFF' }} sx={{ fontSize: '2rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? '#FFFFFF'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const AccordionComponent=(props)=>{
    
    return(
        <>
            <Accordion expanded={props.expanded === props.panelname} onChange={props.handleChange(props.panelname)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <p className='section_id'>451</p>
                <Typography>{props.accordionData.sectionName}</Typography>
               {props.completed ? <DoneIcon className='cehck_section' />:""} 
            </AccordionSummary>
            <AccordionDetails>
                {
                    props.accordionData.series &&
                    props.accordionData.series.map((series,i)=>{
                        return(
                            <>
              <CheckList series={series.serialName} index={i} accordionData={series} />                    
                           </>
                        )
                    })
                }
                <div className="checklist_detail_bottom">
                    <CheckCircleOutlineIcon style={{ color: "#BDC6D8", fontSize: "32px" }} />
                    <img src={Redo} />
                </div>


                {
            <div className='bottom_buttons'>
            <div className='bottom_buttons_left' >
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <img src={Floppy} />
                </IconButton>
            </div>
            <div className='bottom_buttons_right' >
                <Button sx={{ background: "#BDC6D8", ':hover': { background: "#BDC6D8" } }} style={{ marginRight: "12px" }} variant="contained"
                    startIcon={<img src={Leftarrow} />}
                >
                    PRECEDENT
                </Button>
                <Button endIcon={<img className='' src={Rightarrow} />} sx={{ background: "#3675B7", ':hover': { background: "#3675B7" } }} variant="contained">
                    SUIVANT
                </Button>
            </div>
        </div>   
        }
            </AccordionDetails>
        </Accordion>
        <Divider className='divider' variant="middle" />
       
    </>
    )
}

export default AccordionComponent;