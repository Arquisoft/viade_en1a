import React from "react";
import { render, cleanup } from "react-testing-library";
import { MapRoute } from "../containers/Maps/components/Route/route.component";

describe.only("RouteComponent", () => {

const route= {
  
    name: "Nombre ruta",

    url: "url",

    showRoute: "showRoute",

    shareRoute: "shareRoute",

    deleteRoute: "deleteRoute"

};

it("MapRoute renders without crashing", () => {
    afterAll(cleanup);
    const { container } = render(<MapRoute {...{ route }} />);
    expect(container).toBeTruthy();
  });
});