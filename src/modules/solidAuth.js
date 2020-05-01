import auth from "solid-auth-client";

export async function webId(){
    let session = await auth.currentSession();
    return session.webId.split("profile/card#me")[0];
}

export async function fullWebId(){
    let session = await auth.currentSession();
    return session.webId;
}