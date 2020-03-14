import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { FriendsPageContent } from './friends.component';

export class NotificationsComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            friends: []
        };
    }

    
    render() {
        const { friends } = this.state;
        const { webId } = this.props;

        return (
            <FriendsPageContent {...{ friends, webId }} />
        );
    }
}