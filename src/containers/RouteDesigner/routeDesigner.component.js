import React, {Component} from "react";
import GoogleMapReact from "google-map-react";
import {withTranslation} from "react-i18next";
import RoutesSideBar from "../Maps/routesSideBar.component";
import Carousel from "nuka-carousel";

class RouteDesigner extends Component {

    handleApiLoaded = (map, maps) => {
        this.map = map;
        this.maps = maps;
    };

    render() {
        return (
            <div style={{height: "80vh", width: "100%", display: "flex", flex: "row"}}>
                <RoutesSideBar show={this.show} toggleCOVID={this.toggleCOVID}/>
                <div style={{height: "60vh", width: "80%"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                        defaultZoom={this.state.zoom}
                        yesIWantToUseGoogleMapApiInternals={true}
                        center={this.state.center}
                        onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map, maps)}

                    >
                    </GoogleMapReact>
                    <Carousel renderBottomCenterControls={false} slidesToShow={3} height="20vh" dragging={true}
                              style={{textAlign: "center", background: "url('img/fondoGaleria.png')"}}>
                        {this.state.galery}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default withTranslation()(RouteDesigner)