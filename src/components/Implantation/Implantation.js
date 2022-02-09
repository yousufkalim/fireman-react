import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';
import Rightarrow from "../../assets/rightarrow.png";
import Leftarrow from "../../assets/leftarrow.png";
import Floppy from "../../assets/floppy.png";
import { fabClasses, IconButton } from '@mui/material';
import AccordionComponent from '../Accordion';

const Implantation = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [expand, setExpand] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const onSubmit = (sectionindex, chapterindex)=>{
        console.log("id",sectionindex,chapterindex);
    }
    return (
        <> 
        <div className="etablissement">
            <div className='chapter'>
                <h3>{props.accordionData.chapterName}</h3>
                {
                    expand ?
                    <ExpandLessIcon sx={{cursor:"pointer"}} onClick={()=>{setExpand(false)}} />
                    :
                    <ExpandMoreIcon sx={{cursor:"pointer"}} onClick={()=>{setExpand(true)}} />

                }
            </div>
       { expand?
                props.accordionData.sections &&
                props.accordionData.sections.map((data,i)=>{
                return(
                    <div>
                  <div className='sections'>
                      <AccordionComponent chapterindex={props.index} sectionindex={i} onSubmit={onSubmit} accordionData={data} completed={true} handleChange={handleChange} expanded={expanded} panelname={data.sectionName} />
                  </div>
              </div>
                )
                })
           :
           ""
            }
        </div>
        
        </>
    )
}
export default Implantation;