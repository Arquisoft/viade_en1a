import React, {Component} from 'react';
import RoutesInfo from "./routesInfo.component.js";

const RoutesHeader = () => {
    return (<h2>Your routes:</h2>)
};

class RoutesSideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            routes: []
        };

    }

    onChangeHandler = event => {
        const filename = event.target.files[0].name;
        const routes = [...this.state.routes, filename];
        this.setState({routes});
    };

    render() {
        const RoutesData = () => {

            const data = this.state.routes.map((route) => {
                return (
                    <li key={route}>{route}</li>
                );
            });
            return <ul>{data}</ul>
        }
        return (
            <aside>
                <RoutesHeader/>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <RoutesData/>

            </aside>
        );
    }
}

export default RoutesSideBar;