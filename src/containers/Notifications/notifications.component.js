import React, { Component } from "react";

class NotificationsPageContent extends Component {
    constructor(props) {

        super(props);

        this.state = {

            notifications: [],

        };

        this.state.notifications = props.notifications;
        //const getNotificationsFromInbox = props.getNotificationsFromInbox;
        console.log(this.state.notifications);

    }
    

    render() {
        return (
            <div id="notificationsCard" className="card">
                <h3>Notificaciones</h3>
                <ul>
                    <li>Holi</li>
                </ul>
            </div>
        );

    }
    
}

export default NotificationsPageContent;