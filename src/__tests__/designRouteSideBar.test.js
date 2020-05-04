import React from "react";
import {cleanup, render} from "react-testing-library";
import Enzyme, {shallow} from "enzyme";
import DesignSideBar from "../containers/RouteDesigner/designSideBar.component";
import Adapter from "enzyme-adapter-react-16";
import "jest-dom/extend-expect";

Enzyme.configure({adapter: new Adapter()});


afterAll(cleanup);

describe.only("RouteDesignerComponent", () => {
  const {container} = render(<DesignSideBar/>);
  const wrapper = shallow(<DesignSideBar/>);


  it("DesignSideBar renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  it("DesignSideBar renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });
  
});