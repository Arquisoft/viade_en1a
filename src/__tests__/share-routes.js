import React from "react";
import { render, cleanup } from 'react-testing-library';
import ShareRoutesComponent from "../containers/ShareRoutes/shareroutes.container";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'react-bootstrap';

afterAll(cleanup);

const friends = [
    {
        "webId": "https://victorgon.inrupt.net/",
        "name": "Víctor",
        "image": "img/noimg.svg"
    },
    {
        "webId": "https://adrianperezmanso.solid.community/",
        "name": "Adrián",
        "image": "img/noimg.svg"
    },
    {
        "webId": "https://fincamd.solid.community/",
        "name": "Víctor",
        "image": "img/noimg.svg"
    }
];

const share = {
    shareRoute: () => {
        console.log("Sharing route");
    }
} 

const component = <ShareRoutesComponent
    {...{
        webId: "https://adrianperezmanso.solid.community/"
    }}
/>;

  configure({adapter: new Adapter()});

it("renders without crashing", () => {
    const { container } = render(component);
    expect(container).toBeTruthy();
  });

  it("click share button", () => {
    const wrapper = mount(component);
    wrapper.find(Button).at(0).simulate('click');
  });
  

 
