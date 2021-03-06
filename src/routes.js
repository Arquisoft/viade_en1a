import React, { Fragment } from "react";
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from "@layouts";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";

import {
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Profile,
  Friends,
  Maps,
  Notifications,
  ShareRoutes,
  RouteDesigner
} from "./containers";

const privateRoutes = [
  {
    id: "welcome",
    path: "/welcome",
    component: Welcome
  },
  {
    id: "maps",
    path: "/maps",
    component: Maps
  },
  {
    id: "friends",
    path: "/friends",
    component: Friends
  },
  {
    id: "profile",
    path: "/profile",
    component: Profile
  },
  {
    id: "notifications",
    path: "/notifications",
    component: Notifications
  },
  {
    id: "share",
    path: "/share",
    component: ShareRoutes
  },
  {
    id: "design",
    path: "/design",
    component: RouteDesigner
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/welcome" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
