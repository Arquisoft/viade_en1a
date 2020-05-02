import React, { Component } from "react";
import { ShareRoutesPageContent } from "./shareroutes.component";
import auth from "solid-auth-client";
import FC from "solid-file-client";
import {withTranslation} from "react-i18next";
import { ShareWrapper } from "./shareroutes.style";
import {Redirect} from "react-router-dom";
import $ from "jquery";

import { webId, fullWebId } from "../../modules/solidAuth.js";
import { getFriendGroups, inflateGroups } from "../../modules/groupsHandler.js";
import { itemExists, readFile, getFriendInbox, buildNotification, manageAcl } from "../../modules/podHandler.js";

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

        this.groups = await getFriendGroups();
        
        this.inflateGroups(this.groups).then((r) => {
            this.setState({inflatedGroups: r});
        });
    };

    inflateGroups = async (groups) => {
        return await inflateGroups(groups);
    };

    async getRoute(){
        var name = this.getRouteName();
        if(await itemExists("viade/routes/" + name)){
            let file = await readFile("viade/routes/" + name);
            if (file !== null){
                this.setState({route: file});
            }
        }else{
            this.setState({routeExists: false});
        }
    }

    async shareRoute(friend, id){
        const { t } = this.props;
        try{
            var targetUrl = getFriendInbox(friend);
            await this.modifyPermissionsRoute(this, this.getRouteName(), friend);
            await this.modifyPermissionsMedia(this, friend);
            await this.sendMessage(this, targetUrl);
            let btnShare = $("#btn" + id);
            btnShare.prop("disabled", true);
            btnShare.html(t("routes.shared"));
        }catch(error){
            alert(t("routes.sharingError"));
        }
        
    }

    async modifyPermissionsRoute(app, routeName, friend){
        let routeUrl = await webId() + "viade/routes/" + routeName;
        await app.manageAcl(routeUrl, routeName, friend);    
    }

    async modifyPermissionsMedia(app, friend){
        let routeJson = JSON.parse(app.state.route);

        const { media } = routeJson;
        if(media.length > 0){
            media.forEach(async (m) => {
                let fileUrl = m.url;
                let mName = fileUrl.split("viade/resources/")[1];
                await app.manageAcl(fileUrl, mName, friend);
            });
        }
    }

    async manageAcl(fileUrl, fileName, friend){
        await manageAcl(fileUrl, fileName, friend);
    }

    async sendMessage(app, targetUrl){
        var message = {};
        message.date = new Date(Date.now());
        message.id = message.date.getTime();
        message.sender = await fullWebId();
        message.recipient = targetUrl;

        var source = await webId() + "viade/routes/";
        message.content = source + app.getRouteName();
        message.title = "Shared route by " + await app.getSessionName();
        message.url = message.recipient + message.id + ".ttl";
        
        console.log(message);
        await app.buildMessage(message);
    }

    async buildMessage(message){
        buildNotification(message);
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
                {this.state.routeExists ? (<ShareRoutesPageContent {...{ inflatedGroups, share }} />) : (<Redirect to="/404" />)}
            </ShareWrapper>
        );
    }
}
export default withTranslation()(ShareRoutesComponent);