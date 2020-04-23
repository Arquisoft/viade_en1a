import React, {Component} from "react";

import FC from "solid-file-client";

import auth from "solid-auth-client";

import {MapsSideBar} from "./maps.style";

import styled from "styled-components";

import {MapRoute} from "./components";
import {SharedRoute} from "./shared";

import {Button} from "react-bootstrap";
import {withTranslation} from "react-i18next";

import Switch from "react-switch";


const StyledRoutesSidebar = styled.div`

      height: 70vh;

      width: 25%;

    `;


class RoutesSideBar extends Component {

    constructor(props) {

        super(props);


        this.state = {

            selectedFile: null,

            routes: [],

            routesList: [],

            sharedRoutes: [],

            COVIDchecked: true,

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

        this.handleCOVIDChange = this.handleCOVIDChange.bind(this);

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

        this.setState({routes});

    };


    async onClickHandler() {

        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "viade/routes/";

        if (!await this.fc.itemExists(url)) {

            await this.fc.createFolder(url);

        }


        this.onClearArray();


        this.state.routes.forEach(async (route) => {


            await this.fc.createFile(url + route.name, route, "text/plain");

        });

        document.getElementById("btnPod").innerHTML = "Uploaded";

        document.getElementById("btnPod").disabled = true;


        await this.getPodRoutes();
        await this.getSharedRoutes();

        document.getElementById("btnPod").innerHTML = "Upload to Pod";

        document.getElementById("btnPod").disabled = false;

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
        for (let sharedElement of folderShared.files) {
            try{
                var name = await this.getFullNotification(sharedElement.url.toString());
                let url = sharedElement.url;

                let routeUrl = await this.getSharedRoute(url);

                let content = await this.fc.readFile(routeUrl.toString());

                let route = JSON.parse(content);

                this.state.sharedRoutes.push({name, url, route});
            } catch {
                //do nothing
            }
        }

        let sharedRoutes = [...this.state.sharedRoutes];
        this.setState({sharedRoutes});

    }

    async getFullNotification(url) {
        let myUrl = url.toString();
        let fol = await this.fc.readFile(myUrl);
        let getSchem = fol.split("<>");
        let getImportant = getSchem[1].split("text");
        //let theUrl = getImportant[1].split("\"")[1];
        //let theSplitUrl = theUrl.split("/");


        //let name = theSplitUrl[theSplitUrl.length - 1];

        let fullLabel = getImportant[1].split("\"")[3];
        let sender = fullLabel.split("Shared route ")[1];
        //console.log(name+" "+sender)	

        //console.log(sender)
        return sender;

    }

    async getSharedRoute(url) {
        let fol = await this.fc.readFile(url.toString());
        let getSchem = fol.split("<>");
        let urlText = getSchem[1].split("text");
        return urlText[1].split("\"")[1];

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
        let routeData = routeWrapper.route;
        this.props.show(routeData);

    };

    async deleteRoute(routeWrapper) {
        await this.fc.deleteFile(routeWrapper.url);

        this.onClearArray();

        await this.getPodRoutes();
        await this.getSharedRoutes();
    }

    async addMediaToRoute(routeWrapper, event) {
        const mediaElements = [...event.target.files];
        var session = await auth.currentSession();
        var folderUrl = session.webId.split("profile/card#me")[0] + "viade/resources/";

        if (!await this.fc.itemExists(folderUrl)) {
            await this.fc.createFolder(folderUrl);

        }

        this.onClearArray();

        for (let element of mediaElements) {

            if (!await this.fc.itemExists(folderUrl + element.name)) {
                await this.fc.createFile(folderUrl + element.name, element, "text/plain");
            }

            // add media to route
            let url = {url: folderUrl + element.name};
            routeWrapper.route.media.push(url);

        }
        //Creates a new file and substitutes the old one
        let routeJson = JSON.stringify(routeWrapper.route, null, 2);
        await this.fc.createFile(routeWrapper.url, routeJson, "text/plain");

        await this.getPodRoutes();
        await this.getSharedRoutes();
    }

    async deleteSharedRoute(route) {
        await this.fc.deleteFile(route.url);

        this.onClearArray();

        await this.getPodRoutes();
        await this.getSharedRoutes();
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

            let sharedRoute = this.state.sharedRoutes[parseInt(i)];

            list.push(<SharedRoute key={i}{...{

                routeWrapper: {
                    name: sharedRoute.name,

                    url: sharedRoute.url,

                    route: sharedRoute.route,

                    showRoute: this.showRoute,

                    deleteRoute: this.deleteSharedRoute

                }

            }}/>);

        }

        return list;

    };


    onClearArray = () => {
        this.setState({routesList: []});
        this.setState({sharedRoutes: []});
    };


    handleCOVIDChange(COVIDchecked) {
        this.setState({ COVIDchecked });
        console.log("toggling on sidebar");
        this.props.toggleCOVID(COVIDchecked);
    }

    render() {
        const {t} = this.props;
        return (

            <StyledRoutesSidebar>

                <input type="file" name="file" accept=".json" onChange={this.onChangeHandler.bind(this)} multiple/>


                <Button id="btnPod" disabled={!this.uploadedFiles} variant="primary" block
                        onClick={this.onClickHandler.bind(this)}>{t("routes.uploadToPOD")}</Button>
                <MapsSideBar>
                    {t("routes.hereYourRoutes")}
                    {this.listRoutes()}
                    {t("routes.sharedRoutes")}
                    {this.listShared()}
                </MapsSideBar>
                <label>
                    <span>{t("routes.covidtoggle")}</span>
                    <Switch onChange={this.handleCOVIDChange} checked={this.state.COVIDchecked} />
                </label>
                <Button variant="primary" block
                        onClick={this.onClearArray}>{t("routes.clear")}</Button>
            </StyledRoutesSidebar>
        );

    }

}

export default withTranslation()(RoutesSideBar);