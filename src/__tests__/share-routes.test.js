import React from "react";
import { render, cleanup } from "react-testing-library";
import ShareRoutesComponent from "../containers/ShareRoutes/shareroutes.container";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "react-bootstrap";

afterAll(cleanup);

jest.mock('solid-auth-client', () => {
  const auth = jest.requireActual('solid-auth-client');
  auth.currentSession = jest.fn(() => Promise.resolve({ webId: "https://adrianperezmanso.solid.community/profile/card#me" }));
  return auth;
});

const friends = [
  {
      "webId": "https://example2.inrupt.net/profile/card#me",
      "name": "Víctor",
      "image": "img/noimg.svg"
  },
  {
      "webId": "https://example3.inrupt.net/profile/card#me",
      "name": "Adrián",
      "image": "img/noimg.svg"
  },
  {
      "webId": "https://example4.inrupt.net/profile/card#me",
      "name": "Víctor",
      "image": "img/noimg.svg"
  }
];
  
configure({adapter: new Adapter()});

 const component = <ShareRoutesComponent
  {...{
      webId: "https://example.solid.community/profile/card#me",
      friends: friends
  }}
/>;

  it("renders without crashing", () => {
    const { container } = render(component);
    expect(container).toBeTruthy();
  }); 

  it("click share button", () => {
    const wrapper = mount(component);
    wrapper.find(Button).at(0).simulate('click');
  });


 
