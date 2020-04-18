import React, {Component} from "react";
import RoutesSideBar from "./routesSideBar.component";
import GoogleMapReact from "google-map-react";
import  Carousel  from "nuka-carousel"; 
import { withTranslation } from "react-i18next";

class SimpleMap extends Component {

    constructor() {
        super();
        this.show = this.show.bind(this);
        this.state = {
            url: "https://storage.googleapis.com/mapsdevsite/json/google.json",
            route: "",
            features: [],
            center: [43.358756869202914, -5.861785411834717],
            galery: [],
            zoom: 12
        };
    }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };


    handleApiLoaded = (map, maps) => {
        this.map = map;
        this.maps = maps;
        this.loadMap();
    };

    loadMap = () => {
        this.setState({features: this.map.data.addGeoJson(this.state.route)});
        this.map.data.setMap(this.map);
    };

    deleteOldRoute = () => {
        for (var i = 0; i < this.state.features.length; i++){
            this.map.data.remove(this.state.features[parseInt(i)]);

        }
    };

    show = (route) => {
        let parsedRoute = this.convertToGeoJSON(route);
        let latitude = parsedRoute.features[0].geometry.coordinates[0][1];
        let longitude = parsedRoute.features[0].geometry.coordinates[0][0];
        this.deleteOldRoute();
        this.setState({route: parsedRoute, center: [latitude, longitude]}, this.loadMap);
        this.createGalery(route);
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

    createGalery (route) {
        var list = [];
        for (var i = 0; i < route.media.length; i++) {
            if (route.media[parseInt(i)].url.substring(route.media[parseInt(i)].url.length - 3, route.media[parseInt(i)].url.length) === "jpg"
                || route.media[parseInt(i)].url.substring(route.media[parseInt(i)].url.length - 3, route.media[parseInt(i)].url.length) === "png") {
                list.push(
                    <img style={{margin:"auto", height: "20vh", width: "auto", border:"5px"}} alt="Route {route.name}" src={route.media[parseInt(i)].url}/>
                );
            } else {
                list.push(
                    <video style={{margin:"auto", height: "20vh", width: "auto"}} controls src={route.media[parseInt(i)].url}/>
                );
            }
           
        }
        this.setState({galery : list}) ;
    }
    render() {
        
		//const { t } = this.props;
        return (
            <div style={{height: "50vh", width: "100%", display: "flex", flex: "row"}}>
                <RoutesSideBar show={this.show}/>
                <div style={{height: "55vh", width: "80%", marginLeft:"10vh", marginTop:"5vh", marginRight:"5vh"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                        defaultZoom={this.state.zoom}

                        yesIWantToUseGoogleMapApiInternals={true}
                        center={this.state.center}
                        onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map, maps)}
                    >
                    </GoogleMapReact>
                    <Carousel renderBottomCenterControls={false} slidesToShow={3} height="20vh" dragging={true}
                         style={{textAlign:"center", background: "url('img/fondoGaleria.png')"}}>
                        { this.state.galery }
                    </Carousel>
                </div>
            </div>
        );
    }


}


export default  withTranslation() (SimpleMap);