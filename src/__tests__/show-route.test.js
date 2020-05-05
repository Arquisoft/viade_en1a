import React from "react";
import {cleanup} from "@testing-library/react";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RoutesSideBar from "../containers/Maps/routesSideBar.component";
import SimpleMap from "../containers/Maps/maps.component";
import GoogleMapReact from "google-map-react";
import "jest-dom/extend-expect";

configure({adapter: new Adapter()});

jest.setTimeout(50000);
afterAll(cleanup);


jest.mock("solid-auth-client", () => {
    const auth = jest.requireActual("solid-auth-client");
    auth.currentSession = jest.fn(() => Promise.resolve({webId: "https://uo264608.solid.community/profile/card#me"}));
    return auth;
});


describe.only("Showing multiple routes test", () => {

    let map = shallow(<SimpleMap/>);

    let mapInstance = map.dive().instance();
    mount(<GoogleMapReact id="map"
                          bootstrapURLKeys={{key: "AIzaSyBJH6rDTJZ8ehbHIuCo0egn1zwbz0FIOwQ"}}
                          heatmapLibrary={true}
                          yesIWantToUseGoogleMapApiInternals={true}
                          onGoogleApiLoaded={({map, maps}) => mapInstance.handleApiLoaded(map, maps)}
    />);

    let routeSideBar = shallow(<RoutesSideBar show={mapInstance.show}/>);
    let sideBarInstance = routeSideBar.dive().instance();


    it("Showing multiple routes without crashing", async () => {
        await sideBarInstance.getPodRoutes();
        let routes = sideBarInstance.listRoutes();

        await routes[0].props.routeWrapper.showRoute(routes[0].props.routeWrapper);
        await routes[1].props.routeWrapper.showRoute(routes[1].props.routeWrapper);

        expect(routeSideBar).toBeTruthy();

        map.unmount();
    });


});