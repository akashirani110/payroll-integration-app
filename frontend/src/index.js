import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage";
import PineLandingPage from "views/PineLandingPage/PineLandingPage.js";
import SignUp from "views/RegistrationPage/SignUp";
import CompanyDetails from "views/RegistrationPage/SignUpForms/CompanyDetails";
import PersonalDetails from "views/RegistrationPage/SignUpForms/PersonalDetails";
import SignUpForm from "views/RegistrationPage/SignUpForms/SignUpForm";
import SelectFeatures from "views/SelectFeaturesPage/SelectFeatures";
import SuccessfulRegistrationPage from "views/RegistrationPage/SuccessRegistrationPage";
import DashboardEmployee from "views/Dashboard/Dashboard_Employee"
import Dashboard_Setting_Integration from "views/Dashboard/Dashboard_Setting_Integration";
import DashboardView from "views/Dashboard/DashnoardView";
import AlreadyRegistered from "views/RegistrationPage/RegistrationAlreadyMade"

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* Dashboard pages */}
      <Route path="/d/employee" component={DashboardEmployee} />
      <Route path="/d/settings/integration" component={Dashboard_Setting_Integration} />
      <Route path="/dashboard" component={DashboardView} />
      <Route path="/signup-form" component={SignUpForm} />
      <Route path="/login" component={LoginPage} />
      <Route path="/success-registration" component={SuccessfulRegistrationPage} />
      <Route path="/already-registered" component={AlreadyRegistered} />
      <Route path="/select-features" component={SelectFeatures} />
      <Route path="/personal-details" component={PersonalDetails} />
      <Route path="/company-details" component={CompanyDetails} />
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/signup" component={SignUp} />
      <Route path="/components" component={Components} />
      <Route path="/" component={PineLandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
