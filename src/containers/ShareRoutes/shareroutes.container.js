import React, { Component } from "react";
import data from "@solid/query-ldflex";
import { ShareRoutesPageContent } from "./shareroutes.component";
import auth from "solid-auth-client";
import FC from "solid-file-client";
import { namedNode } from "@rdfjs/data-model";
import { withTranslation } from "react-i18next";
import SolidAclUtils from "solid-acl-utils";
import { FriendsShareContainer, ShareWrapper } from "./shareroutes.style";
import {Redirect} from "react-router-dom";

class ShareRoutesComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            inflatedGroups: {},
            route: null,
            routeExists: true
        };
        this.fc = new FC(auth);
        this.getRoute();
    }

    componentDidMount() {
        const { webId } = this.props;
        if (webId) {this.getProfileData();}
    }

    componentDidUpdate(prevProps) {
        const { webId } = this.props;
        if (webId && webId !== prevProps.webId) {this.getProfileData();}
    }

    getProfileData = async () => {
        this.setState({isLoading: true});

        var session = await auth.currentSession();
        var folderUrl = session.webId.split("profile/card#me")[0] + "viade/groups/";

        if (!await this.fc.itemExists(folderUrl)) {
            await this.fc.createFolder(folderUrl);
        }

        if (!await this.fc.itemExists(folderUrl + "groups.json")) {
            await this.fc.createFile(folderUrl + "groups.json", JSON.stringify({}), "text/json");
        }

        this.groups = JSON.parse(await this.fc.readFile(folderUrl + "groups.json"));

        this.inflateGroups(this.groups).then((r) => {
            this.setState({inflatedGroups: r});
        });
    };

    inflateGroups = async (groups) => {
        let aux = {};
        aux["Default"] = [];
        const {webId} = this.props;
        const user = data[webId];

        Object.keys(groups).map((key) => {
            aux[String(key)] = [];
            return null;
        });

        for await (const friend of user.friends) {
            const friendWebId = await friend.value;
            const friendData = data[String(friendWebId)];
            const nameLd = await friendData.name;
            const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : friendWebId.toString();
            const imageLd = await friendData.vcard_hasPhoto;

            let image;
            if (imageLd && imageLd.value) {
                image = imageLd.value;
            } else {
                image = "img/noimg.svg";
            }

            var friendObj = {
                "webId": friendWebId,
                name,
                image
            };

            let targetGroup = "Default";

            // eslint-disable-next-line
            Object.keys(groups).map((key) => {
                groups[String(key)].map(
                    (e) => {
                        if (e === friendObj.webId) {
                            targetGroup = key;
                        }
                        return null;
                    }
                );
                return null;
            });

            aux[String(targetGroup)].push(friendObj);
        }

        return aux;
    };

    async getRoute(){
        var name = this.getRouteName();
        var session = await auth.currentSession();
        var url = session.webId.split("profile/card#me")[0] + "viade/routes/";
        if(await this.fc.itemExists(url + name)){
            var file = await this.fc.readFile(url + name);
            if (file !== null){
                this.setState({route: file});
            }
        }else{
            this.setState({routeExists: false});
        }
    }

    async shareRoute(friend){
        const { t } = this.props;

        try{
            var session = await auth.currentSession();
            var targetUrl = friend.webId.split("profile/card#me")[0] + "inbox/";
            await this.modifyPermissionsRoute(this, session, this.getRouteName(), friend);
            await this.modifyPermissionsMedia(this, friend);
            await this.sendMessage(this, session, targetUrl);
        }catch(error){
            alert(t("routes.sharingError"));
        }
        
    }

    async modifyPermissionsRoute(app, session, routeName, friend){
        let base = session.webId.split("profile/card#me")[0];
        let routeUrl = base + "viade/routes/" + routeName;

        await app.manageAcl(app, routeUrl, routeName, friend);    
    }

    async modifyPermissionsMedia(app, friend){
        let routeJson = JSON.parse(app.state.route);
        const { media } = routeJson;
        if(!(typeof media === "undefined")){
            media.forEach(async (m) => {
                let fileUrl = m.url;
                let mName = fileUrl.split("viade/resources/")[1];
                await app.manageAcl(app, fileUrl, mName, friend);
            });
        }
    }

    async manageAcl(app, fileUrl, fileName, friend){
        const { AclApi, Permissions } = SolidAclUtils;
        const { READ } = Permissions;

        let aclUrl = fileUrl + ".acl";
        if(!await app.fc.itemExists(aclUrl)){
            let content = await app.buildAcl(fileName);
            await app.fc.createFile(aclUrl, content, "text/turtle");
        }
        let friendWebId = friend.webId + "profile/card#me";
        const fetch = auth.fetch.bind(auth);
        const aclApi = new AclApi(fetch, { autoSave: true });
        const acl = await aclApi.loadFromFileUrl(fileUrl);

        await acl.addRule(READ, friendWebId);
    }

    buildAcl(routeName){
        let content = 
        "@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n" + 
        "@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n" + 
        "<#owner> a acl:Authorization;\n" + 
        "acl:agent </profile/card#me>;\n" +
        "acl:accessTo <./"+ routeName +">;" +
        "acl:mode acl:Write, acl:Control, acl:Read.";

        return content; 
    }

    async sendMessage(app, session, targetUrl){
        var message = {};
        message.date = new Date(Date.now());
        message.id = message.date.getTime();
        message.sender = session.webId;
        message.recipient = targetUrl;

        var baseSource = session.webId.split("profile/card#me")[0];
        var source = baseSource + "viade/routes/";
        message.content = source + app.getRouteName();
        message.title = "Shared route by " + await app.getSessionName();
        message.url = message.recipient + message.id + ".ttl";
        
        await app.buildMessage(session, message);
    }

    async buildMessage(session, message){
        var mess = message.url;
        await data[mess.toString()].schema$text.add(message.content);
        await data[mess.toString()].rdfs$label.add(message.title);
        await data[mess.toString()].schema$dateSent.add(message.date.toISOString());
        await data[mess.toString()].rdf$type.add(namedNode('https://schema.org/Message'));
        await data[mess.toString()].schema$sender.add(namedNode(session.webId));
    }

    async getSessionName(){
        var session = await auth.currentSession();
        var tmp = session.webId.split(".")[0];
        return tmp.split("//")[1];
    }

    getRouteNameNoExtension(){
        var tmp = window.location.href.split("=")[1];
        return tmp.substring(tmp.lastIndexOf("/") + 1);
    }

    getRouteName(){
        return window.location.href.split("=")[1];
    }
    
    render() {
        const  { inflatedGroups }  = this.state;
        const share = {
            shareRoute: this.shareRoute.bind(this)
        };
        return (
            <ShareWrapper>
            <FriendsShareContainer className="card">
                {this.state.routeExists ? (<ShareRoutesPageContent {...{ inflatedGroups, share }} />) : (<Redirect to="/404" />)}
            </FriendsShareContainer>
            </ShareWrapper>
        );
    }
}
export default withTranslation()(ShareRoutesComponent);