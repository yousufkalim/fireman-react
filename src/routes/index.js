// Init
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Routes
import Home from "../containers/Home.js";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgetPassword from "../components/auth/ForgetPassword";
import OpenSearch from "../containers/OpenSearch";
import Body from '../components/Body'
import Dashboard from '../components/dashboard/Dashboard'
const index = () => {
  let userdata = localStorage.getItem("userData");
  userdata = JSON.parse(userdata);

  return (
    <>
      {userdata && userdata.usertoken ? (
        // <Switch>
        //   <Route
        //     exact
        //     path="/openSearch"
        //     component={OpenSearch}
        //   />
          
        //   <Redirect from="*" to="/OpenSearch" />
        // </Switch>
         <Switch>
         <Route
           exact
           path="/body"
           component={Body}
         />
           <Route
           exact
           path="/dashboard"
           component={Dashboard}
         />
         
         <Redirect from="*" to="/body" />
       
       </Switch>
      ) : (
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Redirect from="/" to="/login" />
        </Switch>
      )}
    </>
  );
};

export default index;
