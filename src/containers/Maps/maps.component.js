import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { MapsWrapper2, MapsCard } from './maps.style';
import RoutesSideBar from './routesSideBar.component';

const mapStyles = {
    marginLeft: '21%',
    marginBottom: '10%'
};


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
                            zoom={14}
                            style={mapStyles}
                            initialCenter={{
                                lat: 43.5453,
                                lng: -5.66193
                            }}
                        />
                    </div>
                </MapsCard>

            </MapsWrapper2>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ'
})(Maps);