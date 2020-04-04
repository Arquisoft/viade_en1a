import React from "react";
import { render, cleanup } from "react-testing-library";
import { SharedRoute } from "../containers/Maps/shared/Route/shared.component";

describe.only("RouteComponent", () => {

const route= {
  
    name: "Nombre ruta",

    url: "url",

    showRoute: "showRoute",

    shareRoute: "shareRoute",

    deleteRoute: "deleteRoute"

}

it("MapRoute renders without crashing", () => {
    afterAll(cleanup);
    const { container } = render(<SharedRoute {...{ route }} />);
    expect(container).toBeTruthy();
  });
});