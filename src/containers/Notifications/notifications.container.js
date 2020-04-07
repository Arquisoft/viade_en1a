import React, { Component } from "react";
import FC from "solid-file-client";
import auth from "solid-auth-client";

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

            this.state.notifications.push({name: elementShared.name, url: elementShared.url});

        });

    }

    listRoutes = () => {

        let list = [];

        for (let i = 0; i < this.state.notifications.length; i++) {

            console.log("Hi")

        }

        return list;

    };

    render() {

        return (

            <div id="notificationsCard" className="card">
                <h3>Notificaciones</h3>
                {this.listRoutes()}
                <ul>
                    <li>Holi</li>
                </ul>
            </div>

        );
    }
}