import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { FriendsPageContent } from './friends.component';

export class FriendsComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            friends: []
        };
    }

    componentDidMount() {
        const { webId } = this.props;
        if (webId) this.getProfileData();
    }

    componentDidUpdate(prevProps) {
        const { webId } = this.props;
        if (webId && webId !== prevProps.webId) this.getProfileData();
    }

    getProfileData = async () => {
        this.setState({ isLoading: true });
        const { webId } = this.props;

        const user = data[webId];

        let friends = [];

        for await (const friend of user.friends) {
            const friendWebId = await friend.value;

            const friend_data = data[friendWebId];

            const nameLd = await friend_data.name;

            const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : friendWebId.toString();
            const imageLd = await friend_data.vcard_hasPhoto;

            let image;
            if (imageLd && imageLd.value) {
                image = imageLd.value;
            } else {
                image = "img/noimg.svg";
            }

            var friend_obj = {
                "webId": friendWebId,
                "name": name,
                "image": image
            };

            friends.push(friend_obj);
        }

        this.setState({ friends });
    };

    render() {
        const { friends } = this.state;
        const { webId } = this.props;

        return (
            <FriendsPageContent {...{ friends, webId }} />
        );
    }
}