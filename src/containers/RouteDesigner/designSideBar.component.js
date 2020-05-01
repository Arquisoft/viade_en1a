import React, {Component} from "react";
import {MapsSideBar} from "../Maps/maps.style";
import styled from "styled-components";
import {Button} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import $ from "jquery";

import { isValidJSONRoute, isValidRouteName, isValidRoutePoints } from "../../modules/validation.js";
import { itemExists, createFolder, createFile } from "../../modules/podHandler.js";
import { buildRouteJSONLD } from "../../modules/buildFile.js";

const StyledDesignSidebar = styled.div`

      height: 70vh;

      width: 25%;

    `;

class DesignSideBar extends Component {

    removeMarkers = () => {
        this.props.removeMarkers();
    }

    uploadToPOD = async () => {
        let routeName = $("#newRouteName").val();
        let routeDescription = $("#newRouteDescription").val();

        let trimmedRouteName = $.trim(routeName);

        if (this.checkValidRoute(trimmedRouteName)) {

            //Parse the information into a JSON-LD file
            let jsonLDFile = await this.parseToJSONLD(routeName, routeDescription);
            //Upload the JSON-LD file to the POD
            if (!await itemExists("viade/routes/")) {
                await createFolder("viade/routes/");
            }
            await this.createRoute("viade/routes/" + trimmedRouteName + ".json", jsonLDFile);
            alert("Route Uploaded!");
            this.clearData();
        }
    }

    async createRoute(relativeUrl, content){
        if(isValidJSONRoute(relativeUrl, content)){
            await createFile(relativeUrl, content);
        }
    }

    clearData = () => {
        this.props.removeMarkers();
        $("#newRouteName").val("");
        $("#newRouteDescription").val("");
    }

    parseToJSONLD = async (routeName, routeDescription) => {
        let routePoints = this.props.getRouteCoordinates();
        let parsedRoute = await buildRouteJSONLD(routeName, routeDescription, routePoints);
        return parsedRoute;
    }

    checkValidRoute = (trimmedRouteName) => {
        const {t} = this.props;
        let routePoints = this.props.getRouteCoordinates();
        if (isValidRouteName(trimmedRouteName)) {
            alert(t("routeDesigner.nameError"));
            return false;
        } else if (isValidRoutePoints(routePoints)) {
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