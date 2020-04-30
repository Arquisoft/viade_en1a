import React, {Component} from "react";
import {MapsSideBar} from "../Maps/maps.style";
import styled from "styled-components";
import {Button} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import $ from "jquery";
import auth from "solid-auth-client";
import FC from "solid-file-client";

const StyledDesignSidebar = styled.div`

      height: 70vh;

      width: 25%;

    `;

class DesignSideBar extends Component {
    constructor(props) {
        super(props);
        this.fc = new FC(auth);
    }

    removeMarkers = () => {
        this.props.removeMarkers();
    }

    uploadToPOD = async () => {
        let routeName = $("#newRouteName").val();
        let routeDescription = $("#newRouteDescription").val();

        let trimmedRouteName = $.trim(routeName);
        if (this.checkValidRoute(trimmedRouteName)) {

            //Parse the information into a JSON-LD file
            let parsedRoute = await this.parseToJSONLD(routeName, routeDescription);
            let jsonLDFile = JSON.stringify(parsedRoute);

            //Upload the JSON-LD file to the POD
            let session = await auth.currentSession();

            let url = session.webId.split("profile/card#me")[0] + "viade/routes/";


            if (!await this.fc.itemExists(url)) {
                await this.fc.createFolder(url);
            }
            await this.fc.createFile(url + trimmedRouteName + ".json", jsonLDFile, "text/plain");

            alert("Route Uploaded!")

            this.clearData();
        }
    }

    clearData = () => {
        this.props.removeMarkers();
        $("#newRouteName").val("");
        $("#newRouteDescription").val("");
    }

    parseToJSONLD = async (routeName, routeDescription) => {
        let routePoints = this.props.getRouteCoordinates();

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
            name: routeName,
            author: await auth.currentSession().webId,
            description: routeDescription,
            comments: "",
            media: [],
            waypoints: [],
            points: []
        }
        routePoints.forEach((routePoint) => {
            let jsonLDPoint = {
                latitude: routePoint.lat,
                longitude: routePoint.lng,
                elevation: 0
            }
            parsedRoute.points.push(jsonLDPoint);
        });
        return parsedRoute;
    }

    checkValidRoute = (trimmedRouteName) => {
        const {t} = this.props;
        let routePoints = this.props.getRouteCoordinates();
        if (!trimmedRouteName.length > 0) {
            alert(t("routeDesigner.nameError"));
            return false;
        } else if (routePoints.length < 2) {
            alert(t("routeDesigner.routeFormatError"));
            return false;
        }
        return true;
    }

    render() {
        const {t} = this.props;
        return (

            <StyledDesignSidebar>

                <MapsSideBar style={{height: "85%"}}>
                    <h2>{t("routeDesigner.newRoute")}</h2>
                    <form>
                        <label htmlFor="newRouteName">{t("routeDesigner.routeName")}:</label>
                        <input id="newRouteName" type="text" required/>
                        <label htmlFor="newRouteDescription">{t("routeDesigner.routeDescription")}:</label>
                        <input id="newRouteDescription" type="text"/>
                    </form>
                </MapsSideBar>
                <Button variant="primary" block onClick={this.removeMarkers}>{t("routeDesigner.clearRoute")}</Button>
                <Button variant="primary" block onClick={this.uploadToPOD}>{t("routeDesigner.uploadToPOD")}</Button>

            </StyledDesignSidebar>
        );

    }

}

export default withTranslation()(DesignSideBar);