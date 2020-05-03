import React from "react";
import { cleanup } from "react-testing-library";
import { buildRouteJSONLD, buildAcl } from "../modules/buildFile";

afterAll(cleanup);

jest.mock("solid-auth-client", () => {
  const auth = jest.requireActual("solid-auth-client");
  auth.currentSession = jest.fn(() => Promise.resolve({ webId: "https://victorgon.inrupt/profile/card#me" }));
  return auth;
});

describe('build file', () => {
  let name = "Test route";
  let description = "Route for testing"
  let points = [];
  points.push( { lat: 43.388103444729204, lng: -5.937627553939819 });
  points.push( { lat: 43.3716343009739, lng: -5.887845754623413 });
  points.push( {lat: 43.379120829971576, lng: -5.821584463119507});
  points.push({lat: 43.40606468129765, lng: -5.848020315170288});

  let expectedJSON = `{
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
  "name": "Test route",
  "author": "https://victorgon.inrupt/profile/card#me",
  "description": "Route for testing",
  "comments": "",
  "media": [],
  "waypoints": [],
  "points": [
    {
      "latitude": 43.388103444729204,
      "longitude": -5.937627553939819,
      "elevation": 0
    },
    {
      "latitude": 43.3716343009739,
      "longitude": -5.887845754623413,
      "elevation": 0
    },
    {
      "latitude": 43.379120829971576,
      "longitude": -5.821584463119507,
      "elevation": 0
    },
    {
      "latitude": 43.40606468129765,
      "longitude": -5.848020315170288,
      "elevation": 0
    }
  ]
}`;

  test('builds route correctly', () => {
    return buildRouteJSONLD(name, description, points).then((route) => {
      expect(route).toEqual(expectedJSON);
    });
  });


  let expectedACL = `@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
<#owner> a acl:Authorization;
acl:agent </profile/card#me>;
acl:accessTo <./Test route>;acl:mode acl:Write, acl:Control, acl:Read.`;

  test('builds acl correctly', () => {
    let routeACL = buildAcl(name);

    expect(routeACL).toEqual(expectedACL);
  });
});
