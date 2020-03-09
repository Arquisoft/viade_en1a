import React, {Component} from 'react';
import RoutesInfo from "./routesInfo.component.js";

const RoutesHeader = () => {
    return (<h2>Your routes:</h2>)
};

class RoutesSideBar extends Component {

    state = {
        routes: [],
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null
        };

    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
        this.setState({routes: [...this.state.routes, this.state.selectedFile]});
    };

    render() {

        return (
            <aside>
                <RoutesHeader/>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
            </aside>
        );
    }
}

export default RoutesSideBar;