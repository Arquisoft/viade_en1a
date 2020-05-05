import React from "react";
import {cleanup} from "@testing-library/react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RoutesSideBar from "../containers/Maps/routesSideBar.component";
import SimpleMap from "../containers/Maps/maps.component";
import "jest-dom/extend-expect";

Enzyme.configure({adapter: new Adapter()});

jest.setTimeout(50000);
afterAll(cleanup);


jest.mock("solid-auth-client", () => {
    const auth = jest.requireActual("solid-auth-client");
    auth.currentSession = jest.fn(() => Promise.resolve({webId: "https://uo264608.solid.community/profile/card#me"}));
    return auth;
});


describe.only("Covid heatmap toggle test",  () => {
    let map = shallow(<SimpleMap/>);
    let mapInstance=  map.dive().instance();

    let routeSideBar = shallow(<RoutesSideBar toggleCOVID={mapInstance.toggleCOVID}/>);

    //mount(<RoutesSideBar/>);
    let sideBarInstance = routeSideBar.dive().instance();


     it("Covid heatmap toggles without crashing", async () => {
        sideBarInstance.handleCOVIDChange(false);

        sideBarInstance.handleCOVIDChange(true);
        expect(routeSideBar).toBeTruthy();
    });


});