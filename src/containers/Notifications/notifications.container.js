import React, { Component } from "react";
import {NotificationsContainer, NotificationsWrapper} from "./notifications.style";
import {Notis} from "./Notis";
import { getSharedRoutes } from "../../modules/podHandler.js";

export class NotificationsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };

        this.getFullNotification = this.getFullNotification.bind(this);

        this.getNotificationsFromInbox = this.getNotificationsFromInbox.bind(this);
        this.getNotificationsFromInbox();
    } 

    async getNotificationsFromInbox() {
        this.setState({notifications: await getSharedRoutes()});
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
        return list;

    };

    render() {

        return (
            <NotificationsWrapper>
            <NotificationsContainer id="notificationsCard" className="card">
                    {this.listNotifications()}
            </NotificationsContainer>
            </NotificationsWrapper>

        );
    }
}