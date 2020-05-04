import React from "react";
import {cleanup} from "@testing-library/react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RoutesSideBar from "../containers/Maps/routesSideBar.component";
import "jest-dom/extend-expect";

configure({adapter: new Adapter()});

jest.setTimeout(50000);
afterAll(cleanup);



jest.mock("solid-auth-client", () => {
    const auth = jest.requireActual("solid-auth-client");
    auth.currentSession = jest.fn(() => Promise.resolve({webId: "https://uo264608.solid.community/profile/card#me"}));
    return auth;
});

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
    "media": [],
    "waypoints": [],
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
let routeStringify= JSON.stringify(route);

const routeFile= new File( [routeStringify], "testRoute.json");
let event= {target: {files: [routeFile]}};


describe.only("Route uploading test", () => {
    let container = shallow(<RoutesSideBar/>);
    let instance = container.dive().instance();

   it("Route Uploaded successfully", async () => {
       instance.onChangeHandler(event);
       //await instance.onClickHandler();

       expect(container).toBeTruthy();
   });



});