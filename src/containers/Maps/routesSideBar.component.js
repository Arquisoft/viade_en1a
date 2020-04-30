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
import $ from "jquery";

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

        this.fc = new FC(auth);


        this.getPodRoutes = this.getPodRoutes.bind(this);

        this.getPodRoutes();

        this.getSharedRoutes = this.getSharedRoutes.bind(this);

        this.getSharedRoutes();


        this.deleteRoute = this.deleteRoute.bind(this);

        this.deleteSharedRoute = this.deleteSharedRoute.bind(this);

        

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

        const {t} = this.props;

        let btnPod = $("#btnPod");
        btnPod.html(t("routes.uploadToPOD"));
        btnPod.prop("disabled", false);
    };


    async onClickHandler() {

        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "viade/routes/";

        if (!await this.fc.itemExists(url)) {

            await this.fc.createFolder(url);

        }


        this.onClearArray();

        for (let route of this.state.routes) {
            await this.fc.createFile(url + route.name, route, "text/plain");

        }
        const {t} = this.props;

        let btnPod = $("#btnPod");

        btnPod.html(t("routes.uploadedToPOD"));
        btnPod.prop("disabled", true);
        $("#routeUploader").val("");

        await this.getPodRoutes();
        await this.getSharedRoutes();


    }


    async getRouteName(route) {

        var fileReader = new FileReader();

        fileReader.readAsText(route);

        fileReader.onload = function () {

            var obj = JSON.parse(fileReader.result);


            return obj.routeName;

        };

    }

    async getSharedRoutes() {
        var session = await auth.currentSession();

        var urlShared = session.webId.split("profile/card#me")[0] + "inbox/";

        let folderShared = await this.fc.readFolder(urlShared);
        for (let sharedElement of folderShared.files) {
            try{
                if(!this.checkNotLogFile(sharedElement.url.toString())){
                    var name = await this.getFullNotification(sharedElement.url.toString());
                    let url = sharedElement.url;
                    let routeUrl = await this.getSharedRoute(url);
                    let content = await this.fc.readFile(routeUrl.toString());
                    let route = JSON.parse(content);
                    this.state.sharedRoutes.push({name, url, route});
                }
            }catch(error) {
                console.log(error);
            }
        }

        let sharedRoutes = [...this.state.sharedRoutes];
        this.setState({sharedRoutes});

    }

    checkNotLogFile(url){
        let fileName = url.split("inbox/")[1];
        return fileName === "log.ttl";
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
            if(this.isValidRoute(element.url.toString(), content)){
                let parsedRoute = JSON.parse(content);

                this.setState((state) => ({

                    routeList: state.routesList.push({name: element.name, url: element.url, route: parsedRoute})

                }));
            }

        }

    }

    isValidRoute(name, content){
        if(!name.endsWith(".json")){
            return false;
        }
        try{
            let parsed = JSON.parse(content);
            if(!parsed.hasOwnProperty("name")){
                return false;
            }
            if(!parsed.hasOwnProperty("points")){
                return false;
            }else{
                for (let i = 0; i < parsed.points.length; i++){
                    if(!parsed.points[i].hasOwnProperty("longitude") || !parsed.points[i].hasOwnProperty("latitude") || !parsed.points[i].hasOwnProperty("elevation")){
                        return false;
                    }
                }
            }
            if(!parsed.hasOwnProperty("waypoints")){
                return false;
            }else{
                for(let i = 0; i < parsed.waypoints.length; i++){
                    if(!parsed.waypoints[i].hasOwnProperty("longitude") || !parsed.waypoints[i].hasOwnProperty("latitude") || !parsed.waypoints[i].hasOwnProperty("elevation") 
                    || !parsed.waypoints[i].hasOwnProperty("name") || !parsed.waypoints[i].hasOwnProperty("description")){
                        return false;
                    }
                }
            }
            return true;
        }catch(error){
            return false;
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
        this.props.toggleCOVID(COVIDchecked);
    }

    render() {
        const {t} = this.props;
        return (

            <StyledRoutesSidebar>

                <input id="routeUploader" type="file" name="file" accept=".json"
                       onChange={this.onChangeHandler.bind(this)} multiple/>


                <Button id="btnPod" disabled={!this.uploadedFiles} variant="primary" block
                        onClick={this.onClickHandler.bind(this)}>{t("routes.uploadToPOD")}</Button>
                <MapsSideBar style={{height:"340px"}}>
                    {t("routes.hereYourRoutes")}
                    {this.listRoutes()}
                    {t("routes.sharedRoutes")}
                    {this.listShared()}
                </MapsSideBar>
                <label>
                    <span>{t("routes.covidtoggle")}</span>
                    <Switch onChange={this.handleCOVIDChange} checked={this.state.COVIDchecked}/>
                </label>
                <Button variant="primary" block
                        onClick={this.onClearArray}>{t("routes.clear")}</Button>
                <a href="#/design" className="btn btn-primary"
                   style={{width: "100%"}}>{t("routes.designRoute")}</a>
            </StyledRoutesSidebar>
        );

    }

}

export default withTranslation()(RoutesSideBar);