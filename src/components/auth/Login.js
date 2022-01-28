
import { Grid, Paper } from "@mui/material"
import { styled } from "@mui/material/styles";
import logo from '../../assets/LoginfromLogo.png'
import jwt from 'jwt-decode'
import api from "../../api/index";
import {UpdateStore} from '../../StoreContext'
import { useState } from "react";


const Login = () => {
const [formInputs,setFormInputs]=useState({email:"",password:""});

    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        if(formInputs.email && formInputs.password){
            api("post", "/api/v1/Login", {
                email: formInputs.email,
                password: formInputs.password,
              })
                .then((res) => {
                  const token = res?.data?.token;
                  const user = jwt(token); // decode your token here
                   localStorage.setItem('user', user?.email);
                  const dataObj = {
                    usertoken: res?.data?.token,
                    userid: res?.data?.userId,
                  };
                  localStorage.setItem("userData", JSON.stringify(dataObj));
                   window.location = "/body";
                })
                .catch((err) => console.log(err));
        }else{

        }
       
      };
const onChange=(e)=>{
setFormInputs({...formInputs,[e.target.name]:e.target.value})
}
console.log("set",formInputs)

    return (
        <Grid container spacing={0} columns={20}>
            <Grid item xs={8}>
                <div className="left-form">
                <img src={logo} />
                </div>
            </Grid>
            <Grid item xs={11}>
                <div className="login-form">
                    <p className="topHeading">Retour à la page d’accueil</p>
                    <div className="mainform">
                        <div style={{ textAlign: "start" ,width:"80%"}}>
                            <h6 className="form-heading">Connectez-vous à votre compte</h6>
                            <form onSubmit={handleSubmit}>
                            <div className="input-field">
                                <label className="login-label">Adresse e-mail</label>
                                <input  name="email" value={formInputs.email} onChange={onChange} placeholder="Fireman@company.com" type="email" />
                            </div>
                            <div className="input-field">
                                <label className="login-label">Mot de passe</label>
                                <input name="password" value={formInputs.password} onChange={onChange} placeholder="+1 234 567890" type="password" />
                            </div>
                            <a >Mot de passe oublié ?</a>
                            <button type="submit">Se connecter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Grid>

        </Grid>
    )
}

export default Login