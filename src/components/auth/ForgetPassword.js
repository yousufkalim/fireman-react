import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../../api/index'
const ForgetPassword = () => {
     const [formValue, setformValue] = useState()
    const onChange = ( e)=>{
        setformValue(e.target.value);
    }
    const ForgetPassword = (e)=>{
        e.preventDefault();
        api("get", `/api/v1/forgetPassword/${formValue}`).then((res)=>(
             console.log(res)
        )).catch((err)=>(
           console.log(err)
        ))
    }
    return (
        <>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"50vh"
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      onChange={onChange} 
      value={formValue} 
      type="email"
      id="outlined-basic" label="Enter email" variant="outlined" />
       <Button onClick={ForgetPassword} variant="contained">Submit</Button>
    </Box>
        </>
    )
}

export default ForgetPassword
