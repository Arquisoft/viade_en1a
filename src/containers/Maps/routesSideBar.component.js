import React, {Component} from 'react';

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
        const files = [...event.target.files];
        let routes = [...this.state.routes];
        files.forEach((file) => {
            routes = [...routes, file.name];
        });
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
                <input type="file" name="file" onChange={this.onChangeHandler} multiple/>
                <RoutesData/>

            </aside>
        );
    }
}

export default RoutesSideBar;