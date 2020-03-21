import React, {Component} from 'react';
import FC from 'solid-file-client';
import auth from 'solid-auth-client';
import { MapsSideBar } from './maps.style';
import ReactDOM from 'react-dom';


const RoutesHeader = () => {
    return (<h2>Upload your routes</h2>);
};

/**
const Styles = {
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        paddingLeft: 25
      },
      input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        height: 40,
        color: '#ffffff'
      },
     image: {
        width: 40,
        height: 40
      }
};
 **/


class RoutesSideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            routes: []
        };

        this.fc = new FC( auth );
        this.uploadedFiles = false;
    }

    onChangeHandler = event => {
        this.uploadedFiles = false;
        const files = [...event.target.files];
        let routes = [...this.state.routes];
        files.forEach((file) => {  
            if(file.name.endsWith(".json")){
                routes = [...routes, file];
                this.uploadedFiles = true;
            }else{
                alert(file.name + " is not valid");
            }
            
        });
        this.setState({routes});
    };

    async onClickHandler(){
        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "routes/";
        if(!await this.fc.itemExists(url)){
            await this.fc.createFolder(url);
        }
        this.state.routes.forEach( async (route) => {
            //var name = this.getRouteName(route);
            await this.fc.createFile(url + route.name , route, "text/plain");
        });
        document.getElementById("btnPod").innerHTML = "Uploaded";
        document.getElementById("btnPod").disabled = true;
    }

    async getRouteName(route){
        var fileReader = new FileReader();
        fileReader.readAsText(route);
        fileReader.onload = function() {
            var obj = JSON.parse(fileReader.result);
            console.log(obj.routeName);
            return obj.routeName;
        }
    }

    async getPodRoutes(){
        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "routes/";

        console.log(await this.fc.readFolder(url).url); 
    }

    render() {
        const RoutesData = () => {
            const data = this.state.routes.map((route) => {
                var routeName = this.getRouteName(route);
                return (
                    <li key={routeName}>{routeName}</li>
                );
            });
            return <ul>{data}</ul>
        }
        return (
            <aside>
                <RoutesHeader/>
                <input type="file" name="file" accept=".json" onChange={this.onChangeHandler.bind(this)} multiple/>
                <RoutesData/>
                <button id="btnPod" disabled={!this.uploadedFiles}type="button" className="btn btn-success btn-block" onClick={this.onClickHandler.bind(this)}>Upload to your POD</button>
                <button id="btnRoutes" type="button" className="btn btn-success btn-block" onClick={this.getPodRoutes.bind(this)}>Routes</button>
                
                <MapsSideBar>
                    Here your routes
                </MapsSideBar>
            </aside>
        );
    }
}

export default RoutesSideBar;