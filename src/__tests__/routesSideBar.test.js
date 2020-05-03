import React from "react";
import { render, cleanup } from "react-testing-library";
import RoutesSideBar from "../containers/Maps/routesSideBar.component";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);
describe.only("MapComponent", () => {
	const { container } = render(<RoutesSideBar />);

it("RoutesSideBar renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
afterAll(cleanup);

describe.only("RoutesSideBar elements", () => {
  const { container } = render(<RoutesSideBar />);
  const wrapper = shallow(<RoutesSideBar />);

  it("RoutesSideBar renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  it("RoutesSideBar renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  
  test("renders designRoute elements", () => {
    expect(document.querySelectorAll("a[href='#/design]'")).toBeTruthy();
    expect(document.querySelectorAll("Button[id='clear'")).toBeTruthy();
    expect(document.querySelectorAll("label[id='covid'")).toBeTruthy();
  });
});
