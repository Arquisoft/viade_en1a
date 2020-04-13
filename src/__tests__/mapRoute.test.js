import React from "react";
import { render, cleanup } from "react-testing-library";
import { MapRoute } from "../containers/Maps/components/Route/route.component";
import { SharedRoute } from "../containers/Maps/shared/Route/shared.component";

describe.only("RouteComponent", () => {

  const routeWrapper = {

      name: "Nombre ruta",

      url: "url",

      route: "route"

  };

  const route = {

    name: "Nombre ruta",

    url: "url",

    route: "route"

  };

  it("MapRoute renders without crashing", () => {
      afterAll(cleanup);
      const {container} = render(<MapRoute {...{routeWrapper}} />);
      expect(container).toBeTruthy();
  });


/*
  it("SharedRoute renders without crashing", () => {
    afterAll(cleanup);
      const {container} = render(<SharedRoute {...{routeWrapper}} />);
    expect(container).toBeTruthy();
  });
*/
});