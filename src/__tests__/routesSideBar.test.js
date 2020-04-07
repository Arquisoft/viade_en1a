import React from "react";
import { render, cleanup } from "react-testing-library";
import RoutesSideBar from "../containers/Maps/routesSideBar.component";

afterAll(cleanup);

describe.only("MapComponent", () => {
	const { container } = render(<RoutesSideBar />);

it("RoutesSideBar renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});