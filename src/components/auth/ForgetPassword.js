import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../../api/index";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../../assets/LoginfromLogo.png";
import { useTranslation, Trans } from "react-i18next";
const ForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const [formValue, setformValue] = useState();
  const [ToggleType, setToggleType] = useState(true);
  const onChange = (e) => {
    setformValue(e.target.value);
  };
  const ForgetPassword = (e) => {
    e.preventDefault();
    api("get", `/api/v1/forgetPassword/${formValue}`)
      .then((res) => {
        console.log(res,"res")
        if (res.data.success === true) {
          toast.success(res?.data?.message);
        }
        if(res.data.success === false){
          toast.error("L'e-mail n'existe pas")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid container spacing={0} columns={20}>
        <Grid item xs={8}>
          <div className="left-form">
            <img src={logo} />
          </div>
        </Grid>
        <Grid item xs={11}>
          <div className="login-form">
         
            <Link style={{textDecoration:"none"}} to="/login"><p className="topHeading">Retour à la page de connexion</p></Link>
            <div className="mainform">
              <div style={{ textAlign: "start", width: "80%" }}>
                <h6 className="form-heading">Mot de passe oublié</h6>
                <Box
                >
                  <form onSubmit={ForgetPassword}>
                  <input
                  className="forgetpassword-input"
                    onChange={onChange}
                    value={formValue}
                    type="email"
                    placeholder="Fireman@company.com"
                    required
                  />
                  <button type="submit" style={{padding:"10px 45px"}}>
                  Submit
                  </button>
                  </form>
                </Box>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgetPassword;
