/**
 * We can do tests here 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App.js';
import SimpleMap from '../containers/Maps/maps.component.js'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('this should render element RoutesSideBar', () =>{
    const sideBar = document.createElement('RoutesSideBar');
    ReactDOM.render(<SimpleMap />, sideBar);
});
