import React, {useEffect} from 'react'
import api from '../api'

const Indextab = ({casefileId}) => {
    console.log(casefileId,">?>??>");
    useEffect(() => {
        if(casefileId){
            api("get",`/api/v1/casefiles/${casefileId}`).then((res)=>{
                console.log("rlos", res);
               })
        }
    }, [])
    
  return (
    <></>
  )
}

export default Indextab