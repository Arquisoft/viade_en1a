import React, {Component} from 'react';

class RoutesInfo extends Component{
    state={
        filename: this.props.filename
};
    constructor(props) {
    super(props);

    }
    render() {
        return (
            <div>
            <p> This is a route</p>
            </div>
        );
    }
}

export default RoutesInfo;