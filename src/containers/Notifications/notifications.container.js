import React, { Component } from "react";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import {NotificationsContainer, NotificationsWrapper} from "./notifications.style";
import {Notis} from "./Notis";
import { Loader } from "@util-components";

export class NotificationsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };

        this.getFullNotification = this.getFullNotification.bind(this);

        this.getNotificationsFromInbox = this.getNotificationsFromInbox.bind(this);
        this.getNotificationsFromInbox();
        
        this.fc = new FC(auth);

        this.isLoading=true;

    } 

    async getNotificationsFromInbox() {
        var session = await auth.currentSession();
        var inbox = session.webId.split("profile/card#me")[0] + "inbox/";

        let inboxFolder = await this.fc.readFolder(inbox);


        for (let index = 0; index < inboxFolder.files.length; index++) {
            try{
                var name = await this.getFullNotification(inboxFolder.files[parseInt(index)].url.toString());
                let url = inboxFolder.files[parseInt(index)].url;
                let routeUrl = await this.getSharedRoute(url);
                let content = await this.fc.readFile(routeUrl.toString());
                let route = JSON.parse(content);
                var trueName = name+route.name+")";
                //console.log(trueName);
                this.state.notifications.push({name, trueName, url });
            } catch {
               //do nothing ;
            }
        }

        let notifications = [...this.state.notifications];
        this.setState({notifications});

    }

    async getSharedRoute(url) {
        let fol = await this.fc.readFile(url.toString());
        let getSchem = fol.split("<>");
        let urlText = getSchem[1].split("text");
        return urlText[1].split("\"")[1];

    }

    async getFullNotification(url) {
        let myUrl = url.toString();
        
        let fol = await this.fc.readFile(myUrl);
        let getSchem = fol.split("<>");
        let getImportant = getSchem[1].split("text");
        //let theUrl = getImportant[1].split("\"")[1];
        //let theSplitUrl = theUrl.split("/");

        //let name = theSplitUrl[theSplitUrl.length-1];

        let fullLabel = getImportant[1].split("\"")[3];
        //let sender = fullLabel.split("Shared route ")[1]

        return fullLabel +" (";
    }

    listNotifications = () => {

        let list = [];

        for (let i = 0; i < this.state.notifications.length; i++) {
            list.push(<Notis key={i}{...{

                noti: {
                    name: this.state.notifications[parseInt(i)].trueName
                }               

            }}/>);
        }
        if(list.length>0){
            this.isLoading=false;
        }
        
        return list;

    };

    render() {

        return (
            <NotificationsWrapper>
            <NotificationsContainer id="notificationsCard" className="card">
                <h1>Notifications</h1>
                    {this.listNotifications()}
            </NotificationsContainer>
            {this.isLoading && <Loader absolute/>}
            </NotificationsWrapper>

        );
    }
}