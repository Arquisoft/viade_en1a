import React, {Component} from "react";
import {InputFile, LabelInput} from "./maps.style";
import styled from "styled-components";
import {errorToaster, successToaster} from "@utils";
import {MapRoute} from "./components";
import {SharedRoute} from "./shared";
import {Button, Card} from "react-bootstrap";
import {withTranslation} from "react-i18next";
import Switch from "react-switch";
import $ from "jquery";
import {
  createFile,
  createFolder,
  deleteFile,
  getPodRoutes,
  getSharedRoutes,
  itemExists,
} from "../../modules/podHandler.js";
import {getFileContent} from "../../modules/parseFile.js";
import {isValidGeoJsonRoute, isValidJSONLDRoute} from "../../modules/validation.js";
import {buildRouteJSONLFromGeoJson} from "../../modules/buildFile";

const StyledRoutesSidebar = styled.div`
      margin: 10px;
     
`;

class RoutesSideBar extends Component {
  constructor(props) {
    super(props);
    const {t} = this.props;
    this.state = {
      selectedFile: null,
      routes: [],
      routesList: [],
      sharedRoutes: [],
      COVIDchecked: false,
      labelText: t("routes.chooseFile"),
      loadingYourText: t("routes.loadingYours"),
      loadingSharedText: t("routes.loadingShared"),
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

  async getPodRoutes() {
    const {t} = this.props;
    this.setState({loadingYourText: t("routes.loadingYours")});
    this.setState({routesList: await getPodRoutes()});
    this.setState({loadingYourText: t("routes.hereYourRoutes")});

    if (this.state.routesList.length === 0) {
      this.setState({loadingYourText: t("routes.yourRoutesEmpty")});
    }

  }

  async getSharedRoutes() {
    const {t} = this.props;
    this.setState({loadingSharedText: t("routes.loadingShared")});
    this.setState({sharedRoutes: await getSharedRoutes()});
    this.setState({loadingSharedText: t("routes.sharedRoutes")});
    if (this.state.sharedRoutes.length === 0) {
      this.setState({loadingSharedText: t("routes.sharedRoutesEmpty")});
    }
  }

  async deletePodRoute(routeWrapper) {
    await deleteFile(routeWrapper.url);
    await this.onClearArray();
    await this.getPodRoutes();
    await this.getSharedRoutes();
  }

  async deleteSharedRoute(route) {
    await deleteFile(route.url);
    await this.onClearArray();
    await this.getPodRoutes();
    await this.getSharedRoutes();
  }

  onChangeHandler = (event) => {
    this.uploadedFiles = false;
    const files = [...event.target.files];
    let routes = [...this.state.routes];
    let btnPod = $("#btnPod");
    const {t} = this.props;
    files.forEach((file) => {
      if (!file.name.endsWith(".json")) {
        errorToaster("'" + file.name + "' " + t("routes.formatError"), "Error");
        btnPod.prop("disabled", true);
      } else {
        routes = [...routes, file];
        this.uploadedFiles = true;
        this.setState({labelText: file.name.split(".")[0]});

        this.setState({routes});
        btnPod.prop("disabled", false);
      }
      btnPod.html(t("routes.uploadToPOD"));
    });


  };

  async onClickHandler() {
    if (await itemExists("viade/routes/")) {
      await createFolder("viade/routes/");
    }


    const {t} = this.props;

    try {
      for (let route of this.state.routes) {
        await this.createRouteFile("viade/routes/" + route.name, route);
      }
      successToaster(t("routes.uploadingMessage"), t("routes.uploading"));
    } catch {
      errorToaster("Oh oh... Error! ");
    }

    let btnPod = $("#btnPod");

    btnPod.html(t("routes.uploadedToPOD"));
    btnPod.prop("disabled", true);
    this.setState({labelText: t("routes.chooseFile")});

    await this.onClearArray();
    await this.getPodRoutes();
    console.log(this.state.routesList);
    await this.getSharedRoutes();
  }

  getRouteFileName(url) {
    return url.split("viade/routes/")[1];
  }

  showRoute = async (routeWrapper) => {
    this.props.show(routeWrapper.route);
  };

  async createRouteFile(relativeUrl, file) {
    const {t} = this.props;
    await getFileContent(file, async function (content) {
      if (isValidJSONLDRoute(relativeUrl, content)) {
        await createFile(relativeUrl, content);
      } else if (isValidGeoJsonRoute(relativeUrl, content)) {
        let convertedRoute = await buildRouteJSONLFromGeoJson(content);
        if (convertedRoute !== null) {
          await createFile(relativeUrl, convertedRoute);
        } else {
          errorToaster(t("uploadingRouteParseErrorBody"), t("uploadingRouteParseErrorTitle"));
        }
      } else {
        errorToaster(t("uploadingRouteParseErrorBody"), t("uploadingRouteParseErrorTitle"));
      }
    });
  }

  async createRouteText(relativeUrl, text) {
    if (isValidJSONLDRoute(relativeUrl, text)) {
      await createFile(relativeUrl, text);
    }
  }

  async addMediaToRoute(routeWrapper, event) {
    const mediaElements = [...event.target.files];

    let folderUrl = "";
    if (await itemExists("viade/resources/")) {
      folderUrl = await createFolder("viade/resources/");
    }

    await this.onClearArray();

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

    await this.getPodRoutes();
    await this.getSharedRoutes();
  }

  listRoutes = () => {
    let list = [];
    for (let i = 0; i < this.state.routesList.length; i++) {
      let routeTemp = this.state.routesList[parseInt(i)];
      list.push(
          <MapRoute
              key={i}
              {...{
                routeWrapper: {
                  name: routeTemp.name,
                  url: routeTemp.url,
                  route: routeTemp.route,
                  showRoute: this.showRoute,
                  shareRoute: this.shareRoute,
                  deleteRoute: this.deleteRoute,
                  addMediaToRoute: this.addMediaToRoute,
                },
              }}
          />
      );
    }
    return list;
  };

  listShared = () => {
    let list = [];
    for (let i = 0; i < this.state.sharedRoutes.length; i++) {
      let sharedRoute = this.state.sharedRoutes[parseInt(i)];
      list.push(
          <SharedRoute
              key={i}
              {...{
                routeWrapper: {
                  name: sharedRoute.name,
                  url: sharedRoute.url,
                  route: sharedRoute.route,
                  showRoute: this.showRoute,
                  deleteRoute: this.deleteSharedRoute,
                },
              }}
          />
      );
    }
    return list;
  };

  onClearArray = async () => {
    await this.setState({routesList: []});
    await this.setState({sharedRoutes: []});
  };

  handleCOVIDChange(COVIDchecked) {
    this.setState({COVIDchecked});
    this.props.toggleCOVID(COVIDchecked);
  }

  render() {
    const {t} = this.props;
    return (
        <StyledRoutesSidebar>
          <Card style={{}}>
            <Card.Body><Card.Title>{t("routes.UploadYourRoutes")}</Card.Title>
              <InputFile
                  id="routeUploader"
                  type="file"
                  name="file"
                  accept=".json"
                  onChange={this.onChangeHandler.bind(this)}
                  multiple
                  style={{marginTop: "2vh"}}
              />

              <LabelInput htmlFor="routeUploader" id="btnChoose">
                {this.state.labelText}
              </LabelInput>

              <Button
                  id="btnPod"
                  disabled={!this.uploadedFiles}
                  variant="primary"
                  block
                  onClick={this.onClickHandler.bind(this)}
                  style={{}}
              >
                {t("routes.uploadToPOD")}
              </Button>
            </Card.Body>
          </Card>
          <Card style={{padding: "8px", overflowY: "scroll", height: "45vh"}}>
            <Card.Body styule={{display: "flex", flexDirection: "column"}}>
              <Card.Title>{this.state.loadingYourText}</Card.Title>
              {this.listRoutes()}
              <Card.Title>{this.state.loadingSharedText}</Card.Title>
              {this.listShared()}
            </Card.Body>
          </Card>
          <Card style={{padding: "10px"}}>
            <Card.Body>
              <label id="covid" style={{marginTop: "6px"}}>
                <span>{t("routes.covidtoggle")}</span>
                <Switch
                    onChange={this.handleCOVIDChange}
                    checked={this.state.COVIDchecked}
                />
              </label>
              <a
                  href="#/design"
                  className="btn btn-primary"
                  style={{width: "100%"}}
              >
                {t("routes.designRoute")}
              </a>
            </Card.Body>
          </Card>
        </StyledRoutesSidebar>
    );
  }
}

export default withTranslation()(RoutesSideBar);
