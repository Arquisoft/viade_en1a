import React, {Fragment} from "react";
import {NotLoggedInLayout, PrivateLayout, PublicLayout} from "@layouts";
import {HashRouter as Router, Redirect, Switch} from "react-router-dom";

import {
    Friends,
    Login,
    Maps,
    Notifications,
    PageNotFound,
    Profile,
    Register,
    RegistrationSuccess,
    RouteDesigner, //No lo reconoce?
    ShareRoutes,
    Welcome
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
                <NotLoggedInLayout component={Login} path="/login" exact/>
                <NotLoggedInLayout component={Register} path="/register" exact/>
                <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact/>
                <PublicLayout path="/404" component={PageNotFound} exact/>
                <Redirect from="/" to="/welcome" exact/>
                <PrivateLayout path="/" routes={privateRoutes}/>
                <Redirect to="/404"/>
            </Switch>
        </Fragment>
    </Router>
);

export default Routes;
