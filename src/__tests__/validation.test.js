import {cleanup} from "react-testing-library";
import {isValidJSONLDRoute, isValidRouteName, isValidRoutePoints} from "../modules/validation";

afterAll(cleanup);

describe("isValidJSONLDRoute tests", () => {
  let correctContent = `{
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
  "media": [
    {
      "url": "http://test/viade/resources/video.mp4"
    }
  ],
  "waypoints": [
    {
      "latitude": 43.3716343009739,
      "longitude": -5.887845754623413,
      "elevation": 0,
      "name": "TestWaypoint",
      "description": "Desc"
    }
  ],
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

  let noPointsContent = `{
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
  "waypoints": []
}`;

  let noNameContent = `{
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
  "author": "https://victorgon.inrupt/profile/card#me",
  "description": "Route for testing",
  "comments": "",
  "media": [
    {
      "url": "http://test/viade/resources/video.mp4"
    }
  ],
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

  let noMediaContent = `{
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
  "waypoints": [
    {
      "latitude": 43.3716343009739,
      "longitude": -5.887845754623413,
      "elevation": 0,
      "name": "TestWaypoint",
      "description": "Desc"
    }
  ],
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

  let invalidPointContent = `{
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
  "media": [
    {
      "url": "http://test/viade/resources/video.mp4"
    }
  ],
  "waypoints": [
    {
      "latitude": 43.3716343009739,
      "longitude": -5.887845754623413,
      "elevation": 0,
      "name": "TestWaypoint",
      "description": "Desc"
    }
  ],
  "points": [
    {
      "latitude": 43.388103444729204,
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

let invalidWaypointContent = `{
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
  "media": [
    {
      "url": "http://test/viade/resources/video.mp4"
    }
  ],
  "waypoints": [
    {
      "latitude": 43.3716343009739,
      "longitude": -5.887845754623413,
      "elevation": 0,
      "description": "Desc"
    }
  ],
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

  let invalidMediaContent = `{
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
  "media": [
    {
      "noUrl": "http://test/viade/resources/video.mp4"
    }
  ],
  "waypoints": [
    {
      "latitude": 43.3716343009739,
      "longitude": -5.887845754623413,
      "elevation": 0,
      "name": "TestWaypoint",
      "description": "Desc"
    }
  ],
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

  let noWaypointContent = `{
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
  "media": [
    {
      "url": "http://test/viade/resources/video.mp4"
    }
  ],
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

  let invalidJSON = `{
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
  "media": [
    {
      "url": "http://test/viade/resources/video.mp4"
    }
  ],
  "waypoints": [
    {
      "latitude": 43.3716343009739,
      "longitude": -5.887845754623413,
      "elevation": 0,
      "name": "TestWaypoint",
      "description": "Desc"
    }
  ],
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
  ],
}`;

  test("Correct name and content returns true", () => {
    let result = isValidJSONLDRoute("Test.json", correctContent);

    expect(result).toBe(true);
  });

  test("Invalid name and correct content returns false", () => {
    let result = isValidJSONLDRoute("Test", correctContent);

    expect(result).toBe(false);
  });

  test("Content with no points returns false", () => {
    let result = isValidJSONLDRoute("Test.json", noPointsContent);

    expect(result).toBe(false);
  });

  test("Content with no name returns false", () => {
    let result = isValidJSONLDRoute("Test.json", noNameContent);

    expect(result).toBe(false);
  });

  test("Content with no waypoints returns false", () => {
    let result = isValidJSONLDRoute("Test.json", noWaypointContent);

    expect(result).toBe(false);
  });

  test("Content with no media returns false", () => {
    let result = isValidJSONLDRoute("Test.json", noMediaContent);

    expect(result).toBe(false);
  });

  test("Invalid point returns false", () => {
    let result = isValidJSONLDRoute("Test.json", invalidPointContent);

    expect(result).toBe(false);
  });

  test("Invalid waypoint returns false", () => {
    let result = isValidJSONLDRoute("Test.json", invalidWaypointContent);

    expect(result).toBe(false);
  });

  test("Invalid media returns false", () => {
    let result = isValidJSONLDRoute("Test.json", invalidMediaContent);

    expect(result).toBe(false);
  });

  test("Invalid JSON syntax returns false", () => {
    let result = isValidJSONLDRoute("Test.json", invalidJSON);

    expect(result).toBe(false);
  });
});


describe("isValidRouteName tests", () => {
  test("Valid", () => {
    expect(isValidRouteName("")).toBe(true);
  });

  test("Invalid", () => {
    expect(isValidRouteName("test")).toBe(false);
  });
});

describe("isValidRoutePoints tests", () => {
  let valid = [];
  valid.push({lat: 43.388103444729204, lng: -5.937627553939819});

  let invalid = [];
  invalid.push({lat: 43.388103444729204, lng: -5.937627553939819});
  invalid.push({lat: 44.388103444729204, lng: -5.937627553939819});

  test("Valid", () => {
    expect(isValidRoutePoints(valid)).toBe(true);
  });

  test("Invalid", () => {
    expect(isValidRoutePoints(invalid)).toBe(false);
  });
});