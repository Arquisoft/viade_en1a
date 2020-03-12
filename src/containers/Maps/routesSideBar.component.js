import React, {Component} from 'react';
import FC from 'solid-file-client';
import auth from 'solid-auth-client';

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

        

        this.fc = new FC( auth );
    }

    onChangeHandler = event => {
        const files = [...event.target.files];
        let routes = [...this.state.routes];
        files.forEach((file) => {
            routes = [...routes, file.name];
        });
        this.setState({routes});
    };

    async onClickHandler(){
        if(this.state.routes.length != 0){
            var session = await auth.currentSession();
            var url = session.webId.split("profile/card#me")[0] + "prueba/";
            if(!await this.fc.itemExists(url)){
                await this.fc.createFolder(url);
            }
            this.state.routes.forEach( async (route) => {
                await this.fc.createFile(url + "prueba.txt" , route, "text/plain");
            });
        }
    }

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
                <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler.bind(this)}>Upload to your POD</button>
            </aside>
        );
    }
}

export default RoutesSideBar;