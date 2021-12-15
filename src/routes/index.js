// Init
import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Home from "../containers/Home.js";
import Login from '../components/auth/Login'
import Signup from "../components/auth/Signup";
import ForgetPassword from '../components/auth/ForgetPassword'
import EstablishmentSearch from '../containers/EstablishmentSearch'

const index = () => {
  return (
    <Switch>
      <Route exact path="/establishmentsearch" component={EstablishmentSearch}/>
       <Route exact path="/" component={Home} />
       <Route exact path="/login" component={Login} />
       <Route exact path="/signup" component={Signup} />
       <Route exact path="/forgetpassword" component={ForgetPassword}/>
    </Switch>
  );
};

export default index;
