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
        this.getRoute(window.location.href);
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

    async getRoute(webUrl){
        var name = webUrl.split("=")[1];
        
        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "routes/";
        let folder = await this.fc.readFolder(url);
        folder.files.forEach((element) => {
            if(element.name === name){
                this.setState({route: element});
            }
        });
    }

    async shareRoute(friend){
        var session = await auth.currentSession();
        var targetUrl = friend.name + "routes/";
        if (!await this.fc.itemExists(targetUrl)) {
            await this.fc.createFolder(targetUrl);
        }
        var sourceUrl = session.webId.split("profile/card#me")[0] + "routes/";
        await this.fc.copyFile( sourceUrl + this.state.route.name, targetUrl + this.state.route.name, {withAcl:false, withMeta:false});
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