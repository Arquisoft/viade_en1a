import React, {Component} from 'react';

import FC from 'solid-file-client';

import auth from 'solid-auth-client';

import {MapsSideBar} from './maps.style';

import styled from "styled-components";

import {MapRoute} from './components';

import {Button} from 'react-bootstrap';


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

            routesList: []

        };


        this.getPodRoutes = this.getPodRoutes.bind(this);

        this.getPodRoutes();


        this.deleteRoute = this.deleteRoute.bind(this);


        this.fc = new FC(auth);

        this.uploadedFiles = false;


    }


    onChangeHandler = event => {

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

        var url = session.webId.split("profile/card#me")[0] + "routes/";

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

        }

    }


    async getPodRoutes() {

        var session = await auth.currentSession();

        var url = session.webId.split("profile/card#me")[0] + "routes/";


        let folder = await this.fc.readFolder(url);

        folder.files.forEach((element) => {

            console.log(element);

            this.setState(state => ({

                routeList: state.routesList.push({name: element.name, url: element.url})

            }));

        });

    }


    showRoute = async (route) => {
        let content = await this.fc.readFile(route.url);
        let parsedRoute = JSON.parse(content);
        this.props.show(parsedRoute);
    };


    shareRoute(route) {
        alert(route.url);
    }


    async deleteRoute(route) {

        await this.fc.deleteFile(route.url);

        this.onClearArray();

        this.getPodRoutes();

    }


    listRoutes = ()=> {

        let list = [];

        for (let i = 0; i < this.state.routesList.length; i++) {

            list.push(<MapRoute key={i}{...{

                route: {
                    name: this.state.routesList[i].name,

                    url: this.state.routesList[i].url,

                    showRoute: this.showRoute,

                    shareRoute: this.shareRoute,

                    deleteRoute: this.deleteRoute

                }

            }}/>);

        }


        return list;

    };


    onClearArray = () => {

        this.setState({routesList: []});

    };


    render() {

        return (

            <StyledRoutesSidebar>

                <input type="file" name="file" accept=".json" onChange={this.onChangeHandler.bind(this)} multiple/>

                <Button id="btnPod" disabled={!this.uploadedFiles} variant="primary" block

                        onClick={this.onClickHandler.bind(this)}>Upload to your POD</Button>


                <MapsSideBar>

                    Here your routes

                    {this.listRoutes()}

                </MapsSideBar>

                <Button variant="primary" block

                        onClick={this.onClearArray}>Clear</Button>

            </StyledRoutesSidebar>

        );

    }

}


export default RoutesSideBar;