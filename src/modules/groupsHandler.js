import {Namespace, sym, st, graph, UpdateManager, Fetcher} from "rdflib";
import data from "@solid/query-ldflex";
import { fullWebId } from "./solidAuth.js";
import { itemExists, createFolder, createFile, getFriendGroupsFromPOD } from "./podHandler.js";

export async function addFriendToGroup(friendid, callback){
    const FOAF = Namespace("http://xmlns.com/foaf/0.1/");
    const store = graph();
    const updater = new UpdateManager(store);

    const me = sym(await fullWebId());
    const profile = me.doc();

    let ins = st(me, FOAF("knows"), sym(friendid), profile);
    let del = [];

    updater.update(del, ins, async (uri, ok, message) => {
        callback(uri, ok, message);
    });
}

export async function deleteFriendToGroup(friendid, callback){
    const FOAF = Namespace("http://xmlns.com/foaf/0.1/");
    const store = graph();
    const fetcher = new Fetcher(store);
    const updater = new UpdateManager(store);

    const myid = await fullWebId();
    const me = sym(myid);
    const profile = me.doc();

    await fetcher.load(myid);

    let ins = [];
    let del = store.statementsMatching(me, FOAF("knows"), sym(friendid), profile);
    updater.update(del, ins, async (uri, ok, message) => {
        callback(uri, ok, message);
    });
}

export async function getFriendGroups(){
    if(!await itemExists("viade/groups/")){
        await createFolder("viade/groups/");
    }

    if(!await itemExists("viade/groups/groups.json")){
        await createFile("viade/groups/groups.json", JSON.stringify({}));
    }

    return await getFriendGroupsFromPOD();
}

export async function inflateGroups(groups){
    let aux = {};
    aux["Default"] = [];
    const webId = await fullWebId();
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
}