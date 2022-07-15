import React, {useEffect} from 'react'
import api from '../api'

const Indextab = ({casefileId}) => {
    useEffect(() => {
        if(casefileId){
            api("get",`/api/v1/casefiles/${casefileId}`).then((res)=>{
                console.log("rlos");
               })
        }
    }, [])
    
  return (
    <></>
  )
}

export default Indextab