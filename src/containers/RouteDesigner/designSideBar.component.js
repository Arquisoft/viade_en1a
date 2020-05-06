import React, {Component} from "react";
import {MapsSideBar} from "../Maps/maps.style";
import styled from "styled-components";
import {Button, Card} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import $ from "jquery";

import {errorToaster, successToaster} from "@utils";

import {isValidJSONLDRoute} from "../../modules/validation.js";
import {createFile, createFolder, itemExists} from "../../modules/podHandler.js";
import {buildRouteJSONLD} from "../../modules/buildFile.js";

const StyledDesignSidebar = styled.div`
      margin: 10px;
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
            let {t} = this.props;
            
            let message = t("routeDesigner.uploaded");
            let title = t("routeDesigner.uploadingTitle");
            successToaster(message, title);

            this.clearData();
        }
    }

    async createRoute(relativeUrl, content){
        if (isValidJSONLDRoute(relativeUrl, content)) {
            await createFile(relativeUrl, content);
        }
    }

    clearData = () => {
        this.props.removeMarkers();
        $("#newRouteName").val("");
        $("#newRouteDescription").val("");
    };

    parseToJSONLD = async (routeName, routeDescription) => {
        let routePoints = this.props.getRouteCoordinates();
        return await buildRouteJSONLD(routeName, routeDescription, routePoints);
    };

    checkValidRoute = (trimmedRouteName) => {
        const {t} = this.props;
        let routePoints = this.props.getRouteCoordinates();
        if (!trimmedRouteName.length > 0) {
            errorToaster(t("routeDesigner.nameError"), "Error");
            return false;
        } else if (routePoints.length < 2) {
            errorToaster(t("routeDesigner.routeFormatError"), "Error");
            return false;
        }
        return true;
    };

    render() {
        const {t} = this.props;
        return (

            <StyledDesignSidebar>
                <Card style={{
                    height: "85%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "top",
                    justifyContent: "center"
                }}>
                    <Card.Title>{t("routeDesigner.newRoute")}</Card.Title>
                    <Card.Body>
                        <MapsSideBar>


                            <form>
                                <label htmlFor="newRouteName">{t("routeDesigner.routeName")}:</label>
                                <input id="newRouteName" type="text" required/>
                                <label htmlFor="newRouteDescription">{t("routeDesigner.routeDescription")}:</label>
                                <textarea id="newRouteDescription"/>
                            </form>

                        </MapsSideBar>
                    </Card.Body>
                </Card>
                <Card style={{padding: "10px"}}>
                    <Button className="btn btn-primary" block
                            onClick={this.uploadToPOD}>{t("routeDesigner.uploadToPOD")}</Button>
                    <Button className="btn btn-primary" block
                            onClick={this.removeMarkers}>{t("routeDesigner.clearRoute")}</Button>
                </Card>
            </StyledDesignSidebar>
        );

    }

}

export default withTranslation()(DesignSideBar);