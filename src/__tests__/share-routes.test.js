import React from "react";
import { render, cleanup } from 'react-testing-library';
import ShareRoutesComponent from "../containers/ShareRoutes/shareroutes.container";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'react-bootstrap';

afterAll(cleanup);

const friends = [
    {
        "webId": "https://victorgon.inrupt.net/profile/card#me",
        "name": "Víctor",
        "image": "img/noimg.svg"
    },
    {
        "webId": "https://adrianperezmanso.solid.community/profile/card#me",
        "name": "Adrián",
        "image": "img/noimg.svg"
    },
    {
        "webId": "https://fincamd.solid.community/profile/card#me",
        "name": "Víctor",
        "image": "img/noimg.svg"
    }
];

const popupLogin = async () => {
    let session = await solid.auth.currentSession();
    let popupUri = 'https://solid.community/common/popup.html';
    if (!session)
      session = await solid.auth.popupLogin({ popupUri });
    alert(`Logged in as ${session.webId}`);
  }

const component = <ShareRoutesComponent
    {...{
        webId: "https://adrianperezmanso.solid.community/profile/card#me",
        friends: friends
    }}
/>;

  configure({adapter: new Adapter()});

it("renders without crashing", () => {
    popupLogin();
    const { container } = render(component);
    expect(container).toBeTruthy();
  });

  
  it("click share button", () => {
    popupLogin();
    const wrapper = mount(component);
    wrapper.find(Button).at(0).simulate('click');
  });
  

 
