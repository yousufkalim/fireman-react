import React, {useEffect, useState} from 'react';
import ImplantationData from "./Implantation";
import {Store} from '../../StoreContext'
import { toast } from "react-toastify";
import api from '../../api/index'
const Implantation = (props) => {
    let [accordionData, setAccordionData] = useState([])
    useEffect(() => {
        TabClick()
    }, [])
    const store = Store()
    const TabClick = () => {
        console.log(store,"implant");
        if(store?.caseFileId){
            api("get", `/api/v1/checkList/tabs_checklist/${3}/${store?.caseFileId}`).then((res) => {
                console.log(res,"res");
                if (res.status == 200) {
                    setAccordionData(res.data)
                }
            })
        }
        else{
            toast.error("ID de dossier manquant")
        }
       
    }
    return (
        <>
        {
            accordionData && accordionData.map((data, i)=>{
                return(
                    <ImplantationData setRightBarData={props.setRightBarData} index={i} accordionData={data} />
                )
            })
        }
                       
       </>
    )
}
export default Implantation;