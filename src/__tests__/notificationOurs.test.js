import React from "react";
import { render, cleanup } from "react-testing-library";
import { Notis } from "../containers/Notifications/Notis/Comp/notis.component";
describe.only("RouteComponent", () => {

const noti= {
  
    name: "Nombre de notificacion",

    url: "url"

};

it("Notis renders without crashing", () => {
    afterAll(cleanup);
    const { container } = render(<Notis {...{ noti }} />);
    expect(container).toBeTruthy();
  });
});

