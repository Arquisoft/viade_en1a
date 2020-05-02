import auth from "solid-auth-client";
import data from "@solid/query-ldflex";
import { namedNode } from "@rdfjs/data-model";
import SolidAclUtils from "solid-acl-utils";
import { webId, fullWebId } from "./solidAuth.js";
import FC from "solid-file-client";
import { isValidJSONRoute } from "./validation.js";
import { buildAcl } from "./buildFile.js";

const fc = new FC(auth);


function checkNotLogFile(url){
    let fileName = url.split("inbox/")[1];
    return fileName === "log.ttl";
}

async function getFullNotification(url) {
    let myUrl = url.toString();
    let fol = await fc.readFile(myUrl);
    let getSchem = fol.split("<>");
    let getImportant = getSchem[1].split("text");

    let fullLabel = getImportant[1].split("\"")[3];
    let sender = fullLabel.split("Shared route ")[1];

    return sender;

}

async function getSharedRoute(url) {
    let fol = await fc.readFile(url.toString());
    let getSchem = fol.split("<>");
    let urlText = getSchem[1].split("text");
    return urlText[1].split("\"")[1];
}


export async function getPodRoutes(){
    let routesList = [];
    var url = await webId() + "viade/routes/";

    let folder = await fc.readFolder(url);

    for (let element of folder.files) {
        let content = await fc.readFile(element.url.toString());
        if(isValidJSONRoute(element.url.toString(), content)){
            let parsedRoute = JSON.parse(content);
            routesList.push({name: element.name, url: element.url, route: parsedRoute});
        }
    }
    return routesList;
}

export async function getSharedRoutes(){
    let sharedRoutes = [];
    var urlShared = await webId() + "inbox/";

    let folderShared = await fc.readFolder(urlShared);
    for (let sharedElement of folderShared.files) {
        try{
            if(!checkNotLogFile(sharedElement.url.toString())){
                var name = await getFullNotification(sharedElement.url.toString());
                let url = sharedElement.url;
                let routeUrl = await getSharedRoute(url);
                let content = await fc.readFile(routeUrl.toString());
                let route = JSON.parse(content);
                let trueName = name+route.name+")";
                sharedRoutes.push({name, trueName, url, route});
            }
        }catch(error) {
            //
        }
    }
    return sharedRoutes;
}

export async function getFriendGroupsFromPOD(){
    let groups = [];
    let urlGroups = await webId() + "viade/groups/groups.json";
    
    let fileContent = await fc.readFile(urlGroups);
    groups = JSON.parse(fileContent);

    return groups;
}

export async function deleteFile(url){
    await fc.deleteFile(url);
}

export async function deleteFileRelativePath(relativeUrl){
    let url = await webId() + relativeUrl;
    await deleteFile(url);
}

export async function createFile(relativeUrl, file){
    let url = await webId() + relativeUrl;
    await fc.createFile(url, file, "text/plain");
    return url;
}

export async function itemExists(relativeUrl){
    let url = await webId() + relativeUrl;
    return await fc.itemExists(url);
}

export async function createFolder(relativeUrl){
    let url = await webId() + relativeUrl;
    await fc.createFolder(url);
    return url;
}

export async function readFile(relativeUrl){
    let url = await webId() + relativeUrl;
    return await fc.readFile(url);
}

export function getFriendInbox(friend){
    return friend + "inbox/";
}

export async function buildNotification(message){
    var mess = message.url;
    await data[mess.toString()].schema$text.add(message.content);
    await data[mess.toString()].rdfs$label.add(message.title);
    await data[mess.toString()].schema$dateSent.add(message.date.toISOString());
    await data[mess.toString()].rdf$type.add(namedNode("https://schema.org/Message"));
    await data[mess.toString()].schema$sender.add(namedNode(await fullWebId()));
}

export async function manageAcl(fileUrl, fileName, friend){
    const { AclApi, Permissions } = SolidAclUtils;
    const { READ } = Permissions;

    let aclUrl = fileUrl + ".acl";
    if(!await fc.itemExists(aclUrl)){
        let content = buildAcl(fileName);
        await fc.createFile(aclUrl, content, "text/turtle");
    }
    let friendWebId = friend + "profile/card#me";
    const fetch = auth.fetch.bind(auth);
    const aclApi = new AclApi(fetch, { autoSave: true });    
    const acl = await aclApi.loadFromFileUrl(fileUrl);

    await acl.addRule(READ, friendWebId);
}
