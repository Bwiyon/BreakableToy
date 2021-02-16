import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Flights from "./Flights";
import HomePage from "./HomePage";
import About from "./About";
import Browsing from "./Browsing";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import UserProfile from "./UserProfile";
import ProfileShow from "./ProfileShow";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/about" component={About} />
        <Route exact path="/browsing" component={Browsing} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
        <AuthenticatedRoute exact path="/profile/:id" component={ProfileShow} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
