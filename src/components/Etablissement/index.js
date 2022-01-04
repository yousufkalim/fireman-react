import * as React from 'react';
import { styled } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Pencil from "../../assets/pencil.png"
import Redo from "../../assets/redo.svg"
import Rightarrow from "../../assets/rightarrow.png";
import Leftarrow from "../../assets/leftarrow.png";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



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

const Etablissement = () => {
    const [expanded, setExpanded] = React.useState(false);
    const chk = React.useRef(null);





    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <div className="etablissement">
            <div className='chapter'>
                <h3>Nom du chapitre </h3>
                <ExpandMoreIcon />
            </div>
            <div>
                <div className='sections'>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <p className='section_id'>451</p>
                            <Typography>Collapsible Group Item #1</Typography>
                            <DoneIcon className='cehck_section' />
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='checklist'>
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    style={{
                                        color: "#66bb6a"
                                    }}
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                                <p>La visite concerne le chantier de construction suivant :__.</p>
                                <img className='edit_icon' src={Pencil} />
                            </div>
                            <div className='checklist'>
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    style={{
                                        color: "#FFB31F"
                                    }}
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                                <p>La visite concerne le chantier de construction suivant :__.</p>
                                <img className='edit_icon' src={Pencil} />
                            </div>
                            <div className="checklist_detail_bottom">
                                <CheckCircleOutlineIcon style={{ color: "#BDC6D8", fontSize: "32px" }} />
                                <img src={Redo} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Divider className='divider' variant="middle" />
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <p className='section_id'>452</p>
                            <Typography>Collapsible Group Item #2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='checklist'>
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    style={{
                                        color: "#66bb6a"
                                    }}
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                                <p>La visite concerne le chantier de construction suivant :__.</p>
                                <img className='edit_icon' src={Pencil} />
                            </div>
                            <div className='checklist'>
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    style={{
                                        color: "#FFB31F"
                                    }}
                                    classes={{ root: 'custom-checkbox-root' }}
                                />
                                <p>La visite concerne le chantier de construction suivant :__.</p>
                                <img className='edit_icon' src={Pencil} />
                            </div>
                            <div className="checklist_detail_bottom">
                                <CheckCircleOutlineIcon style={{ color: "#BDC6D8", fontSize: "32px" }} />
                                <img src={Redo} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className='bottom_buttons'>
                        <Button sx={{background:"#BDC6D8",':hover':{background:"#BDC6D8"}}}  style={{marginRight:"12px"}} variant="contained" 
                        startIcon={<img src={Leftarrow} />}
                        >
                            PRECEDENT
                        </Button>
                        <Button  endIcon={<img className='' src={Rightarrow} />} sx={{background:"#3675B7",':hover':{background:"#3675B7"}}} variant="contained">
                        SUIVANT
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Etablissement;