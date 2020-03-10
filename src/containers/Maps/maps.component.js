import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { MapsWrapper2, MapsCard, MapsSideBar} from './maps.style';

const mapStyles = {
    marginLeft: '21%',
    marginBottom: '10%'
};

export class Maps extends Component {
    render() {
        return (
            <MapsWrapper2>
                
                <MapsCard>
                    <MapsSideBar>Your routes:</MapsSideBar>
                </MapsCard>

                <MapsCard>
                    <Map
                        google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={{
                            lat: 43.5453,
                            lng: -5.66193
                        }}
                     ></Map>
                </MapsCard>

            </MapsWrapper2>
                
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_API_KEY
})(Maps);