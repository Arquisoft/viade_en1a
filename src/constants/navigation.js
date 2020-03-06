/**
 * Object mapping of known possible inboxes for the user
 */

import React from 'react';
import * as Icon from 'react-feather';

export const NavigationItems = [
  {
    id: 'welcome',
    icon: <Icon.Home/>,
    label: 'navBar.welcome',
    to: '/welcome'
  },
  {
    id: 'maps',
    icon: <Icon.Map/>,
    label: 'navBar.maps',
    to: '/maps'
  },
  {
    id: 'profile',
    icon: <Icon.Users/>,
    label: 'navBar.friends',
    to: '/friends'
  },
  {
    id: 'myroutes',
    icon: <Icon.Database/>,
    label: 'navBar.myRoutes',
    to: '/myroutes'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.profile',
    onClick: 'profileRedirect',
    icon: 'cog'
  },
  {
    label: 'navBar.formModelConvert',
    onClick: 'formModelConvertRedirect'
  },
  {
    label: 'navBar.formModelRender',
    onClick: 'formModelRenderRedirect'
  },
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
