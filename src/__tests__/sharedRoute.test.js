import React from "react";
import { render, cleanup } from "react-testing-library";
import { SharedRoute } from "../containers/Maps/shared/Route/shared.component";

describe.only("RouteComponent", () => {

const route = {

    name: "Nombre ruta",

    url: "url",

    route: "route"

};

it("SharedRoute renders without crashing", () => {

    afterAll(cleanup);
    const {container} = render(<SharedRoute {...{route}} />);
    expect(container).toBeTruthy();

  });

});