import React from "react";
import { render, cleanup } from "react-testing-library";
import Enzyme, {shallow} from "enzyme";
import RouteDesigner from "../containers/RouteDesigner/routeDesigner.component";
import Adapter from "enzyme-adapter-react-16";

import "jest-dom/extend-expect";
Enzyme.configure({adapter: new Adapter()});


afterAll(cleanup);

describe.only("RouteDesignerComponent", () => {
  const { container } = render(<RouteDesigner />);
  const wrapper = shallow(<RouteDesigner />);

it("RouteDesigner renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("getCoordinates returns coordinates", () => {
    expect(wrapper.dive().instance().getRouteCoordinates()).toStrictEqual([]);
  });

  test("removeMarkers removes markers", () => {
    wrapper.dive().instance().getRouteCoordinates();
    expect(wrapper.dive().instance().state.markers).toStrictEqual([]);
    expect(wrapper.dive().instance().state.routeLines).toStrictEqual([]);
  });
  
});