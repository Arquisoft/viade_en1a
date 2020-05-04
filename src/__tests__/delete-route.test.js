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


describe.only("Route deletion test",  () => {
    let container = shallow(<RoutesSideBar/>);
    let instance= container.dive().instance();

    it("Route deleted without crashing", async () => {
        await instance.getPodRoutes();
        let routes = instance.listRoutes();
        await routes[0].props.routeWrapper.deleteRoute(routes[0].props.routeWrapper);

        expect(container).toBeTruthy();
    });

});