export function isValidJSONRoute(name, content){
    if(!name.endsWith(".json")){
        return false;
    }
    try{
        let parsed = JSON.parse(content);
        if(!parsed.hasOwnProperty("name")){
            return false;
        }
        if(!parsed.hasOwnProperty("points")){
            return false;
        }else{
            for (let i = 0; i < parsed.points.length; i++){
                if(!parsed.points[parseInt(i)].hasOwnProperty("longitude") || !parsed.points[parseInt(i)].hasOwnProperty("latitude") || !parsed.points[parseInt(i)].hasOwnProperty("elevation")){
                    return false;
                }
            }
        }
        if(!parsed.hasOwnProperty("waypoints")){
            return false;
        }else{
            for(let i = 0; i < parsed.waypoints.length; i++){
                if(!parsed.waypoints[parseInt(i)].hasOwnProperty("longitude") || !parsed.waypoints[parseInt(i)].hasOwnProperty("latitude") || !parsed.waypoints[parseInt(i)].hasOwnProperty("elevation") 
                || !parsed.waypoints[parseInt(i)].hasOwnProperty("name") || !parsed.waypoints[parseInt(i)].hasOwnProperty("description")){
                    return false;
                }
            }
        }
        if(!parsed.hasOwnProperty("media")){
            return false;
        }else{
            for(let i = 0; i < parsed.media.length; i++){
                if(!parsed.media[parseInt(i)].hasOwnProperty("url")){
                    return false;
                }
            }
        }
        return true;
    }catch(error){
        return false;
    }
}

export function isValidRouteName(trimmedRouteName){
    return !trimmedRouteName.length > 0;
}

export function isValidRoutePoints(routePoints){
    return routePoints.length < 2;
}