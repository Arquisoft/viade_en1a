import React, {Component} from "react";
import RoutesSideBar from "./routesSideBar.component";
import GoogleMapReact from "google-map-react";
import Carousel from "nuka-carousel";
import {withTranslation} from "react-i18next";
import loadHeatMap from "../../modules/loadHeatMap.js";
import {errorToaster, warningToaster} from "../../utils";
import * as Icon from "react-feather";

const GeolocationMarker = ({icon}) => <div>{icon}</div>;
class SimpleMap extends Component {

    constructor() {
        super();

        // this.fullscreen = this.fullscreen.bind(this);

        this.heatMapData = {
            positions: loadHeatMap(),
            options: {
                radius: 50,
                opacity: 1
            }
        };

        this.show = this.show.bind(this);
        this.toggleCOVID = this.toggleCOVID.bind(this);
        this.state = {
            url: "https://storage.googleapis.com/mapsdevsite/json/google.json",
            route: "",
            features: [],
            center: [43.358756869202914, -5.861785411834717],
            galery: [],
            zoom: 12,
            showCOVID: false,
            usingGeoLocation: false,
            COVIDdata: {
                positions: [],
                options: {
                    radius: 50,
                    opacity: 1
                }
            }
        };
    }

    centerMap = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.moveToUserGeoLocation);
        }
    };

    moveToUserGeoLocation = (position) => {
        this.setState({usingGeoLocation: true, center: [position.coords.latitude, position.coords.longitude]});
    };

    placeGeolocationMarker = () => {
        if (this.state.usingGeoLocation) {
            return <GeolocationMarker
                lat={this.state.center[0]}
                lng={this.state.center[1]}
                icon={<Icon.MapPin/>}
            />;
        }
    };

    handleApiLoaded = (map, maps) => {
        this.map = map;
        this.maps = maps;
    };

    loadMap = () => {
        if (this.state.route !== null && this.map !== null) {
            this.setState({features: this.map.data.addGeoJson(this.state.route)});
            this.map.data.setMap(this.map);
        }
    };

    deleteOldRoute = () => {
        for (var i = 0; i < this.state.features.length; i++) {
            this.map.data.remove(this.state.features[parseInt(i)]);

        }
    };

    show = (route) => {
        try {
            let parsedRoute = this.convertToGeoJSON(route);
            let latitude = parsedRoute.features[0].geometry.coordinates[0][1];
            let longitude = parsedRoute.features[0].geometry.coordinates[0][0];

            this.deleteOldRoute();
            this.setState({route: parsedRoute, center: [latitude, longitude]}, this.loadMap);
            this.createGalery(route);
        } catch (error) {
            const {t} = this.props;
            errorToaster(t("routes.parsingErrorBody"), t("routes.parsingErrorHeader"));
        }
    };

    toggleCOVID = (showCOVID) => {

        if (showCOVID) {
            this.setState({
                showCOVID,
                COVIDdata: this.heatMapData
            });
        } else {
            this.setState({
                showCOVID,
                COVIDdata: {
                    positions: []
                }
            });
        }
    };

    convertToGeoJSON = (route) => {
        let parsedRoute = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    }
                }]
        };
        for (let i = 0; i < route.points.length; i++) {
            let routePoint = route.points[parseInt(i)];
            let pointCoordinates = [routePoint.longitude, routePoint.latitude, routePoint.elevation];
            parsedRoute.features[0].geometry.coordinates.push(pointCoordinates);
        }
        for (let i = 0; i < route.waypoints.length; i++) {
            let routeWaypoint = route.waypoints[parseInt(i)];
            let wayPoint = {

                type: "Feature",
                properties: {
                    name: routeWaypoint.name,
                    description: routeWaypoint.description,
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        routeWaypoint.longitude,
                        routeWaypoint.latitude,
                        routeWaypoint.elevation
                    ]
                }

            };
            parsedRoute.features.push(wayPoint);
        }

        return parsedRoute;
    };

    createGalery(route) {
        var list = [];
        for (var i = 0; i < route.media.length; i++) {
            if (route.media[parseInt(i)].url.substring(route.media[parseInt(i)].url.length - 3, route.media[parseInt(i)].url.length) === "jpg"
                || route.media[parseInt(i)].url.substring(route.media[parseInt(i)].url.length - 3, route.media[parseInt(i)].url.length) === "png") {
                list.push(
                    <img style={{
                        margin: "auto",
                        height: "20vh",
                        width: "auto",
                        border: "5px",
                    }} /*onClick={() => this.fullscreen(this, i)}*/ alt="Route {route.name}"
                         src={route.media[parseInt(i)].url} onError={this.imageErrorHandler}/>
                );
            } else {
                list.push(
                    <video style={{margin: "auto", height: "20vh", width: "auto"}} controls
                           src={route.media[parseInt(i)].url}/>
                );
            }

        }
        this.setState({galery: list});
    }

    imageErrorHandler = (event) => {
        event.onError = null;
        event.target.src = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
    };

    covidWarningToast = () => {
        const {t} = this.props;
        if (this.state.showCOVID)
            {
                warningToaster(t("routes.togglingCOVIDBody"), t("routes.togglingCOVIDTitle"));
            }
    };

    render() {
        this.centerMap();
        return (
            <div style={{width: "100%", display: "flex", flex: "row"}} id="id1">
                {this.covidWarningToast()}
                <RoutesSideBar id="routesSideBar" show={this.show} toggleCOVID={this.toggleCOVID}/>

                <div style={{height: "50vh", width: "80%", marginLeft: "10vh", marginTop: "5vh", marginRight: "5vh"}}
                     id="id2">
                    <GoogleMapReact id="map"
                                    bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                                    defaultZoom={this.state.zoom}
                                    heatmapLibrary={true}
                                    heatmap={this.state.COVIDdata}
                                    yesIWantToUseGoogleMapApiInternals={true}
                                    center={this.state.center}
                                    onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map, maps)}
                    >
                        {this.placeGeolocationMarker()}

                    </GoogleMapReact>

                    <Carousel id="carousel" renderBottomCenterControls={() => {
                    }} slidesToShow={3} height="17vh"
                              dragging={true}
                              style={{
                                  marginTop: "5vh",
                                  textAlign: "center",
                                  background: "url('img/fondoGaleria.png')"
                              }}>
                        {this.state.galery}
                    </Carousel>
                </div>

            </div>
        );
    }

    /*
    fullscreen(id, i) {
        if ("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) {
            if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {

                var elem = id.state.galery[i-1];

                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                } else {
                    alert("This element does not allow fullscreen mode in your browser");
                }

            }
        }
    }
*/

}


export default withTranslation()(SimpleMap);