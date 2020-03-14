import React, { Component } from 'react';
import { FriendsPageContent } from './notifications.component';

export class NotificationsComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            friends: []
        };
    }

    
    render() {
        const { friends } = this.state;
        const { webId } = "";

        return (
		
            <FriendsPageContent {...{ friends, webId }} />
			
			
        );
    }
}