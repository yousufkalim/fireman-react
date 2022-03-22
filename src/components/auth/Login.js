import React, { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../../assets/LoginfromLogo.png";
import jwt from "jwt-decode";
import api from "../../api/index";
import { UpdateStore } from "../../StoreContext";
import { useState } from "react";
import Loader from "./Loader";
import Home from "../home/index";
import ForgetPassword from "./ForgetPassword";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
const Login = () => {
  const [formInputs, setFormInputs] = useState({ email: "", password: "" });
  const [loading, setloading] = useState(false);
  const [ToggleType, setToggleType] = useState(true);
  const updatestore = UpdateStore();
  const handleSubmit = (event) => {
    setloading(true);
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (formInputs.email && formInputs.password) {
      api("post", "/api/v1/Login", {
        email: formInputs.email,
        password: formInputs.password,
      })
        .then((res) => {
          setloading(false);
          const token = res?.data?.token;
          const user = jwt(token); // decode your token here
          localStorage.setItem("tokenData", user);
          localStorage.setItem("user", user?.email);
          localStorage.setItem("roleSerial", res?.data?.roleSerial);
          localStorage.setItem("loggedInUser", res?.data?.userId);
          const dataObj = {
            usertoken: res?.data?.token,
            userid: res?.data?.userId,
          };

          localStorage.setItem("userData", JSON.stringify(dataObj));
          window.location = "/body";
        })
        .catch((err) => console.log(err));
    } else {
    }
  };
  const changeType = () => {
    setToggleType(!ToggleType);
  };
  const onChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
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
            <div style={{ textAlign: "start", width: "80%" }}>
              <h6 className="form-heading">Connectez-vous à votre compte</h6>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label className="login-label">Adresse e-mail</label>
                  <input
                    required
                    name="email"
                    value={formInputs.email}
                    onChange={onChange}
                    placeholder="Fireman@company.com"
                    type="email"
                  />
                </div>
                <div className="input-field">
                  <label className="login-label">Mot de passe</label>
                  <input
                    required
                    name="password"
                    value={formInputs.password}
                    onChange={onChange}
                    type={ToggleType ? "password" : "text"}
                  />
                  <Box onClick={changeType}>
                    <VisibilityIcon
                      sx={{ position: "absolute", right: "0%", bottom: "15%" }}
                    />
                  </Box>
                </div>
                <Link to="/forgetpassword">
                  <p className="forget-pss">Mot de passe oublié?</p>
                </Link>
                {loading}

                {loading ? <Loader /> : ""}
                <button type="submit">Se connecter</button>
              </form>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
