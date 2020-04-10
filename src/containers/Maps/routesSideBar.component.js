import React, { Component } from "react";

import FC from "solid-file-client";

import auth from "solid-auth-client";

import { MapsSideBar } from "./maps.style";

import styled from "styled-components";

import { MapRoute } from "./components";
import { SharedRoute } from "./shared";

import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";


const StyledRoutesSidebar = styled.div`

      height: 100vh;

      width: 20%;

    `;


class RoutesSideBar extends Component {

    constructor(props) {

        super(props);


        this.state = {

            selectedFile: null,

            routes: [],

            routesList: [],

            sharedRoutes: [],

            selectedRoute: null

        };


        this.getPodRoutes = this.getPodRoutes.bind(this);

        this.getPodRoutes();

        this.getSharedRoutes = this.getSharedRoutes.bind(this);

        this.getSharedRoutes();


        this.deleteRoute = this.deleteRoute.bind(this);

        this.deleteSharedRoute = this.deleteSharedRoute.bind(this);

        this.fc = new FC(auth);

        this.uploadedFiles = false;

        this.addMediaToRoute = this.addMediaToRoute.bind(this);


    }


    onChangeHandler = (event) => {

        this.uploadedFiles = false;

        const files = [...event.target.files];

        let routes = [...this.state.routes];

        files.forEach((file) => {

            if (file.name.endsWith(".json")) {

                routes = [...routes, file];

                this.uploadedFiles = true;

            } else {

                alert(file.name + " is not valid");

            }


        });

        this.setState({ routes });

    };


    async onClickHandler() {

        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "viade/routes/";

        if (!await this.fc.itemExists(url)) {

            await this.fc.createFolder(url);

        }


        this.onClearArray();


        this.state.routes.forEach(async (route) => {

            //var name = this.getRouteName(route);

            await this.fc.createFile(url + route.name, route, "text/plain");

        });

        document.getElementById("btnPod").innerHTML = "Uploaded";

        document.getElementById("btnPod").disabled = true;


        this.getPodRoutes();

    }


    async getRouteName(route) {

        var fileReader = new FileReader();

        fileReader.readAsText(route);

        fileReader.onload = function () {

            var obj = JSON.parse(fileReader.result);

            console.log(obj.routeName);

            return obj.routeName;

        };

    }

    async getSharedRoutes() {
        var session = await auth.currentSession();

        var urlShared = session.webId.split("profile/card#me")[0] + "inbox/";

        let folderShared = await this.fc.readFolder(urlShared);

        folderShared.files.forEach((elementShared) => {
            //console.log(elementShared)

            this.state.sharedRoutes.push({ name: elementShared.name, url: elementShared.url });

        });

    }


    async getPodRoutes() {

        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "viade/routes/";

        let folder = await this.fc.readFolder(url);

        for (let element of folder.files) {
            let content = await this.fc.readFile(element.url.toString());
            let parsedRoute = JSON.parse(content);

            this.setState((state) => ({

                routeList: state.routesList.push({name: element.name, url: element.url, route: parsedRoute})

            }));

        }

    }

    showRoute = async (routeWrapper) => {
        this.setState(this.state.selectedRoute = routeWrapper, routeWrapper.route);

    };

    async deleteRoute(routeWrapper) {
        await this.fc.deleteFile(routeWrapper.url);

        this.onClearArray();

        this.getPodRoutes();
        this.getSharedRoutes();
    }

    async addMediaToRoute(routeWrapper, event) {
        const mediaElements = [...event.target.files];
        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "viade/resources/";

        if (!await this.fc.itemExists(url)) {
            await this.fc.createFolder(url);

        }

        this.onClearArray();

        mediaElements.forEach(async (element) => {

            if (!await this.fc.itemExists(url + element.name)) {
                await this.fc.createFile(url + element.name, element, "text/plain");
                //console.log(element.name + " uploaded");
            }

        });

        this.getPodRoutes();

    }

    showSharedRoute = async (routeWrapper) => {
        //console.log("Not implemented.")

        //example of how to get content of the shared message
        //let content = await this.fc.readFile(route.url);
        //console.log(content)

    };

    async deleteSharedRoute(route) {
        await this.fc.deleteFile(route.url);

        this.onClearArray();

        this.getPodRoutes();
        this.getSharedRoutes();

        //you cant delete on inbox??
    }


    listRoutes = () => {

        let list = [];

        for (let i = 0; i < this.state.routesList.length; i++) {
            let routeTemp = this.state.routesList[parseInt(i)];
            list.push(<MapRoute key={i}{...{

                routeWrapper: {
                    name: routeTemp.name,

                    url: routeTemp.url,

                    route: routeTemp.route,

                    showRoute: this.showRoute,

                    shareRoute: this.shareRoute,

                    deleteRoute: this.deleteRoute,

                    addMediaToRoute: this.addMediaToRoute

                }

            }} />);

        }

        return list;

    };

    listShared = () => {

        let list = [];

        for (let i = 0; i < this.state.sharedRoutes.length; i++) {

            let rName = this.state.sharedRoutes[parseInt(i)].name;

            let rUrl = this.state.sharedRoutes[parseInt(i)].url;

            list.push(<SharedRoute key={i}{...{

                routeWrapper: {
                    name: rName,

                    url: rUrl,

                    showRoute: this.showSharedRoute,

                    deleteRoute: this.deleteRoute

                }

            }} />);

        }

        return list;

    };


    onClearArray = () => {
        this.setState({ routesList: [] });
        this.setState({ sharedRoutes: [] });
    };


    render() {
        const { t } = this.props;
        return (

            <StyledRoutesSidebar>

                <input type="file" name="file" accept=".json" onChange={this.onChangeHandler.bind(this)} multiple />


                <Button id="btnPod" disabled={!this.uploadedFiles} variant="primary" block
                    onClick={this.onClickHandler.bind(this)}>{t("routes.uploadToPOD")}</Button>
                <MapsSideBar>
                    {t("routes.hereYourRoutes")}
                    {this.listRoutes()}
                    {t("routes.sharedRoutes")}
                    {this.listShared()}
                </MapsSideBar>
                <Button variant="primary" block
                    onClick={this.onClearArray}>{t("routes.clear")}</Button>
            </StyledRoutesSidebar>
        );

    }

}

export default withTranslation()(RoutesSideBar);