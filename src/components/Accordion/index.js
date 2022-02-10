import  React,{useState} from 'react';
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
import { Store } from '../../StoreContext';
import api from '../../api/index';
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";

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
    const { t } = useTranslation();
    const [sentenceText, setSentenceText] = useState("");
    const [values, setValues] = useState({
        sentenceId:"",
        sentencetext:"",
        sentencemodified:"",
        seriesName:"",
        sentenceNature:""
    });
    const [seriesValues, setSeriesValues] = useState([]);
    const [subCheckValues, setSubCheckValues] = useState([]);
    const store = Store();
      const onClick = (sentenceid, text, seriesname, nature, serialid)=>{
            console.log("71",sentenceid, text, seriesname, nature, serialid); 
                setValues((pre)=>{
                    return{
                        ...pre,
                      sentenceId: sentenceid,
                      sentencetext:text,
                      seriesName:seriesname,
                      sentenceNature:nature,
                      serialid:serialid
                    }
                })
            
                setSeriesValues((pre)=>[...pre.filter((obj)=>(obj.seriesName!=seriesname)), {completedSentence:nature==1?text:"", serialId:serialid, caseFileCheckListId: sentenceid,modifiedSentence:text,subCheck:[], seriesName:seriesname}])
           
      }
      const getModifiedSentence=(text, sentenceid,nature, seriesname )=>{
        console.log("89",sentenceid, text, seriesname, nature); 
          setValues((pre)=>{
            return{
                ...pre,
              sentenceId: sentenceid,
              sentencetext:text,
              seriesName:seriesname,
              sentenceNature:nature
            }
        })
    
        setSeriesValues((pre)=>[...pre.filter((obj)=>(obj.seriesName!=seriesname)), {completedSentence:nature==1?text:"", caseFileCheckListId: sentenceid,modifiedSentence:text,subCheck:[],  seriesName:seriesname}])
        
      } 
      const getSubCheckListData =(id,text,sentenceNature,seriesname)=>{
        console.log("Details",id,text,sentenceNature,seriesname);

          setSubCheckValues((pre)=>[...pre.filter((obj)=>(obj.seriesname!=seriesname)), {seriesname:seriesname, subCheckListId:id,modifiedSentence:text, completedSentence:sentenceNature==1?text:""}])
        //  setSubCheckValues((pre)=>[...pre.filter((obj)=>(obj.seriesname!=sentenceDetails?.seriesname)),{seriesname:sentenceDetails.seriesname, subCheckListId:sentenceDetails.id,modifiedSentence:sentenceDetails.text, completedSentence:sentenceDetails.sentenceNature==1?sentenceDetails.text:""}])
     }
     console.log(seriesValues,"><>seriesValues outside");
     const onSubmit =(section,chapter)=>{
        console.log(seriesValues,"><>seriesValues");
        console.log("subCheckValues",subCheckValues);
        console.log(values,"values");
         console.log("/..",section,chapter);
         let newdata=[]
         let new2=[]
          seriesValues?.map((item,index)=>{
            subCheckValues?.map((sub)=>{  
                if(sub.seriesname===item.seriesName){
                    newdata.push({...item,  subCheck: [{completedSentence: sub.completedSentence, subCheckListId:sub.subCheckListId,modifiedSentence:sub.modifiedSentence}]})
                } 
            })
         })
         newdata.map(i=>{
             new2=seriesValues.findIndex(s=>s.caseFileCheckListId ===i.caseFileCheckListId)
              //new2.push( i)
              seriesValues[new2]=i
         })
         console.log("sereewwww",seriesValues)
        
         const obj = {
            caseFileId:store.caseFileId,
            chapterIndex:chapter,
            tabIndex:store.activeNavbarTab+1,
            sectionIndex:section,
            checks: seriesValues
         }
          api("post","/api/v1/checkList/save_tabs_checklist",obj).then((res)=>{
              console.log("impres",res);
            if(res.data===true){
                toast.success(t("Successfull"));
            }
          })
          console.log("obj", obj);
      }
    return(
        <>
            <Accordion expanded={props.expanded === props.panelname} onChange={props.handleChange(props.panelname)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <p id={props.sectionindex} className='section_id'>{props.sectionindex}</p>
                <Typography>{props.accordionData.sectionName}</Typography>
               {props.completed ? <DoneIcon className='cehck_section' />:""} 
            </AccordionSummary>
            <AccordionDetails>
                {
                    props.accordionData.series &&
                    props.accordionData.series.map((series,i)=>{
                        return(
                            <>
              <CheckList  onClick={onClick} getSubCheckListData={getSubCheckListData} getModifiedSentence={getModifiedSentence} setSentenceText={setSentenceText} chapterindex={props.chapterindex+1} sectionindex={props.sectionindex}  series={series.serialName} index={i} accordionData={series} />                    
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
                <Button onClick={()=>onSubmit(props.sectionindex+1,props.chapterindex+1)}
                endIcon={<img className='' src={Rightarrow} />} sx={{ background: "#3675B7", ':hover': { background: "#3675B7" } }} variant="contained">
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