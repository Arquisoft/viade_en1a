import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { ShareRoutesPageContent } from './shareroutes.component';
import auth from 'solid-auth-client';
import FC from 'solid-file-client';
import { namedNode } from '@rdfjs/data-model';
import { withTranslation } from "react-i18next";
import { FriendsContainer } from "../Friends/friends.style";

class ShareRoutesComponent extends Component<Props> {

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
        const { t } = this.props;

        try{
            var session = await auth.currentSession();
            var targetUrl = friend.webId.split("profile/card#me")[0] + "inbox/";
            await this.sendMessage(this, session, targetUrl);
            document.getElementById("btn"+friend.webId).innerHTML = t("routes.shared");
            document.getElementById("btn"+friend.webId).disabled = true;
        }catch(error){
            console.log(error);
            alert("Could not share the route");
        }
        
    }

    async sendMessage(app, session, targetUrl){
        var message = {};
        message.date = new Date(Date.now());
        message.id = message.date.getTime();
        message.sender = session.webId;
        message.recipient = targetUrl;

        var baseSource = session.webId.split("profile/card#me")[0];
        var source = baseSource + "public/routes/";
        message.content = source + app.getRouteName();
        message.title = "Shared route by " + await app.getSessionName();
        message.url = message.recipient + message.id + ".ttl";
        
        await app.buildMessage(session, message);
    }

    async buildMessage(session, message){
        var mess = message.url;
        await data[mess].schema$text.add(message.content);
        await data[mess].rdfs$label.add(message.title);
        await data[mess].schema$dateSent.add(message.date.toISOString());
        await data[mess].rdf$type.add(namedNode('https://schema.org/Message'));
        await data[mess].schema$sender.add(namedNode(session.webId));
    }

    async getSessionName(){
        var session = await auth.currentSession();
        var tmp = session.webId.split(".")[0];
        return tmp.split("//")[1];
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
            <FriendsContainer className="card">
                <ShareRoutesPageContent {...{ friends, share }} />
            </FriendsContainer>
        );
    }
}
export default withTranslation()(ShareRoutesComponent);