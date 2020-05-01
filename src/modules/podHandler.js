import auth from "solid-auth-client";
import FC from "solid-file-client";
import { isValidRoute } from "./validation.js";

const fc = new FC(auth);

export async function getPodRoutes(){
    let routesList = [];
    var url = await webId() + "viade/routes/";

    let folder = await fc.readFolder(url);

    for (let element of folder.files) {
        let content = await fc.readFile(element.url.toString());
        if(isValidRoute(element.url.toString(), content)){
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
                sharedRoutes.push({name, url, route});
            }
        }catch(error) {
            
        }
    }
    return sharedRoutes;
}

export async function deleteRoute(url){
    await fc.deleteFile(url);
}

export async function createRouteFile(relativeUrl, file) {
    let fileName = relativeUrl.split("viade/routes/")[1];
    getFileContent(file, async function(content){
        if(isValidRoute(fileName, content)){
            await createFile(relativeUrl, file);
        }
    });
    
}

export async function createRouteText(relativeUrl, content) {
    let fileName = relativeUrl.split("viade/routes/")[1];
    if(isValidRoute(fileName, content)){
        await createFile(relativeUrl, content);
    }
}

export async function createFile(relativeUrl, file){
    let url = await webId() + relativeUrl;
    await fc.createFile(url, file, "text/plain");
    console.log(url);
    console.log(file);
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

async function webId(){
    let session = await auth.currentSession();
    return session.webId.split("profile/card#me")[0];
}

async function getFileContent(file, callback){
    var fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function () {
        callback(fileReader.result);
    };
}

