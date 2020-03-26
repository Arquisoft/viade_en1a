import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { ShareRoutesPageContent } from './shareroutes.component';
import auth from 'solid-auth-client';
import FC from 'solid-file-client';

export class ShareRoutesComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            route: null
        };
        this.fc = new FC(auth);
        this.getRoute();
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
                image = "";
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

    async getRoute(){
        var name = this.getRouteName();
        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "routes/";
        var file = await this.fc.readFile(url + name);
        if (file != null){
            this.setState({route: file});
        }
    }

    async shareRoute(friend){
        //var session = await auth.currentSession();
        var targetUrl = friend.name + "public/";
        if (!await this.fc.itemExists(targetUrl)) {
            await this.fc.createFolder(targetUrl);
        }
        var fileName = this.getRouteNameNoExtension();
        await this.fc.postFile( targetUrl + fileName, this.state.route, "application/json");
    }

    getRouteNameNoExtension(){
        var tmp = window.location.href.split("=")[1];
        return tmp.substring(tmp.lastIndexOf('/') + 1);
    }

    getRouteName(){
        return window.location.href.split("=")[1];
    }
    
    render() {
        const { friends } = this.state;
        const share = {
            shareRoute: this.shareRoute.bind(this)
        }

        return (
            <ShareRoutesPageContent {...{ friends, share }} />
        );
    }
}