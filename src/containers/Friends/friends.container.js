import React, {Component} from "react";
import {FriendsPageContent} from "./friends.component";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import { errorToaster } from "@utils";

import { itemExists, deleteFileRelativePath, createFile } from "../../modules/podHandler.js"; 
import { addFriendToGroup, deleteFriendToGroup, getFriendGroups, inflateGroups } from "../../modules/groupsHandler.js";

export class FriendsComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            inflatedGroups: {}
        };

        this.fc = new FC(auth);

        this.groups = {};
        this.isLoading=false;

        this.addFriend = this.addFriend.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.changeFriendGroup = this.changeFriendGroup.bind(this);
    }

    addGroup = async (group) => {
        this.groups[group] = [];

        if(await itemExists("viade/groups/groups.json")){
            await deleteFileRelativePath("viade/groups/groups.json");
            await createFile("viade/groups/groups.json", JSON.stringify(this.groups));
        }

        this.inflateGroups(this.groups).then((r) => {
            this.setState({inflatedGroups: r});
        });
    };

    deleteGroup = async (group) => {

        delete this.groups[group];

        if(await itemExists("viade/groups/groups.json")){
            await deleteFileRelativePath("viade/groups/groups.json");
            await createFile("viade/groups/groups.json", JSON.stringify(this.groups));
        }

        this.inflateGroups(this.groups).then((r) => {
            this.setState({inflatedGroups: r});
        });
    };

    changeFriendGroup = async(friendid, group) => {
        this.deleteFriend(friendid, this.addFriend, group);
    };

    deleteFriend = async (friendid, callback, group) => {
       let aux = {};
       const _this = this;
       deleteFriendToGroup(friendid, async function(uri, ok, message){
        if (ok) {
            Object.keys(_this.groups).map((key) => {
                aux[key] = [];
                _this.groups[String(key)].forEach(
                    (e) => {
                        if (e !== friendid) {
                            aux[key].push(e);
                        }
                    }
                );
                return null;
            });

            if(await itemExists("viade/groups/groups.json")){
                await deleteFileRelativePath("viade/groups/groups.json");
                await createFile("viade/groups/groups.json", JSON.stringify(_this.groups)).then(
                    () => {
                        _this.groups = aux;

                        _this.inflateGroups(_this.groups).then((r) => {
                            _this.setState({inflatedGroups: r});
                            if(callback){
                                callback(friendid, group);
                            }
                        });
                    }
                );
            }

        } else {
            errorToaster(message, "Error");
        }
       });
    };

    addFriend = async (friendid, group) => { 
        const _this = this;
        addFriendToGroup(friendid, async function(uri, ok, message){
            if (ok) {
                if(group !== "Default") {
                    _this.groups[String(group)].push(friendid);
                    if(await itemExists("viade/groups/groups.json")){
                        await deleteFileRelativePath("viade/groups/groups.json");
                        await createFile("viade/groups/groups.json", JSON.stringify(_this.groups));
                    }
                }
                _this.inflateGroups(_this.groups).then((r) => {
                    _this.setState({inflatedGroups: r});
                });
            } else {
                errorToaster(message, "Error");
            }
        });
    };

    componentDidMount() {
        const {webId} = this.props;
        if (webId) this.getProfileData();
    }

    componentDidUpdate(prevProps) {
        const {webId} = this.props;
        if (webId && webId !== prevProps.webId) this.getProfileData();
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


    render() {
        const groups = this.state.inflatedGroups;
        const {webId} = this.props;
        const addFriend = this.addFriend;
        const deleteFriend = this.deleteFriend;
        const addGroup = this.addGroup;
        const deleteGroup = this.deleteGroup;
        const changeFriendGroup = this.changeFriendGroup;

        return (
            <FriendsPageContent {...{webId, groups, addFriend, deleteFriend, addGroup, deleteGroup, changeFriendGroup}}></FriendsPageContent>
            
        );
    }
}