import React, {useState} from 'react'
import api from '../../api/index'
const ForgetPassword = () => {
     const [formValue, setformValue] = useState()
    const onChange = ( e)=>{
        setformValue(e.target.value);
    }
    const ForgetPassword = (e)=>{
        api("get", `/api/v1/forgetPassword/${formValue}`).then((res)=>(
             console.log(res)
        )).catch((err)=>(
           console.log(err)
        ))
    }
    return (
        <>
        <div style={{height:"50vh",display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center"}}> 
        <input onChange={onChange} value={formValue} type="email"/>  
        <button onClick={ForgetPassword}> Submit</button>

        </div>
       
        </>
    )
}

export default ForgetPassword
