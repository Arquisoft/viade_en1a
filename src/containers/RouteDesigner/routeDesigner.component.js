import React, {Component} from "react";
import GoogleMapReact from "google-map-react";
import {withTranslation} from "react-i18next";
import DesignSideBar from "./designSideBar.component";
import Marker from './Marker.component';


class RouteDesigner extends Component {

    constructor() {
        super();
        this.state = {
            url: "https://storage.googleapis.com/mapsdevsite/json/google.json",
            route: "",
            features: [],
            center: [43.358756869202914, -5.861785411834717],
            galery: [],
            zoom: 12,
            showCOVID: true,
            COVIDdata: this.heatMapData,
            markers: [],
            coordinates: []
        };
        this.removeMarkers = this.removeMarkers.bind(this);
    }

    removeMarkers = () => {
        this.setState({
            markers: []
        });
    };

    handleApiLoaded = (map, maps) => {
        this.map = map;
        this.maps = maps;
    };

    handleClick = (event) => {
        // Coordinates of click
        let newMarkers = this.state.markers;
        newMarkers.push({
            lat: event.lat,
            lng: event.lng
        })
        this.setState({
            markers: newMarkers
        });
    }


    render() {
        const {t} = this.props;
        return (
            <div style={{height: "80vh", width: "100%", display: "flex", flex: "row"}}>
                <DesignSideBar removeMarkers={this.removeMarkers}/>
                <div style={{height: "60vh", width: "80%"}}>
                    <h2>{t("routeDesigner.selectPoints")}</h2>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                        defaultZoom={this.state.zoom}
                        yesIWantToUseGoogleMapApiInternals={true}
                        center={this.state.center}
                        onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map, maps)}
                        onClick={(e) => this.handleClick(e)}
                    >
                        {this.state.markers.map((marker, i) => {
                            return (
                                <Marker key={i}
                                        lat={marker.lat}
                                        lng={marker.lng}
                                        color="purple"
                                        name={"Waypoint" + i}
                                />

                            )
                        })}
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default withTranslation()(RouteDesigner)