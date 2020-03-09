import React, {Component} from 'react';

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

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler= this.onClickHandler.bind(this);
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0].name,
            loaded: 0
        });
    };
    onClickHandler = () => {
        console.log(this.state.selectedFile);
        return (<p>Title: {this.state.selectedFile}</p>);
    };

    render() {

        return (
            <aside>
                <RoutesHeader/>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <button type="button" onClick={this.onClickHandler}>Upload</button>
            </aside>
        );
    }
}

export default RoutesSideBar;