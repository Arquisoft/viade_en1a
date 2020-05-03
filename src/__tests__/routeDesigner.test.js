import React from "react";
import { render, cleanup } from "react-testing-library";
import RouteDesigner from "../containers/RouteDesigner/routeDesigner.component";
import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only("RouteDesignerComponent", () => {
	const { container } = render(<RouteDesigner />);

it("RouteDesigner renders without crashing", () => {
    expect(container).toBeTruthy();
  });

});