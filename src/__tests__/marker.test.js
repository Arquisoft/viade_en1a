import React from "react";
import { render, cleanup } from "react-testing-library";
import Marker from "../containers/RouteDesigner/components/Marker.component";

afterAll(cleanup);

describe.only("MarkerComponent", () => {
	const { container } = render(<Marker />);

it("Marker renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});