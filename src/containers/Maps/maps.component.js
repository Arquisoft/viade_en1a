import React, {Component} from 'react';
import RoutesSideBar from './routesSideBar.component';
import GoogleMapReact from 'google-map-react';
import * as Icon from 'react-feather';

const MyMarker = ({icon}) => <div>{icon}</div>;

    /**
const mapStyles = {
    marginLeft: '21%',
    marginBottom: '10%'
};
     **/

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    handleApiLoaded = (map, maps) => {
        map.data.loadGeoJson("https://storage.googleapis.com/mapsdevsite/json/google.json");//exampleRoute.json
        map.data.setMap(map);
    };


    render() {
        return (
            <div style={{height: "100vh", width: "100%", display: "flex", flex: "row"}}>
                <RoutesSideBar/>
                <div style={{height: "100vh", width: "80%"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                        defaultCenter={[43.358756869202914, -5.861785411834717]}
                        defaultZoom={12}
                        yesIWantToUseGoogleMapApiInternals={true}
                        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                    >
                        <MyMarker
                            lat={43.358756869202914}
                            lng={-5.861785411834717}
                            icon={<Icon.Home/>}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default SimpleMap;