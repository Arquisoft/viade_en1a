/**
 * Object mapping of known possible inboxes for the user
 */

import React from "react";
import * as Icon from "react-feather";

export const NavigationItems = [
  {
    id: "welcome",
    icon: <Icon.Home/>,
    label: "navBar.welcome",
    to: "/welcome"
  },
  {
    id: "maps",
    icon: <Icon.Map/>,
    label: "navBar.myRoutes",
    to: "/maps"
  },
  {
    id: "design",
    icon: <Icon.PenTool/>,
    label: "navBar.design",
    to: "/design"
  },
  {
    id: "profile",
    icon: <Icon.Users/>,
    label: "navBar.friends",
    to: "/friends"
  }
];

export const ProfileOptions = [
  {
    label: "navBar.profile",
    onClick: "profileRedirect",
    icon: "cog"
  },
  {
    label: "navBar.logOut",
    onClick: "logOut",
    icon: "lock"
  }

/*    COMPONENTES ALTERNATIVOS GUYS   */

   /*{
    id: "myroutes",
    icon: <Icon.Database/>,
    label: "navBar.myRoutes",
    to: "/myroutes"
  }*/
];
