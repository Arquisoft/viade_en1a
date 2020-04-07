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

        this.getNotificationsFromInbox = this.getNotificationsFromInbox.bind(this);
        this.getNotificationsFromInbox();
        
        this.fc = new FC(auth);

    }

    async getNotificationsFromInbox() {
        var session = await auth.currentSession();
        var inbox = session.webId.split("profile/card#me")[0] + "inbox/";

        let inboxFolder = await this.fc.readFolder(inbox);

        inboxFolder.files.forEach((elementShared) => {

            notifications : this.state.notifications.push({name: elementShared.name, url: elementShared.url});

        });

    }

    //onChangeHandler = (event) => {
    //
    //    let notifications = [...this.state.notifications];      
    //
    //    this.setState({notifications});
    //};

    listNotifications = () => {

        let list = [];

        for (let i = 0; i < this.state.notifications.length; i++) {

            list.push(<Notis key={i}{...{

                noti: {
                    name: this.state.notifications[i].name
                }
    
            }}/>);

            console.log("Hi")

        }

        list.push(<Notis key={100}{...{

            noti: {
                name: "Esta notificacion está fuera del bucle!"
            }

        }}/>);

        return list;

    };

    render() {

        return (

            <div id="notificationsCard" className="card">
                <h3>Notificaciones</h3>
                {this.listNotifications()}
            </div>

        );
    }
}