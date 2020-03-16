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
        map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json')//exampleRoute.json
        map.data.setMap(map);
    };

    render() {
        return (
            <div style={{height: '100vh', width: '100%', display: 'flex', flex: 'row'}}>
                <div style={{height: '100vh', width: '20%', }}>
                <RoutesSideBar/>
                </div>
            <div style={{height: '100vh', width: '80%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                    defaultCenter={[43.358756869202914, -5.861785411834717]}
                    defaultZoom={12}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
            </div>
        );
    }
}

export default SimpleMap;