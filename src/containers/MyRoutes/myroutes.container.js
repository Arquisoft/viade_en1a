import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { MyRoutesPageContent } from './myroutes.component';

export class MyRoutesComponent extends Component<Props> {


    constructor(props) {
        super(props);

        this.state = {
            routes: [],
            selectedFile: null
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

    onChangeHandler= event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });
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
                image = "";
            }

            var friend_obj = {
                "webId": friendWebId,
                "name": name,
                "image": image
            }

            friends.push(friend_obj);
        }

        this.setState({ friends });
    };

    render() {
        const { routes } = this.state;
        const { onchangehandler } = this.onChangeHandler;
        const { webId } = this.props;

        return (
            <MyRoutesPageContent {...{ routes, webId, onchangehandler }} />
        );
    }
}