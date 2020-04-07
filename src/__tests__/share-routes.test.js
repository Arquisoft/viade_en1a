import React from "react";
import { render, cleanup } from "react-testing-library";
import ShareRoutesComponent from "../containers/ShareRoutes/shareroutes.container";

afterAll(cleanup);


  jest.mock('solid-auth-client', () => ({
    currentSession: jest.fn(() => Promise.resolve({ webId: "https://adrianperezmanso.solid.community/profile/card#me" })),
  }));

 const component = <ShareRoutesComponent
  {...{
      webId: "https://adrianperezmanso.solid.community/profile/card#me",
  }}
/>;
  
it("renders without crashing", () => {
    const { container } = render(component);
    expect(container).toBeTruthy();
  });

 
