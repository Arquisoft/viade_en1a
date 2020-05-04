import React from "react";
import {cleanup, render} from "react-testing-library";
import SimpleMap from "../containers/Maps/maps.component";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
afterAll(cleanup);

describe.only("MapComponent", () => {
  const { container } = render(<SimpleMap />);

  it("SimpleMap renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});

describe.only("MapComponent2", () => {
  const { container } = render(<SimpleMap />);
  const wrapper = shallow(<SimpleMap />);

  it("RoutesSideBar renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  it("RoutesSideBar renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  
  test("renders designRoute elements", () => {
    expect(document.querySelectorAll("RoutesSideBar[id='routesSideBar'")).toBeTruthy();
    expect(document.querySelectorAll("GoogleMapReact[id='map'")).toBeTruthy();
  });
});

