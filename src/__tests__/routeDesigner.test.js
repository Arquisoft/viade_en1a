import React from "react";
import { render, cleanup } from "react-testing-library";
import Enzyme, {shallow} from "enzyme";
import RouteDesigner from "../containers/RouteDesigner/routeDesigner.component";
import Adapter from "enzyme-adapter-react-16";
import Marker from "containers/RouteDesigner/components/Marker.component";
Enzyme.configure({adapter: new Adapter()});

import 'jest-dom/extend-expect';


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