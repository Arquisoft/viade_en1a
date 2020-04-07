import React, { Component } from "react";
import FC from "solid-file-client";
import data from "@solid/query-ldflex";
import auth from "solid-auth-client";

export class NotificationsComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        };

        this.fc = new FC(auth);

        this.getNotificationsFromInbox = this.getNotificationsFromInbox.bind(this);
        this.getNotificationsFromInbox();

    }

    componentDidMount() {
        const webId = this.props; //unnecesary??
        if (webId){
            this.getProfileData();
        } 
        this.render();
    }

    // componentDidUpdate(prevProps) {
    //    const webId = this.props;
    //    if (webId && webId !== prevProps.webId){
    //        this.getProfileData();
    //    }
    //    this.render();
    // }

    getProfileData = async () => {
        this.setState({ isLoading: true });

        /*var notifications = await this.getNotificationsFromInbox();
        this.setState({ notifications: notifications });*/
    }

    async getNotificationsFromInbox() {
        var session = await auth.currentSession();
        var inbox = session.webId.split("profile/card#me")[0] + "inbox/";

        let inboxFolder = await this.fc.readFolder(inbox);

        inboxFolder.files.forEach((elementShared) => {

            this.state.notifications.push({name: elementShared.name, url: elementShared.url});

        });

        console.log(this.state.notifications);

    }

    listRoutes = () => {

        let list = [];

        /*for (let i = 0; i < this.state.notifications.length; i++) {

            list.push(<MapRoute key={i}{...{

                route: {
                    name: this.state.routesList[i].name,

                    url: this.state.routesList[i].url,

                    showRoute: this.showRoute,

                    shareRoute: this.shareRoute,

                    deleteRoute: this.deleteRoute

                }

            }}/>);
            console.log(this.state.notifications[i].url)
        }*/

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