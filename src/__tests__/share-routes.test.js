import React from "react";
import { render, cleanup } from "react-testing-library";
import ShareRoutesComponent from "../containers/ShareRoutes/shareroutes.container";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "react-bootstrap";

afterAll(cleanup);

jest.mock("solid-auth-client", () => {
  const auth = jest.requireActual("solid-auth-client");
  auth.currentSession = jest.fn(() => Promise.resolve({ webId: "https://adrianperezmanso.solid.community/profile/card#me" }));
  return auth;
});

const groups = {
  "Default": [
    {
      "webId": "https://example2.inrupt.net/profile/card#me",
      "name": "Víctor",
      "image": "img/noimg.svg"
    },
    {
      "webId": "https://example3.inrupt.net/profile/card#me",
      "name": "Adrián",
      "image": "img/noimg.svg"
    },
    {
      "webId": "https://example4.inrupt.net/profile/card#me",
      "name": "Víctor",
      "image": "img/noimg.svg"
    }
  ]
};

const route = {
  "@context": {
    "@version": 1.1,
    "comments": {
      "@id": "viade:comments",
      "@type": "@id"
    },
    "description": {
      "@id": "schema:description",
      "@type": "xsd:string"
    },
    "media": {
      "@container": "@list",
      "@id": "viade:media"
    },
    "name": {
      "@id": "schema:name",
      "@type": "xsd:string"
    },
    "points": {
      "@container": "@list",
      "@id": "viade:points"
    },
    "latitude": {
      "@id": "schema:latitude",
      "@type": "xsd:double"
    },
    "longitude": {
      "@id": "schema:longitude",
      "@type": "xsd:double"
    },
    "elevation": {
      "@id": "schema:elevation",
      "@type": "xsd:double"
    },
    "author": {
      "@id": "schema:author",
      "@type": "@id"
    },
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "schema": "http://schema.org/",
    "viade": "http://arquisoft.github.io/viadeSpec/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "name": "Route test",
  "author": "https://examplepod.solid.community/profile/card#me",
  "description": "Route",
  "comments": "",
  "media": [
    
  ],
  "waypoints": [
    
  ],
  "points": [
    {
      "latitude": 45.123,
      "longitude": 34.121,
      "elevation": 34
    },
    {
      "latitude": 46.123,
      "longitude": 34.121,
      "elevation": 36
    }
  ]
};
  
configure({adapter: new Adapter()});

 const component = <ShareRoutesComponent
  {...{
      webId: "https://example.solid.community/profile/card#me",
      groups,
      route
  }}
/>;

  it("renders without crashing", () => {
    const { container } = render(component);
    expect(container).toBeTruthy();
  }); 

  it("click share button", () => {
    const wrapper = mount(component);
    wrapper.find(Button).at(0).simulate("click");
  });


 
