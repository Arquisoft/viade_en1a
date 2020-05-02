import React, {Component} from "react";
import {MapsSideBar, InputFile, LabelInput} from "./maps.style";
import styled from "styled-components";
import {errorToaster} from "@utils";
import {MapRoute} from "./components";
import {SharedRoute} from "./shared";
import {Button} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import Switch from "react-switch";
import $ from "jquery";
import { getPodRoutes, getSharedRoutes, createFile, createFolder, itemExists, deleteFile } from "../../modules/podHandler.js";
import { getFileContent } from "../../modules/parseFile.js";
import { isValidJSONRoute } from "../../modules/validation.js";

const StyledRoutesSidebar = styled.div`

      height: 50vh;

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
            labelText : ""

        };

        this.getPodRoutes = this.getPodRoutes.bind(this);
        this.getPodRoutes();
        this.getSharedRoutes = this.getSharedRoutes.bind(this);
        this.getSharedRoutes();
        this.deleteRoute = this.deletePodRoute.bind(this);
        this.deleteSharedRoute = this.deleteSharedRoute.bind(this);

        this.uploadedFiles = false;
        this.addMediaToRoute = this.addMediaToRoute.bind(this);
        this.handleCOVIDChange = this.handleCOVIDChange.bind(this);
    }


    async getPodRoutes(){
        this.setState({routesList: await getPodRoutes()});
    }

    async getSharedRoutes(){
        this.setState({sharedRoutes: await getSharedRoutes()});
    }

    async deletePodRoute(routeWrapper){
        await deleteFile(routeWrapper.url);
        this.onClearArray();
        await this.getPodRoutes();
        await this.getSharedRoutes();
    }

    async deleteSharedRoute(route){
        await deleteFile(route.url);
        this.onClearArray();
        await this.getPodRoutes();
        await this.getSharedRoutes();
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

                errorToaster(file.name + " is not valid", "Error");

            }
            let btnChoose = $("#btnChoose");
            btnChoose.html(file.name);
            

        });

        this.setState({routes});

        const {t} = this.props;

        let btnPod = $("#btnPod");

        btnPod.html(t("routes.uploadToPOD"));
        btnPod.prop("disabled", false);
    };


    async onClickHandler() {
        if(await itemExists("viade/routes/")){
            await createFolder("viade/routes/");
        }

        this.onClearArray();

        for (let route of this.state.routes) {
            await this.createRouteFile("viade/routes/" + route.name, route);
        }
        const {t} = this.props;

        let btnPod = $("#btnPod");

        btnPod.html(t("routes.uploadedToPOD"));
        btnPod.prop("disabled", true);
        $("#routeUploader").val("");

        await this.getPodRoutes();
        await this.getSharedRoutes();
    }

    getRouteFileName(url){
        return url.split("viade/routes/")[1];
    }

    showRoute = async (routeWrapper) => {
        let routeData = routeWrapper.route;
        this.props.show(routeData);
    };

    async createRouteFile(relativeUrl, file){
        getFileContent(file, async function(content){
            if(isValidJSONRoute(relativeUrl, content)){
                await createFile(relativeUrl, content);
            }
        });
    }

    async createRouteText(relativeUrl, text){
        if(isValidJSONRoute(relativeUrl, text)){
            await createFile(relativeUrl, text);
        }
    }

    async addMediaToRoute(routeWrapper, event) {
        const mediaElements = [...event.target.files];

        let folderUrl = "";
        if(await itemExists("viade/resources/")){
            folderUrl = await createFolder("viade/resources/");
        }

        this.onClearArray();

        for (let element of mediaElements) {
            await createFile("viade/resources/" + element.name, element);

            // add media to route
            let url = {url: folderUrl + element.name};
            routeWrapper.route.media.push(url);

        }
        //Creates a new file and substitutes the old one
        let routeJson = JSON.stringify(routeWrapper.route, null, 2);
        let routeFileName = this.getRouteFileName(routeWrapper.url);
        await this.createRouteText("viade/routes/" + routeFileName, routeJson);

        this.getPodRoutes();
        this.getSharedRoutes();
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
        let btnChoose = $("#btnChoose");
        btnChoose.html(t("routes.chooseFile"));

        return (
            <StyledRoutesSidebar>
                
                <InputFile id="routeUploader" type="file" name="file" accept=".json"
                       onChange={this.onChangeHandler.bind(this)} multiple  style={{marginTop:"3vh"}}/>
                
                <LabelInput for = "routeUploader" id="btnChoose">{this.state.labelText}</LabelInput>

                <Button id="btnPod" disabled={!this.uploadedFiles} variant="primary" block
                        onClick={this.onClickHandler.bind(this)} style={{marginBottom:"2vh"}}>{t("routes.uploadToPOD")}</Button>
                <MapsSideBar style={{height:"340px"}}>
                    {t("routes.hereYourRoutes")}
                    {this.listRoutes()}
                    {t("routes.sharedRoutes")}
                    {this.listShared()}
                </MapsSideBar>
                <label style={{marginTop:"10px"}}>
                    <span>{t("routes.covidtoggle")}</span>
                    <Switch onChange={this.handleCOVIDChange} checked={this.state.COVIDchecked}/>
                </label>
                <a href="#/design" className="btn btn-primary"
                   style={{width: "100%"}}>{t("routes.designRoute")}</a>
                <Button variant="primary" block
                        onClick={this.onClearArray}>{t("routes.clear")}</Button>
            </StyledRoutesSidebar>
        );

    }

}

export default withTranslation()(RoutesSideBar);