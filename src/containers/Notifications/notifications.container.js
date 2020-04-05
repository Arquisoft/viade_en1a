import React, { Component } from 'react';
import { NotificationsPageContent } from './notifications.component';
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

        var notifications = await this.getNotificationsFromInbox();
        this.setState({ notifications: notifications });
    }

    async getNotificationsFromInbox() {
        let inbox = await this.getInbox();
        let inboxFolder = await this.fc.readFolder(inbox);

        var notifications = [];

        inboxFolder.files.forEach(async (file) => {
            let notification = {};
            notification.url = inbox + file.name;

            notification.label = await data[notification.url].rdfs$label;
            notification.sender = await data[notification.url].schema$sender;
            notification.dateSent = new Date(await data[notification.url].schema$dateSent).toString();
            notification.text = await data[notification.url].schema$text;
            notification.senderName = await data[notification.sender].vcard$fn;


            notifications.push(
                notification
            );
        });

        return notifications;
    }

    async getInbox() {
        let session = await auth.currentSession();
        let inbox = session.webId.split("profile/card#me")[0] + "inbox/";
        return inbox;
    }

    render() {
        const notifications = this.state;
        const getNotificationsFromInbox = this.getNotificationsFromInbox.bind(this);
        console.log("hjaja");

        return (

            <NotificationsPageContent {...{ notifications, getNotificationsFromInbox }} />


        );
    }
}