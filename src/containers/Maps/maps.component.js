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

    constructor() {
        super();
        this.show = this.show.bind(this);
        this.state = {
            url: "https://storage.googleapis.com/mapsdevsite/json/google.json",
            route: "",
			features: []
        }
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

    log = () => {
        console.log(this.state.url);
    };
	
	deleteOldRoute = () => {
		for (var i = 0; i < this.state.features.length; i++)
            this.map.data.remove(this.state.features[i]);
	}
	
    show = (parsedRoute) => {
		this.deleteOldRoute();
        this.setState({route: parsedRoute}, this.loadMap);

    };

    render() {
        return (
            <div style={{height: "100vh", width: "100%", display: "flex", flex: "row"}}>
                <RoutesSideBar show={this.show}/>
                <div style={{height: "100vh", width: "80%"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                        defaultCenter={[43.358756869202914, -5.861785411834717]}
                        defaultZoom={12}
                        yesIWantToUseGoogleMapApiInternals={true}
                        onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map, maps)}
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