import React, {Component} from "react";
import data from "@solid/query-ldflex";
import {FriendsPageContent} from "./friends.component";
import FC from "solid-file-client";
import auth from "solid-auth-client";
import { errorToaster } from "@utils";

import {Namespace, sym, st, graph, UpdateManager, Fetcher} from "rdflib";

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

        var session = await auth.currentSession();
        var folderUrl = session.webId.split("profile/card#me")[0] + "viade/groups/";

        if (await this.fc.itemExists(folderUrl + "groups.json")) {
            await this.fc.deleteFile(folderUrl + "groups.json");
            await this.fc.createFile(folderUrl + "groups.json", JSON.stringify(this.groups), "text/json");
        }

        this.inflateGroups(this.groups).then((r) => {
            this.setState({inflatedGroups: r});
        });
    };

    deleteGroup = async (group) => {

        delete this.groups[group];

        var session = await auth.currentSession();
        var folderUrl = session.webId.split("profile/card#me")[0] + "viade/groups/";

        if (await this.fc.itemExists(folderUrl + "groups.json")) {
            await this.fc.deleteFile(folderUrl + "groups.json");
            await this.fc.createFile(folderUrl + "groups.json", JSON.stringify(this.groups), "text/json");
        }

        this.inflateGroups(this.groups).then((r) => {
            this.setState({inflatedGroups: r});
        });
    };

    changeFriendGroup = async(friendid, group) => {
        this.deleteFriend(friendid, this.addFriend, group);
    };

    deleteFriend = async (friendid, callback, group) => {
        const {webId} = this.props;
        const FOAF = Namespace("http://xmlns.com/foaf/0.1/");
        const store = graph();
        const fetcher = new Fetcher(store);
        const updater = new UpdateManager(store);

        const myid = webId;

        const me = sym(myid);
        const profile = me.doc();

        await fetcher.load(myid);

        let ins = [];
        let del = store.statementsMatching(me, FOAF("knows"), sym(friendid), profile);

        var aux = {};

        updater.update(del, ins, async (uri, ok, message) => {
            if (ok) {
                Object.keys(this.groups).map((key) => {
                    aux[key] = [];
                    this.groups[key].forEach(
                        (e) => {
                            if (e !== friendid) {
                                aux[key].push(e);
                            }
                        }
                    );
                    return null;
                });

                var session = await auth.currentSession();
                var folderUrl = session.webId.split("profile/card#me")[0] + "viade/groups/";
                if (await this.fc.itemExists(folderUrl + "groups.json")) {
                    await this.fc.deleteFile(folderUrl + "groups.json");
                    await this.fc.createFile(folderUrl + "groups.json", JSON.stringify(aux), "text/json").then(
                        () => {
                            this.groups = aux;

                            this.inflateGroups(this.groups).then((r) => {
                                this.setState({inflatedGroups: r});
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
        const {webId} = this.props;
        const FOAF = Namespace("http://xmlns.com/foaf/0.1/");
        const store = graph();
        const updater = new UpdateManager(store);

        const me = sym(webId);
        const profile = me.doc();

        let ins = st(me, FOAF("knows"), sym(friendid), profile);
        let del = [];

        updater.update(del, ins, async (uri, ok, message) => {
            if (ok) {
                if(group !== "Default") {
                    this.groups[group].push(friendid);
                    var session = await auth.currentSession();
                    var folderUrl = session.webId.split("profile/card#me")[0] + "viade/groups/";
                    if (await this.fc.itemExists(folderUrl + "groups.json")) {
                        await this.fc.deleteFile(folderUrl + "groups.json");
                        await this.fc.createFile(folderUrl + "groups.json", JSON.stringify(this.groups), "text/json");
                    }
                }
                this.inflateGroups(this.groups).then((r) => {
                    this.setState({inflatedGroups: r});
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
            aux[key] = [];
            return null;
        });

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

            let targetGroup = "Default";

            // eslint-disable-next-line
            Object.keys(groups).map((key) => {
                groups[key].map(
                    (e) => {
                        if (e === friend_obj.webId) {
                            targetGroup = key;
                        }
                        return null;
                    }
                );
                return null;
            });

            aux[targetGroup].push(friend_obj);
        }

        return aux;
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