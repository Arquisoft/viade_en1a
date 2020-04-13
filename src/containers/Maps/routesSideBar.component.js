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
        this.getSharedRoutes();

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

        for (let index = 0; index < folderShared.files.length; index++) {
            var name = await this.getFullNotification(folderShared.files[parseInt(index)].url.toString());	  
            let url = folderShared.files[parseInt(index)].url;	
            this.state.sharedRoutes.push({name, url});	
        }	

        let sharedRoutes = [...this.state.sharedRoutes];	
        this.setState({sharedRoutes});

    }

    async getFullNotification(url) {	            
        let myUrl = url.toString();	
        let fol = await this.fc.readFile(myUrl);	
        let getSchem = fol.split("<>");	
        let getImportant = getSchem[1].split("text");	
        let theUrl = getImportant[1].split("\"")[1];	
        let theSplitUrl = theUrl.split("/");	


        let name = theSplitUrl[theSplitUrl.length-1];	        

        let fullLabel = getImportant[1].split("\"")[3];	
        let sender = fullLabel.split("Shared route ")[1];	
        //console.log(name+" "+sender)	


        return name+" "+sender;	

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
        //console.log(routeWrapper.url)
        
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

        var index = routeWrapper.route.media.length;
        var i;
        for (i=0; i<mediaElements.length; i++) {

            if (!await this.fc.itemExists(url + mediaElements[i].name)) {
                 await this.fc.createFile(url + mediaElements[i].name, mediaElements[i], "text/plain");
            }

            // add media to route
            routeWrapper.route.media[index] = url + mediaElements[i].name;
            index += 1;

            // executing out of order
            this.fc.fetch(routeWrapper.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'json'
                  },
                body: routeWrapper.route
            }) ;
        };

        await this.fc.fetch(routeWrapper.url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'json'
              },
            body: routeWrapper.route
        }) 

        this.getPodRoutes();

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

                route: {
                    name: rName,

                    url: rUrl,

                    showRoute: this.showSharedRoute,

                    deleteRoute: this.deleteSharedRoute

                }

            }}/>);

        }

        return list;

    };

    async deleteSharedRoute(route) {

        //console.log("I'm deleting")

        await this.fc.deleteFile(route.url);

        this.onClearArray();

        this.getPodRoutes();
        this.getSharedRoutes();

    }


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