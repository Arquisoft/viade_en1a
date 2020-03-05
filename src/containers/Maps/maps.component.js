import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '75%'
};

export class Maps extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: 43.5453,
                    lng: -5.66193
                }}
            >
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ'
})(Maps);