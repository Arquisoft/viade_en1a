import React, { Component } from "react";
import FC from "solid-file-client";
import auth from "solid-auth-client";

import {Notis} from "./Notis";

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

    }

    async getNotificationsFromInbox() {
        var session = await auth.currentSession();
        var inbox = session.webId.split("profile/card#me")[0] + "inbox/";

        let inboxFolder = await this.fc.readFolder(inbox);


        for (let index = 0; index < inboxFolder.files.length; index++) {
            var name = await this.getFullNotification(inboxFolder.files[parseInt(index)].url.toString());
            let url = inboxFolder.files[parseInt(index)].url;
            this.state.notifications.push({name, url });
        }

        let notifications = [...this.state.notifications];
        this.setState({notifications});

    }

    async getFullNotification(url) {
        let myUrl = url.toString();
      
        let fol = await this.fc.readFile(myUrl.toString());
        let getSchem = fol.split("<>");
        let getImportant = getSchem[1].split("text");
        let theUrl = getImportant[1].split("\"")[1];
        let theSplitUrl = theUrl.split("/");

        let name = theSplitUrl[theSplitUrl.length-1];

        let fullLabel = getImportant[1].split("\"")[3];
        //let sender = fullLabel.split("Shared route ")[1]

        return fullLabel +" ("+name+")";
    }

    listNotifications = () => {

        let list = [];

        for (let i = 0; i < this.state.notifications.length; i++) {
            list.push(<Notis key={i}{...{

                noti: {
                    name: this.state.notifications[parseInt(i)].name
                }               

            }}/>);
        }
        return list;

    };

    render() {

        return (

            <div id="notificationsCard" className="card">
                    <h3>Notifications</h3>
                    {this.listNotifications()}
            </div>

        );
    }
}