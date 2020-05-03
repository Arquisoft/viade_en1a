import React from "react";
import { render, cleanup } from "react-testing-library";
import {shallow} from 'enzyme';
import DesignSideBar from "../containers/RouteDesigner/designSideBar.component";
import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only("RouteDesignerComponent", () => {
  const { container } = render(<DesignSideBar />);


it("DesignSideBar renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  it("Button has correct name", () => {
    const button = container.querySelector('button');
    expect(button.textContent).toBe('routeDesigner.uploadToPOD');
  });
  
  
});