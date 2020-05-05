import React from "react";
import {cleanup} from "@testing-library/react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RoutesSideBar from "../containers/Maps/routesSideBar.component";
import "jest-dom/extend-expect";

configure({adapter: new Adapter()});

jest.setTimeout(100000);
afterAll(cleanup);


jest.mock("solid-auth-client", () => {
    const auth = jest.requireActual("solid-auth-client");
    auth.currentSession = jest.fn(() => Promise.resolve({webId: "https://uo264608.solid.community/profile/card#me"}));
    return auth;
});


describe.only("Adding media to route test", () => {
    let container = shallow(<RoutesSideBar/>);
    let instance = container.dive().instance();

    const mediaFile = new File([":D"], "testImage.jpg");
    let event = {target: {files: [mediaFile]}};

    it("Media added without crashing", async () => {
        await instance.getPodRoutes();
        let routes = instance.listRoutes();

        await routes[0].props.routeWrapper.addMediaToRoute(routes[0].props.routeWrapper, event);

        expect(container).toBeTruthy();
    });


});