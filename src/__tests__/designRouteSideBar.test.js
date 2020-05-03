import React from "react";
import { render, cleanup } from "react-testing-library";
import Enzyme, {shallow, mount} from "enzyme";
import DesignSideBar from "../containers/RouteDesigner/designSideBar.component";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only("RouteDesignerComponent", () => {
  const { container } = render(<DesignSideBar />);
  const wrapper = shallow(<DesignSideBar />);


it("DesignSideBar renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  it("DesignSideBar renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });
  
});