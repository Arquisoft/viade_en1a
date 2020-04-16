import React, {Component} from 'react';
import data from '@solid/query-ldflex';
import {FriendsPageContent} from './friends.component';

import {Namespace, sym, st, graph, UpdateManager, Fetcher} from 'rdflib';

export class FriendsComponent extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            groups: {"Default":[], "Hiking Friends":[], "Family":[]}
        };

        this.addFriend = this.addFriend.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
    }

    deleteFriend = async(friendid) => {
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
        let del = store.statementsMatching(me, FOAF('knows'), sym(friendid), profile);

        updater.update(del, ins, (uri, ok, message) => {
            if (ok) {
                this.getProfileData();
            }
            else{
                alert(message);
            }
        });
    };

    addFriend = async(friendid) => {
        const {webId} = this.props;
        const FOAF = Namespace("http://xmlns.com/foaf/0.1/");
        const store = graph();
        const updater = new UpdateManager(store);

        const me = sym(webId);
        const profile = me.doc();

        let ins = st(me, FOAF('knows'), sym(friendid), profile);
        let del = [];

        updater.update(del, ins, (uri, ok, message) => {
            if (ok) {
                this.getProfileData();
            }
            else{
                alert(message);
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
        const {webId} = this.props;

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

        this.setState({friends, groups: {"Default":friends, "Hiking Friends":[], "Family":[]}});
    };

    render() {
        const {friends, groups} = this.state;
        const {webId} = this.props;
        const addFriend = this.addFriend;
        const deleteFriend = this.deleteFriend;

        return (
            <FriendsPageContent {...{friends, webId, groups, addFriend, deleteFriend}} />
        );
    }
}