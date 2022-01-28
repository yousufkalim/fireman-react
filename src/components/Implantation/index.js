import React, {useEffect, useState} from 'react';
import ImplantationData from "./Implantation";
import Button from '@mui/material/Button';
import Rightarrow from "../../assets/rightarrow.png";
import Leftarrow from "../../assets/leftarrow.png";
import Floppy from "../../assets/floppy.png";
import { IconButton } from '@mui/material';
import api from '../../api/index'






const Implantation = (props) => {
    let [accordionData, setAccordionData] = useState([])
    useEffect(() => {
        TabClick()
    }, [])
    const TabClick = () => {
        api("get", `/api/v1/checkList/tabs_checklist/${1}`).then((res) => {
            console.log(res);
            if (res.status == 200) {
                setAccordionData(res.data)
            }
        })
    }
    return (
        <>
        {
            accordionData && accordionData.map((data)=>{
                return(
                    <ImplantationData accordionData={data} />
                )
            })
        }
                       
       </>
    )
}
export default Implantation;