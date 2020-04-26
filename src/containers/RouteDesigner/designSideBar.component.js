import React, {Component} from "react";

import FC from "solid-file-client";

import auth from "solid-auth-client";

import {MapsSideBar} from "../Maps/maps.style";

import styled from "styled-components";

import {MapRoute} from "../Maps/components";

import {Button} from "react-bootstrap";
import {withTranslation} from "react-i18next";

import Switch from "react-switch";


const StyledDesignSidebar = styled.div`

      height: 70vh;

      width: 25%;

    `;


class DesignSideBar extends Component {

    constructor(props) {
        super(props);
    };

    removeMarkers = () => {
        // Remove markers from map
        this.props.removeMarkers();
    }

    showRoute() {
        // Showing route
    }

    render() {
        const {t} = this.props;
        return (

            <StyledDesignSidebar>

                <MapsSideBar style={{height: "85%"}}>
                    <h2>{t("routeDesigner.newRoute")}</h2>
                    <form>
                        <p>{t("routeDesigner.routeName")}:</p>
                        <input type="text"/>
                        <p>{t("routeDesigner.routeDescription")}:</p>
                        <input type="text"/>
                    </form>
                </MapsSideBar>
                <Button variant="primary" block onClick={this.showRoute}>{t("routeDesigner.acceptRoute")}</Button>
                <Button variant="primary" block onClick={this.removeMarkers}>{t("routeDesigner.clearRoute")}</Button>
                <Button variant="primary" block>{t("routeDesigner.uploadToPOD")}</Button>

            </StyledDesignSidebar>
        );

    }

}

export default withTranslation()(DesignSideBar);