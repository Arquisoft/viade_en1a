import React, {Component, createRef} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import {ButtonStyled, MapsWrapper2, MapsCard, MapsSideBar} from './maps.style';

import RoutesSideBar from './routesSideBar.component';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}) => <div>{text}</div>;

const mapStyles = {
    marginLeft: '21%',
    marginBottom: '10%'
};
/*
class Map extends Component {
    componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
        });
        map.data.loadGeoJson()
    }

    render() {
        return (
            <div style={{ width: 500, height: 500 }} id="map" />


        ;
    }
}
*/

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    handleApiLoaded = (map, maps) => {
        maps.data.loadGeoJson("./exampleRoute.json")
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;


/*
export class Maps extends Component {
    render() {

        return (
            <MapsWrapper2>

                <MapsCard>
                    <RoutesSideBar/>
                </MapsCard>

                <MapsCard>
                    <div>
                        <Map
                            google={this.props.google}
                            onLoad={onMapLoad}
                        />
                    </div>
                </MapsCard>

            </MapsWrapper2>

        );
    }
}
*/
/*
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ'
})(Maps);
 */