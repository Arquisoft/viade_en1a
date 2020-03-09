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
    };
    onClickHandler = () => {
        let routes =()=> {};
        this.setState(this.state.routes.concat(name= this.state.selectedFile.name));
        this.setState(this.state.selectedFile= null);
    };

    render() {

        return (
            <aside>
                <RoutesHeader/>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <button type="button" onClick={this.onClickHandler}>Upload</button>
                <div>
                    {this.state.routes.map((route)=> {
                        <RoutesInfo filename={route.filename}/>
                    })}
                </div>
            </aside>
        );
    }
}

export default RoutesSideBar;