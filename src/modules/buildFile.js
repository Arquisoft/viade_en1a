import {fullWebId} from "./solidAuth.js";

export async function buildRouteJSONLD(routeName, routeDescription, routePoints) {
    let parsedRoute = {
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
        name: routeName.toString(),
        author: await fullWebId(),
        description: routeDescription.toString(),
        comments: "",
        media: [],
        waypoints: [],
        points: []
    };
    routePoints.forEach((routePoint) => {
        let jsonLDPoint = {
            latitude: routePoint.lat,
            longitude: routePoint.lng,
            elevation: 0
        };
        parsedRoute.points.push(jsonLDPoint);
    });
    return JSON.stringify(parsedRoute, null, 2);
}

export function buildAcl(routeName) {
    return "@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n" +
        "@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n" +
        "<#owner> a acl:Authorization;\n" +
        "acl:agent </profile/card#me>;\n" +
        "acl:accessTo <./" + routeName + ">;" +
        "acl:mode acl:Write, acl:Control, acl:Read.";
}

export async function buildRouteJSONLFromGeoJson(content) {
    try {
        let parsedRoute = {
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
            name: "Unnamed route",
            author: await fullWebId(),
            description: "",
            comments: "",
            media: [],
            waypoints: [],
            points: []
        };
        let geoJsonContent = JSON.parse(content);
        if (geoJsonContent.features[0].properties.hasOwnProperty("name")) {
            parsedRoute.name = geoJsonContent.features[0].properties.name;
        }
        if (geoJsonContent.features[0].properties.hasOwnProperty("description")) {

            parsedRoute.description = geoJsonContent.features[0].properties.description;
        }
        if (geoJsonContent.features[0].properties.hasOwnProperty("media")) {
            let media = geoJsonContent.features[0].properties.media;

            media.forEach((mediaElement) => {
                if (!mediaElement.hasOwnProperty("url")) {
                    parsedRoute.media.push({url: mediaElement.toString()});
                } else {
                    parsedRoute.media.push(mediaElement);
                }
            });

        }
        let routePoints = geoJsonContent.features[0].geometry.coordinates;
        routePoints.forEach((routePoint) => {
            console.log(routePoint);
            let jsonLDPoint = {
                latitude: routePoint[1],
                longitude: routePoint[0],
                elevation: 0
            };
            parsedRoute.points.push(jsonLDPoint);
        });
        return JSON.stringify(parsedRoute, null, 2);
    } catch (error) {
        return null;
    }
}